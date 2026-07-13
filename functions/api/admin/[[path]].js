const DEFAULT_REPOSITORY = "chocojun/choco-blog";
const DEFAULT_BRANCH = "main";
const MAX_TEXT_BYTES = 2 * 1024 * 1024;
const MAX_IMAGE_BYTES = 8 * 1024 * 1024;

const JSON_HEADERS = {
  "content-type": "application/json; charset=utf-8",
  "cache-control": "no-store",
  "x-content-type-options": "nosniff",
  "referrer-policy": "no-referrer",
};

export async function onRequest(context) {
  const { request } = context;
  const corsHeaders = buildCorsHeaders(request, context.env);

  if (request.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: corsHeaders });
  }

  try {
    assertConfigured(context.env);
    await assertAuthorized(request, context.env.ADMIN_API_KEY);

    const url = new URL(request.url);
    const route = url.pathname.replace(/^\/api\/admin\/?/, "").replace(/\/$/, "");

    if (request.method === "GET" && (route === "" || route === "health")) {
      return json({ ok: true, repository: repositoryName(context.env), branch: branchName(context.env) }, 200, corsHeaders);
    }

    if (request.method === "GET" && route === "articles") {
      const files = await githubRequest(context.env, "/contents/content/posts");
      const articles = files
        .filter((file) => file.type === "file" && file.name.toLowerCase().endsWith(".md"))
        .map((file) => ({ name: file.name, path: file.path, sha: file.sha }))
        .sort((a, b) => a.name.localeCompare(b.name, "zh-Hans-CN", { numeric: true }));
      return json({ articles }, 200, corsHeaders);
    }

    if (request.method === "GET" && route === "article") {
      const path = normalizeArticlePath(url.searchParams.get("path"));
      const file = await readRepositoryFile(context.env, path);
      return json({ path, sha: file.sha, content: decodeBase64Utf8(file.content) }, 200, corsHeaders);
    }

    if (request.method === "PUT" && route === "article") {
      const body = await readJson(request, MAX_TEXT_BYTES);
      const path = normalizeArticlePath(body.path);
      assertString(body.content, "content");
      assertByteLength(body.content, MAX_TEXT_BYTES, "Article");
      const result = await writeRepositoryFile(context.env, {
        path,
        content: encodeBase64Utf8(body.content),
        message: cleanCommitMessage(body.message, `Update article ${path.split("/").pop()}`),
      });
      return json({ ok: true, path, commit: result.commit?.sha }, 200, corsHeaders);
    }

    if (request.method === "GET" && route === "films") {
      const file = await readRepositoryFile(context.env, "data/films.json");
      return json({ sha: file.sha, films: JSON.parse(decodeBase64Utf8(file.content)) }, 200, corsHeaders);
    }

    if (request.method === "PUT" && route === "films") {
      const body = await readJson(request, MAX_TEXT_BYTES);
      if (!Array.isArray(body.films)) throw new ApiError(400, "films must be an array");
      const content = `${JSON.stringify(body.films, null, 2)}\n`;
      assertByteLength(content, MAX_TEXT_BYTES, "Film data");
      const result = await writeRepositoryFile(context.env, {
        path: "data/films.json",
        content: encodeBase64Utf8(content),
        message: cleanCommitMessage(body.message, "Update film recommendations"),
      });
      return json({ ok: true, commit: result.commit?.sha }, 200, corsHeaders);
    }

    if (request.method === "POST" && route === "image") {
      const body = await readJson(request, Math.ceil(MAX_IMAGE_BYTES * 1.5));
      const path = normalizeImagePath(body.path);
      assertString(body.base64, "base64");
      const base64 = body.base64.replace(/^data:image\/[a-zA-Z0-9.+-]+;base64,/, "");
      const byteLength = Math.floor((base64.length * 3) / 4);
      if (byteLength > MAX_IMAGE_BYTES) throw new ApiError(413, "Image exceeds the 8 MB limit");
      const result = await writeRepositoryFile(context.env, {
        path,
        content: base64,
        message: cleanCommitMessage(body.message, `Upload image ${path.split("/").pop()}`),
      });
      return json({ ok: true, path, publicUrl: `/${path.replace(/^static\//, "")}`, commit: result.commit?.sha }, 200, corsHeaders);
    }

    throw new ApiError(404, "Unknown admin endpoint");
  } catch (error) {
    const status = error instanceof ApiError ? error.status : 500;
    const message = status === 500 ? "Admin API request failed" : error.message;
    if (status === 500) console.error(error);
    return json({ ok: false, error: message }, status, corsHeaders);
  }
}

function assertConfigured(env) {
  if (!env.GITHUB_CONTENT_TOKEN || !env.ADMIN_API_KEY) {
    throw new ApiError(503, "Admin API secrets are not configured");
  }
}

async function assertAuthorized(request, expectedKey) {
  const header = request.headers.get("authorization") || "";
  const suppliedKey = header.startsWith("Bearer ") ? header.slice(7) : "";
  if (!suppliedKey || !(await secureEqual(suppliedKey, expectedKey))) {
    throw new ApiError(401, "Invalid admin key");
  }
}

async function secureEqual(left, right) {
  const encoder = new TextEncoder();
  const [a, b] = await Promise.all([
    crypto.subtle.digest("SHA-256", encoder.encode(left)),
    crypto.subtle.digest("SHA-256", encoder.encode(right)),
  ]);
  const aa = new Uint8Array(a);
  const bb = new Uint8Array(b);
  let difference = aa.length ^ bb.length;
  for (let index = 0; index < Math.min(aa.length, bb.length); index += 1) difference |= aa[index] ^ bb[index];
  return difference === 0;
}

function buildCorsHeaders(request, env) {
  const origin = request.headers.get("origin");
  const configured = String(env.ADMIN_ALLOWED_ORIGINS || "")
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
  const allowed = !origin || origin === "null" || configured.includes(origin) || origin.endsWith(".pages.dev");
  return {
    "access-control-allow-origin": allowed && origin ? origin : "null",
    "access-control-allow-methods": "GET, PUT, POST, OPTIONS",
    "access-control-allow-headers": "authorization, content-type",
    "access-control-max-age": "86400",
    vary: "Origin",
  };
}

function repositoryName(env) {
  return env.GITHUB_REPOSITORY || DEFAULT_REPOSITORY;
}

function branchName(env) {
  return env.GITHUB_BRANCH || DEFAULT_BRANCH;
}

async function githubRequest(env, path, options = {}) {
  const repository = repositoryName(env);
  const branch = branchName(env);
  const separator = path.includes("?") ? "&" : "?";
  const includeRef = !options.method || options.method === "GET";
  const url = `https://api.github.com/repos/${repository}${encodeGithubPath(path)}${includeRef ? `${separator}ref=${encodeURIComponent(branch)}` : ""}`;
  const response = await fetch(url, {
    ...options,
    headers: {
      accept: "application/vnd.github+json",
      authorization: `Bearer ${env.GITHUB_CONTENT_TOKEN}`,
      "content-type": "application/json",
      "user-agent": "floscas-mobile-admin",
      "x-github-api-version": "2022-11-28",
      ...options.headers,
    },
  });
  const payload = await response.json().catch(() => ({}));
  if (!response.ok) {
    const status = response.status === 404 ? 404 : response.status >= 500 ? 502 : 400;
    throw new ApiError(status, payload.message || "GitHub request failed");
  }
  return payload;
}

function encodeGithubPath(path) {
  const [pathname, query] = path.split("?");
  const encoded = pathname.split("/").map((part) => encodeURIComponent(part)).join("/");
  return query ? `${encoded}?${query}` : encoded;
}

async function readRepositoryFile(env, path) {
  return githubRequest(env, `/contents/${path}`);
}

async function writeRepositoryFile(env, { path, content, message }) {
  let sha;
  try {
    sha = (await readRepositoryFile(env, path)).sha;
  } catch (error) {
    if (!(error instanceof ApiError) || error.status !== 404) throw error;
  }
  return githubRequest(env, `/contents/${path}`, {
    method: "PUT",
    body: JSON.stringify({ message, content, branch: branchName(env), ...(sha ? { sha } : {}) }),
  });
}

function normalizeArticlePath(input) {
  assertString(input, "path");
  let path = input.trim().replace(/\\/g, "/");
  if (!path.startsWith("content/posts/")) path = `content/posts/${path}`;
  if (!path.toLowerCase().endsWith(".md")) path += ".md";
  if (!/^content\/posts\/[\p{L}\p{N}._ -]+\.md$/u.test(path) || path.includes("..")) {
    throw new ApiError(400, "Invalid article path");
  }
  return path;
}

function normalizeImagePath(input) {
  assertString(input, "path");
  let path = input.trim().replace(/\\/g, "/").replace(/^\/+/, "");
  if (!path.startsWith("static/images/")) path = `static/images/${path}`;
  if (!/^static\/images\/[\p{L}\p{N}._\-/ ]+\.(avif|gif|jpe?g|png|webp)$/iu.test(path) || path.includes("..")) {
    throw new ApiError(400, "Invalid image path or extension");
  }
  return path;
}

async function readJson(request, maxBytes) {
  const length = Number(request.headers.get("content-length") || 0);
  if (length > maxBytes) throw new ApiError(413, "Request is too large");
  try {
    return await request.json();
  } catch {
    throw new ApiError(400, "Request body must be valid JSON");
  }
}

function assertString(value, name) {
  if (typeof value !== "string" || !value.trim()) throw new ApiError(400, `${name} is required`);
}

function assertByteLength(value, limit, label) {
  if (new TextEncoder().encode(value).byteLength > limit) throw new ApiError(413, `${label} exceeds the size limit`);
}

function cleanCommitMessage(value, fallback) {
  if (typeof value !== "string") return fallback;
  const message = value.replace(/[\r\n]+/g, " ").trim().slice(0, 120);
  return message || fallback;
}

function encodeBase64Utf8(value) {
  const bytes = new TextEncoder().encode(value);
  let binary = "";
  for (let index = 0; index < bytes.length; index += 0x8000) {
    binary += String.fromCharCode(...bytes.subarray(index, index + 0x8000));
  }
  return btoa(binary);
}

function decodeBase64Utf8(value) {
  const normalized = value.replace(/\s/g, "");
  const binary = atob(normalized);
  const bytes = Uint8Array.from(binary, (character) => character.charCodeAt(0));
  return new TextDecoder().decode(bytes);
}

function json(payload, status, corsHeaders) {
  return new Response(JSON.stringify(payload), {
    status,
    headers: { ...JSON_HEADERS, ...corsHeaders },
  });
}

class ApiError extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
  }
}

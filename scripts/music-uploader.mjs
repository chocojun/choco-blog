import http from "node:http";
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const musicDir = path.join(root, "static", "music");
const tracksDir = path.join(musicDir, "tracks");
const coversDir = path.join(musicDir, "covers");
const playlistPath = path.join(musicDir, "playlist.json");
const port = Number(process.env.FLOSCAS_MUSIC_UPLOADER_PORT || 4327);

const audioTypes = new Set(["audio/mpeg", "audio/mp3", "audio/wav", "audio/x-wav", "audio/flac", "audio/aac", "audio/mp4", "audio/ogg"]);
const coverTypes = new Set(["image/jpeg", "image/png", "image/webp"]);

const normalize = (value = "") => value
  .toString()
  .normalize("NFKC")
  .toLowerCase()
  .replace(/[’'`´]/g, "")
  .replace(/&/g, "and")
  .replace(/\s*[-–—]\s*/g, " ")
  .replace(/[^\p{L}\p{N}]+/gu, " ")
  .trim()
  .replace(/\s+/g, " ");

const slugify = (value = "track") => {
  const ascii = value
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/[\s_-]+/g, "-")
    .toLowerCase();
  return ascii || `track-${Date.now()}`;
};

const send = (res, status, body, type = "application/json; charset=utf-8") => {
  res.writeHead(status, { "Content-Type": type, "Cache-Control": "no-store" });
  res.end(typeof body === "string" ? body : JSON.stringify(body, null, 2));
};

const readBody = (req) => new Promise((resolve, reject) => {
  const chunks = [];
  req.on("data", (chunk) => chunks.push(chunk));
  req.on("end", () => resolve(Buffer.concat(chunks)));
  req.on("error", reject);
});

const parseMultipart = (buffer, contentType = "") => {
  const boundary = contentType.match(/boundary=(?:"([^"]+)"|([^;]+))/i)?.[1] || contentType.match(/boundary=(?:"([^"]+)"|([^;]+))/i)?.[2];
  if (!boundary) throw new Error("Missing multipart boundary.");

  const marker = Buffer.from(`--${boundary}`);
  const parts = [];
  let start = buffer.indexOf(marker) + marker.length + 2;

  while (start > marker.length) {
    const next = buffer.indexOf(marker, start);
    if (next < 0) break;
    const part = buffer.subarray(start, next - 2);
    const split = part.indexOf(Buffer.from("\r\n\r\n"));
    if (split > -1) {
      const rawHeaders = part.subarray(0, split).toString("utf8");
      const body = part.subarray(split + 4);
      const disposition = rawHeaders.match(/content-disposition:\s*form-data;([^\r\n]+)/i)?.[1] || "";
      const name = disposition.match(/name="([^"]+)"/i)?.[1];
      const filename = disposition.match(/filename="([^"]*)"/i)?.[1];
      const type = rawHeaders.match(/content-type:\s*([^\r\n]+)/i)?.[1]?.trim() || "";
      if (name) parts.push({ name, filename, type, body });
    }
    start = next + marker.length + 2;
  }

  const fields = {};
  const files = {};
  for (const part of parts) {
    if (part.filename) files[part.name] = part;
    else fields[part.name] = part.body.toString("utf8").trim();
  }
  return { fields, files };
};

const ensureDirs = async () => {
  await fs.mkdir(tracksDir, { recursive: true });
  await fs.mkdir(coversDir, { recursive: true });
  try {
    await fs.access(playlistPath);
  } catch {
    await fs.writeFile(playlistPath, JSON.stringify({ source: "", tracks: [] }, null, 2), "utf8");
  }
};

const uniquePath = async (dir, base, ext) => {
  let index = 0;
  while (true) {
    const suffix = index ? `-${index + 1}` : "";
    const filePath = path.join(dir, `${base}${suffix}${ext}`);
    try {
      await fs.access(filePath);
      index += 1;
    } catch {
      return filePath;
    }
  }
};

const loadPlaylist = async () => {
  await ensureDirs();
  const parsed = JSON.parse(await fs.readFile(playlistPath, "utf8"));
  return {
    source: parsed.source || "https://open.spotify.com/playlist/3UQVv3BjPgadnI2DY2fAJY?si=5a5425ed30e54ffb",
    tracks: Array.isArray(parsed.tracks) ? parsed.tracks : []
  };
};

const savePlaylist = (playlist) => fs.writeFile(playlistPath, `${JSON.stringify(playlist, null, 2)}\n`, "utf8");

const searchCover = async ({ title, artist, album }) => {
  if (!title || !artist) return null;
  const term = encodeURIComponent(`${title} ${artist}`);
  const response = await fetch(`https://itunes.apple.com/search?term=${term}&entity=song&limit=10`);
  if (!response.ok) throw new Error(`Cover search failed: ${response.status}`);
  const data = await response.json();
  const titleKey = normalize(title);
  const artistKey = normalize(artist);
  const albumKey = normalize(album);
  const match = (data.results || []).find((item) => {
    const baseMatch = normalize(item.trackName) === titleKey && normalize(item.artistName) === artistKey;
    return albumKey ? baseMatch && normalize(item.collectionName) === albumKey : baseMatch;
  });
  if (!match?.artworkUrl100) return null;
  return {
    title: match.trackName,
    artist: match.artistName,
    album: match.collectionName,
    coverUrl: match.artworkUrl100.replace(/100x100bb\.(jpg|png|webp)$/i, "600x600bb.$1"),
    source: "iTunes Search API"
  };
};

const downloadCover = async (coverUrl, targetPath) => {
  const response = await fetch(coverUrl);
  if (!response.ok) throw new Error(`Cover download failed: ${response.status}`);
  const contentType = response.headers.get("content-type") || "";
  if (!coverTypes.has(contentType.split(";")[0])) throw new Error("Matched cover is not a supported image.");
  await fs.writeFile(targetPath, Buffer.from(await response.arrayBuffer()));
};

const uploadPage = `<!doctype html>
<html lang="zh-CN">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Floscas Music Uploader</title>
  <style>
    :root{color-scheme:light dark;--bg:#f6f0e7;--ink:#182019;--muted:#70776f;--line:rgba(24,32,25,.16);--glass:rgba(255,255,255,.58)}
    *{box-sizing:border-box} body{margin:0;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;color:var(--ink);background:radial-gradient(circle at 20% 0,rgba(121,150,136,.26),transparent 34%),var(--bg)}
    main{width:min(920px,calc(100% - 28px));margin:0 auto;padding:42px 0 68px} h1{font-family:Georgia,serif;font-size:clamp(2.6rem,7vw,5.6rem);line-height:.92;margin:0 0 10px} p{color:var(--muted);line-height:1.7}
    form,.preview{border:1px solid transparent;border-radius:28px;background:linear-gradient(145deg,rgba(255,255,255,.66),rgba(255,255,255,.34)) padding-box,linear-gradient(135deg,rgba(255,255,255,.8),rgba(110,130,120,.22)) border-box;box-shadow:0 20px 70px rgba(46,45,38,.12);backdrop-filter:blur(24px) saturate(150%);padding:24px}
    .grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:16px}.full{grid-column:1/-1} label{display:grid;gap:7px;font-size:.76rem;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:var(--muted)}
    input,textarea{width:100%;border:1px solid var(--line);border-radius:14px;background:rgba(255,255,255,.62);color:var(--ink);padding:12px 13px;font:inherit} textarea{min-height:86px;resize:vertical}
    .actions{display:flex;flex-wrap:wrap;gap:10px;margin-top:18px} button{border:1px solid var(--line);border-radius:999px;background:rgba(255,255,255,.58);color:var(--ink);padding:11px 16px;font-weight:700;cursor:pointer} button.primary{background:#182019;color:#fff} button:disabled{opacity:.42;cursor:not-allowed}
    .preview{display:none;margin-top:18px}.preview.is-visible{display:grid;grid-template-columns:120px 1fr;gap:18px;align-items:center}.cover{width:120px;aspect-ratio:1;border-radius:20px;object-fit:cover;background:#d9d6cd}.status{margin-top:14px;color:var(--muted);white-space:pre-wrap}
    @media(max-width:680px){.grid,.preview.is-visible{grid-template-columns:1fr}.cover{width:100%}}
  </style>
</head>
<body>
<main>
  <p>Local tool</p>
  <h1>Upload to Floscas.</h1>
  <p>选择音频，填写准确歌名和歌手。没有封面时，只有在线结果的歌名、歌手、专辑完全匹配，才会自动补封面。</p>
  <form id="form">
    <div class="grid">
      <label>Song title<input name="title" required placeholder="Song title"></label>
      <label>Artist<input name="artist" required placeholder="Artist"></label>
      <label>Album<input name="album" placeholder="Album, optional"></label>
      <label>Year<input name="year" placeholder="2026"></label>
      <label>Genre<input name="genre" placeholder="Ambient / Pop / Piano"></label>
      <label>Source URL<input name="sourceUrl" placeholder="Spotify / YouTube / note link"></label>
      <label class="full">Audio file<input name="audio" type="file" accept="audio/*" required></label>
      <label class="full">Cover image, optional<input name="cover" type="file" accept="image/jpeg,image/png,image/webp"></label>
      <label class="full">Notes<textarea name="notes" placeholder="A short listening note, optional"></textarea></label>
    </div>
    <div class="actions">
      <button type="button" id="lookup">联网查找封面</button>
      <button type="button" id="prepare" class="primary">确认信息</button>
      <button type="submit" id="upload" disabled>上传到 Floscas</button>
    </div>
    <input type="hidden" name="coverUrl">
  </form>
  <section class="preview" id="preview">
    <img class="cover" id="cover" alt="">
    <div>
      <strong id="summary"></strong>
      <p id="details"></p>
    </div>
  </section>
  <pre class="status" id="status"></pre>
</main>
<script>
const form = document.querySelector("#form");
const status = document.querySelector("#status");
const preview = document.querySelector("#preview");
const cover = document.querySelector("#cover");
const summary = document.querySelector("#summary");
const details = document.querySelector("#details");
const upload = document.querySelector("#upload");
const data = () => Object.fromEntries(new FormData(form).entries());
const say = (text) => status.textContent = text;
const renderPreview = (info, coverUrl) => {
  preview.classList.add("is-visible");
  cover.src = coverUrl || "/images/floscas-gallery/green-valley.jpg";
  summary.textContent = info.title + " — " + info.artist;
  details.textContent = [info.album, info.year, info.genre].filter(Boolean).join(" · ") || "No extra details";
};
document.querySelector("#lookup").onclick = async () => {
  const info = data();
  say("正在查找精确匹配封面...");
  const res = await fetch("/api/cover-search", { method:"POST", headers:{ "Content-Type":"application/json" }, body: JSON.stringify(info) });
  const json = await res.json();
  if (!json.coverUrl) { form.coverUrl.value = ""; say("没有找到歌名/歌手完全匹配的封面。可以手动选择封面，或保持无封面。"); return; }
  form.coverUrl.value = json.coverUrl;
  renderPreview(info, json.coverUrl);
  say("找到精确匹配封面：\\n" + json.title + " — " + json.artist + "\\n" + (json.album || ""));
};
document.querySelector("#prepare").onclick = () => {
  if (!form.reportValidity()) return;
  const info = data();
  const manualCover = form.cover.files[0] ? URL.createObjectURL(form.cover.files[0]) : "";
  renderPreview(info, manualCover || form.coverUrl.value);
  upload.disabled = false;
  say("请确认信息和封面。确认无误后点击“上传到 Floscas”。");
};
form.onsubmit = async (event) => {
  event.preventDefault();
  if (!form.reportValidity()) return;
  if (!confirm("确认上传到 Floscas 本地播放器？")) return;
  upload.disabled = true;
  say("正在上传...");
  const res = await fetch("/api/upload", { method:"POST", body: new FormData(form) });
  const json = await res.json();
  if (!res.ok) { say(json.error || "上传失败"); upload.disabled = false; return; }
  say("上传完成。\\n音乐：" + json.track.src + "\\n封面：" + (json.track.cover || "无") + "\\n现在刷新 Floscas 首页即可播放。");
};
</script>
</body>
</html>`;

const handleUpload = async (req, res) => {
  const { fields, files } = parseMultipart(await readBody(req), req.headers["content-type"]);
  const title = fields.title?.trim();
  const artist = fields.artist?.trim();
  if (!title || !artist) return send(res, 400, { error: "Title and artist are required." });
  if (!files.audio?.body?.length) return send(res, 400, { error: "Audio file is required." });
  if (files.audio.type && !audioTypes.has(files.audio.type.split(";")[0])) return send(res, 400, { error: "Unsupported audio file type." });
  if (files.cover?.body?.length && files.cover.type && !coverTypes.has(files.cover.type.split(";")[0])) return send(res, 400, { error: "Unsupported cover image type." });

  await ensureDirs();
  const base = slugify(`${artist}-${title}`);
  const audioExt = path.extname(files.audio.filename || "") || ".mp3";
  const audioPath = await uniquePath(tracksDir, base, audioExt.toLowerCase());
  await fs.writeFile(audioPath, files.audio.body);

  let coverRel = "";
  if (files.cover?.body?.length) {
    const coverExt = path.extname(files.cover.filename || "") || ".jpg";
    const coverPath = await uniquePath(coversDir, base, coverExt.toLowerCase());
    await fs.writeFile(coverPath, files.cover.body);
    coverRel = `/music/covers/${path.basename(coverPath)}`;
  } else if (fields.coverUrl) {
    const match = await searchCover({ title, artist, album: fields.album });
    if (match?.coverUrl === fields.coverUrl) {
      const coverPath = await uniquePath(coversDir, base, ".jpg");
      await downloadCover(match.coverUrl, coverPath);
      coverRel = `/music/covers/${path.basename(coverPath)}`;
    }
  }

  const track = {
    title,
    artist,
    album: fields.album || "",
    year: fields.year || "",
    genre: fields.genre || "",
    notes: fields.notes || "",
    sourceUrl: fields.sourceUrl || "",
    src: `/music/tracks/${path.basename(audioPath)}`,
    cover: coverRel,
    addedAt: new Date().toISOString()
  };
  const playlist = await loadPlaylist();
  playlist.tracks.push(track);
  await savePlaylist(playlist);
  send(res, 200, { ok: true, track });
};

await ensureDirs();
const server = http.createServer(async (req, res) => {
  try {
    const url = new URL(req.url || "/", `http://${req.headers.host}`);
    if (req.method === "GET" && url.pathname === "/") return send(res, 200, uploadPage, "text/html; charset=utf-8");
    if (req.method === "POST" && url.pathname === "/api/cover-search") {
      const body = JSON.parse((await readBody(req)).toString("utf8") || "{}");
      return send(res, 200, await searchCover(body) || {});
    }
    if (req.method === "POST" && url.pathname === "/api/upload") return handleUpload(req, res);
    send(res, 404, { error: "Not found." });
  } catch (error) {
    send(res, 500, { error: error.message || "Unexpected error." });
  }
});

server.listen(port, "127.0.0.1", () => {
  console.log(`Floscas music uploader: http://127.0.0.1:${port}/`);
});

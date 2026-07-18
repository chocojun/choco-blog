const JSON_HEADERS = {
  "content-type": "application/json; charset=utf-8",
  "cache-control": "no-store",
  "x-content-type-options": "nosniff",
  "referrer-policy": "no-referrer",
};

export async function onRequestGet({ env }) {
  return json({ ok: true, turnstileSiteKey: env.TURNSTILE_SITE_KEY || "" });
}

export async function onRequestOptions() {
  return new Response(null, { status: 204, headers: { ...JSON_HEADERS, allow: "GET, POST, OPTIONS" } });
}

export async function onRequestPost({ request, env }) {
  try {
    const length = Number(request.headers.get("content-length") || 0);
    if (length > 12_000) throw new MessageError(413, "Message is too large");
    const origin = request.headers.get("origin");
    if (origin && new URL(origin).hostname !== new URL(request.url).hostname) throw new MessageError(403, "Invalid origin");

    const body = await request.json().catch(() => { throw new MessageError(400, "Invalid message data"); });
    if (String(body.website || "").trim()) return json({ ok: true });
    const name = clean(body.name, 80);
    const email = clean(body.email, 160);
    const message = clean(body.message, 2000);
    const page = clean(body.page, 500);
    if (!name || !message) throw new MessageError(400, "Name and message are required");
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) throw new MessageError(400, "Email address is invalid");
    if (!env.RESEND_API_KEY) throw new MessageError(503, "留言邮件尚未完成配置，请稍后再试。");

    if (env.TURNSTILE_SECRET_KEY) {
      const token = clean(body.turnstileToken, 2048);
      if (!token) throw new MessageError(400, "Please complete the verification");
      const verification = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
        method: "POST",
        headers: { "content-type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({ secret: env.TURNSTILE_SECRET_KEY, response: token, remoteip: request.headers.get("CF-Connecting-IP") || "" }),
      });
      const result = await verification.json();
      if (!result.success) throw new MessageError(400, "Verification failed. Please try again.");
    }

    const recipient = env.MESSAGE_TO_EMAIL || "casparjang@outlook.com";
    const sender = env.MESSAGE_FROM_EMAIL || "Floscas <onboarding@resend.dev>";
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { authorization: `Bearer ${env.RESEND_API_KEY}`, "content-type": "application/json" },
      body: JSON.stringify({
        from: sender,
        to: [recipient],
        subject: `[Floscas 留言] ${name}`,
        ...(email ? { reply_to: email } : {}),
        text: `来自：${name}${email ? ` <${email}>` : ""}\n页面：${page || "未知"}\n\n${message}`,
        html: `<div style="font-family:Arial,sans-serif;line-height:1.7;color:#111"><p><strong>${escapeHtml(name)}</strong>${email ? ` &lt;${escapeHtml(email)}&gt;` : ""}</p><p style="color:#666;font-size:12px">${escapeHtml(page || "未知页面")}</p><div style="white-space:pre-wrap;border-top:1px solid #ddd;padding-top:16px">${escapeHtml(message)}</div></div>`,
      }),
    });
    const result = await response.json().catch(() => ({}));
    if (!response.ok) {
      console.error("Resend error", response.status, result);
      throw new MessageError(502, "邮件服务暂时不可用，请稍后再试。");
    }
    return json({ ok: true, id: result.id });
  } catch (error) {
    const status = error instanceof MessageError ? error.status : 500;
    if (status === 500) console.error(error);
    return json({ ok: false, error: status === 500 ? "Message could not be sent" : error.message }, status);
  }
}

function clean(value, limit) {
  return typeof value === "string" ? value.replace(/\0/g, "").trim().slice(0, limit) : "";
}

function escapeHtml(value) {
  return value.replace(/[&<>"']/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" })[character]);
}

function json(value, status = 200) {
  return new Response(JSON.stringify(value), { status, headers: JSON_HEADERS });
}

class MessageError extends Error {
  constructor(status, message) { super(message); this.status = status; }
}

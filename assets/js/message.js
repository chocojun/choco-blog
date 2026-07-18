(() => {
  const dialog = document.querySelector("[data-message-dialog]");
  const form = dialog?.querySelector("[data-message-form]");
  const status = dialog?.querySelector("[data-message-status]");
  const mount = dialog?.querySelector("[data-message-turnstile]");
  if (!dialog || !form) return;

  let turnstileId = null;
  let turnstileSiteKey = "";
  const language = () => document.documentElement.lang || "zh-CN";
  const text = (key) => {
    const zh = language().toLowerCase().startsWith("zh");
    const messages = {
      sending: zh ? "正在发送…" : "Sending…",
      sent: zh ? "留言已经寄出，谢谢你。" : "Your note has been sent. Thank you.",
      failed: zh ? "暂时没有寄出，请稍后再试。" : "The note could not be sent. Please try again.",
      verify: zh ? "请先完成人机验证。" : "Please complete the verification."
    };
    return messages[key];
  };

  async function loadTurnstile() {
    if (turnstileSiteKey || !mount) return;
    try {
      const response = await fetch("/api/message", { headers: { accept: "application/json" } });
      const config = await response.json();
      turnstileSiteKey = config.turnstileSiteKey || "";
      if (!turnstileSiteKey) return;
      if (!window.turnstile) {
        await new Promise((resolve, reject) => {
          const script = document.createElement("script");
          script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
          script.async = true;
          script.defer = true;
          script.onload = resolve;
          script.onerror = reject;
          document.head.append(script);
        });
      }
      turnstileId = window.turnstile.render(mount, { sitekey: turnstileSiteKey, theme: "light", size: "flexible" });
    } catch { /* The form remains usable when Turnstile is not configured. */ }
  }

  document.querySelectorAll("[data-message-open]").forEach((button) => button.addEventListener("click", () => {
    dialog.showModal();
    loadTurnstile();
  }));
  dialog.querySelector("[data-message-close]")?.addEventListener("click", () => dialog.close());
  dialog.addEventListener("click", (event) => { if (event.target === dialog) dialog.close(); });

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const submit = form.querySelector("button[type=submit]");
    const values = new FormData(form);
    const token = turnstileId !== null && window.turnstile ? window.turnstile.getResponse(turnstileId) : "";
    if (turnstileSiteKey && !token) { status.textContent = text("verify"); return; }
    submit.disabled = true;
    status.textContent = text("sending");
    try {
      const response = await fetch("/api/message", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          name: values.get("name"), email: values.get("email"), message: values.get("message"),
          website: values.get("website"), turnstileToken: token, page: location.href
        })
      });
      const payload = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(payload.error || "Request failed");
      status.textContent = text("sent");
      form.reset();
      if (turnstileId !== null && window.turnstile) window.turnstile.reset(turnstileId);
    } catch (error) {
      status.textContent = error.message || text("failed");
    } finally { submit.disabled = false; }
  });
})();

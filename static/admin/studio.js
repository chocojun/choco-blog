const state = {
  apiUrl: localStorage.getItem("floscas-admin-api") || "https://choco-blog-20l.pages.dev/api/admin",
  adminKey: sessionStorage.getItem("floscas-admin-key") || "",
  articles: [],
  films: [],
  filmsDirty: 0,
  imageFile: null,
};

const elements = Object.fromEntries(
  [
    "settings-button", "connect-button", "settings-dialog", "settings-form", "api-url", "admin-key",
    "status-dot", "status-title", "status-detail", "article-list", "article-search", "new-article-button",
    "article-dialog", "article-form", "article-dialog-title", "article-path", "article-content", "save-article-button",
    "film-list", "film-search", "new-film-button", "film-dialog", "film-form", "film-dialog-title", "film-index",
    "film-slug", "film-year", "film-zh", "film-en", "film-fr", "film-ja", "film-meta", "film-douban",
    "film-poster", "delete-film-button", "film-save-bar", "film-change-count", "save-films-button",
    "image-form", "image-file", "image-folder", "image-name", "image-preview", "upload-placeholder", "toast",
  ].map((id) => [id.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase()), document.getElementById(id)])
);

let toastTimer;

document.addEventListener("DOMContentLoaded", () => {
  bindNavigation();
  bindDialogs();
  bindArticles();
  bindFilms();
  bindImages();
  elements.apiUrl.value = state.apiUrl;
  elements.adminKey.value = state.adminKey;
  if (state.adminKey) connect();
});

function bindNavigation() {
  document.querySelectorAll("[data-tab]").forEach((button) => {
    button.addEventListener("click", () => {
      document.querySelectorAll("[data-tab]").forEach((tab) => tab.classList.toggle("is-active", tab === button));
      document.querySelectorAll("[data-workspace]").forEach((workspace) => {
        workspace.classList.toggle("is-active", workspace.dataset.workspace === button.dataset.tab);
      });
    });
  });
}

function bindDialogs() {
  elements.settingsButton.addEventListener("click", openSettings);
  elements.connectButton.addEventListener("click", openSettings);
  document.querySelectorAll(".close-dialog").forEach((button) => {
    button.addEventListener("click", (event) => {
      event.preventDefault();
      button.closest("dialog").close();
    });
  });
  elements.settingsForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    state.apiUrl = elements.apiUrl.value.trim().replace(/\/$/, "");
    state.adminKey = elements.adminKey.value.trim();
    localStorage.setItem("floscas-admin-api", state.apiUrl);
    sessionStorage.setItem("floscas-admin-key", state.adminKey);
    if (await connect()) elements.settingsDialog.close();
  });
}

function bindArticles() {
  elements.newArticleButton.addEventListener("click", () => openArticle());
  elements.articleSearch.addEventListener("input", renderArticles);
  elements.articleForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    setBusy(elements.saveArticleButton, true, "发布中");
    try {
      const path = elements.articlePath.value.trim();
      await api("/article", {
        method: "PUT",
        body: { path, content: elements.articleContent.value, message: `Publish ${path}` },
      });
      showToast("文章已经提交，Cloudflare 正在更新网站");
      elements.articleDialog.close();
      await loadArticles();
    } catch (error) {
      showToast(error.message, true);
    } finally {
      setBusy(elements.saveArticleButton, false, "发布文章");
    }
  });
}

function bindFilms() {
  elements.newFilmButton.addEventListener("click", () => openFilm());
  elements.filmSearch.addEventListener("input", renderFilms);
  elements.filmForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const index = Number(elements.filmIndex.value);
    const previous = Number.isInteger(index) && index >= 0 ? state.films[index] : {};
    const film = {
      ...previous,
      slug: elements.filmSlug.value.trim(),
      year: Number(elements.filmYear.value) || undefined,
      query: previous.query || elements.filmEn.value.trim(),
      zh: elements.filmZh.value.trim(),
      en: elements.filmEn.value.trim(),
      fr: elements.filmFr.value.trim(),
      ja: elements.filmJa.value.trim(),
      meta: elements.filmMeta.value.trim(),
      douban: elements.filmDouban.value.trim() || undefined,
      poster: elements.filmPoster.value.trim() || undefined,
    };
    Object.keys(film).forEach((key) => film[key] === undefined && delete film[key]);
    if (Number.isInteger(index) && index >= 0) state.films[index] = film;
    else state.films.unshift(film);
    markFilmsDirty();
    renderFilms();
    elements.filmDialog.close();
  });
  elements.deleteFilmButton.addEventListener("click", () => {
    const index = Number(elements.filmIndex.value);
    if (!Number.isInteger(index) || index < 0) return;
    if (!window.confirm("从推荐列表中删除这部电影？发布前仍可刷新页面撤销。")) return;
    state.films.splice(index, 1);
    markFilmsDirty();
    renderFilms();
    elements.filmDialog.close();
  });
  elements.saveFilmsButton.addEventListener("click", saveFilms);
}

function bindImages() {
  elements.imageFile.addEventListener("change", () => selectImage(elements.imageFile.files?.[0]));
  elements.imageForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (!state.imageFile) return showToast("请先选择图片", true);
    const submit = elements.imageForm.querySelector("button[type=submit]");
    setBusy(submit, true, "上传中");
    try {
      const base64 = await fileToDataUrl(state.imageFile);
      const folder = elements.imageFolder.value.replace(/^\/+|\/+$/g, "");
      const name = elements.imageName.value.trim();
      const result = await api("/image", {
        method: "POST",
        body: { path: `${folder}/${name}`, base64, message: `Upload image ${name}` },
      });
      showToast(`图片已发布：${result.publicUrl}`);
      resetImageForm();
    } catch (error) {
      showToast(error.message, true);
    } finally {
      setBusy(submit, false, "上传并发布");
    }
  });
}

function openSettings() {
  elements.apiUrl.value = state.apiUrl;
  elements.adminKey.value = state.adminKey;
  elements.settingsDialog.showModal();
}

async function connect() {
  setConnection("loading", "正在验证", "连接 Cloudflare 管理接口");
  try {
    const health = await api("/health");
    setConnection("online", "已安全连接", `${health.repository} · ${health.branch}`);
    await Promise.all([loadArticles(), loadFilms()]);
    return true;
  } catch (error) {
    setConnection("offline", "连接失败", error.message);
    showToast(error.message, true);
    return false;
  }
}

function setConnection(status, title, detail) {
  elements.statusDot.classList.toggle("is-online", status === "online");
  elements.statusTitle.textContent = title;
  elements.statusDetail.textContent = detail;
}

async function loadArticles() {
  elements.articleList.innerHTML = '<p class="empty-state">正在读取文章…</p>';
  try {
    const result = await api("/articles");
    state.articles = result.articles || [];
    renderArticles();
  } catch (error) {
    elements.articleList.innerHTML = `<p class="empty-state">${escapeHtml(error.message)}</p>`;
  }
}

function renderArticles() {
  const query = elements.articleSearch.value.trim().toLowerCase();
  const articles = state.articles.filter((article) => article.name.toLowerCase().includes(query));
  if (!articles.length) {
    elements.articleList.innerHTML = '<p class="empty-state">没有匹配的文章</p>';
    return;
  }
  elements.articleList.innerHTML = articles.map((article) => `
    <button class="list-item" type="button" data-article-path="${escapeHtml(article.path)}">
      <span><strong>${escapeHtml(article.name.replace(/\.md$/i, ""))}</strong><small>${escapeHtml(article.path)}</small></span>
      <span class="chevron">›</span>
    </button>`).join("");
  elements.articleList.querySelectorAll("[data-article-path]").forEach((button) => {
    button.addEventListener("click", () => openArticle(button.dataset.articlePath));
  });
}

async function openArticle(path) {
  elements.articleDialogTitle.textContent = path ? "编辑文章" : "新建文章";
  elements.articlePath.disabled = Boolean(path);
  elements.articlePath.value = path ? path.replace(/^content\/posts\//, "") : "";
  elements.articleContent.value = path ? "正在读取…" : articleTemplate();
  elements.articleDialog.showModal();
  if (!path) return;
  try {
    const result = await api(`/article?path=${encodeURIComponent(path)}`);
    elements.articleContent.value = result.content;
  } catch (error) {
    elements.articleDialog.close();
    showToast(error.message, true);
  }
}

function articleTemplate() {
  const date = new Date().toISOString().slice(0, 10);
  return `---\ntitle: "新文章"\ndate: ${date}T12:00:00+08:00\ndraft: false\ntags: ["札记"]\ncategories: ["札记"]\n---\n\n从这里开始写作。\n`;
}

async function loadFilms() {
  elements.filmList.innerHTML = '<p class="empty-state">正在读取电影…</p>';
  try {
    const result = await api("/films");
    state.films = result.films || [];
    state.filmsDirty = 0;
    updateFilmSaveBar();
    renderFilms();
  } catch (error) {
    elements.filmList.innerHTML = `<p class="empty-state">${escapeHtml(error.message)}</p>`;
  }
}

function renderFilms() {
  const query = elements.filmSearch.value.trim().toLowerCase();
  const films = state.films
    .map((film, index) => ({ film, index }))
    .filter(({ film }) => [film.zh, film.en, film.fr, film.ja, film.meta].some((value) => String(value || "").toLowerCase().includes(query)));
  if (!films.length) {
    elements.filmList.innerHTML = '<p class="empty-state">没有匹配的电影</p>';
    return;
  }
  elements.filmList.innerHTML = films.map(({ film, index }) => `
    <button class="list-item" type="button" data-film-index="${index}">
      <span><strong>${escapeHtml(film.zh || film.en || film.slug)}</strong><small>${escapeHtml(film.en || "")} · ${escapeHtml(film.meta || film.year || "")}</small></span>
      <span class="chevron">›</span>
    </button>`).join("");
  elements.filmList.querySelectorAll("[data-film-index]").forEach((button) => {
    button.addEventListener("click", () => openFilm(Number(button.dataset.filmIndex)));
  });
}

function openFilm(index) {
  const film = Number.isInteger(index) ? state.films[index] : {};
  elements.filmDialogTitle.textContent = Number.isInteger(index) ? "编辑电影" : "添加电影";
  elements.filmIndex.value = Number.isInteger(index) ? String(index) : "";
  elements.filmSlug.value = film.slug || "";
  elements.filmYear.value = film.year || "";
  elements.filmZh.value = film.zh || "";
  elements.filmEn.value = film.en || "";
  elements.filmFr.value = film.fr || "";
  elements.filmJa.value = film.ja || "";
  elements.filmMeta.value = film.meta || "";
  elements.filmDouban.value = film.douban || "";
  elements.filmPoster.value = film.poster || "";
  elements.deleteFilmButton.classList.toggle("is-hidden", !Number.isInteger(index));
  elements.filmDialog.showModal();
}

function markFilmsDirty() {
  state.filmsDirty += 1;
  updateFilmSaveBar();
}

function updateFilmSaveBar() {
  elements.filmSaveBar.classList.toggle("is-hidden", state.filmsDirty === 0);
  elements.filmChangeCount.textContent = state.filmsDirty ? `${state.filmsDirty} 项未发布` : "尚未修改";
}

async function saveFilms() {
  setBusy(elements.saveFilmsButton, true, "发布中");
  try {
    await api("/films", { method: "PUT", body: { films: state.films, message: "Update film recommendations from mobile studio" } });
    state.filmsDirty = 0;
    updateFilmSaveBar();
    showToast("电影列表已经发布");
  } catch (error) {
    showToast(error.message, true);
  } finally {
    setBusy(elements.saveFilmsButton, false, "发布电影列表");
  }
}

function selectImage(file) {
  if (!file) return resetImageForm();
  if (file.size > 8 * 1024 * 1024) {
    elements.imageFile.value = "";
    return showToast("图片不能超过 8 MB", true);
  }
  state.imageFile = file;
  elements.imageName.value = normalizeFilename(file.name);
  elements.imagePreview.src = URL.createObjectURL(file);
  elements.imagePreview.hidden = false;
  elements.uploadPlaceholder.hidden = true;
}

function resetImageForm() {
  state.imageFile = null;
  elements.imageFile.value = "";
  elements.imageName.value = "";
  if (elements.imagePreview.src) URL.revokeObjectURL(elements.imagePreview.src);
  elements.imagePreview.removeAttribute("src");
  elements.imagePreview.hidden = true;
  elements.uploadPlaceholder.hidden = false;
}

function normalizeFilename(name) {
  return name.trim().replace(/\s+/g, "-").replace(/[^\p{L}\p{N}._-]/gu, "").toLowerCase();
}

async function api(path, options = {}) {
  if (!state.apiUrl || !state.adminKey) throw new Error("请先配置管理接口与密钥");
  const response = await fetch(`${state.apiUrl}${path}`, {
    method: options.method || "GET",
    headers: {
      authorization: `Bearer ${state.adminKey}`,
      ...(options.body ? { "content-type": "application/json" } : {}),
    },
    ...(options.body ? { body: JSON.stringify(options.body) } : {}),
  });
  const payload = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(payload.error || `请求失败 (${response.status})`);
  return payload;
}

function fileToDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(new Error("无法读取图片"));
    reader.readAsDataURL(file);
  });
}

function setBusy(button, busy, label) {
  button.disabled = busy;
  button.textContent = label;
}

function showToast(message, isError = false) {
  clearTimeout(toastTimer);
  elements.toast.textContent = message;
  elements.toast.classList.toggle("is-error", isError);
  elements.toast.classList.add("is-visible");
  toastTimer = setTimeout(() => elements.toast.classList.remove("is-visible"), 3800);
}

function escapeHtml(value) {
  return String(value ?? "").replace(/[&<>'"]/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" })[character]);
}

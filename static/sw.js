const CACHE_NAME = "choco-games-v4";
const CORE_ASSETS = [
  "/games/floscas-games.css",
  "/games/2048/",
  "/games/2048/index.html",
  "/games/snake/",
  "/games/snake/index.html",
  "/games/tetris/",
  "/games/tetris/index.html",
  "/games/sudoku/",
  "/games/sudoku/index.html",
  "/games/sudoku/sudoku.js"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      // addAll fails the whole install if any request rejects, so keep this list local and deterministic.
      return cache.addAll(CORE_ASSETS);
    })
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      // Remove stale game/runtime caches while preserving unrelated browser-managed storage.
      return Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key)));
    })
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;
  const url = new URL(event.request.url);
  if (url.origin !== self.location.origin || !url.pathname.startsWith("/games/")) return;

  // Navigations are network-first so an old game shell never masks a new deployment.
  if (event.request.mode === "navigate") {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          const copy = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
          return response;
        })
        .catch(() => caches.match(event.request).then((cached) => cached || caches.match("/games/sudoku/")))
    );
    return;
  }

  event.respondWith(
    caches.match(event.request).then((cached) => cached || fetch(event.request).then((response) => {
      const copy = response.clone();
      caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
      return response;
    }))
  );
});

(() => {
  document.documentElement.classList.add("cinema-js");
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const header = document.querySelector("[data-cinema-header]");

  const updateHeader = () => {
    header?.classList.toggle("is-scrolled", window.scrollY > 16);
  };

  updateHeader();
  window.addEventListener("scroll", updateHeader, { passive: true });

  const images = [...document.querySelectorAll(".cinema-image")];
  images.forEach((image) => {
    if (reducedMotion.matches || image.complete) {
      image.classList.add("is-visible");
      return;
    }
    image.addEventListener("load", () => image.classList.add("is-visible"), { once: true });
  });

  const lightbox = document.querySelector("[data-cinema-lightbox]");
  const lightboxImage = lightbox?.querySelector("img");
  const closeButton = lightbox?.querySelector("[data-lightbox-close]");

  const closeLightbox = () => {
    if (lightbox?.open) lightbox.close();
  };

  document.querySelectorAll("[data-lightbox-src]").forEach((button) => {
    button.addEventListener("click", () => {
      if (!lightbox || !lightboxImage) return;
      lightboxImage.src = button.dataset.lightboxSrc;
      lightboxImage.alt = button.dataset.lightboxAlt || "";
      lightbox.showModal();
      closeButton?.focus();
    });
  });

  closeButton?.addEventListener("click", closeLightbox);
  lightbox?.addEventListener("click", (event) => {
    if (event.target === lightbox) closeLightbox();
  });
})();

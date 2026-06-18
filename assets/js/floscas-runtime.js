(() => {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const assets = window.FLOSCAS_ASSETS || {};
  const scriptCache = new Map();

  const idle = (fn, delay = 0) => {
    const run = () => {
      if ("requestIdleCallback" in window) {
        window.requestIdleCallback(fn, { timeout: 1800 });
      } else {
        window.setTimeout(fn, 1);
      }
    };
    window.setTimeout(run, delay);
  };

  const loadScript = (src) => {
    if (!src) return Promise.resolve();
    if (scriptCache.has(src)) return scriptCache.get(src);

    const promise = new Promise((resolve, reject) => {
      const existing = document.querySelector(`script[src="${src}"]`);
      if (existing) {
        existing.addEventListener("load", resolve, { once: true });
        existing.addEventListener("error", reject, { once: true });
        if (existing.dataset.loaded === "true") resolve();
        return;
      }

      const script = document.createElement("script");
      script.src = src;
      script.async = true;
      script.onload = () => {
        script.dataset.loaded = "true";
        resolve();
      };
      script.onerror = reject;
      document.head.append(script);
    });

    scriptCache.set(src, promise);
    return promise;
  };

  const loadInOrder = (sources) => sources.reduce((chain, src) => (
    chain.then(() => loadScript(src))
  ), Promise.resolve());

  const refresh = () => {
    window.Floscas?.refresh?.();
    setupFilters(document);
    setupScrollMotion(document);
  };

  const setupScrollMotion = (root) => {
    if (reduceMotion || !window.gsap || !window.ScrollTrigger) return;
    gsap.registerPlugin(ScrollTrigger);
    root.querySelectorAll(".floscas-card, .floscas-photo-card, .floscas-writing-item").forEach((item) => {
      if (item.dataset.gsapReady === "true") return;
      item.dataset.gsapReady = "true";
      gsap.fromTo(item, { y: 14, opacity: 0.001 }, {
        y: 0,
        opacity: 1,
        duration: 0.65,
        ease: "power3.out",
        scrollTrigger: {
          trigger: item,
          start: "top 88%",
          once: true
        }
      });
    });
  };

  const setupFilters = (root) => {
    const filterRoot = root.querySelector("[data-floscas-filters]");
    const cards = [...root.querySelectorAll("[data-floscas-card-category]")];
    if (!filterRoot || !cards.length || filterRoot.dataset.filterReady === "true") return;
    filterRoot.dataset.filterReady = "true";

    filterRoot.addEventListener("click", (event) => {
      const button = event.target.closest("[data-filter]");
      if (!button) return;

      const next = button.dataset.filter;
      const state = window.Flip ? Flip.getState(cards) : null;

      filterRoot.querySelectorAll("[data-filter]").forEach((item) => {
        item.classList.toggle("is-active", item === button);
      });

      cards.forEach((card) => {
        const match = next === "all" || card.dataset.floscasCardCategory === next;
        card.hidden = !match;
      });

      if (state && window.gsap) {
        Flip.from(state, {
          duration: 0.45,
          ease: "power3.out",
          absolute: false,
          scale: true,
          onEnter: (elements) => gsap.fromTo(elements, { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.32 }),
          onLeave: (elements) => gsap.to(elements, { opacity: 0, y: -8, duration: 0.22 })
        });
      }
    });
  };

  const setupBarba = () => {
    if (!window.barba || reduceMotion || !document.querySelector("[data-barba='wrapper']")) return;
    if (document.documentElement.dataset.barbaReady === "true") return;
    document.documentElement.dataset.barbaReady = "true";

    barba.init({
      preventRunning: true,
      transitions: [{
        name: "floscas-glass-fade",
        leave(data) {
          return window.gsap
            ? gsap.to(data.current.container, { opacity: 0, y: -6, duration: 0.28, ease: "power2.out" })
            : Promise.resolve();
        },
        enter(data) {
          window.scrollTo(0, 0);
          refresh();
          return window.gsap
            ? gsap.fromTo(data.next.container, { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.42, ease: "power3.out" })
            : Promise.resolve();
        },
        after() {
          refresh();
        }
      }]
    });
  };

  const toggleTranslationState = () => {
    const showOriginal = localStorage.getItem("floscas-show-original") !== "false";
    const nextShowOriginal = !showOriginal;
    localStorage.setItem("floscas-show-original", String(nextShowOriginal));
    document.documentElement.classList.toggle("show-translation", !nextShowOriginal);

    const activeLang = window.Floscas?.getLanguage?.() || "en";
    if (!nextShowOriginal) {
      localStorage.setItem("floscas-original-lang", activeLang);
      window.Floscas?.setLanguage?.("en");
    } else {
      window.Floscas?.setLanguage?.(localStorage.getItem("floscas-original-lang") || activeLang || "zh-Hans");
    }

    return nextShowOriginal;
  };

  const setupTranslateFallback = () => {
    const root = document.getElementById("floscas-translate-root");
    if (!root || root.dataset.fallbackReady === "true") return;
    root.dataset.fallbackReady = "true";
    const showOriginal = localStorage.getItem("floscas-show-original") !== "false";
    document.documentElement.classList.toggle("show-translation", !showOriginal);

    const button = document.createElement("button");
    button.className = "floscas-translate-toggle floscas-glass";
    button.type = "button";
    button.title = "Toggle original / translation";
    button.textContent = showOriginal ? "Original" : "Translation";
    button.addEventListener("click", () => {
      button.textContent = toggleTranslationState() ? "Original" : "Translation";
    });
    root.replaceChildren(button);
  };

  const hydrateTranslateIsland = () => {
    if (!window.React || !window.ReactDOM) return;
    const root = document.getElementById("floscas-translate-root");
    if (!root || root.dataset.reactReady === "true") return;
    root.dataset.reactReady = "true";

    const { createElement: h, useState, createContext, useContext } = React;
    const TranslationContext = createContext({ showOriginal: true });

    const TranslateButton = () => {
      const state = useContext(TranslationContext);
      return h("button", {
        className: "floscas-translate-toggle floscas-glass",
        type: "button",
        onClick: state.toggle,
        title: "Toggle original / translation"
      }, state.showOriginal ? "Original" : "Translation");
    };

    const App = () => {
      const [showOriginal, setShowOriginal] = useState(localStorage.getItem("floscas-show-original") !== "false");
      const toggle = () => setShowOriginal(toggleTranslationState());
      document.documentElement.classList.toggle("show-translation", !showOriginal);
      return h(TranslationContext.Provider, { value: { showOriginal, toggle } }, h(TranslateButton));
    };

    ReactDOM.createRoot(root).render(h(App));
  };

  const setupCatLazyLoad = () => {
    if (reduceMotion || !assets.catModule) return;
    let started = false;
    const start = () => {
      if (started) return;
      started = true;
      import(assets.catModule).catch(() => {});
    };

    const stage = document.getElementById("floscas-persistent-stage");
    stage?.addEventListener("pointerenter", start, { once: true, passive: true });
    stage?.addEventListener("click", start, { once: true });
  };

  window.addEventListener("load", () => {
    refresh();
    setupTranslateFallback();
    setupCatLazyLoad();

    idle(() => {
      loadInOrder([assets.gsap, assets.scrollTrigger, assets.flip])
        .then(() => {
          setupScrollMotion(document);
        })
        .catch(() => {});
    }, 650);

    idle(() => {
      loadInOrder([assets.gsap, assets.barba])
        .then(setupBarba)
        .catch(() => {});
    }, 1400);

    idle(() => {
      loadInOrder([assets.react, assets.reactDom])
        .then(hydrateTranslateIsland)
        .catch(() => {});
    }, 1100);
  });
})();

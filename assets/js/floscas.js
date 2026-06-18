(() => {
  document.documentElement.classList.add("floscas-js");

  const I18N = {
    en: {
      label: "EN",
      htmlLang: "en",
      "theme.toggle": "Toggle color theme",
      "language.toggle": "Switch language",
      "nav.home": "Home",
      "nav.posts": "Posts",
      "nav.essays": "Essays",
      "nav.about": "About",
      "nav.gallery": "Gallery",
      "hero.kicker": "Writerly portfolio",
      "hero.subtitle": "Writing my thoughts, recording my loves.",
      "hero.index": "Writing, photographs, fragments, and private weather.",
      "side.contact": "Contact",
      "quote.line": "A quiet shelf for notes, fragments, and becoming.",
      "quote.caption": "Writing my thoughts, recording my loves.",
      "section.journal": "Journal",
      "section.gallery": "Gallery",
      "latest.title": "Latest Thoughts",
      "latest.all": "View all posts",
      "gallery.selected": "Selected Light",
      "gallery.open": "Open gallery",
      "archive.subtitle": "A quiet shelf for notes, fragments, and becoming.",
      "archive.empty": "This room is still being arranged.",
      "article.back": "Back",
      "article.footer": "Follow the visual diary on Instagram.",
      "translation.source": "Translation provided by ChatGPT for reference.",
      "music.kicker": "Listening room",
      "music.title": "A little weather for reading.",
      "music.copy": "A local glass player for songs placed inside the music folder.",
      "music.source": "Spotify reference",
      "music.window": "Local playlist",
      "music.empty": "Add audio files to /static/music and update playlist.json.",
      "music.progress": "Playback progress",
      "music.prev": "Previous track",
      "music.next": "Next track",
      "music.play": "Play",
      "music.pause": "Pause",
      "cat.hint": "Left click to pet. Right click to change coat.",
      "games.playOffline": "Play offline",
      "filter.all": "All",
      "filter.notes": "Notes"
    },
    "zh-Hans": {
      label: "中",
      htmlLang: "zh-CN",
      "theme.toggle": "切换明暗主题",
      "language.toggle": "切换语言",
      "nav.home": "首页",
      "nav.posts": "文章",
      "nav.essays": "随笔",
      "nav.about": "关于",
      "nav.gallery": "图集",
      "hero.kicker": "写作者作品集",
      "hero.subtitle": "写我所想，记我所爱",
      "hero.index": "文字、摄影、碎片和私人的天气。",
      "side.contact": "联系",
      "quote.line": "安放札记、碎片和正在成为的自己。",
      "quote.caption": "写我所想，记我所爱",
      "section.journal": "札记",
      "section.gallery": "图集",
      "latest.title": "最近的想法",
      "latest.all": "查看全部文章",
      "gallery.selected": "被选中的光",
      "gallery.open": "打开图集",
      "archive.subtitle": "安放札记、碎片和正在成为的自己。",
      "archive.empty": "这个房间还在慢慢布置。",
      "article.back": "返回",
      "article.footer": "在 Instagram 继续看这本视觉日记。",
      "translation.source": "译文由 ChatGPT 提供，仅供参考。",
      "music.kicker": "听觉房间",
      "music.title": "给阅读一点柔软的天气。",
      "music.copy": "一个本地毛玻璃播放器，用来播放你放进音乐文件夹里的歌。",
      "music.source": "Spotify 参考歌单",
      "music.window": "本地歌单",
      "music.empty": "把音频放进 /static/music，并在 playlist.json 里登记。",
      "music.progress": "播放进度",
      "music.prev": "上一首",
      "music.next": "下一首",
      "music.play": "播放",
      "music.pause": "暂停",
      "cat.hint": "左键摸摸，右键换毛色。",
      "games.playOffline": "离线游戏",
      "filter.all": "全部",
      "filter.notes": "札记"
    }
  };

  const GALLERY = {
    rootAperture: { en: ["Botanical", "Root aperture"], "zh-Hans": ["植物", "根系天窗"] },
    forestLight: { en: ["Botanical", "Forest light"], "zh-Hans": ["植物", "林间光"] },
    concreteQuiet: { en: ["Monochrome", "Concrete quiet"], "zh-Hans": ["黑白", "混凝土静默"] },
    waterGrapes: { en: ["Still life", "Water grapes"], "zh-Hans": ["静物", "水中葡萄"] },
    smallLight: { en: ["Nocturne", "Small light"], "zh-Hans": ["夜曲", "小小的光"] },
    greenInterior: { en: ["Shadow", "Green interior"], "zh-Hans": ["阴影", "绿色内部"] },
    pinkHour: { en: ["City", "Pink hour"], "zh-Hans": ["城市", "粉色时刻"] },
    stationGhost: { en: ["Monochrome", "Station ghost"], "zh-Hans": ["黑白", "车站幽影"] },
    urbanCorridor: { en: ["Monochrome", "Urban corridor"], "zh-Hans": ["黑白", "城市走廊"] },
    ideaBox: { en: ["City", "Idea box"], "zh-Hans": ["城市", "想法盒子"] },
    turquoiseTree: { en: ["Sun", "Turquoise tree"], "zh-Hans": ["日光", "青绿色树"] },
    stickerWall: { en: ["Archive", "Sticker wall"], "zh-Hans": ["档案", "贴纸墙"] },
    buildingGrid: { en: ["Monochrome", "Building grid"], "zh-Hans": ["黑白", "建筑网格"] },
    leafMap: { en: ["Botanical", "Leaf map"], "zh-Hans": ["植物", "叶脉地图"] },
    butterflies: { en: ["Garden", "Butterflies"], "zh-Hans": ["花园", "蝴蝶"] },
    blueNight: { en: ["Nocturne", "Blue night"], "zh-Hans": ["夜曲", "蓝色夜晚"] },
    lateFlowers: { en: ["Garden", "Late flowers"], "zh-Hans": ["花园", "迟开的花"] },
    shadowFloor: { en: ["Monochrome", "Shadow floor"], "zh-Hans": ["黑白", "阴影地面"] },
    mistSkyline: { en: ["City", "Mist skyline"], "zh-Hans": ["城市", "雾中天际线"] },
    cloudMobile: { en: ["Interior", "Cloud mobile"], "zh-Hans": ["室内", "云朵吊饰"] },
    muralBuilding: { en: ["Street", "Mural building"], "zh-Hans": ["街道", "壁画建筑"] },
    rainCity: { en: ["City", "Rain city"], "zh-Hans": ["城市", "雨城"] },
    paintedFacade: { en: ["Street", "Painted facade"], "zh-Hans": ["街道", "被画过的立面"] },
    blueWeather: { en: ["Sky", "Blue weather"], "zh-Hans": ["天空", "蓝色天气"] },
    blueCloud: { en: ["Sky", "Blue cloud"], "zh-Hans": ["天空", "蓝云"] },
    greenCity: { en: ["City", "Green city"], "zh-Hans": ["城市", "绿色城市"] },
    greenValley: { en: ["Landscape", "Green valley"], "zh-Hans": ["风景", "绿色山谷"] },
    orangeRoom: { en: ["Warmth", "Orange room"], "zh-Hans": ["暖意", "橙色房间"] },
    orangeLight: { en: ["Warmth", "Orange light"], "zh-Hans": ["暖意", "橙色光"] },
    workingLight: { en: ["Interior", "Working light"], "zh-Hans": ["室内", "工作的光"] },
    deskLamp: { en: ["Interior", "Desk lamp"], "zh-Hans": ["室内", "书桌灯"] },
    deepForest: { en: ["Botanical", "Deep forest"], "zh-Hans": ["植物", "深林"] },
    whiteBloom: { en: ["Garden", "White bloom"], "zh-Hans": ["花园", "白色盛开"] },
    whiteFlowers: { en: ["Garden", "White flowers"], "zh-Hans": ["花园", "白色花丛"] },
    forestBloom: { en: ["Garden", "Forest bloom"], "zh-Hans": ["花园", "森林花事"] }
  };

  const getLanguage = () => {
    const stored = localStorage.getItem("floscas-lang");
    return stored && I18N[stored] ? stored : "en";
  };

  const t = (key, lang = getLanguage()) => I18N[lang]?.[key] || I18N.en[key] || key;

  const applyCopy = (lang = getLanguage()) => {
    const messages = I18N[lang] || I18N.en;
    document.documentElement.lang = messages.htmlLang;

    document.querySelectorAll("[data-i18n]").forEach((node) => {
      const key = node.dataset.i18n;
      node.textContent = t(key, lang);
    });

    document.querySelectorAll("[data-i18n-aria-label]").forEach((node) => {
      node.setAttribute("aria-label", t(node.dataset.i18nAriaLabel, lang));
    });

    document.querySelectorAll("[data-lang-current]").forEach((node) => {
      node.textContent = messages.label;
    });

    document.querySelectorAll("[data-lang-option]").forEach((option) => {
      option.classList.toggle("is-active", option.dataset.langOption === lang);
    });

    document.querySelectorAll("[data-gallery-title]").forEach((node) => {
      const item = GALLERY[node.dataset.galleryTitle]?.[lang] || GALLERY[node.dataset.galleryTitle]?.en;
      if (item) node.textContent = item[1];
    });

    document.querySelectorAll("[data-gallery-tone]").forEach((node) => {
      const item = GALLERY[node.dataset.galleryTone]?.[lang] || GALLERY[node.dataset.galleryTone]?.en;
      if (item) node.textContent = item[0];
    });

    document.querySelectorAll("[data-gallery-image]").forEach((image) => {
      const item = GALLERY[image.dataset.galleryImage]?.[lang] || GALLERY[image.dataset.galleryImage]?.en;
      if (!item) return;
      image.alt = item[1];
      image.title = item[1];
    });

    document.querySelectorAll("[data-filter]").forEach((button) => {
      if (button.dataset.filter === "all") button.textContent = t("filter.all", lang);
      if (button.dataset.filter === "notes") button.textContent = t("filter.notes", lang);
    });

    document.querySelectorAll("[data-local-player]").forEach((player) => {
      player.dispatchEvent(new CustomEvent("floscas:language", { detail: { lang } }));
    });
  };

  const setupLanguageMenu = (langMenu) => {
    if (!langMenu || langMenu.dataset.langReady === "true") return;
    langMenu.dataset.langReady = "true";
    const langButton = langMenu.querySelector(".floscas-lang-button");
    const options = [...langMenu.querySelectorAll("[data-lang-option]")];

    langButton?.addEventListener("click", (event) => {
      event.stopPropagation();
      const isOpen = langMenu.classList.toggle("is-open");
      langButton.setAttribute("aria-expanded", String(isOpen));
    });

    options.forEach((option) => {
      option.addEventListener("click", (event) => {
        event.stopPropagation();
        const lang = option.dataset.langOption;
        localStorage.setItem("floscas-lang", lang);
        applyCopy(lang);
        langMenu.classList.remove("is-open");
        langButton?.setAttribute("aria-expanded", "false");
      });
    });

    document.addEventListener("click", (event) => {
      if (!langMenu.contains(event.target)) {
        langMenu.classList.remove("is-open");
        langButton?.setAttribute("aria-expanded", "false");
      }
    });
  };

  const setupTheme = () => {
    document.querySelectorAll("#floscas-theme-toggle").forEach((button) => {
      if (button.dataset.themeReady === "true") return;
      button.dataset.themeReady = "true";
      button.addEventListener("click", () => {
        const html = document.documentElement;
        const nextTheme = html.dataset.theme === "dark" ? "light" : "dark";
        html.dataset.theme = nextTheme;
        localStorage.setItem("pref-theme", nextTheme);
      });
    });
  };

  const setupHomeMotion = () => {
    const home = document.querySelector("[data-floscas-home]");
    if (!home || home.dataset.motionReady === "true") return;
    home.dataset.motionReady = "true";
    document.body.classList.add("floscas-home-page");
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    home.addEventListener("pointermove", (event) => {
      const rect = home.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width - 0.5) * 18;
      const y = ((event.clientY - rect.top) / rect.height - 0.5) * 12;
      home.style.setProperty("--floscas-mx", `${x}px`);
      home.style.setProperty("--floscas-my", `${y}px`);
    });
  };

  const createMobiusProgress = async (canvas) => {
    if (!canvas || canvas.dataset.mobiusReady === "true") return null;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return null;
    canvas.dataset.mobiusReady = "true";

    const THREE = await import("https://cdn.jsdelivr.net/npm/three@0.165.0/build/three.module.js");
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.6));
    renderer.outputColorSpace = THREE.SRGBColorSpace;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100);
    camera.position.set(0, 0.1, 5.2);
    scene.add(new THREE.AmbientLight(0xffffff, 2.1));
    const key = new THREE.DirectionalLight(0xffffff, 2.6);
    key.position.set(2, 3, 4);
    scene.add(key);

    const mobiusPoint = (u, v) => {
      const radius = 1.38;
      const half = (v - 0.5) * 0.66;
      const twist = u / 2;
      const x = (radius + half * Math.cos(twist)) * Math.cos(u);
      const y = (radius + half * Math.cos(twist)) * Math.sin(u);
      const z = half * Math.sin(twist);
      return new THREE.Vector3(x, y, z);
    };

    const rows = 26;
    const cols = 160;
    const positions = [];
    const indices = [];
    for (let i = 0; i <= cols; i += 1) {
      const u = (i / cols) * Math.PI * 2;
      for (let j = 0; j <= rows; j += 1) {
        const p = mobiusPoint(u, j / rows);
        positions.push(p.x, p.y, p.z);
      }
    }
    for (let i = 0; i < cols; i += 1) {
      for (let j = 0; j < rows; j += 1) {
        const a = i * (rows + 1) + j;
        const b = (i + 1) * (rows + 1) + j;
        indices.push(a, b, a + 1, b, b + 1, a + 1);
      }
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
    geometry.setIndex(indices);
    geometry.computeVertexNormals();

    const material = new THREE.MeshPhysicalMaterial({
      color: 0xf7f7f2,
      roughness: 0.72,
      metalness: 0,
      transmission: 0.08,
      thickness: 0.15,
      transparent: true,
      opacity: 0.96,
      side: THREE.DoubleSide
    });

    const group = new THREE.Group();
    group.rotation.set(-0.93, 0.12, -0.13);
    group.scale.set(1.03, 0.92, 1);
    scene.add(group);

    const strip = new THREE.Mesh(geometry, material);
    group.add(strip);

    const makeLoop = (v, dashed = false) => {
      const points = [];
      for (let i = 0; i < cols; i += 1) {
        points.push(mobiusPoint((i / cols) * Math.PI * 2, v));
      }
      const lineGeometry = new THREE.BufferGeometry().setFromPoints(points);
      const lineMaterial = dashed
        ? new THREE.LineDashedMaterial({ color: 0x0a192f, dashSize: 0.12, gapSize: 0.095, transparent: true, opacity: 0.9 })
        : new THREE.LineBasicMaterial({ color: 0x07101d, transparent: true, opacity: 0.94 });
      const line = new THREE.LineLoop(lineGeometry, lineMaterial);
      if (dashed) line.computeLineDistances();
      group.add(line);
      return { lineGeometry, lineMaterial };
    };

    const edgeOuter = makeLoop(0);
    const edgeInner = makeLoop(1);
    const centerTrack = makeLoop(0.5, true);

    const indicator = new THREE.Mesh(
      new THREE.SphereGeometry(0.13, 32, 20),
      new THREE.MeshPhysicalMaterial({
        color: 0xdfff00,
        emissive: 0x9acb00,
        emissiveIntensity: 0.48,
        roughness: 0.38,
        clearcoat: 1,
        clearcoatRoughness: 0.18
      })
    );
    const indicatorOutline = new THREE.Mesh(
      new THREE.SphereGeometry(0.139, 24, 14),
      new THREE.MeshBasicMaterial({ color: 0x07101d, side: THREE.BackSide })
    );
    indicator.add(indicatorOutline);
    group.add(indicator);

    let progress = 0;
    let raf = 0;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const width = Math.max(120, rect.width || 220);
      const height = Math.max(100, rect.height || 150);
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };

    const render = () => {
      const now = performance.now() * 0.001;
      group.rotation.z = -0.13 + Math.sin(now * 0.32) * 0.025;
      group.rotation.y = 0.12 + Math.sin(now * 0.24) * 0.035;
      const point = mobiusPoint(progress * Math.PI * 2, 0.5);
      indicator.position.copy(point);
      indicator.scale.setScalar(1 + Math.sin(now * 3) * 0.06);
      renderer.render(scene, camera);
      raf = requestAnimationFrame(render);
    };

    resize();
    render();
    window.addEventListener("resize", resize);

    return {
      setProgress(value) {
        progress = Number.isFinite(value) ? Math.max(0, Math.min(1, value)) : 0;
      },
      destroy() {
        cancelAnimationFrame(raf);
        window.removeEventListener("resize", resize);
        renderer.dispose();
        geometry.dispose();
        material.dispose();
        edgeOuter.lineGeometry.dispose();
        edgeOuter.lineMaterial.dispose();
        edgeInner.lineGeometry.dispose();
        edgeInner.lineMaterial.dispose();
        centerTrack.lineGeometry.dispose();
        centerTrack.lineMaterial.dispose();
      }
    };
  };

  const setupLocalPlayer = () => {
    const player = document.querySelector("[data-local-player]");
    if (!player || player.dataset.playerReady === "true") return;
    player.dataset.playerReady = "true";

    const audio = player.querySelector("[data-player-audio]");
    const title = player.querySelector("[data-player-title]");
    const artist = player.querySelector("[data-player-artist]");
    const list = player.querySelector("[data-player-list]");
    const progress = player.querySelector("[data-player-progress]");
    const progressBar = player.querySelector("[data-player-progress-bar]");
    const toggle = player.querySelector("[data-player-toggle]");
    const prev = player.querySelector("[data-player-prev]");
    const next = player.querySelector("[data-player-next]");
    const art = player.querySelector(".floscas-player-art img");
    const mobiusCanvas = player.querySelector("[data-mobius-canvas]");
    let tracks = [];
    let index = 0;
    let mobius = null;

    createMobiusProgress(mobiusCanvas).then((instance) => {
      mobius = instance;
    }).catch(() => {});

    const trackInfo = (track) => [track.artist, track.album, track.year, track.genre].filter(Boolean).join(" · ") || "Choco's Blog";

    const setLabels = () => {
      const isPlaying = audio && !audio.paused;
      toggle?.setAttribute("aria-label", t(isPlaying ? "music.pause" : "music.play"));
      prev?.setAttribute("aria-label", t("music.prev"));
      next?.setAttribute("aria-label", t("music.next"));
      if (!tracks.length && artist) artist.textContent = t("music.empty");
      renderList();
    };

    const setEmpty = () => {
      player.classList.add("is-empty");
      if (title) title.textContent = "Choco's Blog listening room";
      if (artist) artist.textContent = t("music.empty");
      if (list) list.innerHTML = "";
      [toggle, prev, next].forEach((button) => {
        if (button) button.disabled = true;
      });
    };

    const setTrack = (nextIndex) => {
      if (!tracks.length || !audio) return;
      index = (nextIndex + tracks.length) % tracks.length;
      const track = tracks[index];
      audio.src = track.src;
      if (title) title.textContent = track.title || `Track ${index + 1}`;
      if (artist) artist.textContent = trackInfo(track);
      if (art && track.cover) art.src = track.cover;
      player.classList.remove("is-playing");
      list?.querySelectorAll("button").forEach((button, itemIndex) => {
        button.classList.toggle("is-active", itemIndex === index);
      });
      setLabels();
    };

    const renderList = () => {
      if (!list || !tracks.length) return;
      const currentActive = index;
      list.innerHTML = "";
      tracks.forEach((track, itemIndex) => {
        const item = document.createElement("li");
        const button = document.createElement("button");
        button.type = "button";
        button.className = itemIndex === currentActive ? "is-active" : "";
        button.innerHTML = `<span>${track.title || `Track ${itemIndex + 1}`}</span><small>${trackInfo(track)}</small>`;
        button.addEventListener("click", () => {
          setTrack(itemIndex);
          audio?.play();
        });
        item.append(button);
        list.append(item);
      });
    };

    fetch(player.dataset.playlistUrl, { cache: "no-store" })
      .then((response) => (response.ok ? response.json() : Promise.reject(new Error("playlist missing"))))
      .then((data) => {
        tracks = Array.isArray(data?.tracks) ? data.tracks.filter((track) => track.src) : [];
        if (!tracks.length) {
          setEmpty();
          return;
        }
        [toggle, prev, next].forEach((button) => {
          if (button) button.disabled = false;
        });
        renderList();
        setTrack(0);
      })
      .catch(setEmpty);

    toggle?.addEventListener("click", () => {
      if (!audio || !tracks.length) return;
      if (audio.paused) audio.play();
      else audio.pause();
    });

    prev?.addEventListener("click", () => {
      setTrack(index - 1);
      audio?.play();
    });

    next?.addEventListener("click", () => {
      setTrack(index + 1);
      audio?.play();
    });

    audio?.addEventListener("play", () => {
      player.classList.add("is-playing");
      setLabels();
    });
    audio?.addEventListener("pause", () => {
      player.classList.remove("is-playing");
      setLabels();
    });
    audio?.addEventListener("ended", () => {
      setTrack(index + 1);
      audio.play();
    });
    audio?.addEventListener("timeupdate", () => {
      const ratio = audio.duration ? audio.currentTime / audio.duration : 0;
      if (progressBar) progressBar.style.width = `${ratio * 100}%`;
      mobius?.setProgress(ratio);
    });

    progress?.addEventListener("click", (event) => {
      if (!audio?.duration) return;
      const rect = progress.getBoundingClientRect();
      audio.currentTime = ((event.clientX - rect.left) / rect.width) * audio.duration;
    });

    player.addEventListener("floscas:language", setLabels);
  };

  const setupCurrentNavigation = () => {
    const currentPath = window.location.pathname.replace(/\/$/, "");
    document.querySelectorAll(".floscas-navlinks a").forEach((link) => {
      const linkPath = new URL(link.href, window.location.origin).pathname.replace(/\/$/, "");
      const isHome = currentPath === "" && linkPath === "";
      const isSection = Boolean(linkPath && currentPath.startsWith(linkPath));
      const isActive = isHome || isSection;
      link.classList.toggle("is-active", isActive);
      if (isActive) link.setAttribute("aria-current", "page");
      else link.removeAttribute("aria-current");
    });
  };

  const setupImageLoading = () => {
    document.querySelectorAll(".floscas-home img, .floscas-shell img, .post-content img").forEach((image) => {
      image.dataset.floscasImage = "true";
      if (image.complete) {
        image.classList.add("is-loaded");
      } else {
        image.addEventListener("load", () => image.classList.add("is-loaded"), { once: true });
      }
    });
  };

  const setupScrollReveal = () => {
    const targets = [
      ".floscas-magazine-hero",
      ".floscas-visual-strip",
      ".floscas-music-section",
      ".floscas-latest",
      ".floscas-gallery-preview",
      ".floscas-page-hero",
      ".floscas-page-content",
      ".floscas-writing-item",
      ".floscas-empty",
      ".floscas-article-header",
      ".floscas-article .post-content",
      ".floscas-gallery-page .floscas-photo-card"
    ].join(",");

    const nodes = [...document.querySelectorAll(targets)].filter((node) => node.dataset.revealReady !== "true");
    if (!nodes.length) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    nodes.forEach((node, index) => {
      node.classList.add("floscas-reveal");
      node.dataset.revealReady = "true";
      node.style.setProperty("--floscas-reveal-delay", `${Math.min(index * 45, 180)}ms`);
      if (reduceMotion) node.classList.add("is-visible");
    });

    if (reduceMotion || !("IntersectionObserver" in window)) {
      nodes.forEach((node) => node.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    }, {
      rootMargin: "0px 0px -10% 0px",
      threshold: 0.08
    });

    nodes.forEach((node) => observer.observe(node));
  };

  const refresh = () => {
    document.body.classList.toggle("floscas-home-page", Boolean(document.querySelector("[data-floscas-home]")));
    document.body.classList.toggle("floscas-inner-page", Boolean(document.querySelector(".floscas-shell")));
    document.querySelectorAll("[data-lang-menu]").forEach(setupLanguageMenu);
    setupTheme();
    setupHomeMotion();
    setupLocalPlayer();
    setupCurrentNavigation();
    setupImageLoading();
    setupScrollReveal();
    applyCopy(getLanguage());
  };

  window.Floscas = Object.assign(window.Floscas || {}, {
    refresh,
    setLanguage: (lang) => {
      const next = I18N[lang] ? lang : "en";
      localStorage.setItem("floscas-lang", next);
      applyCopy(next);
    },
    getLanguage,
    t
  });

  refresh();
})();

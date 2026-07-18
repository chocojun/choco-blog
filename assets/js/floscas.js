(() => {
  document.documentElement.classList.add("floscas-js");

  const I18N = {
    en: {
      label: "EN",
      htmlLang: "en",
      "theme.toggle": "Toggle color theme",
      "language.toggle": "Switch language",
      "nav.home": "Index",
      "nav.posts": "Journal",
      "nav.essays": "Essays",
      "nav.about": "About",
      "nav.gallery": "Images",
      "hero.kicker": "Writerly portfolio",
      "hero.subtitle": "Writing my thoughts, recording my loves.",
      "hero.index": "Writing, photographs, fragments, and private weather.",
      "side.contact": "Contact",
      "quote.line": "A quiet shelf for notes, fragments, and becoming.",
      "quote.caption": "Writing my thoughts, recording my loves.",
      "section.journal": "Journal",
      "section.gallery": "Gallery",
      "latest.title": "Journal timeline",
      "latest.all": "View all posts",
      "gallery.selected": "Selected Light",
      "gallery.open": "Open gallery",
      "archive.subtitle": "A quiet shelf for notes, fragments, and becoming.",
      "archive.empty": "This room is still being arranged.",
      "article.back": "Back",
      "article.footer": "Continue the visual diary across social platforms.",
      "translation.source": "Titles and summaries are translated by ChatGPT; the full text is translated locally by your browser for reference.",
      "translation.loading": "Preparing the local translation…",
      "translation.unavailable": "Local translation is unavailable in this browser. The original text remains visible.",
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
      "filter.notes": "Notes",
      "brand.home": "Floscas home",
      "nav.menu": "Menu",
      "home.title": "WRITE WHAT I THINK<br>LOVE AND FREEDOM",
      "home.selectedLabel": "01 / Selected",
      "home.selectedTitle": "Fragments kept<br>in changing light.",
      "home.interlude": "I am rooted,<br>but I flow",
      "home.cinemaLabel": "02 / Film recommendations",
      "home.cinemaTitle": "Films I have seen<br>and recommend.",
      "home.cinemaNote": "A personal shelf of films I have watched and still want to pass on.",
      "home.cinemaAria": "Film recommendations. Each poster opens its Douban page.",
      "home.cinemaScroll": "films / scroll horizontally",
      "home.posterSources": "Poster sources",
      "home.journalLabel": "03 / Journal",
      "home.imagesLabel": "04 / Images",
      "home.imagesTitle": "Keep walking,<br>keep photographing.",
      "action.enter": "Enter",
      "action.read": "Read",
      "action.close": "Close",
      "archive.journal": "Journal",
      "archive.essays": "Essays",
      "gallery.label": "Images",
      "gallery.title": "Things the light<br>left behind.",
      "gallery.description": "A visual shelf for images, sketches, and collected atmospheres.",
      "gallery.medium": "Digital photograph",
      "about.label": "About",
      "about.title": "A quiet place<br>for unfinished things.",
      "about.currently": "Currently",
      "about.currentlyValue": "Writing, photographing, noticing.",
      "about.workingOn": "Working on",
      "about.email": "Email",
      "article.adjacent": "Adjacent articles",
      "article.previous": "Previous",
      "article.next": "Next",
      "music.prevShort": "Prev",
      "music.nextShort": "Next",
      "footer.contact": "Contact",
      "footer.games": "Offline games",
      "sudoku.kicker": "Daily pause / 04",
      "sudoku.title": "Nine quiet squares<br>for today.",
      "sudoku.description": "A new deterministic puzzle every day. Your progress stays on this device.",
      "sudoku.open": "Open today's Sudoku",
      "sudoku.short": "Daily Sudoku",
      "message.trigger": "Leave a note",
      "message.kicker": "A short line",
      "message.title": "Leave a note for Floscas",
      "message.description": "Your note will arrive privately by email.",
      "message.name": "Name",
      "message.email": "Email (optional)",
      "message.body": "Message",
      "message.send": "Send note",
      "footer.statement": "If possible, it will become better still.",
      "category.journal": "Journal",
      "category.essay": "Essay",
      "category.poetry": "Poetry",
      "category.introduction": "Introduction",
      "archive.introduction": "Introduction",
      "archive.timeline": "Timeline"
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
      "latest.title": "文章时间线",
      "latest.all": "查看全部文章",
      "gallery.selected": "被选中的光",
      "gallery.open": "打开图集",
      "archive.subtitle": "安放札记、碎片和正在成为的自己。",
      "archive.empty": "这个房间还在慢慢布置。",
      "article.back": "返回",
      "article.footer": "在社交平台继续看这本视觉日记。",
      "translation.source": "标题与摘要由 ChatGPT 翻译；长正文由浏览器在本地翻译，仅供参考。",
      "translation.loading": "正在准备本地译文…",
      "translation.unavailable": "当前浏览器不支持本地翻译，暂时显示原文。",
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
      "filter.notes": "札记",
      "brand.home": "Floscas 首页",
      "nav.menu": "菜单",
      "home.title": "写我所想<br>爱与自由",
      "home.selectedLabel": "01 / 精选",
      "home.selectedTitle": "在变动的光里<br>留下碎片。",
      "home.interlude": "I am rooted,<br>but I flow",
      "home.cinemaLabel": "02 / 电影推荐",
      "home.cinemaTitle": "我看过的<br>电影推荐",
      "home.cinemaNote": "从看过的电影中，留下仍想推荐给你的几部。",
      "home.cinemaAria": "电影推荐，每张海报均可打开对应豆瓣页面。",
      "home.cinemaScroll": "部作品 / 横向浏览",
      "home.posterSources": "海报来源",
      "home.journalLabel": "03 / 札记",
      "home.imagesLabel": "04 / 图像",
      "home.imagesTitle": "步履不停，<br>拍摄才行。",
      "action.enter": "进入",
      "action.read": "阅读",
      "action.close": "关闭",
      "archive.journal": "札记",
      "archive.essays": "随笔",
      "gallery.label": "图集",
      "gallery.title": "被光线<br>留下的事物。",
      "gallery.description": "收纳影像、草图与沿途气氛的视觉书架。",
      "gallery.medium": "数码摄影",
      "about.label": "关于",
      "about.title": "一个安放<br>未完成之物的地方。",
      "about.currently": "此刻",
      "about.currentlyValue": "写作、摄影、留意细小的事。",
      "about.workingOn": "正在进行",
      "about.email": "邮箱",
      "article.adjacent": "相邻文章",
      "article.previous": "上一篇",
      "article.next": "下一篇",
      "music.prevShort": "上一首",
      "music.nextShort": "下一首",
      "footer.contact": "联系",
      "footer.games": "离线小游戏",
      "sudoku.kicker": "每日停顿 / 04",
      "sudoku.title": "留给今天的<br>九宫格。",
      "sudoku.description": "每天生成一道固定新题，填写进度只保存在当前设备。",
      "sudoku.open": "打开今日数独",
      "sudoku.short": "每日数独",
      "message.trigger": "快速留言",
      "message.kicker": "一行短笺",
      "message.title": "给 Floscas 留言",
      "message.description": "留言会通过邮件私下送达，不会公开显示。",
      "message.name": "称呼",
      "message.email": "邮箱（选填）",
      "message.body": "留言",
      "message.send": "发送留言",
      "footer.statement": "如果有可能，还会变得更好。",
      "category.journal": "札记",
      "category.essay": "随笔",
      "category.poetry": "诗歌",
      "category.introduction": "说明",
      "archive.introduction": "说明",
      "archive.timeline": "时间线"
    },
    fr: {
      label: "FR",
      htmlLang: "fr",
      "theme.toggle": "Changer le thème",
      "language.toggle": "Changer de langue",
      "nav.home": "Index",
      "nav.posts": "Journal",
      "nav.essays": "Essais",
      "nav.about": "À propos",
      "nav.gallery": "Images",
      "nav.menu": "Menu",
      "brand.home": "Accueil Floscas",
      "hero.subtitle": "Écrire mes pensées, garder ce que j’aime.",
      "latest.title": "Chronologie du journal",
      "latest.all": "Voir tous les textes",
      "archive.subtitle": "Notes personnelles, fragments et observations.",
      "archive.empty": "Cette pièce est encore en train de prendre forme.",
      "archive.journal": "Journal",
      "archive.essays": "Essais",
      "article.back": "Retour",
      "article.footer": "Continuer le journal visuel sur les réseaux.",
      "article.adjacent": "Articles voisins",
      "article.previous": "Précédent",
      "article.next": "Suivant",
      "translation.source": "Titres et résumés traduits par ChatGPT ; texte intégral traduit localement par votre navigateur, à titre indicatif.",
      "translation.loading": "Préparation de la traduction locale…",
      "translation.unavailable": "La traduction locale n’est pas disponible dans ce navigateur. Le texte original reste affiché.",
      "home.title": "ÉCRIRE CE QUE JE PENSE<br>L’AMOUR ET LA LIBERTÉ",
      "home.selectedLabel": "01 / Sélection",
      "home.selectedTitle": "Fragments gardés<br>dans une lumière changeante.",
      "home.interlude": "I am rooted,<br>but I flow",
      "home.cinemaLabel": "02 / Films recommandés",
      "home.cinemaTitle": "Des films vus<br>et recommandés.",
      "home.cinemaNote": "Une sélection personnelle de films vus que j’ai encore envie de partager.",
      "home.cinemaAria": "Films recommandés. Chaque affiche ouvre sa page Douban.",
      "home.cinemaScroll": "films / faire défiler horizontalement",
      "home.posterSources": "Sources des affiches",
      "home.journalLabel": "03 / Journal",
      "home.imagesLabel": "04 / Images",
      "home.imagesTitle": "Continuer à marcher,<br>continuer à photographier.",
      "action.enter": "Entrer",
      "action.read": "Lire",
      "action.close": "Fermer",
      "gallery.label": "Images",
      "gallery.title": "Ce que la lumière<br>a laissé derrière elle.",
      "gallery.description": "Une étagère visuelle pour images, esquisses et atmosphères recueillies.",
      "gallery.medium": "Photographie numérique",
      "about.label": "À propos",
      "about.title": "Un lieu calme<br>pour les choses inachevées.",
      "about.currently": "En ce moment",
      "about.currentlyValue": "Écrire, photographier, observer.",
      "about.workingOn": "Projet en cours",
      "about.email": "E-mail",
      "music.kicker": "Salon d’écoute",
      "music.title": "Un peu de temps pour lire.",
      "music.window": "Liste locale",
      "music.empty": "Ajoutez des fichiers audio dans le dossier musical local.",
      "music.progress": "Progression de la lecture",
      "music.prev": "Piste précédente",
      "music.next": "Piste suivante",
      "music.prevShort": "Préc.",
      "music.nextShort": "Suiv.",
      "music.play": "Lire",
      "music.pause": "Pause",
      "games.playOffline": "Jouer hors ligne",
      "filter.all": "Tout",
      "filter.notes": "Notes",
      "footer.contact": "Contact",
      "footer.games": "Jeux hors ligne",
      "sudoku.kicker": "Pause quotidienne / 04",
      "sudoku.title": "Neuf cases tranquilles<br>pour aujourd’hui.",
      "sudoku.description": "Une nouvelle grille déterministe chaque jour. Votre progression reste sur cet appareil.",
      "sudoku.open": "Ouvrir le sudoku du jour",
      "sudoku.short": "Sudoku du jour",
      "message.trigger": "Laisser un mot",
      "message.kicker": "Quelques mots",
      "message.title": "Écrire à Floscas",
      "message.description": "Votre message arrivera en privé par e-mail.",
      "message.name": "Nom",
      "message.email": "E-mail (facultatif)",
      "message.body": "Message",
      "message.send": "Envoyer",
      "footer.statement": "Si possible, cela deviendra encore meilleur.",
      "category.journal": "Journal",
      "category.essay": "Essai",
      "category.poetry": "Poésie",
      "category.introduction": "Introduction",
      "archive.introduction": "Introduction",
      "archive.timeline": "Chronologie"
    },
    ja: {
      label: "日",
      htmlLang: "ja",
      "theme.toggle": "テーマを切り替える",
      "language.toggle": "言語を切り替える",
      "nav.home": "索引",
      "nav.posts": "日記",
      "nav.essays": "随筆",
      "nav.about": "概要",
      "nav.gallery": "写真",
      "nav.menu": "メニュー",
      "brand.home": "Floscas ホーム",
      "hero.subtitle": "考えを書き、愛するものを記す。",
      "latest.title": "記録の時間軸",
      "latest.all": "すべての記事を見る",
      "archive.subtitle": "個人的な記録、断片、観察。",
      "archive.empty": "この部屋はまだ整えられている途中です。",
      "archive.journal": "日記",
      "archive.essays": "随筆",
      "article.back": "戻る",
      "article.footer": "ソーシャルメディアで写真日記の続きを見る。",
      "article.adjacent": "前後の記事",
      "article.previous": "前の記事",
      "article.next": "次の記事",
      "translation.source": "タイトルと要約はChatGPT、本文はブラウザ内で翻訳した参考訳です。",
      "translation.loading": "ローカル翻訳を準備しています…",
      "translation.unavailable": "このブラウザではローカル翻訳を利用できないため、原文を表示しています。",
      "home.title": "思うことを書き<br>愛と自由",
      "home.selectedLabel": "01 / 選集",
      "home.selectedTitle": "移ろう光の中に<br>残した断片。",
      "home.interlude": "I am rooted,<br>but I flow",
      "home.cinemaLabel": "02 / おすすめ映画",
      "home.cinemaTitle": "観た映画から<br>おすすめを。",
      "home.cinemaNote": "観た作品の中から、今も誰かに手渡したい映画を選びました。",
      "home.cinemaAria": "おすすめ映画。各ポスターから豆瓣の作品ページを開けます。",
      "home.cinemaScroll": "作品 / 横にスクロール",
      "home.posterSources": "ポスター出典",
      "home.journalLabel": "03 / 日記",
      "home.imagesLabel": "04 / 写真",
      "home.imagesTitle": "歩みを止めず、<br>撮り続ける",
      "action.enter": "入る",
      "action.read": "読む",
      "action.close": "閉じる",
      "gallery.label": "写真",
      "gallery.title": "光が<br>残していったもの。",
      "gallery.description": "写真、スケッチ、集めた空気のための視覚的な棚。",
      "gallery.medium": "デジタル写真",
      "about.label": "概要",
      "about.title": "未完成のものを置く<br>静かな場所。",
      "about.currently": "現在",
      "about.currentlyValue": "書くこと、撮ること、気づくこと。",
      "about.workingOn": "制作中",
      "about.email": "メール",
      "music.kicker": "リスニングルーム",
      "music.title": "読書のための小さな天気。",
      "music.window": "ローカルプレイリスト",
      "music.empty": "音楽フォルダーに音声ファイルを追加してください。",
      "music.progress": "再生位置",
      "music.prev": "前の曲",
      "music.next": "次の曲",
      "music.prevShort": "前へ",
      "music.nextShort": "次へ",
      "music.play": "再生",
      "music.pause": "一時停止",
      "games.playOffline": "オフラインで遊ぶ",
      "filter.all": "すべて",
      "filter.notes": "記録",
      "footer.contact": "連絡先",
      "footer.games": "オフラインゲーム",
      "sudoku.kicker": "毎日の休止 / 04",
      "sudoku.title": "今日のための<br>静かな九マス。",
      "sudoku.description": "毎日ひとつの決定的な新しい問題。進行状況はこの端末に保存されます。",
      "sudoku.open": "今日の数独を開く",
      "sudoku.short": "毎日の数独",
      "message.trigger": "メッセージ",
      "message.kicker": "短い便り",
      "message.title": "Floscas にメッセージを送る",
      "message.description": "メッセージはメールで非公開に届きます。",
      "message.name": "お名前",
      "message.email": "メール（任意）",
      "message.body": "メッセージ",
      "message.send": "送信",
      "footer.statement": "可能なら、もっと良くなっていく。",
      "category.journal": "日記",
      "category.essay": "随筆",
      "category.poetry": "詩",
      "category.introduction": "はじめに",
      "archive.introduction": "はじめに",
      "archive.timeline": "時間軸"
    }
  };

  const MONTHS = {
    en: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
    "zh-Hans": ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
    fr: ["janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août", "septembre", "octobre", "novembre", "décembre"],
    ja: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"]
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

  const GALLERY_TONES = {
    fr: {
      Botanical: "Botanique", Monochrome: "Monochrome", "Still life": "Nature morte",
      Nocturne: "Nocturne", Shadow: "Ombre", City: "Ville", Sun: "Soleil",
      Archive: "Archive", Garden: "Jardin", Interior: "Intérieur", Street: "Rue",
      Sky: "Ciel", Landscape: "Paysage", Warmth: "Chaleur"
    },
    ja: {
      Botanical: "植物", Monochrome: "モノクロ", "Still life": "静物",
      Nocturne: "夜景", Shadow: "影", City: "都市", Sun: "日光",
      Archive: "記録", Garden: "庭", Interior: "室内", Street: "街路",
      Sky: "空", Landscape: "風景", Warmth: "ぬくもり"
    }
  };

  const GALLERY_TITLES = {
    fr: {
      rootAperture: "Ouverture des racines", forestLight: "Lumière en forêt",
      concreteQuiet: "Silence du béton", waterGrapes: "Raisins dans l’eau",
      smallLight: "Petite lumière", greenInterior: "Intérieur vert",
      pinkHour: "Heure rose", stationGhost: "Fantôme de la gare",
      urbanCorridor: "Couloir urbain", ideaBox: "Boîte à idées",
      turquoiseTree: "Arbre turquoise", stickerWall: "Mur d’autocollants",
      buildingGrid: "Grille architecturale", leafMap: "Carte des feuilles",
      butterflies: "Papillons", blueNight: "Nuit bleue", lateFlowers: "Fleurs tardives",
      shadowFloor: "Sol d’ombres", mistSkyline: "Horizon dans la brume",
      cloudMobile: "Mobile de nuages", muralBuilding: "Immeuble peint",
      rainCity: "Ville de pluie", blueCloud: "Nuage bleu", greenCity: "Ville verte",
      greenValley: "Vallée verte", orangeLight: "Lumière orange",
      deskLamp: "Lampe de bureau", deepForest: "Forêt profonde",
      whiteFlowers: "Fleurs blanches", forestBloom: "Floraison en forêt"
    },
    ja: {
      rootAperture: "根の天窓", forestLight: "森の光", concreteQuiet: "コンクリートの静寂",
      waterGrapes: "水の中の葡萄", smallLight: "小さな光", greenInterior: "緑の室内",
      pinkHour: "桃色の時間", stationGhost: "駅の幽影", urbanCorridor: "都市の回廊",
      ideaBox: "アイデアの箱", turquoiseTree: "青緑の木", stickerWall: "ステッカーの壁",
      buildingGrid: "建築の格子", leafMap: "葉脈の地図", butterflies: "蝶",
      blueNight: "青い夜", lateFlowers: "遅咲きの花", shadowFloor: "影の床",
      mistSkyline: "霧のスカイライン", cloudMobile: "雲のモビール",
      muralBuilding: "壁画の建物", rainCity: "雨の都市", blueCloud: "青い雲",
      greenCity: "緑の都市", greenValley: "緑の谷", orangeLight: "橙色の光",
      deskLamp: "机の灯り", deepForest: "深い森", whiteFlowers: "白い花",
      forestBloom: "森の花"
    }
  };

  const galleryItem = (id, lang) => {
    const entry = GALLERY[id];
    if (!entry) return null;
    if (entry[lang]) return entry[lang];
    const base = entry.en;
    const title = GALLERY_TITLES[lang]?.[id] || base[1];
    const tone = GALLERY_TONES[lang]?.[base[0]] || base[0];
    return [tone, title];
  };

  const FILMS = {
    worstPerson: {
      en: "The Worst Person in the World",
      "zh-Hans": "世界上最糟糕的人",
      fr: "Julie (en 12 chapitres)",
      ja: "わたしは最悪。"
    },
    laLaLand: { en: "La La Land", "zh-Hans": "爱乐之城", fr: "La La Land", ja: "ラ・ラ・ランド" },
    callMe: {
      en: "Call Me by Your Name",
      "zh-Hans": "请以你的名字呼唤我",
      fr: "Call Me by Your Name",
      ja: "君の名前で僕を呼んで"
    },
    decisionToLeave: {
      en: "Decision to Leave",
      "zh-Hans": "分手的决心",
      fr: "Decision to Leave",
      ja: "別れる決心"
    },
    anatomy: {
      en: "Anatomy of a Fall",
      "zh-Hans": "坠落的审判",
      fr: "Anatomie d’une chute",
      ja: "落下の解剖学"
    },
    portrait: {
      en: "Portrait of a Lady on Fire",
      "zh-Hans": "燃烧女子的肖像",
      fr: "Portrait de la jeune fille en feu",
      ja: "燃ゆる女の肖像"
    },
    dreamers: { en: "The Dreamers", "zh-Hans": "戏梦巴黎", fr: "Innocents: The Dreamers", ja: "ドリーマーズ" },
    lostTranslation: {
      en: "Lost in Translation",
      "zh-Hans": "迷失东京",
      fr: "Lost in Translation",
      ja: "ロスト・イン・トランスレーション"
    }
  };

  const filmTitle = (id, lang, node) => {
    const card = node?.closest?.("[data-film-card]") || document.querySelector(`[data-film-link="${id}"]`);
    const key = { en: "titleEn", "zh-Hans": "titleZh", fr: "titleFr", ja: "titleJa" }[lang] || "titleEn";
    return card?.dataset[key] || FILMS[id]?.[lang] || FILMS[id]?.en || "";
  };

  const getLanguage = () => {
    const requested = new URLSearchParams(window.location.search).get("lang");
    if (requested && I18N[requested]) return requested;
    const stored = localStorage.getItem("floscas-lang");
    return stored && I18N[stored] ? stored : "zh-Hans";
  };

  const t = (key, lang = getLanguage()) => I18N[lang]?.[key] || I18N.en[key] || key;

  const journalField = (node, field, lang) => {
    const entry = node.closest("[data-journal-entry]");
    if (!entry) return "";
    const suffix = lang.toLowerCase();
    return entry.getAttribute(`data-journal-${field}-${suffix}`)
      || entry.getAttribute(`data-journal-${field}-en`)
      || "";
  };

  const applyJournalCards = (lang) => {
    document.querySelectorAll("[data-journal-title]").forEach((node) => {
      const copy = journalField(node, "title", lang);
      if (copy) node.textContent = copy;
    });

    document.querySelectorAll("[data-journal-summary]").forEach((node) => {
      const copy = journalField(node, "summary", lang);
      if (copy) node.textContent = copy;
    });

    const articleTitle = document.querySelector(".cinema-article-header [data-journal-title]");
    if (articleTitle?.textContent.trim()) {
      const localizedDocumentTitle = `${articleTitle.textContent.trim()} | Floscas`;
      document.title = localizedDocumentTitle;
      window.setTimeout(() => {
        if (document.querySelector(".cinema-article-header [data-journal-title]")) document.title = localizedDocumentTitle;
      }, 120);
    }
  };

  const setJournalStatus = (status, key, lang) => {
    if (!status) return;
    status.hidden = !key;
    status.textContent = key ? t(key, lang) : "";
  };

  const STATIC_TRANSLATION_NOTICE = {
    en: "This translation was prepared by ChatGPT. The Chinese original remains the reference text.",
    "zh-Hans": "",
    fr: "Cette traduction est fournie par ChatGPT. Le texte chinois original reste la reference.",
    ja: "この訳文は ChatGPT によるものです。中国語原文を正式な参照テキストとします。",
  };

  const applyJournalBody = (lang) => {
    document.querySelectorAll("[data-journal-body]").forEach((body) => {
      const status = body.querySelector("[data-journal-translation-status]");
      const blocks = [...body.querySelectorAll("[data-journal-localized]")];
      if (!blocks.length) return;

      const original = blocks.find((block) => block.dataset.journalLocalized === "zh-Hans");
      const localized = blocks.find((block) => block.dataset.journalLocalized === lang);
      const active = localized || original || blocks[0];

      blocks.forEach((block) => {
        const visible = block === active;
        block.hidden = !visible;
        block.setAttribute("aria-hidden", String(!visible));
      });

      if (lang === "zh-Hans") {
        setJournalStatus(status, "", lang);
      } else if (localized) {
        status.hidden = false;
        status.textContent = STATIC_TRANSLATION_NOTICE[lang] || STATIC_TRANSLATION_NOTICE.en;
      } else {
        setJournalStatus(status, "translation.unavailable", lang);
      }
    });
  };

  const applyCopy = (lang = getLanguage()) => {
    const messages = I18N[lang] || I18N.en;
    document.documentElement.lang = messages.htmlLang;

    document.querySelectorAll("[data-i18n]").forEach((node) => {
      const key = node.dataset.i18n;
      node.textContent = t(key, lang);
    });

    document.querySelectorAll("[data-i18n-html]").forEach((node) => {
      const key = node.dataset.i18nHtml;
      node.innerHTML = t(key, lang);
    });

    document.querySelectorAll("[data-i18n-aria-label]").forEach((node) => {
      node.setAttribute("aria-label", t(node.dataset.i18nAriaLabel, lang));
    });

    document.querySelectorAll("[data-lang-current]").forEach((node) => {
      node.textContent = messages.label;
    });

    document.querySelectorAll("[data-cinema-month]").forEach((node) => {
      const month = Number.parseInt(node.dataset.cinemaMonth, 10);
      node.textContent = MONTHS[lang]?.[month - 1] || MONTHS.en[month - 1] || "";
    });

    document.querySelectorAll("[data-lang-option]").forEach((option) => {
      option.classList.toggle("is-active", option.dataset.langOption === lang);
    });

    document.querySelectorAll("[data-gallery-title]").forEach((node) => {
      const item = galleryItem(node.dataset.galleryTitle, lang);
      if (item) node.textContent = item[1];
    });

    document.querySelectorAll("[data-gallery-tone]").forEach((node) => {
      const item = galleryItem(node.dataset.galleryTone, lang);
      if (item) node.textContent = item[0];
    });

    document.querySelectorAll("[data-gallery-image]").forEach((image) => {
      const item = galleryItem(image.dataset.galleryImage, lang);
      if (!item) return;
      image.alt = item[1];
      image.title = item[1];
      image.closest("button")?.setAttribute("data-lightbox-alt", item[1]);
    });

    document.querySelectorAll("[data-film-title]").forEach((node) => {
      node.textContent = filmTitle(node.dataset.filmTitle, lang, node);
    });

    document.querySelectorAll("[data-film-image]").forEach((image) => {
      const title = filmTitle(image.dataset.filmImage, lang, image);
      image.alt = `${title} poster`;
      image.title = title;
    });

    document.querySelectorAll("[data-film-link]").forEach((link) => {
      const title = filmTitle(link.dataset.filmLink, lang, link);
      link.setAttribute("aria-label", `${title} — Douban`);
    });

    applyJournalCards(lang);
    applyJournalBody(lang);

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

    const trackInfo = (track) => [track.artist, track.album, track.year, track.genre].filter(Boolean).join(" · ") || "Floscas";

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
      if (title) title.textContent = "Floscas listening room";
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

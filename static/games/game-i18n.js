(() => {
  "use strict";

  const languages = ["zh-Hans", "en", "fr", "ja"];
  const labels = { "zh-Hans": "中", en: "EN", fr: "FR", ja: "日" };
  const htmlLang = { "zh-Hans": "zh-CN", en: "en", fr: "fr", ja: "ja" };
  const dictionaries = {
    "zh-Hans": {
      "nav.home": "首页", "nav.games": "游戏", "language.toggle": "切换语言",
      "hub.eyebrow": "离线游戏室", "hub.title": "休息一下", "hub.intro": "四个安静的小练习。无需登录，也可以离线继续。",
      "hub.2048": "合并相同数字", "hub.snake": "穿过深绿棋盘", "hub.tetris": "让几何缓慢落下", "hub.sudoku": "每日一题，保留思路", "hub.open": "开始",
      "common.score": "得分", "common.status": "状态", "common.lines": "消除行", "common.ready": "准备", "common.playing": "进行中", "common.paused": "已暂停", "common.finished": "已结束",
      "common.start": "开始", "common.continue": "继续", "common.pause": "暂停", "common.reset": "重置", "common.restart": "重新开始", "common.new": "新游戏", "common.touch": "触屏方向控制",
      "2048.intro": "用方向键或滑动合并数字。安静地把相同的事物放在一起。", "2048.side": "安静的算术", "2048.help": "在棋盘内滑动，或使用方向键。游戏可以离线继续。", "2048.board": "2048 棋盘",
      "snake.intro": "一条小小的线穿过深绿色棋盘。方向键或滑动控制。", "snake.side": "移动的线", "snake.board": "贪吃蛇棋盘", "snake.hit": "碰到自己了，再试一次。",
      "tetris.intro": "让几何缓慢落下。左右键移动，上键旋转，下键加速，空格直落。", "tetris.side": "下落的几何", "tetris.help": "操作仅在游戏区域生效，方向键不会带动网页滚动。", "tetris.board": "俄罗斯方块棋盘", "tetris.drop": "直落", "tetris.rotate": "旋转",
      "sudoku.kicker": "安静的每日练习", "sudoku.title": "每日数独", "sudoku.intro": "每天一题。先观察，再落笔；需要时，让候选数替你保留思路。", "sudoku.today": "今日", "sudoku.progress": "进度", "sudoku.time": "时间", "sudoku.tools": "纸上工具", "sudoku.paper": "纸笔模式", "sudoku.pen": "填数", "sudoku.notes": "笔记", "sudoku.highlight": "同数高亮", "sudoku.highlight.help": "突出相同数字与关联区域", "sudoku.clean": "自动清理笔记", "sudoku.clean.help": "填数后移除同行、同列、同宫候选", "sudoku.autofill": "预填候选", "sudoku.hint": "提示一格", "sudoku.undo": "撤销", "sudoku.check": "检查", "sudoku.restart": "重新开始", "sudoku.shortcuts": "键盘：1–9 填写 · N 切换笔记 · Backspace 擦除", "sudoku.learn": "学习棋盘", "sudoku.guide": "如何更好地玩数独", "sudoku.guide.intro": "数独不是猜数字，而是不断排除不可能。每一行、每一列、每一宫都只能出现一次 1–9。", "sudoku.scan": "先扫看", "sudoku.scan.detail": "先找快要填满的行、列和宫。观察缺少哪些数字，再用交叉方向排除位置。", "sudoku.single": "寻找唯一候选", "sudoku.single.detail": "如果一个空格的其他八个数字都被同行、同列或同宫排除，剩下的数字就是答案。", "sudoku.pencil": "用笔记保留可能", "sudoku.pencil.detail": "遇到不能立即确定的格子，记录候选数。每次落笔后重新清理候选，避免旧信息干扰判断。", "sudoku.pairs": "识别显性与隐性数对", "sudoku.pairs.detail": "同一单位中，若两个格子只能放同一对数字，这两个数字就能从其他格子的候选中排除。", "sudoku.pause": "卡住时暂停", "sudoku.pause.detail": "不要盯着一个宫硬推。换到数字较多的区域重新扫看，通常会发现新的唯一位置。", "sudoku.source": "阅读完整技巧指南", "sudoku.select": "选择一个空格，再输入数字。你的进度会保存在这台设备上。", "sudoku.noteMode": "笔记模式：数字会以候选数写入格子。", "sudoku.penMode": "填数模式：数字会作为答案写入格子。", "sudoku.prefilled": "已为所有空格预填当前可用候选。继续用排除法缩小范围。", "sudoku.hinted": "已填入一格提示。观察它如何改变同行、同列和同宫的候选。", "sudoku.undone": "已撤销上一步。", "sudoku.complete": "完成了。明天会有一道新的题目。", "sudoku.wrong": "有数字与答案冲突，已为你标出。", "sudoku.correct": "目前填写正确。慢一点，继续观察。", "sudoku.confirm": "清除今天的填写与笔记记录？", "sudoku.resetDone": "已重新开始今天的数独。", "sudoku.empty": "空格", "sudoku.rowcol": "第 {row} 行，第 {col} 列{value}", "sudoku.number": "，数字 {number}", "sudoku.input": "输入 {number}", "sudoku.erase": "擦除"
    },
    en: {
      "nav.home": "Index", "nav.games": "Games", "language.toggle": "Choose language",
      "hub.eyebrow": "Offline game room", "hub.title": "Take a pause", "hub.intro": "Four quiet exercises. No sign-in required, and each one works offline.",
      "hub.2048": "Merge matching numbers", "hub.snake": "Cross the deep-green board", "hub.tetris": "Let geometry fall slowly", "hub.sudoku": "A daily grid for keeping thought", "hub.open": "Open",
      "common.score": "Score", "common.status": "Status", "common.lines": "Lines", "common.ready": "Ready", "common.playing": "Playing", "common.paused": "Paused", "common.finished": "Finished",
      "common.start": "Start", "common.continue": "Continue", "common.pause": "Pause", "common.reset": "Reset", "common.restart": "Restart", "common.new": "New game", "common.touch": "Touch direction controls",
      "2048.intro": "Use arrow keys or swipe to merge numbers. Quietly place like things together.", "2048.side": "Quiet arithmetic", "2048.help": "Swipe within the board or use the arrow keys. Your game also works offline.", "2048.board": "2048 board",
      "snake.intro": "A small line crossing a deep-green board. Use arrow keys or swipe.", "snake.side": "Moving line", "snake.board": "Snake board", "snake.hit": "You met your own path. Try again.",
      "tetris.intro": "Let geometry fall slowly. Move sideways, rotate with Up, accelerate with Down, and drop with Space.", "tetris.side": "Falling geometry", "tetris.help": "Controls stay inside the game; arrow keys will not scroll the page.", "tetris.board": "Tetris board", "tetris.drop": "Drop", "tetris.rotate": "Rotate",
      "sudoku.kicker": "A quiet daily practice", "sudoku.title": "Daily Sudoku", "sudoku.intro": "One grid a day. Observe before writing; let pencil marks hold a thought when needed.", "sudoku.today": "Today", "sudoku.progress": "Progress", "sudoku.time": "Time", "sudoku.tools": "Paper tools", "sudoku.paper": "Pencil mode", "sudoku.pen": "Answer", "sudoku.notes": "Notes", "sudoku.highlight": "Highlight matches", "sudoku.highlight.help": "Show matching numbers and related areas", "sudoku.clean": "Clean notes automatically", "sudoku.clean.help": "Remove peer candidates after entering an answer", "sudoku.autofill": "Fill candidates", "sudoku.hint": "Reveal one", "sudoku.undo": "Undo", "sudoku.check": "Check", "sudoku.restart": "Start over", "sudoku.shortcuts": "Keyboard: 1–9 enter · N notes · Backspace erase", "sudoku.learn": "Learn the grid", "sudoku.guide": "How to solve with clarity", "sudoku.guide.intro": "Sudoku is not guessing. Eliminate what cannot fit: every row, column, and box contains 1–9 once.", "sudoku.scan": "Scan first", "sudoku.scan.detail": "Begin with nearly complete rows, columns, and boxes. Find what is missing and cross-check possible positions.", "sudoku.single": "Find a single candidate", "sudoku.single.detail": "When eight values are excluded by the row, column, or box, the remaining number is the answer.", "sudoku.pencil": "Keep possibilities in notes", "sudoku.pencil.detail": "Record candidates when a cell is uncertain. Clean them after each answer so old information does not distract you.", "sudoku.pairs": "Recognize pairs", "sudoku.pairs.detail": "If two cells in a unit contain the same pair, those values can be removed from every other candidate in that unit.", "sudoku.pause": "Pause when stuck", "sudoku.pause.detail": "Do not force one box. Scan a fuller area again; a new single often becomes visible.", "sudoku.source": "Read the full technique guide", "sudoku.select": "Select an empty cell, then enter a number. Progress is saved on this device.", "sudoku.noteMode": "Notes mode: numbers are stored as candidates.", "sudoku.penMode": "Answer mode: numbers are entered as answers.", "sudoku.prefilled": "Candidates have been filled for every empty cell. Keep eliminating possibilities.", "sudoku.hinted": "One answer was revealed. Notice how it changes its row, column, and box.", "sudoku.undone": "The previous step was undone.", "sudoku.complete": "Complete. A new puzzle arrives tomorrow.", "sudoku.wrong": "Some entries conflict with the solution and are now marked.", "sudoku.correct": "Everything entered so far is correct. Keep observing.", "sudoku.confirm": "Clear today's answers and notes?", "sudoku.resetDone": "Today's puzzle has been restarted.", "sudoku.empty": ", empty", "sudoku.rowcol": "Row {row}, column {col}{value}", "sudoku.number": ", number {number}", "sudoku.input": "Enter {number}", "sudoku.erase": "Erase"
    },
    fr: {
      "nav.home": "Accueil", "nav.games": "Jeux", "language.toggle": "Choisir la langue",
      "hub.eyebrow": "Salle de jeux hors ligne", "hub.title": "Faire une pause", "hub.intro": "Quatre exercices tranquilles, sans compte et disponibles hors ligne.", "hub.2048": "Réunir les nombres identiques", "hub.snake": "Traverser le plateau vert", "hub.tetris": "Laisser tomber la géométrie", "hub.sudoku": "Une grille quotidienne", "hub.open": "Ouvrir",
      "common.score": "Score", "common.status": "État", "common.lines": "Lignes", "common.ready": "Prêt", "common.playing": "En cours", "common.paused": "En pause", "common.finished": "Terminé", "common.start": "Commencer", "common.continue": "Continuer", "common.pause": "Pause", "common.reset": "Réinitialiser", "common.restart": "Recommencer", "common.new": "Nouvelle partie", "common.touch": "Commandes tactiles",
      "2048.intro": "Utilisez les flèches ou glissez pour réunir les nombres. Rapprochez doucement ce qui se ressemble.", "2048.side": "Arithmétique calme", "2048.help": "Glissez sur la grille ou utilisez les flèches. Le jeu reste disponible hors ligne.", "2048.board": "Grille de 2048",
      "snake.intro": "Une petite ligne traverse un plateau vert profond. Utilisez les flèches ou glissez.", "snake.side": "Ligne en mouvement", "snake.board": "Plateau du serpent", "snake.hit": "Vous avez croisé votre propre chemin. Réessayez.",
      "tetris.intro": "Laissez tomber la géométrie. Déplacez, tournez avec Haut, accélérez avec Bas et lâchez avec Espace.", "tetris.side": "Géométrie descendante", "tetris.help": "Les commandes restent dans le jeu : les flèches ne feront pas défiler la page.", "tetris.board": "Plateau de Tetris", "tetris.drop": "Lâcher", "tetris.rotate": "Tourner",
      "sudoku.kicker": "Un exercice quotidien", "sudoku.title": "Sudoku du jour", "sudoku.intro": "Une grille par jour. Observez avant d'écrire ; gardez vos hypothèses en notes.", "sudoku.today": "Aujourd'hui", "sudoku.progress": "Progression", "sudoku.time": "Temps", "sudoku.tools": "Outils papier", "sudoku.paper": "Mode crayon", "sudoku.pen": "Réponse", "sudoku.notes": "Notes", "sudoku.highlight": "Surligner les égaux", "sudoku.highlight.help": "Afficher les nombres et zones liés", "sudoku.clean": "Nettoyer les notes", "sudoku.clean.help": "Retirer les candidats liés après une réponse", "sudoku.autofill": "Remplir les candidats", "sudoku.hint": "Révéler une case", "sudoku.undo": "Annuler", "sudoku.check": "Vérifier", "sudoku.restart": "Recommencer", "sudoku.shortcuts": "Clavier : 1–9 saisir · N notes · Retour effacer", "sudoku.learn": "Lire la grille", "sudoku.guide": "Mieux résoudre le sudoku", "sudoku.guide.intro": "Le sudoku ne se devine pas : éliminez l'impossible. Chaque ligne, colonne et bloc contient 1–9 une seule fois.", "sudoku.scan": "Observer d'abord", "sudoku.scan.detail": "Commencez par les lignes, colonnes et blocs presque complets, puis croisez les positions possibles.", "sudoku.single": "Trouver le candidat unique", "sudoku.single.detail": "Quand huit valeurs sont exclues, le nombre restant est la réponse.", "sudoku.pencil": "Noter les possibilités", "sudoku.pencil.detail": "Inscrivez les candidats incertains et nettoyez-les après chaque réponse.", "sudoku.pairs": "Reconnaître les paires", "sudoku.pairs.detail": "Deux cases portant la même paire permettent d'écarter ces valeurs des autres cases de l'unité.", "sudoku.pause": "Faire une pause", "sudoku.pause.detail": "Ne forcez pas un bloc. Regardez ailleurs : un nouveau candidat unique apparaîtra souvent.", "sudoku.source": "Lire le guide complet", "sudoku.select": "Choisissez une case vide puis un nombre. La progression est enregistrée sur cet appareil.", "sudoku.noteMode": "Mode notes : les nombres deviennent des candidats.", "sudoku.penMode": "Mode réponse : les nombres sont saisis comme réponses.", "sudoku.prefilled": "Les candidats ont été ajoutés. Continuez à éliminer les possibilités.", "sudoku.hinted": "Une réponse a été révélée. Observez son effet sur la ligne, la colonne et le bloc.", "sudoku.undone": "L'étape précédente a été annulée.", "sudoku.complete": "Terminé. Une nouvelle grille arrivera demain.", "sudoku.wrong": "Certaines réponses sont en conflit et ont été signalées.", "sudoku.correct": "Tout est juste pour le moment. Continuez à observer.", "sudoku.confirm": "Effacer les réponses et notes d'aujourd'hui ?", "sudoku.resetDone": "La grille du jour a été recommencée.", "sudoku.empty": ", vide", "sudoku.rowcol": "Ligne {row}, colonne {col}{value}", "sudoku.number": ", nombre {number}", "sudoku.input": "Saisir {number}", "sudoku.erase": "Effacer"
    },
    ja: {
      "nav.home": "ホーム", "nav.games": "ゲーム", "language.toggle": "言語を選択",
      "hub.eyebrow": "オフラインゲーム室", "hub.title": "ひと休み", "hub.intro": "静かな四つの遊び。ログイン不要で、オフラインでも続けられます。", "hub.2048": "同じ数字を重ねる", "hub.snake": "深緑の盤面を進む", "hub.tetris": "図形をゆっくり落とす", "hub.sudoku": "思考を残す毎日の盤面", "hub.open": "開く",
      "common.score": "スコア", "common.status": "状態", "common.lines": "ライン", "common.ready": "準備完了", "common.playing": "プレイ中", "common.paused": "一時停止", "common.finished": "終了", "common.start": "開始", "common.continue": "続ける", "common.pause": "一時停止", "common.reset": "リセット", "common.restart": "最初から", "common.new": "新しいゲーム", "common.touch": "タッチ方向操作",
      "2048.intro": "矢印キーかスワイプで数字を重ねます。同じものを静かに寄せてください。", "2048.side": "静かな算数", "2048.help": "盤面をスワイプするか矢印キーを使います。オフラインでも遊べます。", "2048.board": "2048 の盤面",
      "snake.intro": "小さな線が深緑の盤面を進みます。矢印キーかスワイプで操作します。", "snake.side": "動く線", "snake.board": "スネークの盤面", "snake.hit": "自分の軌跡に触れました。もう一度。",
      "tetris.intro": "図形をゆっくり落とします。左右で移動、上で回転、下で加速、スペースで一気に落とします。", "tetris.side": "落ちる図形", "tetris.help": "操作はゲーム内だけで有効です。矢印キーでページは動きません。", "tetris.board": "テトリスの盤面", "tetris.drop": "落とす", "tetris.rotate": "回転",
      "sudoku.kicker": "静かな毎日の練習", "sudoku.title": "今日の数独", "sudoku.intro": "一日一問。書く前に観察し、必要なら候補で考えを残します。", "sudoku.today": "今日", "sudoku.progress": "進捗", "sudoku.time": "時間", "sudoku.tools": "紙の道具", "sudoku.paper": "鉛筆モード", "sudoku.pen": "回答", "sudoku.notes": "メモ", "sudoku.highlight": "同じ数字を強調", "sudoku.highlight.help": "同じ数字と関係する範囲を表示", "sudoku.clean": "メモを自動整理", "sudoku.clean.help": "回答後に行・列・ブロックの候補を削除", "sudoku.autofill": "候補を入力", "sudoku.hint": "一マス見る", "sudoku.undo": "戻す", "sudoku.check": "確認", "sudoku.restart": "最初から", "sudoku.shortcuts": "キーボード：1–9 入力 · N メモ · Backspace 消去", "sudoku.learn": "盤面を学ぶ", "sudoku.guide": "数独を上手に解く方法", "sudoku.guide.intro": "数独は推測ではなく消去です。各行・列・ブロックに 1–9 が一度ずつ入ります。", "sudoku.scan": "まず見渡す", "sudoku.scan.detail": "埋まりかけた行・列・ブロックから、不足する数字と置ける位置を交差で確認します。", "sudoku.single": "唯一の候補を探す", "sudoku.single.detail": "八つの数字が除外されたら、残った数字が答えです。", "sudoku.pencil": "候補をメモする", "sudoku.pencil.detail": "すぐ決められないマスには候補を残し、回答のたびに古い候補を整理します。", "sudoku.pairs": "ペアを見つける", "sudoku.pairs.detail": "同じ二候補だけを持つ二マスがあれば、他のマスからその候補を除けます。", "sudoku.pause": "詰まったら休む", "sudoku.pause.detail": "一つのブロックに固執せず、別の埋まった場所を見直すと新しい唯一候補が見えます。", "sudoku.source": "詳しい解法ガイドを読む", "sudoku.select": "空のマスを選び、数字を入力します。進捗はこの端末に保存されます。", "sudoku.noteMode": "メモモード：数字を候補として記録します。", "sudoku.penMode": "回答モード：数字を答えとして入力します。", "sudoku.prefilled": "空きマスに現在の候補を入れました。さらに絞り込みましょう。", "sudoku.hinted": "一マス答えを表示しました。行・列・ブロックへの影響を見てください。", "sudoku.undone": "一つ前の操作に戻しました。", "sudoku.complete": "完成です。明日は新しい問題になります。", "sudoku.wrong": "答えと矛盾する数字を示しました。", "sudoku.correct": "ここまでは正解です。ゆっくり観察を続けましょう。", "sudoku.confirm": "今日の回答とメモを消去しますか？", "sudoku.resetDone": "今日の数独を最初から始めました。", "sudoku.empty": "、空欄", "sudoku.rowcol": "{row} 行 {col} 列{value}", "sudoku.number": "、数字 {number}", "sudoku.input": "{number} を入力", "sudoku.erase": "消去"
    }
  };

  const normalize = (value) => languages.includes(value) ? value : "zh-Hans";
  const browserLanguage = navigator.language?.toLowerCase() || "en";
  const inferredLanguage = browserLanguage.startsWith("zh") ? "zh-Hans" : browserLanguage.startsWith("fr") ? "fr" : browserLanguage.startsWith("ja") ? "ja" : "en";
  let language = normalize(localStorage.getItem("floscas-lang") || inferredLanguage);
  const format = (text, values = {}) => String(text || "").replace(/\{(\w+)\}/g, (_, key) => values[key] ?? "");
  const t = (key, values) => format(dictionaries[language]?.[key] ?? dictionaries.en[key] ?? key, values);

  const apply = (root = document) => {
    document.documentElement.lang = htmlLang[language];
    root.querySelectorAll("[data-game-i18n]").forEach((node) => { node.textContent = t(node.dataset.gameI18n); });
    root.querySelectorAll("[data-game-i18n-aria]").forEach((node) => { node.setAttribute("aria-label", t(node.dataset.gameI18nAria)); });
    root.querySelectorAll("[data-game-lang-current]").forEach((node) => { node.textContent = labels[language]; });
    root.querySelectorAll("[data-game-lang]").forEach((node) => { node.classList.toggle("is-active", node.dataset.gameLang === language); });
  };
  const setLanguage = (next) => {
    language = normalize(next);
    localStorage.setItem("floscas-lang", language);
    apply();
    dispatchEvent(new CustomEvent("floscas:languagechange", { detail: { language } }));
  };
  const mountMenus = () => {
    document.querySelectorAll("[data-game-language]").forEach((menu) => {
      const toggle = menu.querySelector("[data-game-lang-toggle]");
      const panel = menu.querySelector("[data-game-lang-panel]");
      toggle?.addEventListener("click", () => {
        const open = menu.classList.toggle("is-open");
        toggle.setAttribute("aria-expanded", String(open));
      });
      menu.querySelectorAll("[data-game-lang]").forEach((button) => button.addEventListener("click", () => {
        setLanguage(button.dataset.gameLang);
        menu.classList.remove("is-open");
        toggle?.setAttribute("aria-expanded", "false");
      }));
    });
    addEventListener("pointerdown", (event) => {
      document.querySelectorAll("[data-game-language].is-open").forEach((menu) => {
        if (!menu.contains(event.target)) {
          menu.classList.remove("is-open");
          menu.querySelector("[data-game-lang-toggle]")?.setAttribute("aria-expanded", "false");
        }
      });
    });
  };

  window.FloscasGames = { t, apply, setLanguage, getLanguage: () => language };
  addEventListener("DOMContentLoaded", () => { mountMenus(); apply(); });
  addEventListener("load", () => {
    if ("serviceWorker" in navigator) navigator.serviceWorker.register("/sw.js").catch(() => {});
  });
})();

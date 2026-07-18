(() => {
  "use strict";

  const now = new Date();
  const date = [
    now.getFullYear(),
    String(now.getMonth() + 1).padStart(2, "0"),
    String(now.getDate()).padStart(2, "0")
  ].join("-");
  const storageKey = `floscas-sudoku-v2-${date}`;

  const seedFn = (text) => {
    let h = 2166136261;
    for (const ch of text) {
      h ^= ch.charCodeAt(0);
      h = Math.imul(h, 16777619);
    }
    return () => {
      h += 0x6D2B79F5;
      let t = h;
      t = Math.imul(t ^ (t >>> 15), t | 1);
      t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  };

  const random = seedFn(date);
  const shuffle = (array) => {
    for (let i = array.length - 1; i > 0; i -= 1) {
      const j = Math.floor(random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const peers = (index) => {
    const row = Math.floor(index / 9);
    const col = index % 9;
    const result = new Set();
    for (let i = 0; i < 9; i += 1) {
      result.add(row * 9 + i);
      result.add(i * 9 + col);
    }
    const boxRow = Math.floor(row / 3) * 3;
    const boxCol = Math.floor(col / 3) * 3;
    for (let r = 0; r < 3; r += 1) {
      for (let c = 0; c < 3; c += 1) result.add((boxRow + r) * 9 + boxCol + c);
    }
    result.delete(index);
    return result;
  };

  const valid = (grid, index, value) => {
    for (const peer of peers(index)) if (grid[peer] === value) return false;
    return true;
  };

  const fill = (grid, index = 0) => {
    while (index < 81 && grid[index]) index += 1;
    if (index === 81) return true;
    for (const value of shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9])) {
      if (!valid(grid, index, value)) continue;
      grid[index] = value;
      if (fill(grid, index + 1)) return true;
      grid[index] = 0;
    }
    return false;
  };

  const countSolutions = (grid, limit = 2) => {
    let count = 0;
    const solve = () => {
      const index = grid.indexOf(0);
      if (index < 0) {
        count += 1;
        return;
      }
      for (let value = 1; value <= 9 && count < limit; value += 1) {
        if (!valid(grid, index, value)) continue;
        grid[index] = value;
        solve();
        grid[index] = 0;
      }
    };
    solve();
    return count;
  };

  const solution = Array(81).fill(0);
  fill(solution);
  const puzzle = [...solution];
  for (const index of shuffle([...Array(81).keys()])) {
    if (puzzle.filter(Boolean).length <= 36) break;
    const previous = puzzle[index];
    puzzle[index] = 0;
    if (countSolutions([...puzzle]) !== 1) puzzle[index] = previous;
  }

  const emptyNotes = () => Array.from({ length: 81 }, () => []);
  let saved;
  try { saved = JSON.parse(localStorage.getItem(storageKey) || "null"); } catch { saved = null; }

  let values = Array.isArray(saved?.values) && saved.values.length === 81 ? saved.values : [...puzzle];
  let notes = Array.isArray(saved?.notes) && saved.notes.length === 81 ? saved.notes : emptyNotes();
  let elapsed = Number.isFinite(saved?.elapsed) ? saved.elapsed : 0;
  let selected = -1;
  let noteMode = false;
  let history = [];

  const board = document.getElementById("board");
  const message = document.getElementById("message");
  const progress = document.getElementById("progress");
  const timer = document.getElementById("timer");
  const noteButton = document.getElementById("note-mode");
  const penButton = document.getElementById("pen-mode");
  const highlightToggle = document.getElementById("highlight-toggle");
  const autoRemoveToggle = document.getElementById("auto-remove-toggle");

  const persist = () => localStorage.setItem(storageKey, JSON.stringify({ values, notes, elapsed }));
  const snapshot = () => history.push({ values: [...values], notes: notes.map((item) => [...item]) });
  const candidateList = (index) => {
    if (values[index]) return [];
    return [1, 2, 3, 4, 5, 6, 7, 8, 9].filter((value) => valid(values, index, value));
  };

  const setMode = (isNotes) => {
    noteMode = isNotes;
    noteButton.classList.toggle("is-active", noteMode);
    noteButton.setAttribute("aria-pressed", String(noteMode));
    penButton.classList.toggle("is-active", !noteMode);
    penButton.setAttribute("aria-pressed", String(!noteMode));
    message.textContent = noteMode ? "笔记模式：数字会以候选数写入格子。" : "填数模式：数字会作为答案写入格子。";
  };

  const cleanPeerNotes = (index, value) => {
    if (!value || !autoRemoveToggle.checked) return;
    for (const peer of peers(index)) notes[peer] = notes[peer].filter((item) => item !== value);
  };

  const draw = () => {
    board.innerHTML = "";
    const selectedValue = selected >= 0 ? values[selected] : 0;
    const related = selected >= 0 ? peers(selected) : new Set();

    values.forEach((value, index) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "sudoku-cell";
      button.setAttribute("role", "gridcell");
      button.setAttribute("aria-label", `第 ${Math.floor(index / 9) + 1} 行，第 ${index % 9 + 1} 列${value ? `，数字 ${value}` : "，空格"}`);

      if (value) {
        const digit = document.createElement("span");
        digit.className = "sudoku-digit";
        digit.textContent = String(value);
        button.append(digit);
      } else if (notes[index]?.length) {
        const noteGrid = document.createElement("span");
        noteGrid.className = "sudoku-notes";
        for (let number = 1; number <= 9; number += 1) {
          const note = document.createElement("span");
          note.textContent = notes[index].includes(number) ? String(number) : "";
          noteGrid.append(note);
        }
        button.append(noteGrid);
      }

      if (puzzle[index]) button.classList.add("is-fixed");
      if (index === selected) button.classList.add("is-selected");
      if (related.has(index)) button.classList.add("is-related");
      if (highlightToggle.checked && selectedValue && value === selectedValue) button.classList.add("is-matching");
      if (value && !puzzle[index] && value !== solution[index]) button.dataset.wrong = "true";

      button.addEventListener("click", () => {
        selected = index;
        draw();
      });
      board.append(button);
    });

    progress.textContent = `${values.filter(Boolean).length} / 81`;
    document.getElementById("undo").disabled = history.length === 0;
    persist();
  };

  const enter = (value) => {
    if (selected < 0 || puzzle[selected]) return;
    snapshot();
    if (noteMode && value) {
      if (values[selected]) values[selected] = 0;
      const set = new Set(notes[selected]);
      set.has(value) ? set.delete(value) : set.add(value);
      notes[selected] = [...set].sort();
    } else {
      values[selected] = value;
      notes[selected] = [];
      cleanPeerNotes(selected, value);
    }
    draw();
  };

  const pad = document.getElementById("number-pad");
  [1, 2, 3, 4, 5, 6, 7, 8, 9, 0].forEach((value) => {
    const button = document.createElement("button");
    button.type = "button";
    button.setAttribute("aria-label", value ? `输入 ${value}` : "擦除");
    button.innerHTML = value ? `<span>${value}</span>` : `<span aria-hidden="true">×</span>`;
    button.addEventListener("click", () => enter(value));
    pad.append(button);
  });

  penButton.addEventListener("click", () => setMode(false));
  noteButton.addEventListener("click", () => setMode(true));
  highlightToggle.addEventListener("change", draw);

  document.getElementById("autofill").addEventListener("click", () => {
    snapshot();
    notes = notes.map((item, index) => values[index] ? [] : candidateList(index));
    message.textContent = "已为所有空格预填当前可用候选。继续用排除法缩小范围。";
    setMode(true);
    draw();
  });

  document.getElementById("hint").addEventListener("click", () => {
    const index = selected >= 0 && !puzzle[selected] && !values[selected]
      ? selected
      : values.findIndex((value, item) => !value && !puzzle[item]);
    if (index < 0) return;
    snapshot();
    selected = index;
    values[index] = solution[index];
    notes[index] = [];
    cleanPeerNotes(index, solution[index]);
    message.textContent = "已填入一格提示。观察它如何改变同行、同列和同宫的候选。";
    draw();
  });

  document.getElementById("undo").addEventListener("click", () => {
    const previous = history.pop();
    if (!previous) return;
    values = previous.values;
    notes = previous.notes;
    message.textContent = "已撤销上一步。";
    draw();
  });

  document.getElementById("check").addEventListener("click", () => {
    const wrong = values.some((value, index) => value && value !== solution[index]);
    const complete = values.every(Boolean) && !wrong;
    board.querySelectorAll(".sudoku-cell").forEach((cell) => cell.classList.toggle("is-error", cell.dataset.wrong === "true"));
    message.textContent = complete
      ? "完成了。明天会有一道新的题目。"
      : wrong
        ? "有数字与答案冲突，已为你标出。"
        : "目前填写正确。慢一点，继续观察。";
  });

  document.getElementById("reset").addEventListener("click", () => {
    if (!window.confirm("清除今天的填写与笔记记录？")) return;
    values = [...puzzle];
    notes = emptyNotes();
    history = [];
    selected = -1;
    elapsed = 0;
    message.textContent = "已重新开始今天的数独。";
    draw();
  });

  document.querySelectorAll(".technique-button").forEach((button) => {
    button.addEventListener("click", () => {
      const detail = button.nextElementSibling;
      const expanded = button.getAttribute("aria-expanded") === "true";
      button.setAttribute("aria-expanded", String(!expanded));
      detail.hidden = expanded;
    });
  });

  addEventListener("keydown", (event) => {
    if (/^[1-9]$/.test(event.key)) enter(Number(event.key));
    if (event.key === "Backspace" || event.key === "Delete" || event.key === "0") enter(0);
    if (event.key.toLowerCase() === "n") setMode(!noteMode);
    if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(event.key) && selected >= 0) {
      event.preventDefault();
      const offsets = { ArrowUp: -9, ArrowDown: 9, ArrowLeft: -1, ArrowRight: 1 };
      const next = selected + offsets[event.key];
      if (next >= 0 && next < 81) {
        selected = next;
        draw();
      }
    }
  });

  document.getElementById("date-label").textContent = date.replaceAll("-", ".");
  setInterval(() => {
    elapsed += 1;
    const minutes = String(Math.floor(elapsed / 60)).padStart(2, "0");
    const seconds = String(elapsed % 60).padStart(2, "0");
    timer.textContent = `${minutes}:${seconds}`;
    if (elapsed % 10 === 0) persist();
  }, 1000);

  draw();
})();

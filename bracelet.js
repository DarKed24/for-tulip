/* Friendship Bracelet Studio — type a word, string the beads, stack them up. */

const BEAD_COLORS = ["#fb6f92", "#ffd28a", "#b06ee0", "#8ac4e8", "#a8dcc0", "#fff0f3", "#e63956", "#ffb347"];

function braceletBeads(word, size) {
  return [...word].map((ch, i) => {
    const heart = ch === "♥" || ch === "♡";
    const bg = heart ? "#fff0f3" : BEAD_COLORS[i % BEAD_COLORS.length];
    return `<span class="bead ${size || ""}" style="background:${bg};transform:rotate(${((i * 47) % 17) - 8}deg)">${heart ? "♥" : ch}</span>`;
  }).join("");
}

function initBracelet() {
  const wrap = document.getElementById("bracelet-maker");
  const cfg = CONFIG.eras.bracelet;
  wrap.innerHTML = `
    <p class="studio-step-label">${cfg.label}</p>
    <p class="bm-intro">${cfg.intro}</p>
    <div class="bm-preview-string"><div class="bm-preview" id="bm-preview"></div></div>
    <div class="bm-controls">
      <input id="bm-input" maxlength="12" autocomplete="off" spellcheck="false"
             placeholder="type a word…" aria-label="Bracelet text" />
      <button class="btn btn-primary" id="bm-add">string it 📿</button>
    </div>
    <div class="bm-presets" id="bm-presets">
      ${cfg.presets.map((p) => `<button class="bm-chip">${p}</button>`).join("")}
    </div>
    <p class="studio-step-label bm-stack-label">your stack</p>
    <div class="bm-stack" id="bm-stack"></div>`;

  const input = wrap.querySelector("#bm-input");
  const preview = wrap.querySelector("#bm-preview");
  const stackEl = wrap.querySelector("#bm-stack");

  function loadStack() {
    const saved = JSON.parse(localStorage.getItem("tulip.bracelets") || "null");
    return saved && saved.length ? saved : [cfg.starter];
  }
  function saveStack(stack) {
    localStorage.setItem("tulip.bracelets", JSON.stringify(stack));
  }

  function clean(text) {
    return text
      .toUpperCase()
      .replace(/\s/g, "♥")
      .replace(/[^A-Z0-9♥★☆!?.]/g, "")
      .slice(0, 12);
  }

  function renderPreview() {
    const word = clean(input.value) || "…";
    preview.innerHTML = braceletBeads(word);
    const last = preview.lastElementChild;
    if (last) {
      last.classList.add("bead-pop");
    }
  }

  function renderStack() {
    const stack = loadStack();
    stackEl.innerHTML = stack
      .map(
        (w, i) =>
          `<div class="bm-bracelet" style="rotate:${((i * 53) % 7) - 3}deg">${braceletBeads(w, "bead-sm")}</div>`
      )
      .join("");
  }

  function addBracelet() {
    const word = clean(input.value);
    if (!word) {
      input.focus();
      return;
    }
    const stack = loadStack();
    stack.unshift(word);
    saveStack(stack.slice(0, 10)); // the wrist has limits
    renderStack();
    input.value = "";
    renderPreview();
    const r = stackEl.getBoundingClientRect();
    petalBurst(r.left + r.width / 2, r.top + 20, 10);
  }

  input.addEventListener("input", renderPreview);
  input.addEventListener("keydown", (e) => e.key === "Enter" && addBracelet());
  wrap.querySelector("#bm-add").addEventListener("click", addBracelet);
  wrap.querySelectorAll(".bm-chip").forEach((chip) =>
    chip.addEventListener("click", () => {
      input.value = chip.textContent;
      renderPreview();
    })
  );

  renderPreview();
  renderStack();
}

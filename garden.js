/* The Garden of Nineteen — tap a bud, it blooms and reveals a note. */

function initGarden() {
  const field = document.getElementById("garden-field");
  const progress = document.getElementById("garden-progress");
  const modal = document.getElementById("note-modal");
  const modalTulip = document.getElementById("modal-tulip");
  const noteNum = document.getElementById("note-num");
  const noteText = document.getElementById("note-text");

  const notes = CONFIG.garden.notes;
  const total = notes.length;
  const bloomed = new Set(
    JSON.parse(localStorage.getItem("tulip.bloomed") || "[]")
  );

  const ordinal = (n) =>
    n + (["th", "st", "nd", "rd"][((n % 100) - 20) % 10] || ["th", "st", "nd", "rd"][n % 100] || "th");

  function updateProgress() {
    if (bloomed.size === total) {
      progress.innerHTML = `all ${total} bloomed 🌷 — the whole garden is yours, cutiepie`;
      if (!progress.dataset.celebrated) {
        progress.dataset.celebrated = "1";
        const r = progress.getBoundingClientRect();
        petalBurst(r.left + r.width / 2, r.top, 22);
      }
    } else {
      progress.textContent = `${bloomed.size} of ${total} tulips bloomed`;
    }
  }

  notes.forEach((note, i) => {
    const cell = document.createElement("button");
    const palette = i % TULIP_PALETTES.length;
    cell.className = "garden-tulip " + (bloomed.has(i) ? "bloomed" : "bud");
    cell.setAttribute("aria-label", `Tulip ${i + 1}${bloomed.has(i) ? "" : " — tap to bloom"}`);
    cell.innerHTML =
      tulipSVG(palette, { sway: true, delay: (i * 0.37) % 5 }) +
      `<span class="tulip-num">${i + 1}</span>`;
    cell.addEventListener("click", () => {
      const firstTime = !bloomed.has(i);
      if (firstTime) {
        bloomed.add(i);
        localStorage.setItem("tulip.bloomed", JSON.stringify([...bloomed]));
        cell.classList.remove("bud");
        cell.classList.add("bloomed");
        cell.setAttribute("aria-label", `Tulip ${i + 1}`);
        const r = cell.getBoundingClientRect();
        petalBurst(r.left + r.width / 2, r.top + r.height * 0.3, 10);
        updateProgress();
      }
      // open the note (after a beat so the bloom is visible first)
      setTimeout(() => {
        modalTulip.innerHTML = tulipSVG(palette);
        noteNum.textContent = `the ${ordinal(i + 1)} tulip`;
        noteText.textContent = note;
        modal.hidden = false;
        document.body.style.overflow = "hidden";
      }, firstTime ? 520 : 0);
    });
    field.appendChild(cell);
  });

  modal.addEventListener("click", (e) => {
    if (e.target.closest("[data-close]")) {
      modal.hidden = true;
      document.body.style.overflow = "";
    }
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !modal.hidden) {
      modal.hidden = true;
      document.body.style.overflow = "";
    }
  });

  updateProgress();
}

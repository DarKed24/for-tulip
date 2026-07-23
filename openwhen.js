/* Open When… — sealed envelopes for future moments. Two taps to open:
   the first tap is a gentle "are you sure the moment is real?" */

function initOpenWhen() {
  const grid = document.getElementById("ow-grid");

  CONFIG.openwhen.items.forEach((item, i) => {
    const card = document.createElement("div");
    card.className = "ow-card reveal";
    card.innerHTML = `
      <button class="ow-env" aria-label="Open when ${item.label}">
        <div class="ow-env-body">
          <div class="ow-env-flap"></div>
          <div class="ow-env-seal">🌷</div>
        </div>
        <p class="ow-label">open when<br><strong>${item.label}</strong></p>
        <p class="ow-hint" hidden>save me for the real moment… tap again if it's now 🤍</p>
      </button>
      <div class="ow-note" hidden>
        <p class="ow-note-title">open when ${item.label}</p>
        <p class="ow-note-text"></p>
        <button class="btn btn-ghost ow-close">seal it back</button>
      </div>`;
    card.querySelector(".ow-note-text").textContent = item.text;

    const env = card.querySelector(".ow-env");
    const hint = card.querySelector(".ow-hint");
    const note = card.querySelector(".ow-note");
    let armed = false, disarmTimer;

    env.addEventListener("click", () => {
      if (!armed) {
        armed = true;
        hint.hidden = false;
        env.classList.add("ow-armed");
        clearTimeout(disarmTimer);
        disarmTimer = setTimeout(() => {
          armed = false;
          hint.hidden = true;
          env.classList.remove("ow-armed");
        }, 3500);
        return;
      }
      clearTimeout(disarmTimer);
      env.classList.add("ow-opening");
      const r = env.getBoundingClientRect();
      petalBurst(r.left + r.width / 2, r.top + 30, 8);
      setTimeout(() => {
        env.hidden = true;
        note.hidden = false;
      }, 550);
    });

    card.querySelector(".ow-close").addEventListener("click", () => {
      note.hidden = true;
      env.hidden = false;
      env.classList.remove("ow-opening", "ow-armed");
      hint.hidden = true;
      armed = false;
    });

    grid.appendChild(card);
  });

  const io = new IntersectionObserver(
    (es) => es.forEach((e) => e.isIntersecting && e.target.classList.add("on")),
    { threshold: 0.1 }
  );
  grid.querySelectorAll(".ow-card").forEach((el) => io.observe(el));
}

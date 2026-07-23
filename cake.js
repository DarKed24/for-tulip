/* Nineteen candles. Tap each flame to blow it out; the last one grants a wish. */

function initCake() {
  const stage = document.getElementById("cake-stage");
  const status = document.getElementById("cake-status");
  const relight = document.getElementById("cake-relight");

  const CANDLE_COLORS = ["#ffa5c0", "#fff0c9", "#d19bf0", "#a8dcc0", "#ffd28a"];
  // 7 candles on the top tier, 12 on the bottom ledge
  const spots = [];
  for (let i = 0; i < 7; i++) spots.push({ x: 122 + i * 19.5, y: 96 });
  for (let i = 0; i < 12; i++) spots.push({ x: 76 + i * 19, y: 152 });

  let out = 0;
  let done = false;

  function candleSVG(i) {
    const { x, y } = spots[i];
    const c = CANDLE_COLORS[i % CANDLE_COLORS.length];
    return `
    <g class="candle" data-i="${i}" transform="translate(${x} ${y})">
      <rect x="-3.2" y="-24" width="6.4" height="24" rx="2" fill="${c}"/>
      <rect x="-3.2" y="-18" width="6.4" height="3.4" fill="rgba(0,0,0,.12)"/>
      <rect x="-3.2" y="-9" width="6.4" height="3.4" fill="rgba(0,0,0,.12)"/>
      <line x1="0" y1="-24" x2="0" y2="-27" stroke="#5a4632" stroke-width="1.4"/>
      <g class="flame" style="animation-delay:${(i * 0.13) % 0.6}s">
        <ellipse cx="0" cy="-33" rx="5" ry="8" fill="#ffb347" opacity=".9"/>
        <ellipse cx="0" cy="-31.5" rx="2.6" ry="4.6" fill="#fff0c9"/>
      </g>
      <circle class="candle-hit" cx="0" cy="-31" r="13" fill="transparent"/>
    </g>`;
  }

  function build() {
    stage.innerHTML = `
    <svg viewBox="0 0 360 250" class="cake-svg">
      <ellipse cx="180" cy="228" rx="150" ry="16" fill="rgba(255,255,255,.10)"/>
      <!-- bottom tier -->
      <rect x="62" y="152" width="236" height="66" rx="12" fill="#f2c3d2"/>
      <path d="M62 164 q10 16 20 0 q10 16 20 0 q10 16 20 0 q10 16 20 0 q10 16 19 0 q10 16 20 0 q10 16 20 0 q10 16 20 0 q10 16 20 0 q10 16 19 0 q10 16 20 0 q9 14 18 2 v-14 h-236 Z" fill="#fdf3f6"/>
      <!-- top tier -->
      <rect x="104" y="96" width="152" height="56" rx="11" fill="#e8a9bf"/>
      <path d="M104 108 q9 14 19 0 q9 14 19 0 q9 14 19 0 q9 14 19 0 q9 14 19 0 q9 14 19 0 q9 14 19 0 q9 12 19 1 v-13 h-152 Z" fill="#fdf3f6"/>
      <!-- sprinkles -->
      ${Array.from({ length: 26 }, () => {
        const sx = 70 + Math.random() * 220, sy = 176 + Math.random() * 36;
        const sc = CANDLE_COLORS[(Math.random() * 5) | 0];
        return `<rect x="${sx}" y="${sy}" width="4.4" height="2" rx="1" fill="${sc}" transform="rotate(${Math.random() * 180} ${sx} ${sy})"/>`;
      }).join("")}
      ${spots.map((_, i) => candleSVG(i)).join("")}
    </svg>`;
    out = 0;
    done = false;
    relight.hidden = true;
    status.textContent = "19 flames dancing…";
    stage.querySelectorAll(".candle").forEach((g) => {
      g.addEventListener("click", () => puff(g), { once: true });
    });
  }

  function puff(g) {
    if (done && !g) return;
    const flame = g.querySelector(".flame");
    flame.classList.add("flame-out");
    // a wisp of smoke
    const smoke = document.createElementNS("http://www.w3.org/2000/svg", "path");
    smoke.setAttribute("d", "M0 -30 q4 -6 0 -12 q-4 -6 1 -13");
    smoke.setAttribute("class", "smoke");
    g.appendChild(smoke);
    setTimeout(() => smoke.remove(), 1300);

    out++;
    if (out >= spots.length) {
      done = true;
      status.textContent = CONFIG.cake.wish;
      setTimeout(() => { if (done) status.textContent = CONFIG.cake.done; }, 6000);
      const r = stage.getBoundingClientRect();
      petalBurst(r.left + r.width / 2, r.top + r.height / 2, 24);
      relight.hidden = false;
    } else {
      const left = spots.length - out;
      status.textContent =
        left <= 3
          ? `${left} left — almost wish time…`
          : `${left} flames to go`;
    }
  }

  relight.addEventListener("click", build);
  build();
}

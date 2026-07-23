/* Shared SVG tulip generator — used by the garden, modal and bouquet. */

const TULIP_PALETTES = [
  { petal: "#fb6f92", deep: "#e0507a", light: "#ffa5c0" }, // pink
  { petal: "#e63956", deep: "#c22843", light: "#ff7d92" }, // red
  { petal: "#b06ee0", deep: "#8f4ec2", light: "#d19bf0" }, // purple
  { petal: "#ffb347", deep: "#e8942a", light: "#ffd28a" }, // amber
  { petal: "#fff0f3", deep: "#e8c9d4", light: "#ffffff" }, // white
];

/**
 * Returns SVG markup for a tulip. viewBox 0 0 100 170.
 * opts: { palette, sway (bool), delay (s) }
 */
function tulipSVG(paletteIdx = 0, opts = {}) {
  const p = TULIP_PALETTES[paletteIdx % TULIP_PALETTES.length];
  const swayClass = opts.sway ? "tulip-sway" : "";
  const delay = opts.delay != null ? `style="animation-delay:${opts.delay}s"` : "";
  return `
  <svg class="tulip-svg ${swayClass}" ${delay} viewBox="0 0 100 170" aria-hidden="true">
    <g class="tulip-plant">
      <path class="tulip-stem" d="M50 62 C 50 100, 49 130, 50 168" stroke="#5a9e6f" stroke-width="4.5" fill="none" stroke-linecap="round"/>
      <path class="tulip-leaf" d="M50 128 C 26 122, 16 98, 20 84 C 40 92, 50 108, 51 126 Z" fill="#6db284"/>
      <path class="tulip-leaf" d="M50 144 C 72 138, 84 116, 81 102 C 62 108, 51 126, 49 142 Z" fill="#5a9e6f"/>
      <g class="tulip-head">
        <path class="petal petal-l" d="M50 64 C 30 60, 22 38, 26 16 C 40 24, 49 40, 50 60 Z" fill="${p.deep}"/>
        <path class="petal petal-r" d="M50 64 C 70 60, 78 38, 74 16 C 60 24, 51 40, 50 60 Z" fill="${p.deep}"/>
        <path class="petal petal-c" d="M50 66 C 36 56, 34 28, 50 8 C 66 28, 64 56, 50 66 Z" fill="${p.petal}"/>
        <path class="petal petal-shine" d="M46 52 C 41 42, 42 26, 49 15 C 52 26, 51 44, 48 54 Z" fill="${p.light}" opacity=".55"/>
      </g>
    </g>
  </svg>`;
}

/* Small helper: burst of floating petals/sparkles at (x, y) in viewport px. */
function petalBurst(x, y, count = 14) {
  if (window.__reducedMotion) return;
  for (let i = 0; i < count; i++) {
    const el = document.createElement("div");
    el.className = "burst-petal";
    el.textContent = ["🌷", "✿", "❀", "✨"][i % 4];
    const ang = (Math.PI * 2 * i) / count + Math.random() * 0.6;
    const dist = 60 + Math.random() * 90;
    el.style.left = x + "px";
    el.style.top = y + "px";
    el.style.setProperty("--dx", Math.cos(ang) * dist + "px");
    el.style.setProperty("--dy", Math.sin(ang) * dist - 40 + "px");
    el.style.setProperty("--rot", (Math.random() * 360 - 180) + "deg");
    el.style.fontSize = 12 + Math.random() * 14 + "px";
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 1400);
  }
}

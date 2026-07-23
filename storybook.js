/* The Princess & Her Knight — a tiny tap-through storybook. */

const STORY_ART = {
  castle: () => `
    <svg viewBox="0 0 300 170">
      <circle cx="248" cy="34" r="18" fill="#fff0c9" opacity=".9"/>
      ${Array.from({ length: 16 }, () =>
        `<circle cx="${Math.random() * 300}" cy="${Math.random() * 70}" r="${0.8 + Math.random() * 1.4}" fill="#fff" opacity="${0.3 + Math.random() * 0.6}"/>`
      ).join("")}
      <g fill="#241636">
        <rect x="60" y="80" width="30" height="90" rx="3"/>
        <path d="M58 80 h34 l-17 -24 Z"/>
        <rect x="210" y="80" width="30" height="90" rx="3"/>
        <path d="M208 80 h34 l-17 -24 Z"/>
        <rect x="100" y="104" width="100" height="66"/>
        <rect x="130" y="62" width="40" height="108" rx="4"/>
        <path d="M126 62 h48 l-24 -32 Z"/>
      </g>
      <line x1="150" y1="30" x2="150" y2="16" stroke="#241636" stroke-width="3"/>
      <path d="M150 16 l20 5 -20 6 Z" fill="#fb6f92"/>
      <rect x="143" y="120" width="14" height="30" rx="7" fill="#ffd28a" opacity=".85"/>
      <rect x="70" y="96" width="9" height="14" rx="4" fill="#ffd28a" opacity=".6"/>
      <rect x="220" y="96" width="9" height="14" rx="4" fill="#ffd28a" opacity=".6"/>
    </svg>`,
  knight: () => `
    <svg viewBox="0 0 300 170">
      <g transform="translate(150 88)">
        <path d="M-40 -34 a40 40 0 0 1 80 0 v30 a8 8 0 0 1 -8 8 h-64 a8 8 0 0 1 -8 -8 Z" fill="#b8c4d8"/>
        <rect x="-32" y="-16" width="64" height="10" rx="5" fill="#2a1a3f"/>
        <circle cx="-14" cy="-11" r="3.4" fill="#ffd28a"/>
        <circle cx="14" cy="-11" r="3.4" fill="#ffd28a"/>
        <path d="M-4 -74 q4 -14 8 0 q14 4 0 10 q-4 12 -8 0 q-14 -6 0 -10 Z" fill="#fb6f92"/>
        <path d="M0 -34 v-32" stroke="#fb6f92" stroke-width="3" stroke-linecap="round"/>
      </g>
      <g transform="translate(66 96) rotate(-14)">
        <path d="M0 -30 c14 4 24 2 30 -4 v26 c0 20 -12 32 -30 40 c-18 -8 -30 -20 -30 -40 v-26 c6 6 16 8 30 4 Z" fill="#e0507a"/>
        <path d="M0 -6 c5 -8 14 -4 14 3 c0 7 -8 11 -14 16 c-6 -5 -14 -9 -14 -16 c0 -7 9 -11 14 -3 Z" fill="#fff0f3"/>
      </g>
      <g transform="translate(238 100) rotate(12)">
        <rect x="-3" y="-46" width="6" height="70" rx="3" fill="#c9b8cf"/>
        <rect x="-16" y="-46" width="32" height="8" rx="4" fill="#ffd28a"/>
        <path d="M-3 -46 h6 l-3 -14 Z" fill="#e6ecf5"/>
      </g>
    </svg>`,
  panda: () => `
    <svg viewBox="0 0 300 170">
      ${Array.from({ length: 10 }, () =>
        `<circle cx="${Math.random() * 300}" cy="${Math.random() * 50}" r="${0.8 + Math.random() * 1.2}" fill="#fff" opacity="${0.3 + Math.random() * 0.5}"/>`
      ).join("")}
      <g transform="translate(28 22) scale(0.85)">${redPandaSVG().replace(/^\s*<svg[^>]*>|<\/svg>\s*$/g, "")}</g>
      <g transform="translate(216 60)">
        <path d="M-26 0 a26 26 0 0 1 52 0 v14 h-52 Z" fill="#b8c4d8" opacity=".9"/>
        <rect x="-20" y="6" width="40" height="7" rx="3.5" fill="#2a1a3f"/>
        <path d="M-2 -40 q3 -10 6 0 q10 3 0 7 q-3 9 -6 0 q-10 -4 0 -7 Z" fill="#fb6f92"/>
      </g>
      <text x="216" y="118" text-anchor="middle" font-size="16" fill="#e8dcee" font-style="italic" font-family="Cormorant Garamond, serif">"…a red panda."</text>
      <text x="216" y="140" text-anchor="middle" font-size="12" fill="#a893b0" font-style="italic" font-family="Cormorant Garamond, serif">— the princess, official decree</text>
    </svg>`,
  garden: () => `
    <svg viewBox="0 0 300 170">
      <path d="M0 150 q75 -14 150 0 q75 14 150 0 v20 h-300 Z" fill="#2c3d33"/>
      ${[40, 82, 124, 166, 208, 250].map((x, i) => {
        const c = ["#fb6f92", "#e63956", "#b06ee0", "#ffb347", "#fff0f3", "#fb6f92"][i];
        const h = 34 + (i % 3) * 10;
        return `
        <g transform="translate(${x} 150)">
          <path d="M0 0 v-${h}" stroke="#5a9e6f" stroke-width="3" stroke-linecap="round"/>
          <path d="M0 -${h * 0.45} c-8 -2 -12 -10 -10 -16 c8 2 10 8 10 16 Z" fill="#6db284"/>
          <path d="M0 -${h} c-8 -2 -11 -12 -8 -22 c5 4 8 10 8 16 c0 -6 3 -12 8 -16 c3 10 0 20 -8 22 Z" fill="${c}"/>
        </g>`;
      }).join("")}
      <path d="M150 34 q4 -12 8 0 q12 4 0 9 q-4 12 -8 0 q-12 -5 0 -9 Z" fill="#ffd28a" opacity=".9"/>
      <circle cx="46" cy="36" r="2" fill="#fff" opacity=".7"/>
      <circle cx="258" cy="52" r="2" fill="#fff" opacity=".6"/>
    </svg>`,
  heart: () => `
    <svg viewBox="0 0 300 170">
      <g transform="translate(150 84)">
        <path d="M0 -18 c14 -26 46 -14 46 8 c0 22 -26 36 -46 50 c-20 -14 -46 -28 -46 -50 c0 -22 32 -34 0 -8 Z" fill="none"/>
        <path d="M0 46 C-22 30 -46 14 -46 -10 C-46 -32 -14 -42 0 -20 C14 -42 46 -32 46 -10 C46 14 22 30 0 46 Z" fill="#fb6f92"/>
        <path d="M-12 -6 c4 -8 14 -5 14 2 c0 7 -8 11 -14 16 c-6 -5 -14 -9 -14 -16 c0 -7 10 -10 14 -2 Z" fill="#fff0f3" opacity=".9" transform="translate(12 -2)"/>
        <path d="M-30 -46 q3 -9 6 0 q9 3 0 6 q-3 9 -6 0 q-9 -3 0 -6 Z" fill="#ffd28a"/>
        <path d="M28 -52 q2 -7 5 0 q7 2 0 5 q-2 7 -5 0 q-7 -3 0 -5 Z" fill="#ffd28a" opacity=".8"/>
      </g>
      <text x="150" y="152" text-anchor="middle" font-size="14" fill="#c9b8cf" font-style="italic" font-family="Cormorant Garamond, serif">chapter nineteen, of many</text>
    </svg>`,
};

function initStorybook() {
  const pages = CONFIG.story.pages;
  const art = document.getElementById("story-art");
  const text = document.getElementById("story-text");
  const dots = document.getElementById("story-dots");
  const prev = document.getElementById("story-prev");
  const next = document.getElementById("story-next");
  const card = document.getElementById("story-card");
  let idx = 0;

  dots.innerHTML = pages
    .map((_, i) => `<button class="story-dot" data-i="${i}" aria-label="Page ${i + 1}"></button>`)
    .join("");

  function show(i, dir) {
    idx = Math.max(0, Math.min(pages.length - 1, i));
    const page = pages[idx];
    card.classList.remove("turn-left", "turn-right");
    void card.offsetWidth;
    card.classList.add(dir === -1 ? "turn-right" : "turn-left");
    art.innerHTML = (STORY_ART[page.art] || STORY_ART.heart)();
    text.textContent = page.text;
    prev.disabled = idx === 0;
    next.disabled = idx === pages.length - 1;
    dots.querySelectorAll(".story-dot").forEach((d, j) =>
      d.classList.toggle("active", j === idx)
    );
  }

  prev.addEventListener("click", () => show(idx - 1, -1));
  next.addEventListener("click", () => show(idx + 1, 1));
  dots.addEventListener("click", (e) => {
    const d = e.target.closest(".story-dot");
    if (d) show(+d.dataset.i, +d.dataset.i > idx ? 1 : -1);
  });

  // swipe support
  let touchX = null;
  card.addEventListener("touchstart", (e) => (touchX = e.touches[0].clientX), { passive: true });
  card.addEventListener("touchend", (e) => {
    if (touchX == null) return;
    const dx = e.changedTouches[0].clientX - touchX;
    if (dx < -40) show(idx + 1, 1);
    else if (dx > 40) show(idx - 1, -1);
    touchX = null;
  });

  show(0, 1);
}

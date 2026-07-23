/* The resident red panda. Lives in the corner, dispenses wisdom. */

function redPandaSVG() {
  return `
  <svg viewBox="0 0 120 120" aria-hidden="true">
    <!-- tail peeking from behind -->
    <g transform="rotate(24 95 95)">
      <path d="M86 60 q26 8 22 44 q-16 6 -24 -6 q-8 -12 2 -38 Z" fill="#b3502e"/>
      <path d="M92 74 q10 4 12 14 l-16 4 q-2 -10 4 -18 Z" fill="#7a3018" opacity=".8"/>
      <path d="M98 96 q6 2 8 8 l-12 3 q0 -7 4 -11 Z" fill="#7a3018" opacity=".8"/>
    </g>
    <!-- ears -->
    <path d="M18 38 Q14 10 40 16 L46 34 Z" fill="#a54425"/>
    <path d="M24 34 Q23 20 38 22 L42 33 Z" fill="#f2e3d5"/>
    <path d="M102 38 Q106 10 80 16 L74 34 Z" fill="#a54425"/>
    <path d="M96 34 Q97 20 82 22 L78 33 Z" fill="#f2e3d5"/>
    <!-- head -->
    <circle cx="60" cy="62" r="44" fill="#c9613c"/>
    <!-- white cheeks + brow spots -->
    <ellipse cx="26" cy="72" rx="16" ry="20" fill="#f2e3d5"/>
    <ellipse cx="94" cy="72" rx="16" ry="20" fill="#f2e3d5"/>
    <ellipse cx="44" cy="40" rx="8" ry="6" fill="#f2e3d5"/>
    <ellipse cx="76" cy="40" rx="8" ry="6" fill="#f2e3d5"/>
    <!-- rust tear streaks -->
    <path d="M38 60 q-4 12 -12 18 q-2 -14 6 -22 Z" fill="#8f3c1e" opacity=".65"/>
    <path d="M82 60 q4 12 12 18 q2 -14 -6 -22 Z" fill="#8f3c1e" opacity=".65"/>
    <!-- muzzle -->
    <ellipse cx="60" cy="80" rx="22" ry="18" fill="#f7ece1"/>
    <!-- eyes -->
    <g class="panda-eyes">
      <circle cx="44" cy="58" r="6" fill="#2b1a12"/>
      <circle cx="76" cy="58" r="6" fill="#2b1a12"/>
      <circle cx="46" cy="56" r="2" fill="#fff"/>
      <circle cx="78" cy="56" r="2" fill="#fff"/>
    </g>
    <!-- nose + smile -->
    <path d="M54 72 q6 -5 12 0 q-3 7 -6 7 q-3 0 -6 -7 Z" fill="#3a241a"/>
    <path d="M60 79 v5 M60 84 q-6 7 -13 3 M60 84 q6 7 13 3" stroke="#3a241a" stroke-width="2.4" fill="none" stroke-linecap="round"/>
  </svg>`;
}

function initPanda() {
  const lines = CONFIG.panda.lines;
  let lineIdx = 0;

  const wrap = document.createElement("div");
  wrap.className = "panda-wrap";
  wrap.innerHTML = `
    <div class="panda-bubble" id="panda-bubble" hidden></div>
    <button class="panda-btn" id="panda-btn" aria-label="Talk to the red panda">
      ${redPandaSVG()}
    </button>`;
  document.getElementById("site").appendChild(wrap);

  const btn = document.getElementById("panda-btn");
  const bubble = document.getElementById("panda-bubble");
  let hideTimer;

  function say(text, ms = 6000) {
    bubble.textContent = text;
    bubble.hidden = false;
    bubble.classList.remove("pop");
    void bubble.offsetWidth; // restart the pop animation
    bubble.classList.add("pop");
    clearTimeout(hideTimer);
    hideTimer = setTimeout(() => (bubble.hidden = true), ms);
  }

  btn.addEventListener("click", () => {
    say(lines[lineIdx % lines.length]);
    lineIdx++;
    btn.classList.remove("bounce");
    void btn.offsetWidth;
    btn.classList.add("bounce");
  });

  // a shy hello once she's had a moment to look around
  setTimeout(() => {
    if (bubble.hidden) say(lines[0], 7000), lineIdx = 1;
  }, 4500);

  // occasional wiggle so she notices him
  setInterval(() => {
    if (bubble.hidden) {
      btn.classList.remove("bounce");
      void btn.offsetWidth;
      btn.classList.add("bounce");
    }
  }, 40000);
}

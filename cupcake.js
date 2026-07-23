/* A Cupcake for a Cupcake — pick, decorate, serve. */

const CC_LINERS = [
  { name: "rose", c: "#e88aa8", d: "#c9628a" },
  { name: "lilac", c: "#b48ad8", d: "#8f62b8" },
  { name: "mint", c: "#8ecfb0", d: "#5fa888" },
  { name: "honey", c: "#e8bc6a", d: "#c49440" },
];
const CC_FROSTINGS = [
  { name: "strawberry", c: "#fba5bd", hi: "#ffd3e0" },
  { name: "vanilla", c: "#f7ecd7", hi: "#fffaf0" },
  { name: "lavender", c: "#c9a6e8", hi: "#e5d3f7" },
  { name: "pistachio", c: "#a8d8b4", hi: "#cfeed6" },
  { name: "chocolate", c: "#8a5a3c", hi: "#b0805e" },
];
const CC_TOPPINGS = [
  { key: "sprinkles", label: "sprinkles" },
  { key: "cherry", label: "cherry" },
  { key: "tulip", label: "a tulip" },
  { key: "candle", label: "a candle" },
  { key: "sparkle", label: "sparkles" },
];

function initCupcake() {
  const stageEl = document.getElementById("cc-stage");
  const linersEl = document.getElementById("cc-liners");
  const frostingsEl = document.getElementById("cc-frostings");
  const toppingsEl = document.getElementById("cc-toppings");
  const serveBtn = document.getElementById("cc-serve");
  const lineEl = document.getElementById("cc-line");
  const boxEl = document.getElementById("cc-box");
  const boxLabel = document.getElementById("cc-box-label");
  boxLabel.textContent = CONFIG.cupcake.boxLine;

  let liner = 0, frosting = 0, served = false;
  const toppings = new Set(["sprinkles"]);

  const sprinkleSpots = Array.from({ length: 14 }, (_, i) => ({
    x: 70 + ((i * 37) % 62), y: 62 + ((i * 23) % 40), r: (i * 61) % 180,
  }));

  function cupcakeSVG(scale) {
    const L = CC_LINERS[liner], F = CC_FROSTINGS[frosting];
    return `
    <svg viewBox="0 0 200 190" class="cc-svg" style="${scale ? `height:${scale}px` : ""}">
      <!-- frosting swirl -->
      <g>
        <path d="M52 116 q-8 -18 12 -22 q-14 -14 8 -22 q-6 -16 16 -16 q2 -14 14 -12 q12 -2 14 12 q22 0 16 16 q22 8 8 22 q20 4 12 22 Z" fill="${F.c}"/>
        <path d="M64 78 q-4 -12 12 -14 q0 -12 14 -12 q4 -8 12 -6" stroke="${F.hi}" stroke-width="5" fill="none" stroke-linecap="round" opacity=".8"/>
        <ellipse cx="100" cy="114" rx="50" ry="10" fill="${F.c}"/>
      </g>
      ${toppings.has("sprinkles") ? sprinkleSpots.map((s) =>
        `<rect x="${s.x}" y="${s.y}" width="6" height="2.4" rx="1.2"
          fill="${BEAD_COLORS[(s.x + s.y) % BEAD_COLORS.length]}" transform="rotate(${s.r} ${s.x} ${s.y})"/>`).join("") : ""}
      ${toppings.has("cherry") ? `
        <path d="M100 40 q6 -12 16 -14" stroke="#5a7a48" stroke-width="2.5" fill="none" stroke-linecap="round"/>
        <circle cx="100" cy="44" r="9" fill="#d92f45"/>
        <ellipse cx="97" cy="41" rx="3" ry="2" fill="#ff8a96" opacity=".8"/>` : ""}
      ${toppings.has("tulip") ? `
        <g transform="translate(64 20) scale(.5)">
          <path d="M50 62 C 50 80, 49 96, 50 108" stroke="#5a9e6f" stroke-width="5" fill="none" stroke-linecap="round"/>
          <path d="M50 64 C 30 60, 22 38, 26 16 C 40 24, 49 40, 50 60 Z" fill="#e0507a"/>
          <path d="M50 64 C 70 60, 78 38, 74 16 C 60 24, 51 40, 50 60 Z" fill="#e0507a"/>
          <path d="M50 66 C 36 56, 34 28, 50 8 C 66 28, 64 56, 50 66 Z" fill="#fb6f92"/>
        </g>` : ""}
      ${toppings.has("candle") ? `
        <g transform="translate(128 30)">
          <rect x="-3.4" y="0" width="6.8" height="26" rx="2" fill="#ffd28a"/>
          <rect x="-3.4" y="7" width="6.8" height="3.6" fill="rgba(0,0,0,.13)"/>
          <rect x="-3.4" y="17" width="6.8" height="3.6" fill="rgba(0,0,0,.13)"/>
          <line x1="0" y1="0" x2="0" y2="-4" stroke="#5a4632" stroke-width="1.5"/>
          <g class="flame"><ellipse cx="0" cy="-10" rx="5" ry="8" fill="#ffb347" opacity=".9"/><ellipse cx="0" cy="-8.5" rx="2.6" ry="4.6" fill="#fff0c9"/></g>
        </g>` : ""}
      ${toppings.has("sparkle") ? `
        <path d="M42 52 q3 -9 6 0 q9 3 0 6 q-3 9 -6 0 q-9 -3 0 -6 Z" fill="#ffd28a"/>
        <path d="M152 60 q2.5 -8 5 0 q8 2.5 0 5 q-2.5 8 -5 0 q-8 -2.5 0 -5 Z" fill="#ffd28a" opacity=".85"/>
        <path d="M148 34 q2 -6 4 0 q6 2 0 4 q-2 6 -4 0 q-6 -2 0 -4 Z" fill="#fff0c9"/>` : ""}
      <!-- liner -->
      <path d="M56 122 h88 l-11 54 a8 8 0 0 1 -8 7 h-50 a8 8 0 0 1 -8 -7 Z" fill="${L.c}"/>
      ${[0, 1, 2, 3, 4, 5].map((i) =>
        `<line x1="${68 + i * 13}" y1="126" x2="${72 + i * 11.4}" y2="180" stroke="${L.d}" stroke-width="4" opacity=".55"/>`).join("")}
      <ellipse cx="100" cy="122" rx="46" ry="6" fill="${L.d}"/>
      ${served ? `
        <g class="cc-face">
          <circle cx="86" cy="150" r="3.4" fill="#3a2438"/>
          <circle cx="114" cy="150" r="3.4" fill="#3a2438"/>
          <path d="M92 160 q8 7 16 0" stroke="#3a2438" stroke-width="2.6" fill="none" stroke-linecap="round"/>
          <ellipse cx="76" cy="158" rx="5" ry="3" fill="#ff8aa2" opacity=".7"/>
          <ellipse cx="124" cy="158" rx="5" ry="3" fill="#ff8aa2" opacity=".7"/>
        </g>` : ""}
    </svg>`;
  }

  function render() { stageEl.innerHTML = cupcakeSVG(); }

  function swatchRow(el, list, getIdx, setIdx, colorOf) {
    el.innerHTML = "";
    list.forEach((item, i) => {
      const s = document.createElement("button");
      s.className = "swatch swatch-sm" + (i === getIdx() ? " active" : "");
      s.style.background = colorOf(item);
      s.setAttribute("aria-label", item.name);
      s.addEventListener("click", () => {
        setIdx(i);
        served = false;
        lineEl.textContent = "";
        swatchRow(el, list, getIdx, setIdx, colorOf);
        render();
      });
      el.appendChild(s);
    });
  }

  swatchRow(linersEl, CC_LINERS, () => liner, (i) => (liner = i), (x) => x.c);
  swatchRow(frostingsEl, CC_FROSTINGS, () => frosting, (i) => (frosting = i), (x) => x.c);

  CC_TOPPINGS.forEach((t) => {
    const b = document.createElement("button");
    b.className = "cc-top-btn" + (toppings.has(t.key) ? " active" : "");
    b.textContent = t.label;
    b.addEventListener("click", () => {
      toppings.has(t.key) ? toppings.delete(t.key) : toppings.add(t.key);
      b.classList.toggle("active");
      served = false;
      lineEl.textContent = "";
      render();
    });
    toppingsEl.appendChild(b);
  });

  function loadBox() { return JSON.parse(localStorage.getItem("tulip.cupcakes") || "[]"); }

  function renderBox() {
    const box = loadBox();
    boxEl.innerHTML = box.slice(-6).map((c) =>
      `<div class="cc-mini">${(() => { const keep = { liner, frosting, served, tops: new Set(toppings) };
        liner = c.l; frosting = c.f; served = true;
        const prevTops = new Set(toppings); toppings.clear(); c.t.forEach((k) => toppings.add(k));
        const svg = cupcakeSVG(64);
        liner = keep.liner; frosting = keep.frosting; served = keep.served;
        toppings.clear(); keep.tops.forEach((k) => toppings.add(k));
        return svg; })()}</div>`
    ).join("");
    boxLabel.hidden = box.length === 0;
  }

  serveBtn.addEventListener("click", () => {
    if (!served) {
      served = true;
      render();
      lineEl.textContent = CONFIG.cupcake.serveLine;
      const r = stageEl.getBoundingClientRect();
      petalBurst(r.left + r.width / 2, r.top + r.height / 2, 14);
      const box = loadBox();
      box.push({ l: liner, f: frosting, t: [...toppings] });
      localStorage.setItem("tulip.cupcakes", JSON.stringify(box.slice(-12)));
      renderBox();
      serveBtn.textContent = "bake another 🧁";
    } else {
      served = false;
      lineEl.textContent = "";
      render();
      serveBtn.textContent = "serve it 🧁";
    }
  });

  render();
  renderBox();
}

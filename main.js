/* Gate, countdown, petals, content injection, gallery, letter. */

window.__reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

document.addEventListener("DOMContentLoaded", () => {
  injectContent();
  initGate();
  initPetals();
  initReveals();
  initGarden();
  initStudio();
  initGallery();
  initLetter();
});

/* ── content from config ──────────────────────────────── */
function injectContent() {
  const set = (id, text) => (document.getElementById(id).textContent = text);
  set("hero-kicker", CONFIG.hero.kicker);
  set("hero-title", CONFIG.hero.title);
  set("hero-tagline", CONFIG.hero.tagline);
  set("garden-title", CONFIG.garden.title);
  set("garden-intro", CONFIG.garden.intro);
  set("studio-title", CONFIG.studio.title);
  set("studio-intro", CONFIG.studio.intro);
  set("gallery-title", CONFIG.gallery.title);
  set("gallery-intro", CONFIG.gallery.intro);
  set("letter-title", CONFIG.letter.title);
  document.querySelector(".gate-name").textContent = CONFIG.name;
  document.title = `for ${CONFIG.name} 🌷`;
}

/* ── midnight gate ────────────────────────────────────── */
function initGate() {
  const gate = document.getElementById("gate");
  const site = document.getElementById("site");
  const target = new Date(CONFIG.birthdayISO).getTime();
  const preview = new URLSearchParams(location.search).has(CONFIG.previewKey);

  function open(instant) {
    site.hidden = false;
    if (instant) { gate.hidden = true; return; }
    gate.classList.add("gate-open");
    petalBurst(innerWidth / 2, innerHeight / 2, 26);
    setTimeout(() => (gate.hidden = true), 1700);
  }

  if (preview || Date.now() >= target) {
    open(true);
    return;
  }

  gate.hidden = false;
  // starfield
  const stars = gate.querySelector(".gate-stars");
  for (let i = 0; i < 70; i++) {
    const s = document.createElement("div");
    s.className = "gate-star";
    const size = Math.random() * 2.2 + 0.6;
    s.style.width = s.style.height = size + "px";
    s.style.left = Math.random() * 100 + "%";
    s.style.top = Math.random() * 100 + "%";
    s.style.animationDelay = Math.random() * 3 + "s";
    stars.appendChild(s);
  }

  const $ = (id) => document.getElementById(id);
  const pad = (n) => String(n).padStart(2, "0");
  const tick = () => {
    const diff = target - Date.now();
    if (diff <= 0) { clearInterval(timer); open(false); return; }
    const d = Math.floor(diff / 864e5);
    const h = Math.floor((diff % 864e5) / 36e5);
    const m = Math.floor((diff % 36e5) / 6e4);
    const s = Math.floor((diff % 6e4) / 1e3);
    $("gc-d").textContent = d;
    $("gc-h").textContent = pad(h);
    $("gc-m").textContent = pad(m);
    $("gc-s").textContent = pad(s);
    $("gc-d").parentElement.style.display = d === 0 ? "none" : "";
  };
  tick();
  const timer = setInterval(tick, 1000);
}

/* ── drifting petals ──────────────────────────────────── */
function initPetals() {
  if (window.__reducedMotion) return;
  const canvas = document.getElementById("petal-canvas");
  const ctx = canvas.getContext("2d");
  let W, H, petals;

  function resize() {
    W = canvas.width = innerWidth * devicePixelRatio;
    H = canvas.height = innerHeight * devicePixelRatio;
  }
  resize();
  addEventListener("resize", resize);

  const COLORS = ["rgba(251,111,146,", "rgba(255,165,192,", "rgba(255,210,138,", "rgba(224,80,122,"];
  const COUNT = innerWidth < 600 ? 14 : 24;
  petals = Array.from({ length: COUNT }, () => spawn(true));

  function spawn(anywhere) {
    return {
      x: Math.random() * W,
      y: anywhere ? Math.random() * H : -30 * devicePixelRatio,
      size: (5 + Math.random() * 9) * devicePixelRatio,
      speed: (0.35 + Math.random() * 0.8) * devicePixelRatio,
      drift: (Math.random() - 0.5) * 0.6 * devicePixelRatio,
      rot: Math.random() * Math.PI * 2,
      rotSpeed: (Math.random() - 0.5) * 0.02,
      color: COLORS[(Math.random() * COLORS.length) | 0],
      alpha: 0.25 + Math.random() * 0.4,
      wobble: Math.random() * Math.PI * 2,
    };
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);
    for (let p of petals) {
      p.wobble += 0.02;
      p.x += p.drift + Math.sin(p.wobble) * 0.4 * devicePixelRatio;
      p.y += p.speed;
      p.rot += p.rotSpeed;
      if (p.y > H + 40) Object.assign(p, spawn(false));
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rot);
      ctx.fillStyle = p.color + p.alpha + ")";
      ctx.beginPath();
      ctx.ellipse(0, 0, p.size, p.size * 0.55, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
    requestAnimationFrame(draw);
  }
  draw();
}

/* ── scroll reveals ───────────────────────────────────── */
function initReveals() {
  const els = document.querySelectorAll(".section-title, .section-intro, .studio-card, .polaroid, .envelope-zone");
  els.forEach((el) => el.classList.add("reveal"));
  const io = new IntersectionObserver(
    (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("on")),
    { threshold: 0.12 }
  );
  els.forEach((el) => io.observe(el));
}

/* ── gallery ──────────────────────────────────────────── */
function initGallery() {
  const wrap = document.getElementById("polaroids");
  CONFIG.gallery.photos.forEach((ph, i) => {
    const card = document.createElement("figure");
    card.className = "polaroid reveal";
    card.style.setProperty("--tilt", `${(i % 2 ? 1 : -1) * (1.5 + (i % 3))}deg`);
    card.innerHTML = `
      <div class="polaroid-img">${
        ph.src ? `<img src="${ph.src}" alt="${ph.caption}" loading="lazy"/>` : "🌷"
      }</div>
      <figcaption class="polaroid-caption">${ph.caption}</figcaption>`;
    wrap.appendChild(card);
  });
  // observe the newly added polaroids too
  const io = new IntersectionObserver(
    (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("on")),
    { threshold: 0.12 }
  );
  wrap.querySelectorAll(".polaroid").forEach((el) => io.observe(el));
}

/* ── letter ───────────────────────────────────────────── */
function initLetter() {
  const env = document.getElementById("envelope");
  const zone = document.getElementById("envelope-zone");
  const paperEl = document.getElementById("letter-paper");

  document.getElementById("letter-greeting").textContent = CONFIG.letter.greeting;
  document.getElementById("letter-signoff").textContent = CONFIG.letter.signoff;
  document.getElementById("letter-signature").textContent = CONFIG.letter.signature;
  const body = document.getElementById("letter-body");
  CONFIG.letter.paragraphs.forEach((p) => {
    const el = document.createElement("p");
    el.textContent = p;
    body.appendChild(el);
  });

  env.addEventListener("click", () => {
    if (env.classList.contains("open")) return;
    env.classList.add("open");
    const r = env.getBoundingClientRect();
    petalBurst(r.left + r.width / 2, r.top, 16);
    setTimeout(() => {
      paperEl.hidden = false;
      zone.style.transition = "opacity .6s ease, max-height .8s ease";
      zone.style.opacity = "0";
      setTimeout(() => { zone.style.display = "none"; }, 650);
      paperEl.scrollIntoView({ behavior: window.__reducedMotion ? "auto" : "smooth", block: "start" });
    }, 900);
  });
}

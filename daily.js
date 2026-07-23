/* A Tulip a Day — one new note per day of being nineteen. */

function initDaily() {
  const card = document.getElementById("daily-card");
  const birthday = new Date(CONFIG.birthdayISO);
  const now = new Date();
  const dayIndex = Math.floor((now - birthday) / 864e5); // 0 = her birthday itself

  const notes = CONFIG.daily.notes;
  let heading, text;
  if (dayIndex < 1) {
    heading = "day zero";
    text = CONFIG.daily.teaser;
  } else {
    heading = `day ${dayIndex} of nineteen`;
    text = notes[(dayIndex - 1) % notes.length];
  }

  card.innerHTML = `
    <div class="daily-tulip">${tulipSVG(Math.max(0, dayIndex) % TULIP_PALETTES.length, { sway: true })}</div>
    <p class="daily-heading">${heading}</p>
    <p class="daily-text"></p>`;
  card.querySelector(".daily-text").textContent = text;
}

/* ── the 11:57 easter egg ─────────────────────────────────
   Every night at 11:57, for three minutes, the site slips into
   the midnight era. She has to catch it herself. */

function initMidnightMagic() {
  let active = false;

  function inWindow() {
    const d = new Date();
    return d.getHours() === 23 && d.getMinutes() >= 57;
  }

  function show() {
    if (active) return;
    active = true;
    const el = document.createElement("div");
    el.className = "midnight-magic";
    el.id = "midnight-magic";
    el.innerHTML = `
      <div class="mm-stars"></div>
      <p class="mm-time">11:57</p>
      <p class="mm-line">meet me at midnight.</p>
      <p class="mm-note">it's three minutes to midnight, princess — and somewhere,
        a red panda is thinking about you. (I checked. he is.)</p>
      <button class="btn btn-ghost mm-close">🌌 goodnight</button>`;
    const stars = el.querySelector(".mm-stars");
    for (let i = 0; i < 40; i++) {
      const s = document.createElement("div");
      s.className = "gate-star";
      s.style.width = s.style.height = (Math.random() * 2 + 0.8) + "px";
      s.style.left = Math.random() * 100 + "%";
      s.style.top = Math.random() * 100 + "%";
      s.style.animationDelay = Math.random() * 3 + "s";
      stars.appendChild(s);
    }
    el.querySelector(".mm-close").addEventListener("click", hide);
    document.body.appendChild(el);
    requestAnimationFrame(() => requestAnimationFrame(() => el.classList.add("on")));
  }

  function hide() {
    const el = document.getElementById("midnight-magic");
    if (el) {
      el.classList.remove("on");
      setTimeout(() => el.remove(), 900);
    }
    active = false;
  }

  setInterval(() => {
    if (inWindow()) show();
    else if (active) hide();
  }, 20000);
  if (inWindow()) show();
}

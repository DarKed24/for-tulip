/* Catch the falling tulips — reach 19 with the basket. Gentle, no losing. */

function initGame() {
  const wrap = document.getElementById("game-wrap");
  const canvas = document.getElementById("game-canvas");
  const scoreEl = document.getElementById("game-score");
  const overlay = document.getElementById("game-overlay");
  const overlayText = document.getElementById("game-overlay-text");
  const startBtn = document.getElementById("game-start");

  const ctx = canvas.getContext("2d");
  const GOAL = 19;
  const EMOJI = ["🌷", "🌷", "🌷", "💮", "🌸"];

  let W, H, dpr;
  let running = false;
  let score, basketX, drops, lastSpawn, spawnMs, raf;

  function resize() {
    dpr = Math.min(devicePixelRatio || 1, 2);
    const rect = canvas.getBoundingClientRect();
    W = canvas.width = rect.width * dpr;
    H = canvas.height = rect.height * dpr;
  }
  addEventListener("resize", () => running && resize());

  function reset() {
    score = 0;
    drops = [];
    lastSpawn = 0;
    spawnMs = 1100;
    basketX = W / 2;
    scoreEl.textContent = `0 / ${GOAL}`;
  }

  function spawn() {
    drops.push({
      x: (0.08 + Math.random() * 0.84) * W,
      y: -30 * dpr,
      vy: (1.4 + Math.random() * 1.4 + score * 0.06) * dpr,
      sway: Math.random() * Math.PI * 2,
      swayAmp: (0.4 + Math.random() * 0.8) * dpr,
      size: (26 + Math.random() * 8) * dpr,
      emoji: EMOJI[(Math.random() * EMOJI.length) | 0],
      caught: false,
      pop: 0,
    });
  }

  function step() {
    if (!running) return;
    ctx.clearRect(0, 0, W, H);

    const now = performance.now();
    if (now - lastSpawn > spawnMs) {
      lastSpawn = now;
      spawnMs = Math.max(520, 1100 - score * 30);
      spawn();
    }

    const basketY = H - 34 * dpr;
    const catchR = 46 * dpr;

    for (const d of drops) {
      if (d.caught) {
        d.pop += 0.12;
        continue;
      }
      d.sway += 0.04;
      d.x += Math.sin(d.sway) * d.swayAmp;
      d.y += d.vy;
      if (Math.abs(d.x - basketX) < catchR && Math.abs(d.y - basketY + 10 * dpr) < 30 * dpr) {
        d.caught = true;
        score++;
        scoreEl.textContent = `${score} / ${GOAL}`;
        if (score >= GOAL) return win();
      } else if (d.y > H + 40 * dpr) {
        // drift gently back to the sky — nothing is lost in this garden
        d.y = -30 * dpr;
        d.x = (0.08 + Math.random() * 0.84) * W;
      }
    }
    drops = drops.filter((d) => !d.caught || d.pop < 1);

    // draw drops
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    for (const d of drops) {
      ctx.save();
      if (d.caught) {
        ctx.globalAlpha = 1 - d.pop;
        ctx.translate(d.x, basketY - 20 * dpr - d.pop * 30 * dpr);
        ctx.scale(1 + d.pop * 0.6, 1 + d.pop * 0.6);
      } else {
        ctx.translate(d.x, d.y);
        ctx.rotate(Math.sin(d.sway) * 0.25);
      }
      ctx.font = `${d.size}px serif`;
      ctx.fillText(d.emoji, 0, 0);
      ctx.restore();
    }

    // draw basket
    ctx.font = `${52 * dpr}px serif`;
    ctx.fillText("🧺", basketX, basketY);

    raf = requestAnimationFrame(step);
  }

  function win() {
    running = false;
    cancelAnimationFrame(raf);
    overlayText.textContent = CONFIG.game.win;
    startBtn.textContent = "play again";
    overlay.hidden = false;
    const r = canvas.getBoundingClientRect();
    petalBurst(r.left + r.width / 2, r.top + r.height / 2, 22);
  }

  function start() {
    overlay.hidden = true;
    resize();
    reset();
    running = true;
    cancelAnimationFrame(raf);
    step();
  }

  function pointerMove(clientX) {
    const rect = canvas.getBoundingClientRect();
    basketX = Math.max(30 * dpr, Math.min(W - 30 * dpr, (clientX - rect.left) * dpr));
  }
  canvas.addEventListener("mousemove", (e) => pointerMove(e.clientX));
  canvas.addEventListener("touchmove", (e) => {
    e.preventDefault();
    pointerMove(e.touches[0].clientX);
  }, { passive: false });
  canvas.addEventListener("touchstart", (e) => pointerMove(e.touches[0].clientX));

  startBtn.addEventListener("click", start);
}

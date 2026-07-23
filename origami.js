/* ════════════════════════════════════════════════════════════
   The Paper Tulip Studio.
   A stylized, always-perfect origami tulip: she taps, it folds.
   Geometry lives in percent coordinates on a square stage;
   folds are real 3D rotations about the fold line.
   ════════════════════════════════════════════════════════════ */

function initStudio() {
  const stage = document.getElementById("studio-stage");
  const paper = document.getElementById("stage-paper");
  const instructionEl = document.getElementById("studio-instruction");
  const btnFold = document.getElementById("btn-fold");
  const btnRestart = document.getElementById("btn-restart");
  const swatchesEl = document.getElementById("swatches");
  const bouquetEl = document.getElementById("bouquet-flowers");
  const bouquetCount = document.getElementById("bouquet-count");

  let paletteIdx = 0;
  let stepIdx = -1; // -1 = paper not yet shown
  let busy = false;

  const pt = (p) => p.map((c) => c.toFixed(1) + "%").join(" ");
  const polySVG = (polys) =>
    `<svg viewBox="0 0 100 100" preserveAspectRatio="none">` +
    polys
      .map(
        (o) =>
          `<polygon points="${o.pts.map((p) => p.join(",")).join(" ")}" fill="${o.fill}" ${
            o.stroke ? `stroke="${o.stroke}" stroke-width="0.6"` : ""
          }/>`
      )
      .join("") +
    `</svg>`;

  // key geometry (see repo README for the derivation)
  const T = [50, 6], R = [94, 50], B = [50, 94], L = [6, 50], M = [50, 50];
  const A = [61.4, 17.4], A2 = [38.6, 17.4];      // fold-line tops
  const RT = [15.6, 22.6], LT = [84.4, 22.6];     // where the corners land

  const col = () => TULIP_PALETTES[paletteIdx];
  const edge = "rgba(0,0,0,.14)";

  const STEPS = [
    {
      // 0 — flat paper
      instruction: "Here's your paper — smooth it flat. Tap the glowing line to make the first fold.",
      button: "make the fold",
      base: () => [{ pts: [T, R, B, L], fill: col().petal, stroke: edge }],
      fold: {
        flap: [L, B, R],
        remaining: [{ pts: [L, T, R] }],
        landed: [{ pts: [L, T, R] }],
        axisPt: M, axisDir: [1, 0], angle: -180,
        frontFill: () => col().petal, backFill: () => col().deep,
        remainingFill: () => col().petal, landedFill: () => col().deep,
      },
    },
    {
      // 1 — triangle, fold right corner up & across
      instruction: "Lovely. Now fold the right corner up and across — let the tip peek out the other side.",
      button: "fold the corner",
      base: () => [{ pts: [L, T, R], fill: col().deep, stroke: edge }],
      fold: {
        flap: [M, R, A],
        remaining: [{ pts: [L, T, A, M] }],
        landed: [{ pts: [M, A, RT] }],
        axisPt: M, axisDir: [0.35, -1], angle: 180,
        frontFill: () => col().deep, backFill: () => col().petal,
        remainingFill: () => col().deep, landedFill: () => col().petal,
      },
    },
    {
      // 2 — fold left corner up & across
      instruction: "And the same on the left — cross it over. It's already starting to look like something…",
      button: "fold the corner",
      base: () => [
        { pts: [L, T, A, M], fill: col().deep, stroke: edge },
        { pts: [M, A, RT], fill: col().petal, stroke: edge },
      ],
      fold: {
        flap: [M, L, A2],
        remaining: [
          { pts: [A2, T, A, M], fillKey: "deep" },
          { pts: [M, A, RT], fillKey: "petal" },
        ],
        landed: [{ pts: [M, A2, LT] }],
        axisPt: M, axisDir: [-0.35, -1], angle: -180,
        frontFill: () => col().deep, backFill: () => col().petal,
        landedFill: () => col().petal,
      },
    },
    {
      // 3 — open the petals (morph to bloom)
      instruction: "Now the magic part. Hold the base and gently open the petals.",
      button: "open the petals",
      base: () => [
        { pts: [A2, T, A, M], fill: col().deep, stroke: edge },
        { pts: [M, A, RT], fill: col().petal, stroke: edge },
        { pts: [M, A2, LT], fill: col().petal, stroke: edge },
      ],
      action: "bloom",
    },
    {
      // 4 — grow the stem
      instruction: "A flower needs somewhere to stand. Roll the green paper into a stem.",
      button: "grow the stem",
      action: "stem",
    },
    {
      // 5 — done
      instruction: "You just folded a perfect paper tulip. Not a single crease out of place — told you this studio was magic.",
      button: "add to bouquet 💐",
      action: "finish",
    },
  ];

  /* ── rendering helpers ─────────────────────────────── */

  function setBase(polys) {
    paper.querySelector(".paper-shape")?.remove();
    const el = document.createElement("div");
    el.className = "paper-shape";
    el.innerHTML = polySVG(polys);
    paper.prepend(el);
  }

  function showFoldLine(axisPt, axisDir) {
    hideFoldLine();
    const ang = (Math.atan2(axisDir[1], axisDir[0]) * 180) / Math.PI;
    const line = document.createElement("div");
    line.className = "fold-line";
    const len = 92; // percent — spans the paper without spilling out of the stage
    line.style.width = len + "%";
    line.style.left = axisPt[0] + "%";
    line.style.top = axisPt[1] + "%";
    line.style.transform = `translate(-50%, -50%) rotate(${ang}deg)`;
    line.style.transformOrigin = "center";
    stage.appendChild(line);
  }
  function hideFoldLine() { stage.querySelector(".fold-line")?.remove(); }

  function runFold(fold, done) {
    hideFoldLine();
    // base becomes what's left behind while the flap lifts
    setBase(
      (fold.remaining || []).map((o) => ({
        pts: o.pts,
        fill: o.fillKey ? col()[o.fillKey] : (fold.remainingFill ? fold.remainingFill() : col().petal),
        stroke: edge,
      }))
    );
    const flap = document.createElement("div");
    flap.className = "fold-flap";
    flap.innerHTML = polySVG([{ pts: fold.flap, fill: fold.frontFill(), stroke: edge }]);
    flap.style.transformOrigin = `${fold.axisPt[0]}% ${fold.axisPt[1]}%`;
    flap.style.transition = "transform 1s cubic-bezier(.55,.06,.35,1)";
    paper.appendChild(flap);

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        flap.style.transform = `rotate3d(${fold.axisDir[0]}, ${fold.axisDir[1]}, 0, ${fold.angle}deg)`;
      });
    });
    // halfway through, we start seeing the back of the paper
    setTimeout(() => {
      flap.querySelector("polygon").setAttribute("fill", fold.backFill());
    }, 480);

    flap.addEventListener("transitionend", () => {
      flap.remove();
      // stamp the landed flap into the base
      const next = STEPS[stepIdx + 1];
      if (next && next.base) {
        setBase(next.base());
      }
      done();
    }, { once: true });
  }

  /* ── bloom / stem / finish ─────────────────────────── */

  function runBloom(done) {
    const shape = paper.querySelector(".paper-shape");
    shape.style.transition = "opacity .7s ease, transform .9s cubic-bezier(.34,1.56,.64,1)";
    shape.style.opacity = "0";
    shape.style.transform = "scale(1.15)";

    const flower = document.createElement("div");
    flower.className = "paper-shape studio-flower";
    flower.innerHTML = tulipSVG(paletteIdx);
    const svg = flower.querySelector("svg");
    svg.style.height = "100%";
    svg.style.width = "100%";
    // hide stem & leaves for now; zoom in on the head
    flower.querySelectorAll(".tulip-stem, .tulip-leaf").forEach((el) => {
      el.style.opacity = "0";
      el.style.transition = "opacity .8s ease";
    });
    flower.style.opacity = "0";
    flower.style.transform = "scale(1.55) translateY(26%)";
    flower.style.transition = "opacity .8s ease .3s, transform 1s cubic-bezier(.34,1.56,.64,1)";
    paper.appendChild(flower);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        flower.style.opacity = "1";
      });
    });
    setTimeout(() => { shape.remove(); done(); }, 1100);
  }

  function runStem(done) {
    const flower = paper.querySelector(".studio-flower");
    flower.style.transform = "scale(1) translateY(0)";
    const stem = flower.querySelector(".tulip-stem");
    stem.setAttribute("pathLength", "1");
    stem.style.strokeDasharray = "1";
    stem.style.strokeDashoffset = "1";
    stem.style.opacity = "1";
    stem.style.transition = "stroke-dashoffset 1.1s ease .25s";
    flower.querySelectorAll(".tulip-leaf").forEach((el, i) => {
      el.style.transition = `opacity .6s ease ${0.9 + i * 0.25}s`;
    });
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        stem.style.strokeDashoffset = "0";
        flower.querySelectorAll(".tulip-leaf").forEach((el) => (el.style.opacity = "1"));
      });
    });
    setTimeout(done, 1700);
  }

  /* ── bouquet ───────────────────────────────────────── */

  const MAX_SHOWN = 12; // the vase holds twelve on display; the count keeps going

  function bouquetLoad() {
    return JSON.parse(localStorage.getItem("tulip.bouquet") || "[]");
  }

  function renderBouquet() {
    const flowers = bouquetLoad();
    bouquetEl.innerHTML = "";
    const shown = flowers.slice(0, MAX_SHOWN);
    const n = shown.length;
    // fan the stems out symmetrically from the vase mouth, never past its rim
    const step = n > 1 ? Math.min(14, 56 / (n - 1)) : 0;
    shown.forEach((idx, i) => {
      const offset = (i - (n - 1) / 2) * step;
      const f = document.createElement("div");
      f.className = "bouquet-flower";
      f.style.setProperty("--tilt", `rotate(${(offset * 0.7).toFixed(1)}deg)`);
      f.style.left = `calc(50% + ${offset.toFixed(1)}px)`;
      f.style.animationDelay = i * 0.06 + "s";
      f.innerHTML = tulipSVG(idx, { sway: true, delay: i * 0.4 });
      bouquetEl.appendChild(f);
    });
    const total = flowers.length;
    bouquetCount.textContent =
      total === 0 ? "no tulips yet — fold your first one!" :
      total === 1 ? "one perfect tulip 🌷" :
      `${total} perfect tulips — a bouquet that never wilts`;
  }

  function addToBouquet() {
    const flowers = bouquetLoad();
    flowers.push(paletteIdx);
    localStorage.setItem("tulip.bouquet", JSON.stringify(flowers));
    renderBouquet();
    const r = bouquetEl.getBoundingClientRect();
    petalBurst(r.left + r.width / 2, r.top + r.height / 2, 12);
  }

  /* ── flow control ──────────────────────────────────── */

  function enterStep(i) {
    stepIdx = i;
    const step = STEPS[i];
    instructionEl.textContent = step.instruction;
    btnFold.textContent = step.button;
    btnRestart.hidden = i === 0 && stepIdx <= 0;
    if (step.base && i !== 0) {
      // base already stamped by the previous fold; only draw if missing
      if (!paper.querySelector(".paper-shape")) setBase(step.base());
    }
    if (step.fold) showFoldLine(step.fold.axisPt, step.fold.axisDir);
  }

  function advance() {
    if (busy) return;
    const step = STEPS[stepIdx];
    if (!step) return;
    busy = true;
    btnFold.disabled = true;

    const next = () => {
      busy = false;
      btnFold.disabled = false;
      if (stepIdx + 1 < STEPS.length) enterStep(stepIdx + 1);
    };

    if (step.fold) runFold(step.fold, next);
    else if (step.action === "bloom") runBloom(next);
    else if (step.action === "stem") runStem(next);
    else if (step.action === "finish") {
      const r = stage.getBoundingClientRect();
      petalBurst(r.left + r.width / 2, r.top + r.height / 2, 18);
      addToBouquet();
      setTimeout(() => resetStudio(true), 900);
      busy = false;
      btnFold.disabled = false;
    }
  }

  function resetStudio(keepColor) {
    paper.innerHTML = "";
    hideFoldLine();
    stepIdx = -1;
    btnRestart.hidden = true;
    instructionEl.textContent = "Pick a paper colour, then unfold your sheet.";
    btnFold.textContent = "unfold the paper";
    btnFold.disabled = false;
    busy = false;
    if (!keepColor) selectSwatch(0);
  }

  function startPaper() {
    // paper appears with a little flourish
    setBase(STEPS[0].base());
    const shape = paper.querySelector(".paper-shape");
    shape.style.transform = "scale(.2) rotate(160deg)";
    shape.style.opacity = "0";
    shape.style.transition = "transform .8s cubic-bezier(.34,1.56,.64,1), opacity .5s ease";
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        shape.style.transform = "scale(1) rotate(0deg)";
        shape.style.opacity = "1";
      });
    });
    setTimeout(() => enterStep(0), 750);
  }

  /* ── color swatches ────────────────────────────────── */

  function selectSwatch(i) {
    paletteIdx = i;
    swatchesEl.querySelectorAll(".swatch").forEach((s, j) =>
      s.classList.toggle("active", j === i)
    );
    // recolor the flat paper live if we're on step 0
    if (stepIdx === 0) setBase(STEPS[0].base());
  }

  TULIP_PALETTES.forEach((p, i) => {
    const s = document.createElement("button");
    s.className = "swatch" + (i === 0 ? " active" : "");
    s.style.background = `linear-gradient(150deg, ${p.light}, ${p.petal} 55%, ${p.deep})`;
    s.setAttribute("aria-label", "paper colour " + (i + 1));
    s.addEventListener("click", () => selectSwatch(i));
    swatchesEl.appendChild(s);
  });

  /* ── wiring ────────────────────────────────────────── */

  btnFold.addEventListener("click", () => {
    if (stepIdx === -1) { btnRestart.hidden = false; startPaper(); }
    else advance();
  });
  stage.addEventListener("click", () => {
    if (stepIdx >= 0 && STEPS[stepIdx] && STEPS[stepIdx].fold) advance();
  });
  btnRestart.addEventListener("click", () => resetStudio(true));

  instructionEl.textContent = "Pick a paper colour, then unfold your sheet.";
  renderBouquet();
}

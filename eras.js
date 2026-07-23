/* The Eras of Us — twelve flip cards, one per era, plus a friendship bracelet. */

function initEras() {
  const grid = document.getElementById("eras-grid");
  const outro = document.getElementById("eras-outro");
  outro.textContent = CONFIG.eras.outro;

  CONFIG.eras.cards.forEach((card, i) => {
    const el = document.createElement("button");
    el.className = `era-card reveal`;
    el.setAttribute("aria-label", `${card.era} era — tap to flip`);
    el.style.transitionDelay = (i % 4) * 0.06 + "s";
    el.innerHTML = `
      <div class="era-inner">
        <div class="era-face era-front era-${card.theme}">
          <span class="era-emoji">${card.emoji}</span>
          <span class="era-name">${card.era}</span>
          <span class="era-tap">tap to flip</span>
        </div>
        <div class="era-face era-back era-${card.theme}">
          <p>${card.text}</p>
        </div>
      </div>`;
    el.addEventListener("click", () => {
      const flipping = !el.classList.contains("flipped");
      el.classList.toggle("flipped");
      if (flipping && !el.dataset.seen) {
        el.dataset.seen = "1";
        const r = el.getBoundingClientRect();
        petalBurst(r.left + r.width / 2, r.top + r.height / 2, 6);
      }
    });
    grid.appendChild(el);
  });

  // observe the freshly added cards for the scroll-reveal
  const io = new IntersectionObserver(
    (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("on")),
    { threshold: 0.1 }
  );
  grid.querySelectorAll(".era-card").forEach((el) => io.observe(el));
}

/* The Royal Coupon Book — redeemable, with permanent stamps. */

function initCoupons() {
  const grid = document.getElementById("coupon-grid");
  const statusEl = document.getElementById("coupon-status");
  const redeemed = new Set(JSON.parse(localStorage.getItem("tulip.coupons") || "[]"));

  function updateStatus() {
    const left = CONFIG.coupons.items.length - redeemed.size;
    statusEl.textContent =
      left === 0 ? CONFIG.coupons.empty :
      left === CONFIG.coupons.items.length ? `${left} coupons, all unspent — the treasury is full` :
      `${left} of ${CONFIG.coupons.items.length} coupons remaining`;
  }

  CONFIG.coupons.items.forEach((c, i) => {
    const el = document.createElement("div");
    el.className = "coupon reveal" + (redeemed.has(i) ? " redeemed" : "");
    el.innerHTML = `
      <div class="coupon-punch coupon-punch-l"></div>
      <div class="coupon-punch coupon-punch-r"></div>
      <p class="coupon-no">№ ${String(i + 1).padStart(2, "0")}</p>
      <p class="coupon-title">${c.title}</p>
      <p class="coupon-fine">${c.fine}</p>
      <button class="btn btn-primary coupon-btn">${redeemed.has(i) ? "redeemed" : "redeem"}</button>
      <div class="coupon-stamp" aria-hidden="true">REDEEMED 🌷</div>`;
    const btn = el.querySelector(".coupon-btn");
    let armed = false, disarm;
    btn.addEventListener("click", () => {
      if (redeemed.has(i)) return;
      if (!armed) {
        armed = true;
        btn.textContent = "tap again to confirm";
        clearTimeout(disarm);
        disarm = setTimeout(() => { armed = false; btn.textContent = "redeem"; }, 3000);
        return;
      }
      clearTimeout(disarm);
      redeemed.add(i);
      localStorage.setItem("tulip.coupons", JSON.stringify([...redeemed]));
      el.classList.add("redeemed", "just-stamped");
      btn.textContent = "redeemed";
      const r = el.getBoundingClientRect();
      petalBurst(r.left + r.width / 2, r.top + r.height / 2, 10);
      updateStatus();
    });
    grid.appendChild(el);
  });

  updateStatus();

  const io = new IntersectionObserver(
    (es) => es.forEach((e) => e.isIntersecting && e.target.classList.add("on")),
    { threshold: 0.1 }
  );
  grid.querySelectorAll(".coupon").forEach((el) => io.observe(el));
}

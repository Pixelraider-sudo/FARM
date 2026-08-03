(function () {
  "use strict";
  document.addEventListener("DOMContentLoaded", () => {
    const buttons = document.querySelectorAll(".pd-filter-btn");
    const cards = document.querySelectorAll(".pd-card");
    if (!buttons.length) return;

    buttons.forEach((btn) => {
      btn.addEventListener("click", () => {
        buttons.forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        const filter = btn.getAttribute("data-filter");
        cards.forEach((card) => {
          const match = filter === "all" || card.getAttribute("data-crop") === filter;
          card.style.display = match ? "" : "none";
        });
      });
    });
  });
})();

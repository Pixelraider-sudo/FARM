(function () {
  "use strict";
  document.addEventListener("DOMContentLoaded", () => {
    const input = document.getElementById("crop-search");
    const grid = document.getElementById("crop-grid");
    const empty = document.getElementById("crop-empty");
    if (!input || !grid) return;

    input.addEventListener("input", () => {
      const q = input.value.trim().toLowerCase();
      let visible = 0;
      grid.querySelectorAll(".crop-card").forEach((card) => {
        const name = card.getAttribute("data-name") || "";
        const match = name.includes(q);
        card.style.display = match ? "" : "none";
        if (match) visible++;
      });
      if (empty) empty.style.display = visible === 0 ? "block" : "none";
    });
  });
})();

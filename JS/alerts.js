(function () {
 "use strict";
 document.addEventListener("DOMContentLoaded", () => {
 const select = document.getElementById("alert-type");
 const cards = document.querySelectorAll(".alert-card");
 const empty = document.getElementById("alert-empty");
 if (!select) return;

 select.addEventListener("change", () => {
 const val = select.value;
 let visible = 0;
 cards.forEach((card) => {
 const match = val === "all" || card.getAttribute("data-type") === val;
 card.style.display = match ? "" : "none";
 if (match) visible++;
 });
 if (empty) empty.style.display = visible === 0 ? "block" : "none";
 });
 });
})();

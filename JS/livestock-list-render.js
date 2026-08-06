/* =========================================================
   AgriSense — Livestock Library Renderer (ES6 Module)
   Renders the full livestock grid from
   JS/data/livestock-data.js with category filtering and
   live search. Mirrors crops-list-render.js.
========================================================= */

import { getAllLivestock, LIVESTOCK_CATEGORIES } from "./data/livestock-data.js";

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function renderFilters(mount) {
  const buttons = ['<button class="pd-filter-btn active" data-filter="all">All Livestock</button>'];
  LIVESTOCK_CATEGORIES.forEach((cat) => {
    buttons.push(`<button class="pd-filter-btn" data-filter="${escapeHtml(cat)}">${escapeHtml(cat)}</button>`);
  });
  mount.innerHTML = buttons.join("");
}

function animalCard(animal) {
  return `
    <a href="livestock-detail.html?animal=${animal.slug}" class="crop-card reveal" data-name="${animal.slug} ${animal.name.toLowerCase()}" data-category="${escapeHtml(animal.category)}">
      <div class="crop-img-wrap"><img src="${animal.image}" loading="lazy" alt="${escapeHtml(animal.name)}"></div>
      <div class="crop-card-body">
        <h4>${escapeHtml(animal.name)}</h4>
        <p>${escapeHtml(animal.overview.slice(0, 100))}${animal.overview.length > 100 ? "…" : ""}</p>
        <span class="tag">${escapeHtml(animal.category)}</span>
      </div>
    </a>`;
}

function applyFilters(grid, empty, activeCategory, query) {
  const q = (query || "").trim().toLowerCase();
  let visible = 0;
  grid.querySelectorAll(".crop-card").forEach((card) => {
    const matchesCategory = activeCategory === "all" || card.getAttribute("data-category") === activeCategory;
    const matchesQuery = !q || (card.getAttribute("data-name") || "").includes(q);
    const show = matchesCategory && matchesQuery;
    card.style.display = show ? "" : "none";
    if (show) visible++;
  });
  if (empty) empty.style.display = visible === 0 ? "block" : "none";
}

function init() {
  const grid = document.getElementById("livestock-grid");
  const empty = document.getElementById("livestock-empty");
  const filtersMount = document.getElementById("category-filters");
  const search = document.getElementById("livestock-search");
  if (!grid) return;

  const livestock = getAllLivestock();
  grid.innerHTML = livestock.map(animalCard).join("");
  renderFilters(filtersMount);

  let activeCategory = "all";

  filtersMount.addEventListener("click", (e) => {
    const btn = e.target.closest(".pd-filter-btn");
    if (!btn) return;
    filtersMount.querySelectorAll(".pd-filter-btn").forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    activeCategory = btn.getAttribute("data-filter");
    applyFilters(grid, empty, activeCategory, search ? search.value : "");
  });

  if (search) {
    search.addEventListener("input", () => {
      applyFilters(grid, empty, activeCategory, search.value);
    });
  }

  document.dispatchEvent(new CustomEvent("components:ready"));
}

document.addEventListener("DOMContentLoaded", init);

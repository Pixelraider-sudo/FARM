/* =========================================================
   AgriSense — Crop Library Renderer (ES6 Module)
   Renders the full crop grid from JS/data/crops-data.js
   with category filtering and live search.
========================================================= */

import { getAllCrops, CATEGORIES } from "./data/crops-data.js";

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function renderFilters(mount) {
  const buttons = ['<button class="pd-filter-btn active" data-filter="all">All Crops</button>'];
  CATEGORIES.forEach((cat) => {
    buttons.push(`<button class="pd-filter-btn" data-filter="${escapeHtml(cat)}">${escapeHtml(cat)}</button>`);
  });
  mount.innerHTML = buttons.join("");
}

function cropCard(crop) {
  return `
    <a href="crop-detail.html?crop=${crop.slug}" class="crop-card reveal" data-name="${crop.slug} ${crop.name.toLowerCase()}" data-category="${escapeHtml(crop.category)}">
      <div class="crop-img-wrap"><img src="${crop.image}" loading="lazy" alt="${escapeHtml(crop.name)}"></div>
      <div class="crop-card-body">
        <h4>${escapeHtml(crop.name)}</h4>
        <p>${escapeHtml(crop.overview.slice(0, 100))}${crop.overview.length > 100 ? "…" : ""}</p>
        <span class="tag">${escapeHtml(crop.category)}</span>
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
  const grid = document.getElementById("crop-grid");
  const empty = document.getElementById("crop-empty");
  const filtersMount = document.getElementById("category-filters");
  const search = document.getElementById("crop-search");
  if (!grid) return;

  const crops = getAllCrops();
  grid.innerHTML = crops.map(cropCard).join("");
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

  // Let global.js reveal-on-scroll observer pick up the freshly injected cards
  document.dispatchEvent(new CustomEvent("components:ready"));
}

document.addEventListener("DOMContentLoaded", init);

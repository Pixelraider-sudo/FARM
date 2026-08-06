/* =========================================================
   AgriSense — Disease Library Renderer (ES6 Module)
========================================================= */

import { getAllDiseases, DISEASE_CATEGORIES } from "./data/diseases-data.js";

function escapeHtml(str) {
  return String(str).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function renderFilters(mount) {
  const buttons = ['<button class="pd-filter-btn active" data-filter="all">All Diseases</button>'];
  DISEASE_CATEGORIES.forEach((cat) => {
    buttons.push(`<button class="pd-filter-btn" data-filter="${escapeHtml(cat)}">${escapeHtml(cat)}</button>`);
  });
  mount.innerHTML = buttons.join("");
}

function riskBadgeClass(risk) {
  if (risk === "High") return "badge-danger";
  if (risk === "Moderate") return "badge-caution";
  return "badge-safe";
}

function diseaseCard(disease) {
  return `
    <a href="disease-detail.html?disease=${disease.slug}" class="crop-card reveal" data-name="${disease.slug} ${disease.name.toLowerCase()} ${disease.affectedCrops.join(" ").toLowerCase()}" data-category="${escapeHtml(disease.category)}">
      <div class="crop-img-wrap"><img src="${disease.image}" loading="lazy" alt="${escapeHtml(disease.name)}"></div>
      <div class="crop-card-body">
        <h4>${escapeHtml(disease.name)}</h4>
        <p>Affects: ${escapeHtml(disease.affectedCrops.join(", "))}</p>
        <span class="tag ${riskBadgeClass(disease.riskLevel)}">${escapeHtml(disease.riskLevel)} risk</span>
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
  const grid = document.getElementById("disease-grid");
  const empty = document.getElementById("disease-empty");
  const filtersMount = document.getElementById("category-filters");
  const search = document.getElementById("disease-search");
  if (!grid) return;

  const diseases = getAllDiseases();
  grid.innerHTML = diseases.map(diseaseCard).join("");
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
    search.addEventListener("input", () => applyFilters(grid, empty, activeCategory, search.value));
  }

  document.dispatchEvent(new CustomEvent("components:ready"));
}

document.addEventListener("DOMContentLoaded", init);

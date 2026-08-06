/* =========================================================
   AgriSense — Learning Center Renderer (ES6 Module)
========================================================= */

import { getAllArticles } from "./data/learning-data.js";

function escapeHtml(str) {
  return String(str).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function articleCard(a) {
  return `
    <a href="article-detail.html?article=${a.slug}" class="crop-card reveal">
      <div class="crop-img-wrap"><img src="${a.image}" loading="lazy" alt="${escapeHtml(a.title)}"></div>
      <div class="crop-card-body">
        <span class="tag">${escapeHtml(a.category)}</span>
        <h4 style="margin-top:8px;">${escapeHtml(a.title)}</h4>
        <p>${escapeHtml(a.excerpt)}</p>
        <span class="crop-more">${escapeHtml(a.readTime)} &middot; Read article &rarr;</span>
      </div>
    </a>`;
}

document.addEventListener("DOMContentLoaded", () => {
  const grid = document.getElementById("article-grid");
  if (!grid) return;
  grid.innerHTML = getAllArticles().map(articleCard).join("");
  document.dispatchEvent(new CustomEvent("components:ready"));
});

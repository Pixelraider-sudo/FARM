/* =========================================================
   AgriSense — Global Search Renderer (ES6 Module)
   Aggregates search across crops, livestock, diseases and
   learning articles — each already a self-contained data
   module, so search is just a thin query layer over them.
========================================================= */

import { getAllCrops } from "./data/crops-data.js";
import { getAllLivestock } from "./data/livestock-data.js";
import { getAllDiseases } from "./data/diseases-data.js";
import { getAllArticles } from "./data/learning-data.js";

function escapeHtml(str) {
  return String(str).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function buildIndex() {
  const index = [];
  getAllCrops().forEach((c) =>
    index.push({ type: "crop", label: "Crop", title: c.name, excerpt: c.overview, href: `crop-detail.html?crop=${c.slug}`, image: c.image, haystack: `${c.name} ${c.category} ${c.overview}`.toLowerCase() })
  );
  getAllLivestock().forEach((a) =>
    index.push({ type: "livestock", label: "Livestock", title: a.name, excerpt: a.overview, href: `livestock-detail.html?animal=${a.slug}`, image: a.image, haystack: `${a.name} ${a.category} ${a.overview}`.toLowerCase() })
  );
  getAllDiseases().forEach((d) =>
    index.push({ type: "disease", label: "Disease", title: d.name, excerpt: `Affects: ${d.affectedCrops.join(", ")}`, href: `disease-detail.html?disease=${d.slug}`, image: d.image, haystack: `${d.name} ${d.category} ${d.affectedCrops.join(" ")}`.toLowerCase() })
  );
  getAllArticles().forEach((a) =>
    index.push({ type: "article", label: "Learning", title: a.title, excerpt: a.excerpt, href: `article-detail.html?article=${a.slug}`, image: a.image, haystack: `${a.title} ${a.category} ${a.excerpt}`.toLowerCase() })
  );
  return index;
}

function resultCard(item) {
  return `
    <a href="${item.href}" class="crop-card reveal" style="display:flex; flex-direction:row; align-items:stretch; margin-bottom:14px;">
      <div class="crop-img-wrap" style="width:120px; flex-shrink:0; aspect-ratio:1;"><img src="${item.image}" loading="lazy" alt="${escapeHtml(item.title)}"></div>
      <div class="crop-card-body" style="flex:1;">
        <span class="tag">${escapeHtml(item.label)}</span>
        <h4 style="margin-top:8px;">${escapeHtml(item.title)}</h4>
        <p>${escapeHtml(item.excerpt.slice(0, 120))}${item.excerpt.length > 120 ? "…" : ""}</p>
      </div>
    </a>`;
}

function init() {
  const input = document.getElementById("global-search");
  const results = document.getElementById("search-results");
  const empty = document.getElementById("search-empty");
  const tabs = document.getElementById("search-tabs");
  if (!input || !results) return;

  const index = buildIndex();
  let activeType = "all";

  function render() {
    const q = input.value.trim().toLowerCase();
    if (!q) {
      results.innerHTML = "";
      empty.style.display = "block";
      empty.textContent = "Start typing to search, or try a different term.";
      return;
    }
    const matches = index.filter(
      (item) => (activeType === "all" || item.type === activeType) && item.haystack.includes(q)
    );
    if (!matches.length) {
      results.innerHTML = "";
      empty.style.display = "block";
      empty.textContent = "No results found. Try a different term.";
      return;
    }
    empty.style.display = "none";
    results.innerHTML = matches.slice(0, 30).map(resultCard).join("");
    document.dispatchEvent(new CustomEvent("components:ready"));
  }

  input.addEventListener("input", render);
  tabs.addEventListener("click", (e) => {
    const btn = e.target.closest(".app-tab");
    if (!btn) return;
    tabs.querySelectorAll(".app-tab").forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    activeType = btn.getAttribute("data-filter");
    render();
  });

  render();

  // Support ?q= in the URL so other pages can deep-link into search
  const urlQuery = new URLSearchParams(window.location.search).get("q");
  if (urlQuery) {
    input.value = urlQuery;
    render();
  }
}

document.addEventListener("DOMContentLoaded", init);

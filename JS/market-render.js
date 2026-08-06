/* =========================================================
   AgriSense — Market Center Renderer (ES6 Module)
   Hand-rolled SVG sparkline — no chart library dependency,
   consistent with the "vanilla JS only" constraint.
========================================================= */

import { getAllMarketData } from "./data/market-data.js";

function escapeHtml(str) {
  return String(str).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function sparkline(trend, positive) {
  const w = 260;
  const h = 60;
  const min = Math.min(...trend);
  const max = Math.max(...trend);
  const range = max - min || 1;
  const step = w / (trend.length - 1);
  const points = trend.map((v, i) => `${i * step},${h - ((v - min) / range) * (h - 8) - 4}`).join(" ");
  const color = positive ? "#16a34a" : "#dc2626";
  return `
    <svg viewBox="0 0 ${w} ${h}" width="100%" height="60" preserveAspectRatio="none">
      <polyline points="${points}" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></polyline>
    </svg>`;
}

function demandBadge(demand) {
  if (demand === "High") return "badge-safe";
  if (demand === "Moderate") return "badge-caution";
  return "badge-danger";
}

function marketCard(item) {
  const positive = item.changePercent >= 0;
  const countyRows = Object.entries(item.countyPrices)
    .map(([county, price]) => `<div class="county-row"><span>${escapeHtml(county)}</span><span>KES ${price}</span></div>`)
    .join("");

  return `
    <article class="app-card reveal">
      <div class="app-card-head">
        <h3>${escapeHtml(item.crop)}</h3>
        <span class="tag ${demandBadge(item.demand)}">${escapeHtml(item.demand)} demand</span>
      </div>
      <p class="app-card-meta">${escapeHtml(item.unit)}</p>
      <div style="display:flex; align-items:baseline; gap:10px; margin-bottom:6px;">
        <span style="font-size:1.4rem; font-weight:800; font-family:var(--font-display);">KES ${item.currentPrice}</span>
        <span style="font-size:.82rem; font-weight:700; color:${positive ? "var(--green-600)" : "#dc2626"};">${positive ? "+" : ""}${item.changePercent}%</span>
      </div>
      ${sparkline(item.trend, positive)}
      <div class="county-price-list">${countyRows}</div>
    </article>`;
}

function init() {
  const grid = document.getElementById("market-grid");
  if (!grid) return;
  grid.innerHTML = getAllMarketData().map(marketCard).join("");
  document.dispatchEvent(new CustomEvent("components:ready"));
}

document.addEventListener("DOMContentLoaded", init);

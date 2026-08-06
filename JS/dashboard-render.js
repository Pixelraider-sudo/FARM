/* =========================================================
   AgriSense — Dashboard Renderer (ES6 Module)
   Aggregates existing modules (farms, notifications, market
   data, crop database) into a single operational view rather
   than introducing a separate parallel data source.
========================================================= */

import { getFarms } from "./services/farm-service.js";
import { getNotifications, NOTIFICATION_ICONS } from "./services/notification-service.js";
import { getAllMarketData } from "./data/market-data.js";
import { getAllCrops } from "./data/crops-data.js";

function escapeHtml(str) {
  return String(str || "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function renderGreeting() {
  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";
  const el = document.getElementById("dashboard-greeting");
  if (el) el.textContent = `${greeting}`;

  const dateEl = document.getElementById("dashboard-date");
  if (dateEl) {
    dateEl.textContent = new Date().toLocaleDateString(undefined, {
      weekday: "long", year: "numeric", month: "long", day: "numeric",
    });
  }
}

function renderStats() {
  const farms = getFarms();
  const notifications = getNotifications();
  const unread = notifications.filter((n) => !n.read).length;
  const totalAcres = farms.reduce((sum, f) => sum + (parseFloat(f.size) || 0), 0);

  const mount = document.getElementById("dashboard-stats");
  if (!mount) return;
  mount.innerHTML = `
    <div class="stat-tile"><div class="stat-tile-label">Farms</div><div class="stat-tile-value">${farms.length}</div></div>
    <div class="stat-tile"><div class="stat-tile-label">Total Acreage</div><div class="stat-tile-value">${totalAcres.toFixed(1)}</div></div>
    <div class="stat-tile"><div class="stat-tile-label">Unread Alerts</div><div class="stat-tile-value ${unread > 0 ? "negative" : "positive"}">${unread}</div></div>
    <div class="stat-tile"><div class="stat-tile-label">Crops Tracked</div><div class="stat-tile-value">${getAllCrops().length}</div></div>
  `;
}

function renderRecommendations() {
  const mount = document.getElementById("dashboard-recommendations");
  if (!mount) return;
  const crops = getAllCrops();
  const pick = crops[Math.floor(Math.random() * crops.length)];
  const recommendations = [
    `Check soil moisture before your next irrigation cycle — inconsistent watering is one of the most common causes of reduced yield.`,
    `${pick.name} is in the crop database with a full planting guide — open it from the Crops page if you're growing it this season.`,
    `Review the Pest & Disease library for early warning signs relevant to crops currently in the ground.`,
  ];
  mount.innerHTML = recommendations.map((r) => `<p style="margin-bottom:10px;">${escapeHtml(r)}</p>`).join("");
}

function renderFarms() {
  const mount = document.getElementById("dashboard-farms");
  if (!mount) return;
  const farms = getFarms();
  if (!farms.length) {
    mount.innerHTML = `<p style="margin:0;">No farms added yet. <a href="farms.html" style="color:var(--green-600); font-weight:700;">Add your first farm</a> to see a personalized summary here.</p>`;
    return;
  }
  mount.innerHTML = farms
    .slice(0, 3)
    .map(
      (f) => `
      <div style="display:flex; justify-content:space-between; padding:10px 0; border-bottom:1px solid var(--border);">
        <div>
          <strong>${escapeHtml(f.name)}</strong>
          <div style="font-size:.82rem; color:var(--text-muted);">${escapeHtml(f.county || "")}</div>
        </div>
        <span class="tag">${escapeHtml(f.size || "—")} acres</span>
      </div>`
    )
    .join("");
}

function renderMarket() {
  const mount = document.getElementById("dashboard-market");
  if (!mount) return;
  const items = getAllMarketData().slice(0, 4);
  mount.innerHTML = items
    .map(
      (m) => `<span class="market-pill">${escapeHtml(m.crop)}: KES ${m.currentPrice} (${m.changePercent >= 0 ? "+" : ""}${m.changePercent}%)</span>`
    )
    .join("");
}

function renderNotifications() {
  const mount = document.getElementById("dashboard-notifications");
  if (!mount) return;
  const items = getNotifications().slice(0, 4);
  if (!items.length) {
    mount.innerHTML = `<p style="margin:0;">No notifications.</p>`;
    return;
  }
  mount.innerHTML = items
    .map(
      (n) => `
      <div style="display:flex; gap:10px; padding:8px 0; ${n.read ? "" : "font-weight:600;"}">
        <span class="notif-item-icon" style="width:26px; height:26px; font-size:.62rem;">${escapeHtml(NOTIFICATION_ICONS[n.type] || "N")}</span>
        <span style="font-size:.85rem;">${escapeHtml(n.title)}</span>
      </div>`
    )
    .join("");
}

function init() {
  renderGreeting();
  renderStats();
  renderRecommendations();
  renderFarms();
  renderMarket();
  renderNotifications();
  document.dispatchEvent(new CustomEvent("components:ready"));
}

document.addEventListener("DOMContentLoaded", init);

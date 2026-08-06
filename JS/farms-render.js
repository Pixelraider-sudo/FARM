/* =========================================================
   AgriSense — Farms Page Renderer (ES6 Module)
========================================================= */

import { getFarms, createFarm, updateFarm, deleteFarm } from "./services/farm-service.js";

function escapeHtml(str) {
  return String(str || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function farmCard(farm) {
  const crops = (farm.crops || "").split(",").map((c) => c.trim()).filter(Boolean);
  return `
    <article class="app-card reveal" data-id="${farm.id}">
      <div class="app-card-head">
        <h3>${escapeHtml(farm.name)}</h3>
        <div class="app-card-actions">
          <button class="icon-btn" data-action="edit" title="Edit">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"></path><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg>
          </button>
          <button class="icon-btn danger" data-action="delete" title="Delete">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"></path></svg>
          </button>
        </div>
      </div>
      <p class="app-card-meta">${escapeHtml(farm.village ? farm.village + ", " : "")}${escapeHtml(farm.county)}</p>
      <div class="app-card-stats">
        <span class="tag">${escapeHtml(farm.size || "—")} acres</span>
        <span class="tag">${escapeHtml(farm.soil || "—")} soil</span>
        <span class="tag">${escapeHtml(farm.irrigation || "Rain-fed")}</span>
      </div>
      ${crops.length ? `<div class="market-row" style="margin-top:12px;">${crops.map((c) => `<span class="market-pill">${escapeHtml(c)}</span>`).join("")}</div>` : ""}
      ${farm.notes ? `<p style="margin-top:12px; font-size:.85rem;">${escapeHtml(farm.notes)}</p>` : ""}
    </article>`;
}

function renderFarms() {
  const grid = document.getElementById("farms-grid");
  const empty = document.getElementById("farms-empty");
  if (!grid) return;
  const farms = getFarms();
  if (!farms.length) {
    grid.innerHTML = "";
    if (empty) empty.style.display = "block";
    return;
  }
  if (empty) empty.style.display = "none";
  grid.innerHTML = farms.map(farmCard).join("");
  document.dispatchEvent(new CustomEvent("components:ready"));
}

function openModal(farm) {
  const overlay = document.getElementById("farm-modal-overlay");
  const title = document.getElementById("farm-modal-title");
  const form = document.getElementById("farm-form");
  form.reset();
  document.getElementById("farm-id").value = farm ? farm.id : "";
  title.textContent = farm ? "Edit Farm" : "Add Farm";
  if (farm) {
    document.getElementById("farm-name").value = farm.name || "";
    document.getElementById("farm-county").value = farm.county || "";
    document.getElementById("farm-village").value = farm.village || "";
    document.getElementById("farm-lat").value = farm.lat || "";
    document.getElementById("farm-lng").value = farm.lng || "";
    document.getElementById("farm-size").value = farm.size || "";
    document.getElementById("farm-altitude").value = farm.altitude || "";
    document.getElementById("farm-soil").value = farm.soil || "Loam";
    document.getElementById("farm-ph").value = farm.ph || "";
    document.getElementById("farm-water").value = farm.water || "Rainfall only";
    document.getElementById("farm-irrigation").value = farm.irrigation || "None (rain-fed)";
    document.getElementById("farm-crops").value = farm.crops || "";
    document.getElementById("farm-notes").value = farm.notes || "";
  }
  overlay.classList.add("open");
}

function closeModal() {
  document.getElementById("farm-modal-overlay").classList.remove("open");
}

function wireEvents() {
  document.getElementById("add-farm-btn")?.addEventListener("click", () => openModal(null));
  document.getElementById("add-farm-btn-2")?.addEventListener("click", () => openModal(null));
  document.getElementById("farm-modal-close")?.addEventListener("click", closeModal);
  document.getElementById("farm-modal-overlay")?.addEventListener("click", (e) => {
    if (e.target.id === "farm-modal-overlay") closeModal();
  });

  document.getElementById("farm-form")?.addEventListener("submit", (e) => {
    e.preventDefault();
    const id = document.getElementById("farm-id").value;
    const data = {
      name: document.getElementById("farm-name").value.trim(),
      county: document.getElementById("farm-county").value.trim(),
      village: document.getElementById("farm-village").value.trim(),
      lat: document.getElementById("farm-lat").value.trim(),
      lng: document.getElementById("farm-lng").value.trim(),
      size: document.getElementById("farm-size").value,
      altitude: document.getElementById("farm-altitude").value,
      soil: document.getElementById("farm-soil").value,
      ph: document.getElementById("farm-ph").value.trim(),
      water: document.getElementById("farm-water").value,
      irrigation: document.getElementById("farm-irrigation").value,
      crops: document.getElementById("farm-crops").value.trim(),
      notes: document.getElementById("farm-notes").value.trim(),
    };
    if (!data.name || !data.county) return;

    if (id) updateFarm(id, data);
    else createFarm(data);

    closeModal();
    renderFarms();
  });

  document.getElementById("farms-grid")?.addEventListener("click", (e) => {
    const card = e.target.closest(".app-card");
    if (!card) return;
    const id = card.getAttribute("data-id");
    if (e.target.closest('[data-action="edit"]')) {
      const farm = getFarms().find((f) => f.id === id);
      openModal(farm);
    } else if (e.target.closest('[data-action="delete"]')) {
      if (confirm("Delete this farm? This cannot be undone.")) {
        deleteFarm(id);
        renderFarms();
      }
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  renderFarms();
  wireEvents();
});

/* =========================================================
   AgriSense — Farm Planner Renderer (ES6 Module)
   Derives an actual planting/task schedule from the real
   crop database's growth-stage descriptions, rather than
   hardcoding a separate schedule per crop.
========================================================= */

import { getAllCrops, getCropBySlug } from "./data/crops-data.js";
import { create, STORAGE_KEYS } from "./services/storage-service.js";

function escapeHtml(str) {
  return String(str).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

/** Parses a growth-stage description like "Grain filling (10-14 weeks)" into
 *  an estimated number of days-from-planting, using the upper bound of the range. */
function parseDaysFromPlanting(stageText) {
  const match = stageText.match(/\(([^)]+)\)\s*$/);
  if (!match) return null;
  const inner = match[1];
  const numbers = inner.match(/\d+/g);
  if (!numbers) return null;
  const upper = parseInt(numbers[numbers.length - 1], 10);
  if (/week/i.test(inner)) return upper * 7;
  if (/month/i.test(inner)) return upper * 30;
  if (/day/i.test(inner)) return upper;
  return upper;
}

function addDays(date, days) {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d;
}

function formatDate(d) {
  return d.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" });
}

function buildSchedule(crop, plantingDate) {
  const rows = [];
  rows.push({ stage: "Land Preparation", task: crop.landPreparation[0] || "Prepare and plough the land", date: addDays(plantingDate, -14) });
  rows.push({ stage: "Planting", task: `Plant using: ${crop.plantingGuide.method}`, date: plantingDate });
  rows.push({ stage: "Fertilizer", task: `Apply basal fertilizer: ${crop.fertilizer.planting}`, date: plantingDate });
  rows.push({ stage: "Weeding", task: crop.weedManagement[0] || "First weeding", date: addDays(plantingDate, 21) });

  let lastDays = 21;
  crop.growthStages.forEach((stageText) => {
    const days = parseDaysFromPlanting(stageText);
    if (days == null) return;
    lastDays = days;
    rows.push({ stage: "Growth Stage", task: stageText, date: addDays(plantingDate, days) });
  });

  rows.push({ stage: "Top Dressing", task: crop.fertilizer.topDressing, date: addDays(plantingDate, Math.min(35, Math.round(lastDays * 0.3))) });
  rows.push({ stage: "Harvest", task: crop.harvesting, date: addDays(plantingDate, lastDays + 7) });
  rows.push({ stage: "Storage", task: crop.storage, date: addDays(plantingDate, lastDays + 10) });

  rows.sort((a, b) => a.date - b.date);
  return rows;
}

function populateCropSelect() {
  const select = document.getElementById("planner-crop");
  if (!select) return;
  select.innerHTML = getAllCrops()
    .map((c) => `<option value="${c.slug}">${escapeHtml(c.name)}</option>`)
    .join("");
}

function renderSchedule(rows, crop, size) {
  const output = document.getElementById("planner-output");
  const title = document.getElementById("planner-output-title");
  const body = document.getElementById("planner-schedule-body");

  title.textContent = `${crop.name} — ${size} acre${size == 1 ? "" : "s"} season plan`;
  body.innerHTML = rows
    .map(
      (r) => `
      <tr>
        <td><span class="tag">${escapeHtml(r.stage)}</span></td>
        <td>${escapeHtml(r.task)}</td>
        <td class="num">${formatDate(r.date)}</td>
      </tr>`
    )
    .join("");

  output.style.display = "block";
  output.scrollIntoView({ behavior: "smooth", block: "start" });
}

function exportSchedule(rows, crop) {
  const lines = [
    `${crop.name} — AgriSense Season Plan`,
    "=".repeat(40),
    "",
    ...rows.map((r) => `[${formatDate(r.date)}] ${r.stage}: ${r.task}`),
  ];
  const blob = new Blob([lines.join("\n")], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${crop.slug}-season-plan.txt`;
  a.click();
  URL.revokeObjectURL(url);
}

function init() {
  populateCropSelect();
  const form = document.getElementById("planner-form");
  const dateInput = document.getElementById("planner-date");
  const today = new Date().toISOString().slice(0, 10);
  if (dateInput) dateInput.value = today;

  let lastRows = null;
  let lastCrop = null;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const slug = document.getElementById("planner-crop").value;
    const dateVal = document.getElementById("planner-date").value;
    const size = document.getElementById("planner-size").value || 1;
    const location = document.getElementById("planner-location").value;
    const crop = getCropBySlug(slug);
    if (!crop || !dateVal) return;

    const plantingDate = new Date(dateVal);
    const rows = buildSchedule(crop, plantingDate);
    lastRows = rows;
    lastCrop = crop;
    renderSchedule(rows, crop, size);

    create(
      STORAGE_KEYS.PLANNER_PLANS,
      { crop: crop.name, size, location, plantingDate: dateVal },
      "plan"
    );

    document.dispatchEvent(new CustomEvent("components:ready"));
  });

  document.getElementById("planner-export")?.addEventListener("click", () => {
    if (lastRows && lastCrop) exportSchedule(lastRows, lastCrop);
  });
}

document.addEventListener("DOMContentLoaded", init);

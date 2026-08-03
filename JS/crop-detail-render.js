/* =========================================================
 AgriSense — Crop Detail Renderer (ES6 Module)
 Reads ?crop=slug from the URL and renders the full crop
 guide from JS/data/crops-data.js. One template serves
 every crop in the database — no per-crop HTML files.
========================================================= */

import { getCropBySlug, getRelatedCrops, getAllCrops } from "./data/crops-data.js";

function escapeHtml(str) {
 return String(str)
 .replace(/&/g, "&amp;")
 .replace(/</g, "&lt;")
 .replace(/>/g, "&gt;");
}

function li(items) {
 return items.map((x) => `<li>${escapeHtml(x)}</li>`).join("");
}

function navStrip(activeSlug) {
 const crops = getAllCrops();
 return crops
 .map(
 (c) =>
 `<a href="crop-detail.html?crop=${c.slug}" class="${c.slug === activeSlug ? "active" : ""}">${escapeHtml(c.name)}</a>`
 )
 .join("");
}

function growthTimeline(stages) {
 return stages
 .map(
 (s, i) => `
 <div class="stage-step">
 <div class="stage-num">${i + 1}</div>
 <p>${escapeHtml(s)}</p>
 </div>`
 )
 .join("");
}

function faqAccordion(faqs) {
 return faqs
 .map(
 (f) => `
 <div class="faq-item">
 <button class="faq-question" aria-expanded="false">
 ${escapeHtml(f.q)}
 <span class="faq-icon">+</span>
 </button>
 <div class="faq-answer"><p>${escapeHtml(f.a)}</p></div>
 </div>`
 )
 .join("");
}

function relatedCropsHtml(related) {
 if (!related.length) return "";
 return `
 <section class="section" style="padding-top:0;">
 <div class="container">
 <div class="section-head reveal" style="margin-bottom:28px;">
 <span class="eyebrow">Related Crops</span>
 <h2 style="font-size:1.6rem;">You might also grow</h2>
 </div>
 <div class="grid-3">
 ${related
 .map(
 (c) => `
 <a href="crop-detail.html?crop=${c.slug}" class="crop-card reveal">
 <div class="crop-img-wrap"><img src="${c.image}" alt="${escapeHtml(c.name)}" loading="lazy"></div>
 <div class="crop-card-body">
 <h4>${escapeHtml(c.name)}</h4>
 <p>${escapeHtml(c.overview.slice(0, 90))}${c.overview.length > 90 ? "…" : ""}</p>
 <span class="crop-more">View guide →</span>
 </div>
 </a>`
 )
 .join("")}
 </div>
 </div>
 </section>`;
}

function renderCropPage(crop) {
 const related = getRelatedCrops(crop.slug);

 return `
 <section class="crop-hero">
 <div class="blob" style="width:320px;height:320px;top:-80px;left:-100px;background:var(--green-400);"></div>
 <div class="container">
 <div class="crop-breadcrumb reveal in">
 <a href="crops.html">Crops</a> <span>/</span> <span>${escapeHtml(crop.category)}</span> <span>/</span> <span>${escapeHtml(crop.name)}</span>
 </div>
 <div class="crop-hero-grid">
 <div class="reveal in">
 <span class="eyebrow">${escapeHtml(crop.category)}</span>
 <h1>${escapeHtml(crop.name)}</h1>
 <p class="crop-hero-sub">${escapeHtml(crop.overview)}</p>
 <div style="display:flex; gap:12px; flex-wrap:wrap;">
 <a href="register.html" class="btn btn-primary">Get Personalized Alerts</a>
 <a href="pests.html" class="btn btn-secondary">Pest &amp; Disease Guide</a>
 <button class="btn btn-ghost" id="download-guide-btn" style="border:1px solid var(--border);">Download Guide</button>
 </div>
 </div>
 <div class="crop-hero-img reveal in" style="transition-delay:.1s;">
 <img src="${crop.image}" alt="${escapeHtml(crop.name)}" loading="lazy">
 </div>
 </div>
 <div class="crop-nav-strip">${navStrip(crop.slug)}</div>
 </div>
 </section>

 <section class="section" style="padding-top:32px;">
 <div class="container">
 <div class="info-grid">
 <div class="info-card glass-card reveal">
 <div class="info-num">1</div>
 <h3>Suitable Climate</h3>
 <ul>
 <li><strong>Zone:</strong> ${escapeHtml(crop.climate.suitable)}</li>
 <li><strong>Temperature:</strong> ${escapeHtml(crop.climate.temperature)}</li>
 <li><strong>Rainfall:</strong> ${escapeHtml(crop.climate.rainfall)}</li>
 <li><strong>Altitude:</strong> ${escapeHtml(crop.climate.altitude)}</li>
 </ul>
 </div>
 <div class="info-card glass-card reveal">
 <div class="info-num">2</div>
 <h3>Soil Requirements</h3>
 <ul>
 <li><strong>Type:</strong> ${escapeHtml(crop.soil.type)}</li>
 <li><strong>Ideal pH:</strong> ${escapeHtml(crop.soil.ph)}</li>
 </ul>
 </div>
 </div>
 </div>
 </section>

 <section class="section" style="padding-top:0;">
 <div class="container">
 <div class="info-grid">
 <div class="info-card glass-card reveal">
 <div class="info-num">3</div>
 <h3>Certified Seed Varieties</h3>
 <ul>${li(crop.seedVarieties)}</ul>
 </div>
 <div class="info-card glass-card reveal">
 <div class="info-num">4</div>
 <h3>Land Preparation</h3>
 <ul>${li(crop.landPreparation)}</ul>
 </div>
 </div>
 </div>
 </section>

 <section class="section" style="padding-top:0;">
 <div class="container">
 <div class="info-card glass-card reveal" style="padding:28px;">
 <div class="info-num">5</div>
 <h3>Planting Guide</h3>
 <div class="market-row" style="margin-top:6px;">
 <span class="market-pill">Spacing: ${escapeHtml(crop.plantingGuide.spacing)}</span>
 <span class="market-pill">Seed Rate: ${escapeHtml(crop.plantingGuide.seedRate)}</span>
 </div>
 <p style="margin-top:14px;">${escapeHtml(crop.plantingGuide.method)}</p>
 </div>
 </div>
 </section>

 <section class="section" style="padding-top:0;">
 <div class="container">
 <div class="info-grid">
 <div class="info-card glass-card reveal">
 <div class="info-num">6</div>
 <h3>Irrigation</h3>
 <p style="margin:0;">${escapeHtml(crop.irrigation)}</p>
 </div>
 <div class="info-card glass-card reveal">
 <div class="info-num">7</div>
 <h3>Fertilizer Schedule</h3>
 <ul>
 <li><strong>At planting:</strong> ${escapeHtml(crop.fertilizer.planting)}</li>
 <li><strong>Top dressing:</strong> ${escapeHtml(crop.fertilizer.topDressing)}</li>
 </ul>
 </div>
 </div>
 </div>
 </section>

 <section class="section" style="padding-top:0;">
 <div class="container">
 <div class="info-card glass-card reveal" style="padding:28px;">
 <div class="info-num">8</div>
 <h3>Weed Management</h3>
 <ul>${li(crop.weedManagement)}</ul>
 </div>
 </div>
 </section>

 <section class="section" style="padding-top:0;">
 <div class="container">
 <div class="section-head reveal" style="margin-bottom:28px;">
 <span class="eyebrow">Growth Stages</span>
 <h2 style="font-size:1.6rem;">From planting to harvest</h2>
 </div>
 <div class="growth-timeline reveal">${growthTimeline(crop.growthStages)}</div>
 </div>
 </section>

 <section class="section" style="padding-top:0;">
 <div class="container">
 <div class="info-grid">
 <div class="info-card glass-card reveal">
 <div class="info-num">9</div>
 <h3>Common Pests</h3>
 <ul>${li(crop.pests)}</ul>
 <p style="margin-top:14px; font-size:.85rem;"><a href="pests.html" class="btn btn-ghost" style="padding:0; font-weight:700;">See full pest &amp; disease library →</a></p>
 </div>
 <div class="info-card glass-card reveal">
 <div class="info-num">10</div>
 <h3>Common Diseases</h3>
 <ul>${li(crop.diseases)}</ul>
 </div>
 </div>
 </div>
 </section>

 <section class="section" style="padding-top:0;">
 <div class="container">
 <div class="info-grid">
 <div class="info-card glass-card reveal">
 <div class="info-num">11</div>
 <h3>Integrated Pest Management</h3>
 <ul>${li(crop.ipm)}</ul>
 </div>
 <div class="info-card glass-card reveal">
 <div class="info-num">12</div>
 <h3>Organic Farming Recommendations</h3>
 <ul>${li(crop.organic)}</ul>
 </div>
 </div>
 </div>
 </section>

 <section class="section" style="padding-top:0;">
 <div class="container">
 <div class="info-grid">
 <div class="info-card glass-card reveal">
 <div class="info-num">13</div>
 <h3>Harvesting</h3>
 <p style="margin:0;">${escapeHtml(crop.harvesting)}</p>
 </div>
 <div class="info-card glass-card reveal">
 <div class="info-num">14</div>
 <h3>Storage</h3>
 <p style="margin:0;">${escapeHtml(crop.storage)}</p>
 </div>
 </div>
 </div>
 </section>

 <section class="section" style="padding-top:0;">
 <div class="container">
 <div class="info-grid">
 <div class="info-card glass-card reveal">
 <div class="info-num">15</div>
 <h3>Yield Expectations</h3>
 <p style="margin:0;">${escapeHtml(crop.yieldExpectation)}</p>
 </div>
 <div class="info-card glass-card reveal">
 <div class="info-num">16</div>
 <h3>Profitability &amp; Market Demand</h3>
 <p>${escapeHtml(crop.profitability)}</p>
 <p style="margin:0;">${escapeHtml(crop.marketDemand)}</p>
 </div>
 </div>
 </div>
 </section>

 <section class="section" style="padding-top:0;">
 <div class="container">
 <div class="section-head reveal" style="margin-bottom:28px;">
 <span class="eyebrow">FAQ</span>
 <h2 style="font-size:1.6rem;">Common questions about ${escapeHtml(crop.name)}</h2>
 </div>
 <div class="faq-list" style="max-width:760px; margin:0 auto;">${faqAccordion(crop.faqs)}</div>
 </div>
 </section>

 ${relatedCropsHtml(related)}

 <section class="section" style="padding-top:0;">
 <div class="container">
 <div class="community-cta reveal">
 <h3>Join the ${escapeHtml(crop.name)} Farmer Community</h3>
 <p>Get personalized planting alerts, pest warnings and market updates for ${escapeHtml(crop.name.toLowerCase())}.</p>
 <a href="register.html" class="btn btn-secondary">Join Community (Free)</a>
 </div>
 </div>
 </section>
 `;
}

function wireFaqAccordion(root) {
 root.querySelectorAll(".faq-question").forEach((btn) => {
 btn.addEventListener("click", () => {
 const item = btn.closest(".faq-item");
 const isOpen = item.classList.contains("open");
 root.querySelectorAll(".faq-item.open").forEach((el) => {
 el.classList.remove("open");
 el.querySelector(".faq-question").setAttribute("aria-expanded", "false");
 });
 if (!isOpen) {
 item.classList.add("open");
 btn.setAttribute("aria-expanded", "true");
 }
 });
 });
}

function wireDownloadGuide(crop) {
 const btn = document.getElementById("download-guide-btn");
 if (!btn) return;
 btn.addEventListener("click", () => {
 const lines = [
 `${crop.name} — AgriSense Farming Guide`,
 "=".repeat(40),
 "",
 `Overview: ${crop.overview}`,
 "",
 `Climate: ${crop.climate.suitable} | Temp: ${crop.climate.temperature} | Rainfall: ${crop.climate.rainfall} | Altitude: ${crop.climate.altitude}`,
 `Soil: ${crop.soil.type} | pH: ${crop.soil.ph}`,
 "",
 `Seed Varieties: ${crop.seedVarieties.join(", ")}`,
 `Land Preparation: ${crop.landPreparation.join("; ")}`,
 `Planting: Spacing ${crop.plantingGuide.spacing}, Seed Rate ${crop.plantingGuide.seedRate}. ${crop.plantingGuide.method}`,
 `Irrigation: ${crop.irrigation}`,
 `Fertilizer: At planting - ${crop.fertilizer.planting}; Top dressing - ${crop.fertilizer.topDressing}`,
 `Weed Management: ${crop.weedManagement.join("; ")}`,
 "",
 `Growth Stages: ${crop.growthStages.join(" -> ")}`,
 "",
 `Common Pests: ${crop.pests.join(", ")}`,
 `Common Diseases: ${crop.diseases.join(", ")}`,
 `IPM: ${crop.ipm.join("; ")}`,
 `Organic Recommendations: ${crop.organic.join("; ")}`,
 "",
 `Harvesting: ${crop.harvesting}`,
 `Storage: ${crop.storage}`,
 `Yield Expectation: ${crop.yieldExpectation}`,
 `Profitability: ${crop.profitability}`,
 `Market Demand: ${crop.marketDemand}`,
 "",
 "Generated by AgriSense — agrisense.example.com",
 ];
 const blob = new Blob([lines.join("\n")], { type: "text/plain" });
 const url = URL.createObjectURL(blob);
 const a = document.createElement("a");
 a.href = url;
 a.download = `${crop.slug}-agrisense-guide.txt`;
 a.click();
 URL.revokeObjectURL(url);
 });
}

function getCropSlugFromUrl() {
 const params = new URLSearchParams(window.location.search);
 return params.get("crop");
}

function init() {
 const slug = getCropSlugFromUrl();
 const crop = slug ? getCropBySlug(slug) : null;

 const skeleton = document.getElementById("crop-skeleton");
 const notFound = document.getElementById("crop-not-found");
 const content = document.getElementById("crop-content");

 if (!crop) {
 if (skeleton) skeleton.style.display = "none";
 if (notFound) notFound.style.display = "block";
 return;
 }

 document.title = `${crop.name} Farming Guide — AgriSense`;
 const descEl = document.getElementById("page-description");
 if (descEl) descEl.setAttribute("content", `Complete ${crop.name.toLowerCase()} farming guide: climate, soil, planting, pests, diseases, harvesting and market info.`);

 content.innerHTML = renderCropPage(crop);
 if (skeleton) skeleton.style.display = "none";
 content.style.display = "block";

 wireFaqAccordion(content);
 wireDownloadGuide(crop);

 // Let global.js reveal-on-scroll pick up newly injected .reveal nodes
 document.dispatchEvent(new CustomEvent("components:ready"));
}

document.addEventListener("DOMContentLoaded", init);

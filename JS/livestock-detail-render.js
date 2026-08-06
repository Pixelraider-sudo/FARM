/* =========================================================
   AgriSense — Livestock Detail Renderer (ES6 Module)
   Reads ?animal=slug from the URL and renders the full
   husbandry guide from JS/data/livestock-data.js.
========================================================= */

import { getLivestockBySlug, getRelatedLivestock, getAllLivestock } from "./data/livestock-data.js";

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
  const animals = getAllLivestock();
  return animals
    .map(
      (a) =>
        `<a href="livestock-detail.html?animal=${a.slug}" class="${a.slug === activeSlug ? "active" : ""}">${escapeHtml(a.name)}</a>`
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

function relatedHtml(related) {
  if (!related.length) return "";
  return `
    <section class="section" style="padding-top:0;">
      <div class="container">
        <div class="section-head reveal" style="margin-bottom:28px;">
          <span class="eyebrow">Related Livestock</span>
          <h2 style="font-size:1.6rem;">You might also keep</h2>
        </div>
        <div class="grid-3">
          ${related
            .map(
              (a) => `
            <a href="livestock-detail.html?animal=${a.slug}" class="crop-card reveal">
              <div class="crop-img-wrap"><img src="${a.image}" alt="${escapeHtml(a.name)}" loading="lazy"></div>
              <div class="crop-card-body">
                <h4>${escapeHtml(a.name)}</h4>
                <p>${escapeHtml(a.overview.slice(0, 90))}${a.overview.length > 90 ? "…" : ""}</p>
                <span class="crop-more">View guide →</span>
              </div>
            </a>`
            )
            .join("")}
        </div>
      </div>
    </section>`;
}

function renderLivestockPage(animal) {
  const related = getRelatedLivestock(animal.slug);

  return `
    <section class="crop-hero">
      <div class="blob" style="width:280px;height:280px;top:-80px;left:-100px;background:var(--green-400);"></div>
      <div class="container">
        <div class="crop-breadcrumb reveal in">
          <a href="livestock.html">Livestock</a> <span>/</span> <span>${escapeHtml(animal.category)}</span> <span>/</span> <span>${escapeHtml(animal.name)}</span>
        </div>
        <div class="crop-hero-grid">
          <div class="reveal in">
            <span class="eyebrow">${escapeHtml(animal.category)}</span>
            <h1>${escapeHtml(animal.name)}</h1>
            <p class="crop-hero-sub">${escapeHtml(animal.overview)}</p>
            <div style="display:flex; gap:12px; flex-wrap:wrap;">
              <a href="register.html" class="btn btn-primary">Get Personalized Alerts</a>
              <a href="livestock.html" class="btn btn-secondary">Browse Livestock</a>
            </div>
          </div>
          <div class="crop-hero-img reveal in" style="transition-delay:.1s;">
            <img src="${animal.image}" alt="${escapeHtml(animal.name)}" loading="lazy">
          </div>
        </div>
        <div class="crop-nav-strip">${navStrip(animal.slug)}</div>
      </div>
    </section>

    <section class="section" style="padding-top:32px;">
      <div class="container">
        <div class="info-grid">
          <div class="info-card glass-card reveal">
            <div class="info-num">1</div>
            <h3>Housing</h3>
            <ul>${li(animal.housing)}</ul>
          </div>
          <div class="info-card glass-card reveal">
            <div class="info-num">2</div>
            <h3>Nutrition</h3>
            <ul>
              <li><strong>Feed types:</strong> ${escapeHtml(animal.nutrition.feedTypes)}</li>
              <li><strong>Feeding schedule:</strong> ${escapeHtml(animal.nutrition.feedingSchedule)}</li>
              <li><strong>Water requirements:</strong> ${escapeHtml(animal.nutrition.waterRequirements)}</li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <section class="section" style="padding-top:0;">
      <div class="container">
        <div class="info-card glass-card reveal" style="padding:28px;">
          <div class="info-num">3</div>
          <h3>Breeding</h3>
          <div class="market-row" style="margin-top:6px;">
            <span class="market-pill">Gestation/Incubation: ${escapeHtml(animal.breeding.gestationOrIncubation)}</span>
            <span class="market-pill">Breeding age: ${escapeHtml(animal.breeding.breedingAge)}</span>
          </div>
          <p style="margin-top:14px;">${escapeHtml(animal.breeding.method)}</p>
        </div>
      </div>
    </section>

    <section class="section" style="padding-top:0;">
      <div class="container">
        <div class="info-grid">
          <div class="info-card glass-card reveal">
            <div class="info-num">4</div>
            <h3>Vaccination</h3>
            <ul>${li(animal.vaccination)}</ul>
          </div>
          <div class="info-card glass-card reveal">
            <div class="info-num">5</div>
            <h3>Common Diseases</h3>
            <ul>${li(animal.diseases)}</ul>
          </div>
        </div>
      </div>
    </section>

    <section class="section" style="padding-top:0;">
      <div class="container">
        <div class="info-grid">
          <div class="info-card glass-card reveal">
            <div class="info-num">6</div>
            <h3>Parasites</h3>
            <ul>${li(animal.parasites)}</ul>
          </div>
          <div class="info-card glass-card reveal">
            <div class="info-num">7</div>
            <h3>Management Practices</h3>
            <ul>${li(animal.management)}</ul>
          </div>
        </div>
      </div>
    </section>

    <section class="section" style="padding-top:0;">
      <div class="container">
        <div class="info-card glass-card reveal" style="padding:28px;">
          <div class="info-num">8</div>
          <h3>Economics</h3>
          <ul>
            <li><strong>Startup cost:</strong> ${escapeHtml(animal.economics.startupCost)}</li>
            <li><strong>Expected returns:</strong> ${escapeHtml(animal.economics.expectedReturns)}</li>
            <li><strong>Market demand:</strong> ${escapeHtml(animal.economics.marketDemand)}</li>
          </ul>
        </div>
      </div>
    </section>

    <section class="section" style="padding-top:0;">
      <div class="container">
        <div class="section-head reveal" style="margin-bottom:28px;">
          <span class="eyebrow">FAQ</span>
          <h2 style="font-size:1.6rem;">Common questions about ${escapeHtml(animal.name)}</h2>
        </div>
        <div class="faq-list" style="max-width:760px; margin:0 auto;">${faqAccordion(animal.faqs)}</div>
      </div>
    </section>

    ${relatedHtml(related)}

    <section class="section" style="padding-top:0;">
      <div class="container">
        <div class="community-cta reveal">
          <h3>Join the ${escapeHtml(animal.name)} Farmer Community</h3>
          <p>Get personalized alerts and guidance for keeping ${escapeHtml(animal.name.toLowerCase())}.</p>
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

function getAnimalSlugFromUrl() {
  const params = new URLSearchParams(window.location.search);
  return params.get("animal");
}

function init() {
  const slug = getAnimalSlugFromUrl();
  const animal = slug ? getLivestockBySlug(slug) : null;

  const skeleton = document.getElementById("livestock-skeleton");
  const notFound = document.getElementById("livestock-not-found");
  const content = document.getElementById("livestock-content");

  if (!animal) {
    if (skeleton) skeleton.style.display = "none";
    if (notFound) notFound.style.display = "block";
    return;
  }

  document.title = `${animal.name} Farming Guide — AgriSense`;
  const descEl = document.getElementById("page-description");
  if (descEl) descEl.setAttribute("content", `Complete ${animal.name.toLowerCase()} husbandry guide: housing, nutrition, breeding, vaccination, disease and economics.`);

  content.innerHTML = renderLivestockPage(animal);
  if (skeleton) skeleton.style.display = "none";
  content.style.display = "block";

  wireFaqAccordion(content);

  document.dispatchEvent(new CustomEvent("components:ready"));
}

document.addEventListener("DOMContentLoaded", init);

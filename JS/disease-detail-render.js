import { getDiseaseBySlug, getRelatedDiseases, getAllDiseases } from "./data/diseases-data.js";

function escapeHtml(str) {
  return String(str).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function li(items) {
  return items.map((x) => `<li>${escapeHtml(x)}</li>`).join("");
}

function navStrip(activeSlug) {
  return getAllDiseases()
    .map((d) => `<a href="disease-detail.html?disease=${d.slug}" class="${d.slug === activeSlug ? "active" : ""}">${escapeHtml(d.name)}</a>`)
    .join("");
}

function relatedHtml(related) {
  if (!related.length) return "";
  return `
    <section class="section" style="padding-top:0;">
      <div class="container">
        <div class="section-head reveal" style="margin-bottom:28px;">
          <span class="eyebrow">Related Diseases</span>
          <h2 style="font-size:1.6rem;">Also worth knowing</h2>
        </div>
        <div class="grid-3">
          ${related
            .map(
              (d) => `
            <a href="disease-detail.html?disease=${d.slug}" class="crop-card reveal">
              <div class="crop-img-wrap"><img src="${d.image}" alt="${escapeHtml(d.name)}" loading="lazy"></div>
              <div class="crop-card-body">
                <h4>${escapeHtml(d.name)}</h4>
                <p>${escapeHtml(d.affectedCrops.join(", "))}</p>
                <span class="crop-more">View guide →</span>
              </div>
            </a>`
            )
            .join("")}
        </div>
      </div>
    </section>`;
}

function renderDiseasePage(d) {
  const related = getRelatedDiseases(d.slug);
  const riskClass = d.riskLevel === "High" ? "badge-danger" : d.riskLevel === "Moderate" ? "badge-caution" : "badge-safe";

  return `
    <section class="crop-hero">
      <div class="blob" style="width:260px;height:260px;top:-80px;left:-100px;background:#b91c1c;"></div>
      <div class="container">
        <div class="crop-breadcrumb reveal in">
          <a href="diseases.html">Diseases</a> <span>/</span> <span>${escapeHtml(d.category)}</span> <span>/</span> <span>${escapeHtml(d.name)}</span>
        </div>
        <div class="crop-hero-grid">
          <div class="reveal in">
            <span class="eyebrow">${escapeHtml(d.category)} disease</span>
            <h1>${escapeHtml(d.name)}</h1>
            <p class="crop-hero-sub">Affects: ${escapeHtml(d.affectedCrops.join(", "))}</p>
            <div style="display:flex; gap:12px; flex-wrap:wrap; align-items:center;">
              <span class="tag ${riskClass}" style="padding:8px 16px; font-size:.85rem;">${escapeHtml(d.riskLevel)} risk</span>
              <a href="register.html" class="btn btn-primary">Get Disease Alerts</a>
            </div>
          </div>
          <div class="crop-hero-img reveal in" style="transition-delay:.1s;">
            <img src="${d.image}" alt="${escapeHtml(d.name)}" loading="lazy">
          </div>
        </div>
        <div class="crop-nav-strip">${navStrip(d.slug)}</div>
      </div>
    </section>

    <section class="section" style="padding-top:32px;">
      <div class="container">
        <div class="info-card glass-card reveal" style="padding:28px;">
          <div class="info-num">1</div>
          <h3>Symptoms</h3>
          <ul>${li(d.symptoms)}</ul>
        </div>
      </div>
    </section>

    <section class="section" style="padding-top:0;">
      <div class="container">
        <div class="info-grid">
          <div class="info-card glass-card reveal">
            <div class="info-num">2</div>
            <h3>Causes</h3>
            <p style="margin:0;">${escapeHtml(d.causes)}</p>
          </div>
          <div class="info-card glass-card reveal">
            <div class="info-num">3</div>
            <h3>Diagnosis</h3>
            <p style="margin:0;">${escapeHtml(d.diagnosis)}</p>
          </div>
        </div>
      </div>
    </section>

    <section class="section" style="padding-top:0;">
      <div class="container">
        <div class="info-card glass-card reveal" style="padding:28px;">
          <div class="info-num">4</div>
          <h3>Treatment Overview</h3>
          <p style="margin:0;">${escapeHtml(d.treatment)}</p>
        </div>
      </div>
    </section>

    <section class="section" style="padding-top:0;">
      <div class="container">
        <div class="info-grid">
          <div class="info-card glass-card reveal">
            <div class="info-num">5</div>
            <h3>Organic Treatment</h3>
            <p style="margin:0;">${escapeHtml(d.organicTreatment)}</p>
          </div>
          <div class="info-card glass-card reveal">
            <div class="info-num">6</div>
            <h3>Chemical Treatment</h3>
            <p style="margin:0;">${escapeHtml(d.chemicalTreatment)}</p>
          </div>
        </div>
      </div>
    </section>

    <section class="section" style="padding-top:0;">
      <div class="container">
        <div class="info-grid">
          <div class="info-card glass-card reveal">
            <div class="info-num">7</div>
            <h3>Prevention</h3>
            <ul>${li(d.prevention)}</ul>
          </div>
          <div class="info-card glass-card reveal">
            <div class="info-num">8</div>
            <h3>Recovery Outlook</h3>
            <p style="margin:0;">${escapeHtml(d.recovery)}</p>
          </div>
        </div>
      </div>
    </section>

    <section class="section" style="padding-top:0;">
      <div class="container">
        <div class="community-cta reveal">
          <h3>Not sure if this matches what you're seeing?</h3>
          <p>Ask the AI assistant to help narrow down a diagnosis, or describe your symptoms in the chat.</p>
          <a href="ai-assistant.html" class="btn btn-secondary">Ask the AI Assistant</a>
        </div>
      </div>
    </section>

    ${relatedHtml(related)}
  `;
}

function getSlugFromUrl() {
  return new URLSearchParams(window.location.search).get("disease");
}

function init() {
  const slug = getSlugFromUrl();
  const disease = slug ? getDiseaseBySlug(slug) : null;

  const skeleton = document.getElementById("disease-skeleton");
  const notFound = document.getElementById("disease-not-found");
  const content = document.getElementById("disease-content");

  if (!disease) {
    if (skeleton) skeleton.style.display = "none";
    if (notFound) notFound.style.display = "block";
    return;
  }

  document.title = `${disease.name} — AgriSense Disease Guide`;
  const descEl = document.getElementById("page-description");
  if (descEl) descEl.setAttribute("content", `${disease.name}: symptoms, causes, diagnosis, treatment and prevention.`);

  content.innerHTML = renderDiseasePage(disease);
  if (skeleton) skeleton.style.display = "none";
  content.style.display = "block";

  document.dispatchEvent(new CustomEvent("components:ready"));
}

document.addEventListener("DOMContentLoaded", init);

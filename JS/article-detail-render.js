/* =========================================================
   AgriSense — Article Detail Renderer (ES6 Module)
========================================================= */

import { getArticleBySlug, getAllArticles } from "./data/learning-data.js";

function escapeHtml(str) {
  return String(str).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function render(article) {
  const others = getAllArticles().filter((a) => a.slug !== article.slug).slice(0, 3);

  return `
    <div class="article-hero">
      <div class="container" style="padding-top:56px;">
        <div class="crop-breadcrumb reveal in"><a href="learning.html">Learning Center</a> <span>/</span> <span>${escapeHtml(article.category)}</span></div>
        <span class="eyebrow reveal in">${escapeHtml(article.category)}</span>
        <h1 class="reveal in" style="max-width:760px;">${escapeHtml(article.title)}</h1>
        <p class="reveal in" style="color:var(--text-muted); font-size:.9rem;">${escapeHtml(article.readTime)}</p>
      </div>
    </div>
    <div class="container article-img-wrap reveal in">
      <img src="${article.image}" alt="${escapeHtml(article.title)}" loading="lazy">
    </div>
    <div class="container article-body reveal in">
      ${article.body.map((p) => `<p>${escapeHtml(p)}</p>`).join("")}
    </div>
    <section class="section" style="padding-top:24px;">
      <div class="container">
        <div class="section-head reveal" style="margin-bottom:28px;">
          <span class="eyebrow">More Guides</span>
          <h2 style="font-size:1.5rem;">Keep reading</h2>
        </div>
        <div class="grid-3">
          ${others
            .map(
              (a) => `
            <a href="article-detail.html?article=${a.slug}" class="crop-card reveal">
              <div class="crop-img-wrap"><img src="${a.image}" loading="lazy" alt="${escapeHtml(a.title)}"></div>
              <div class="crop-card-body">
                <h4>${escapeHtml(a.title)}</h4>
                <p>${escapeHtml(a.excerpt)}</p>
              </div>
            </a>`
            )
            .join("")}
        </div>
      </div>
    </section>`;
}

document.addEventListener("DOMContentLoaded", () => {
  const slug = new URLSearchParams(window.location.search).get("article");
  const article = slug ? getArticleBySlug(slug) : null;
  const content = document.getElementById("article-content");
  const notFound = document.getElementById("article-not-found");

  if (!article) {
    if (notFound) notFound.style.display = "block";
    return;
  }

  document.title = `${article.title} — AgriSense`;
  const descEl = document.getElementById("page-description");
  if (descEl) descEl.setAttribute("content", article.excerpt);

  content.innerHTML = render(article);
  content.style.display = "block";
  document.dispatchEvent(new CustomEvent("components:ready"));
});

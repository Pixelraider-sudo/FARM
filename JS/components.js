/* =========================================================
   AgriSense — Shared Components
   Injects navbar + footer markup so every page stays in
   sync without duplicating the same HTML 15 times.
========================================================= */

const NAV_LINKS = [
  { href: "INDEX.html", label: "Home", key: "home" },
  { href: "crops.html", label: "Crops", key: "crops" },
  { href: "pests.html", label: "Pests & Diseases", key: "pests" },
  { href: "calendar.html", label: "Planting Calendar", key: "calendar" },
  { href: "alerts.html", label: "Alerts", key: "alerts" },
  { href: "weather and seasons.html", label: "Weather", key: "weather" },
];

function renderNavbar(activeKey) {
  const mount = document.getElementById("navbar-placeholder");
  if (!mount) return;

  const links = NAV_LINKS.map(
    (l) =>
      `<a href="${l.href}" class="${l.key === activeKey ? "active" : ""}">${l.label}</a>`
  ).join("");

  mount.innerHTML = `
    <div id="scroll-progress"></div>
    <header id="site-navbar">
      <div class="nav-inner">
        <a href="INDEX.html" class="nav-brand">
          <span class="logo-mark">🌿</span> AgriSense
        </a>
        <nav class="nav-links" id="nav-links">
          ${links}
          <a href="login.html" class="${activeKey === "login" ? "active" : ""}">Login</a>
          <a href="register.html" class="btn btn-primary" style="padding:10px 20px; margin-left:8px;" id="nav-register-cta">Register</a>
        </nav>
        <div class="nav-actions">
          <button class="theme-toggle" id="theme-toggle" aria-label="Toggle dark mode" title="Toggle dark mode">🌙</button>
          <button class="nav-toggle" id="nav-toggle" aria-label="Open menu" aria-expanded="false">
            <span></span><span></span><span></span>
          </button>
        </div>
      </div>
    </header>
  `;
}

function renderFooter() {
  const mount = document.getElementById("footer-placeholder");
  if (!mount) return;

  mount.innerHTML = `
    <footer id="site-footer">
      <div class="container">
        <div class="footer-grid">
          <div class="footer-brand">
            <a href="INDEX.html" class="nav-brand" style="color:#fff; margin-bottom:14px;">
              <span class="logo-mark">🌿</span> AgriSense
            </a>
            <p>AI-powered farming intelligence &mdash; planting windows, pest alerts and market insight for every smallholder farmer.</p>
            <div class="footer-social">
              <a href="#" aria-label="Facebook">📘</a>
              <a href="#" aria-label="Twitter / X">🐦</a>
              <a href="#" aria-label="Instagram">📸</a>
              <a href="#" aria-label="YouTube">▶️</a>
            </div>
          </div>
          <div class="footer-col">
            <h4>Quick Links</h4>
            <a href="INDEX.html">Home</a>
            <a href="crops.html">Crops</a>
            <a href="calendar.html">Planting Calendar</a>
            <a href="alerts.html">Alerts</a>
          </div>
          <div class="footer-col">
            <h4>Platform</h4>
            <a href="pests.html">Pest &amp; Disease ID</a>
            <a href="weather and seasons.html">Weather &amp; Seasons</a>
            <a href="register.html">Create Account</a>
            <a href="login.html">Farmer Login</a>
          </div>
          <div class="footer-col">
            <h4>Stay Updated</h4>
            <p style="margin-bottom:10px;">Get planting reminders &amp; pest alerts in your inbox.</p>
            <form class="newsletter-form" id="newsletter-form">
              <input type="email" placeholder="you@email.com" required aria-label="Email for newsletter">
              <button type="submit">Join</button>
            </form>
          </div>
        </div>
        <div class="footer-bottom">
          <span>&copy; <span id="footer-year">2026</span> AgriSense &mdash; Smart Farming Starts Here. All rights reserved.</span>
          <span>Made for farmers, powered by AI 🌾</span>
        </div>
      </div>
    </footer>
    <button id="back-to-top" aria-label="Back to top">↑</button>
  `;

  const yearEl = document.getElementById("footer-year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  const newsletterForm = document.getElementById("newsletter-form");
  if (newsletterForm) {
    newsletterForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const btn = newsletterForm.querySelector("button");
      const original = btn.textContent;
      btn.textContent = "Subscribed ✓";
      newsletterForm.querySelector("input").value = "";
      setTimeout(() => (btn.textContent = original), 2500);
    });
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const activeKey = document.body.getAttribute("data-page") || "";
  renderNavbar(activeKey);
  renderFooter();
  document.dispatchEvent(new CustomEvent("components:ready"));
});

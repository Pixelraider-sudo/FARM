/* =========================================================
 AgriSense — Shared Components
 Injects navbar + footer markup so every page stays in
 sync without duplicating the same HTML 15 times.
========================================================= */

const NAV_LINKS = [
 { href: "INDEX.html", label: "Home", key: "home" },
 { href: "dashboard.html", label: "Dashboard", key: "dashboard" },
 { href: "crops.html", label: "Crops", key: "crops" },
 { href: "livestock.html", label: "Livestock", key: "livestock" },
 { href: "diseases.html", label: "Diseases", key: "diseases" },
 { href: "pests.html", label: "Pests", key: "pests" },
 { href: "weather and seasons.html", label: "Weather", key: "weather" },
];

const NAV_TOOLS = [
 { href: "market.html", label: "Market Center", key: "market" },
 { href: "farm-planner.html", label: "Farm Planner", key: "planner" },
 { href: "farms.html", label: "My Farms", key: "farms" },
 { href: "inventory.html", label: "Inventory", key: "inventory" },
 { href: "finance.html", label: "Finance", key: "finance" },
 { href: "calendar.html", label: "Planting Calendar", key: "calendar" },
 { href: "alerts.html", label: "Alerts", key: "alerts" },
 { href: "learning.html", label: "Learning Center", key: "learning" },
 { href: "community.html", label: "Community", key: "community" },
 { href: "ai-assistant.html", label: "AI Assistant", key: "ai-assistant" },
 { href: "search.html", label: "Search", key: "search" },
 { href: "about.html", label: "About", key: "about" },
 { href: "contact.html", label: "Contact", key: "contact" },
];

function renderNavbar(activeKey) {
 const mount = document.getElementById("navbar-placeholder");
 if (!mount) return;

 const links = NAV_LINKS.map(
 (l) =>
 `<a href="${l.href}" class="${l.key === activeKey ? "active" : ""}">${l.label}</a>`
 ).join("");

 const toolsActive = NAV_TOOLS.some((t) => t.key === activeKey);
 const toolLinks = NAV_TOOLS.map(
 (l) =>
 `<a href="${l.href}" class="${l.key === activeKey ? "active" : ""}">${l.label}</a>`
 ).join("");

 mount.innerHTML = `
 <div id="scroll-progress"></div>
 <header id="site-navbar">
 <div class="nav-inner">
 <a href="INDEX.html" class="nav-brand">
 <span class="logo-mark">A</span> AgriSense
 </a>
 <nav class="nav-links" id="nav-links">
 ${links}
 <div class="nav-dropdown-wrap">
 <button class="nav-dropdown-trigger ${toolsActive ? "active" : ""}" id="nav-tools-trigger" aria-expanded="false">
 More
 <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
 </button>
 <div class="nav-dropdown-menu" id="nav-tools-menu">${toolLinks}</div>
 </div>
 <a href="login.html" class="${activeKey === "login" ? "active" : ""}">Login</a>
 <a href="register.html" class="btn btn-primary" style="padding:10px 20px; margin-left:8px;" id="nav-register-cta">Register</a>
 </nav>
 <div class="nav-actions">
 <div class="notif-wrap">
 <button class="theme-toggle" id="notif-bell" aria-label="Notifications" title="Notifications">
 <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>
 <span class="notif-badge" id="notif-badge" style="display:none;">0</span>
 </button>
 <div class="notif-dropdown" id="notif-dropdown">
 <div class="notif-dropdown-header">
 <span>Notifications</span>
 <button id="notif-mark-all">Mark all read</button>
 </div>
 <div class="notif-dropdown-list" id="notif-dropdown-list"></div>
 <a href="notifications.html" class="notif-dropdown-footer">View all notifications</a>
 </div>
 </div>
 <button class="theme-toggle" id="theme-toggle" aria-label="Toggle dark mode" title="Toggle dark mode">
 <svg class="icon-sun" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"></circle><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"></path></svg>
 <svg class="icon-moon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
 </button>
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
 <span class="logo-mark">A</span> AgriSense
 </a>
 <p>AI-powered farming intelligence &mdash; planting windows, pest alerts and market insight for every smallholder farmer.</p>
 <div class="footer-social">
 <a href="#" aria-label="Facebook">F</a>
 <a href="#" aria-label="Twitter / X">X</a>
 <a href="#" aria-label="Instagram">IG</a>
 <a href="#" aria-label="YouTube">YT</a>
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
 <span>Made for farmers, powered by AI </span>
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
 btn.textContent = "Subscribed ";
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

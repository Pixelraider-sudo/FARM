/* =========================================================
   AgriSense — Global Behaviour
   Loading screen, dark mode, navbar scroll state, mobile
   menu, reveal-on-scroll, back-to-top, scroll progress.
   All listeners are debounced / delegated for performance.
========================================================= */

(function () {
  "use strict";

  /* ---------- Debounce helper ---------- */
  function debounce(fn, wait) {
    let t;
    return function (...args) {
      clearTimeout(t);
      t = setTimeout(() => fn.apply(this, args), wait);
    };
  }

  /* ---------- Loading screen ---------- */
  function initLoader() {
    const loader = document.getElementById("loader");
    if (!loader) return;
    const fill = loader.querySelector(".loader-bar-fill");
    let progress = 0;
    const tick = setInterval(() => {
      progress += Math.random() * 22;
      if (progress > 92) progress = 92;
      if (fill) fill.style.width = progress + "%";
    }, 140);

    window.addEventListener("load", () => {
      clearInterval(tick);
      if (fill) fill.style.width = "100%";
      setTimeout(() => loader.classList.add("hidden"), 320);
    });
    // Safety net in case 'load' already fired
    setTimeout(() => {
      clearInterval(tick);
      if (fill) fill.style.width = "100%";
      loader.classList.add("hidden");
    }, 2500);
  }

  /* ---------- Dark mode ---------- */
  function initTheme() {
    const root = document.documentElement;
    const stored = localStorage.getItem("agrisense-theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const theme = stored || (prefersDark ? "dark" : "light");
    root.setAttribute("data-theme", theme);

    document.addEventListener("components:ready", () => {
      const toggle = document.getElementById("theme-toggle");
      if (!toggle) return;
      toggle.textContent = theme === "dark" ? "☀️" : "🌙";
      toggle.addEventListener("click", () => {
        const current = root.getAttribute("data-theme");
        const next = current === "dark" ? "light" : "dark";
        root.setAttribute("data-theme", next);
        localStorage.setItem("agrisense-theme", next);
        toggle.textContent = next === "dark" ? "☀️" : "🌙";
      });
    });
  }

  /* ---------- Navbar scroll state + mobile menu ---------- */
  function initNavbar() {
    document.addEventListener("components:ready", () => {
      const nav = document.getElementById("site-navbar");
      const toggle = document.getElementById("nav-toggle");
      const links = document.getElementById("nav-links");

      const onScroll = debounce(() => {
        if (!nav) return;
        if (window.scrollY > 12) nav.classList.add("scrolled");
        else nav.classList.remove("scrolled");
      }, 10);
      window.addEventListener("scroll", onScroll, { passive: true });
      onScroll();

      if (toggle && links) {
        toggle.addEventListener("click", () => {
          const isOpen = links.classList.toggle("open");
          toggle.classList.toggle("open", isOpen);
          toggle.setAttribute("aria-expanded", String(isOpen));
        });
        links.addEventListener("click", (e) => {
          if (e.target.tagName === "A") {
            links.classList.remove("open");
            toggle.classList.remove("open");
            toggle.setAttribute("aria-expanded", "false");
          }
        });
      }
    });
  }

  /* ---------- Scroll progress bar ---------- */
  function initScrollProgress() {
    document.addEventListener("components:ready", () => {
      const bar = document.getElementById("scroll-progress");
      if (!bar) return;
      const onScroll = debounce(() => {
        const h = document.documentElement;
        const scrolled = (h.scrollTop) / (h.scrollHeight - h.clientHeight) * 100;
        bar.style.width = (isFinite(scrolled) ? scrolled : 0) + "%";
      }, 10);
      window.addEventListener("scroll", onScroll, { passive: true });
      onScroll();
    });
  }

  /* ---------- Back to top ---------- */
  function initBackToTop() {
    document.addEventListener("components:ready", () => {
      const btn = document.getElementById("back-to-top");
      if (!btn) return;
      const onScroll = debounce(() => {
        btn.classList.toggle("show", window.scrollY > 480);
      }, 10);
      window.addEventListener("scroll", onScroll, { passive: true });
      btn.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
    });
  }

  /* ---------- Reveal on scroll (IntersectionObserver) ---------- */
  function initReveal() {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -60px 0px" }
    );

    function observeAll() {
      document.querySelectorAll(".reveal:not(.in)").forEach((el, i) => {
        el.style.setProperty("--i", i % 8);
        observer.observe(el);
      });
    }

    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", observeAll);
    } else {
      observeAll();
    }
    // Re-scan after components (e.g., chatbot) mount extra reveal nodes
    document.addEventListener("components:ready", () => setTimeout(observeAll, 50));
  }

  /* ---------- Animated counters ---------- */
  function initCounters() {
    const counters = document.querySelectorAll("[data-count]");
    if (!counters.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target;
          const target = parseFloat(el.getAttribute("data-count"));
          const suffix = el.getAttribute("data-suffix") || "";
          const duration = 1400;
          const start = performance.now();
          function step(now) {
            const p = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - p, 3);
            const val = target * eased;
            el.textContent = (target % 1 === 0 ? Math.round(val) : val.toFixed(1)) + suffix;
            if (p < 1) requestAnimationFrame(step);
          }
          requestAnimationFrame(step);
          observer.unobserve(el);
        });
      },
      { threshold: 0.5 }
    );
    counters.forEach((c) => observer.observe(c));
  }

  /* ---------- Ripple micro-interaction on buttons ---------- */
  function initRipples() {
    document.addEventListener("click", (e) => {
      const btn = e.target.closest(".btn");
      if (!btn) return;
      const rect = btn.getBoundingClientRect();
      const ripple = document.createElement("span");
      const size = Math.max(rect.width, rect.height);
      ripple.className = "ripple";
      ripple.style.width = ripple.style.height = size + "px";
      ripple.style.left = e.clientX - rect.left - size / 2 + "px";
      ripple.style.top = e.clientY - rect.top - size / 2 + "px";
      btn.appendChild(ripple);
      setTimeout(() => ripple.remove(), 650);
    });
  }

  /* ---------- Mouse glow on cards ---------- */
  function initMouseGlow() {
    document.addEventListener("mousemove", debounce((e) => {
      const card = e.target.closest ? e.target.closest(".glow-card") : null;
      if (!card) return;
      const rect = card.getBoundingClientRect();
      card.style.setProperty("--mx", e.clientX - rect.left + "px");
      card.style.setProperty("--my", e.clientY - rect.top + "px");
    }, 8), { passive: true });
  }

  initLoader();
  initTheme();
  initNavbar();
  initScrollProgress();
  initBackToTop();
  initReveal();
  initCounters();
  initRipples();
  initMouseGlow();
})();

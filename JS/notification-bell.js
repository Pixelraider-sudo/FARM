/* =========================================================
   AgriSense — Notification Bell Widget (ES6 Module)
   Wires up the bell icon injected into the navbar by
   components.js. Runs on every page since components.js
   builds the navbar on every page.
========================================================= */

import { getNotifications, getUnreadCount, markRead, markAllRead, NOTIFICATION_ICONS } from "./services/notification-service.js";

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function timeAgo(ts) {
  const diff = Date.now() - ts;
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

function renderBadge() {
  const badge = document.getElementById("notif-badge");
  if (!badge) return;
  const count = getUnreadCount();
  badge.style.display = count > 0 ? "flex" : "none";
  badge.textContent = String(count);
}

function renderList() {
  const mount = document.getElementById("notif-dropdown-list");
  if (!mount) return;
  const items = getNotifications().slice(0, 6);
  if (!items.length) {
    mount.innerHTML = `<p class="notif-empty">No notifications yet.</p>`;
    return;
  }
  mount.innerHTML = items
    .map(
      (n) => `
      <button class="notif-item ${n.read ? "" : "unread"}" data-id="${n.id}">
        <span class="notif-item-icon">${escapeHtml(NOTIFICATION_ICONS[n.type] || "N")}</span>
        <span class="notif-item-body">
          <strong>${escapeHtml(n.title)}</strong>
          <span>${escapeHtml(n.body)}</span>
          <em>${timeAgo(n.createdAt)}</em>
        </span>
      </button>`
    )
    .join("");
}

function refresh() {
  renderBadge();
  renderList();
}

function init() {
  const bell = document.getElementById("notif-bell");
  const dropdown = document.getElementById("notif-dropdown");
  const markAllBtn = document.getElementById("notif-mark-all");
  const list = document.getElementById("notif-dropdown-list");
  if (!bell || !dropdown) return;

  refresh();

  bell.addEventListener("click", (e) => {
    e.stopPropagation();
    const open = dropdown.classList.toggle("open");
    if (open) refresh();
  });

  document.addEventListener("click", (e) => {
    if (!dropdown.contains(e.target) && e.target !== bell) {
      dropdown.classList.remove("open");
    }
  });

  markAllBtn.addEventListener("click", () => {
    markAllRead();
    refresh();
  });

  list.addEventListener("click", (e) => {
    const item = e.target.closest(".notif-item");
    if (!item) return;
    markRead(item.getAttribute("data-id"));
    refresh();
  });
}

document.addEventListener("components:ready", init, { once: true });

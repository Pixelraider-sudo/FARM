/* =========================================================
   AgriSense — Notifications Page Renderer (ES6 Module)
========================================================= */

import { getNotifications, markRead, markAllRead, deleteNotification, NOTIFICATION_ICONS } from "./services/notification-service.js";

function escapeHtml(str) {
  return String(str || "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function timeAgo(ts) {
  const mins = Math.floor((Date.now() - ts) / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  return `${Math.floor(hours / 24)}d ago`;
}

function notifRow(n) {
  return `
    <article class="app-card reveal" data-id="${n.id}" style="margin-bottom:12px; display:flex; align-items:flex-start; gap:14px; ${n.read ? "" : "border-left:3px solid var(--green-500);"}">
      <span class="notif-item-icon" style="width:36px; height:36px; font-size:.72rem;">${escapeHtml(NOTIFICATION_ICONS[n.type] || "N")}</span>
      <div style="flex:1;">
        <div style="display:flex; justify-content:space-between; gap:10px;">
          <strong>${escapeHtml(n.title)}</strong>
          <button class="icon-btn danger" data-action="delete" title="Dismiss">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
        </div>
        <p style="margin:6px 0;">${escapeHtml(n.body)}</p>
        <span style="font-size:.78rem; color: var(--text-muted);">${timeAgo(n.createdAt)}</span>
      </div>
    </article>`;
}

function render() {
  const mount = document.getElementById("notif-list");
  if (!mount) return;
  const notifications = getNotifications();
  if (!notifications.length) {
    mount.innerHTML = `<div class="empty-state"><h3>No notifications</h3><p>You're all caught up.</p></div>`;
    return;
  }
  mount.innerHTML = notifications.map(notifRow).join("");
  document.dispatchEvent(new CustomEvent("components:ready"));
}

function init() {
  render();
  document.getElementById("mark-all-btn")?.addEventListener("click", () => {
    markAllRead();
    render();
  });
  document.getElementById("notif-list")?.addEventListener("click", (e) => {
    const card = e.target.closest(".app-card");
    if (!card) return;
    const id = card.getAttribute("data-id");
    if (e.target.closest('[data-action="delete"]')) {
      deleteNotification(id);
    } else {
      markRead(id);
    }
    render();
  });
}

document.addEventListener("DOMContentLoaded", init);

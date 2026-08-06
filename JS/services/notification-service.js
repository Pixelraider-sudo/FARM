/* =========================================================
   AgriSense — Notification Service (ES6 Module)
========================================================= */

import { getAll, create, update, remove, STORAGE_KEYS } from "./storage-service.js";

const SEED_NOTIFICATIONS = [
  { type: "weather", title: "Heavy rainfall expected", body: "Rainfall above 40mm expected in the next 24 hours in your region.", read: false },
  { type: "alert", title: "Fall armyworm reported nearby", body: "Fall armyworm activity has been reported in neighboring farms. Scout your maize this week.", read: false },
  { type: "reminder", title: "Top-dressing due", body: "Maize planted 4 weeks ago is due for top-dressing fertilizer application.", read: false },
  { type: "market", title: "Maize prices up 8%", body: "County market prices for maize have risen this week.", read: true },
  { type: "ai", title: "New AI recommendation", body: "Based on your recent questions, the AI assistant has a soil health tip for you.", read: true },
];

function ensureSeeded() {
  const existing = getAll(STORAGE_KEYS.NOTIFICATIONS);
  if (existing.length === 0) {
    SEED_NOTIFICATIONS.forEach((n) => create(STORAGE_KEYS.NOTIFICATIONS, n, "notif"));
  }
}

export function getNotifications() {
  ensureSeeded();
  return getAll(STORAGE_KEYS.NOTIFICATIONS).sort((a, b) => b.createdAt - a.createdAt);
}

export function getUnreadCount() {
  return getNotifications().filter((n) => !n.read).length;
}

export function markRead(id) {
  return update(STORAGE_KEYS.NOTIFICATIONS, id, { read: true });
}

export function markAllRead() {
  getNotifications().forEach((n) => update(STORAGE_KEYS.NOTIFICATIONS, n.id, { read: true }));
}

export function addNotification(data) {
  return create(STORAGE_KEYS.NOTIFICATIONS, { read: false, ...data }, "notif");
}

export function deleteNotification(id) {
  return remove(STORAGE_KEYS.NOTIFICATIONS, id);
}

export const NOTIFICATION_ICONS = {
  weather: "W",
  alert: "!",
  reminder: "R",
  market: "M",
  ai: "AI",
};

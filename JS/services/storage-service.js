/* =========================================================
   AgriSense — Storage Service (ES6 Module)
   Generic localStorage-backed CRUD helper. Every feature that
   needs to persist data before a real backend exists (farms,
   inventory, finance, community, notifications) goes through
   this single module so the storage strategy can be swapped
   for real API calls later without touching feature code.
========================================================= */

function readCollection(key) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function writeCollection(key, items) {
  try {
    localStorage.setItem(key, JSON.stringify(items));
    return true;
  } catch {
    return false;
  }
}

function generateId(prefix = "id") {
  return `${prefix}_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
}

export function getAll(key) {
  return readCollection(key);
}

export function getById(key, id) {
  return readCollection(key).find((item) => item.id === id) || null;
}

export function create(key, data, idPrefix) {
  const items = readCollection(key);
  const record = { id: generateId(idPrefix), createdAt: Date.now(), ...data };
  items.push(record);
  writeCollection(key, items);
  return record;
}

export function update(key, id, patch) {
  const items = readCollection(key);
  const idx = items.findIndex((item) => item.id === id);
  if (idx === -1) return null;
  items[idx] = { ...items[idx], ...patch, updatedAt: Date.now() };
  writeCollection(key, items);
  return items[idx];
}

export function remove(key, id) {
  const items = readCollection(key);
  const next = items.filter((item) => item.id !== id);
  writeCollection(key, next);
  return next.length !== items.length;
}

export function clearAll(key) {
  writeCollection(key, []);
}

export const STORAGE_KEYS = {
  FARMS: "agrisense-farms",
  INVENTORY: "agrisense-inventory",
  FINANCE: "agrisense-finance",
  COMMUNITY_POSTS: "agrisense-community-posts",
  NOTIFICATIONS: "agrisense-notifications",
  PLANNER_PLANS: "agrisense-planner-plans",
};

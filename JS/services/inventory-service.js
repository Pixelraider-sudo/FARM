/* =========================================================
   AgriSense — Inventory Service (ES6 Module)
========================================================= */

import { getAll, create, update, remove, STORAGE_KEYS } from "./storage-service.js";

export const INVENTORY_CATEGORIES = ["Seeds", "Fertilizers", "Pesticides", "Tools", "Equipment", "Feed", "Medicine"];

export function getInventory() {
  return getAll(STORAGE_KEYS.INVENTORY).sort((a, b) => b.createdAt - a.createdAt);
}

export function createItem(data) {
  return create(STORAGE_KEYS.INVENTORY, data, "inv");
}

export function updateItem(id, patch) {
  return update(STORAGE_KEYS.INVENTORY, id, patch);
}

export function deleteItem(id) {
  return remove(STORAGE_KEYS.INVENTORY, id);
}

export function isLowStock(item) {
  const qty = parseFloat(item.quantity);
  const threshold = parseFloat(item.lowStockThreshold);
  if (isNaN(qty) || isNaN(threshold)) return false;
  return qty <= threshold;
}

export function getLowStockItems() {
  return getInventory().filter(isLowStock);
}

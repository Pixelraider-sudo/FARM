/* =========================================================
   AgriSense — Farm Service (ES6 Module)
========================================================= */

import { getAll, getById, create, update, remove, STORAGE_KEYS } from "./storage-service.js";

export function getFarms() {
  return getAll(STORAGE_KEYS.FARMS).sort((a, b) => b.createdAt - a.createdAt);
}

export function getFarm(id) {
  return getById(STORAGE_KEYS.FARMS, id);
}

export function createFarm(data) {
  return create(STORAGE_KEYS.FARMS, data, "farm");
}

export function updateFarm(id, patch) {
  return update(STORAGE_KEYS.FARMS, id, patch);
}

export function deleteFarm(id) {
  return remove(STORAGE_KEYS.FARMS, id);
}

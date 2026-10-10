import type { Stored } from "@/types";

/** Generic localStorage-backed CRUD. Swap this module for real API calls
 *  when a backend exists — features only talk to this interface. */

export const STORAGE_KEYS = {
  FARMS: "agrisense-farms",
  INVENTORY: "agrisense-inventory",
  FINANCE: "agrisense-finance",
  COMMUNITY_POSTS: "agrisense-community-posts",
  NOTIFICATIONS: "agrisense-notifications",
  PLANNER_PLANS: "agrisense-planner-plans",
} as const;

export type StorageKey = (typeof STORAGE_KEYS)[keyof typeof STORAGE_KEYS];

const EVENT = "agrisense:storage";

export function readAll<T extends Stored>(key: StorageKey): T[] {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T[]) : [];
  } catch {
    return [];
  }
}

function writeAll<T extends Stored>(key: StorageKey, items: T[]): void {
  try {
    localStorage.setItem(key, JSON.stringify(items));
  } catch {
    /* storage full or unavailable — fail soft */
  }
  window.dispatchEvent(new CustomEvent(EVENT, { detail: key }));
}

const genId = (prefix: string) => `${prefix}_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;

export function createRecord<T extends Stored>(key: StorageKey, data: Omit<T, keyof Stored>, prefix = "id"): T {
  const record = { id: genId(prefix), createdAt: Date.now(), ...data } as T;
  writeAll(key, [...readAll<T>(key), record]);
  return record;
}

export function updateRecord<T extends Stored>(key: StorageKey, id: string, patch: Partial<Omit<T, "id">>): void {
  writeAll(key, readAll<T>(key).map((r) => (r.id === id ? { ...r, ...patch, updatedAt: Date.now() } : r)));
}

export function removeRecord<T extends Stored>(key: StorageKey, id: string): void {
  writeAll(key, readAll<T>(key).filter((r) => r.id !== id));
}

export function subscribe(key: StorageKey, cb: () => void): () => void {
  const onCustom = (e: Event) => (e as CustomEvent).detail === key && cb();
  const onStorage = (e: StorageEvent) => e.key === key && cb();
  window.addEventListener(EVENT, onCustom);
  window.addEventListener("storage", onStorage);
  return () => {
    window.removeEventListener(EVENT, onCustom);
    window.removeEventListener("storage", onStorage);
  };
}

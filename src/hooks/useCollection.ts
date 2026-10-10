import { useCallback, useEffect, useRef, useState } from "react";
import type { Stored } from "@/types";
import {
  createRecord,
  readAll,
  removeRecord,
  subscribe,
  updateRecord,
  type StorageKey,
} from "@/lib/storage";

/** Reactive view over a localStorage collection. `seed` runs once if the collection is empty. */
export function useCollection<T extends Stored>(
  key: StorageKey,
  prefix: string,
  seed?: Array<Omit<T, keyof Stored>>,
) {
  const seeded = useRef(false);
  const [items, setItems] = useState<T[]>(() => {
    const existing = readAll<T>(key);
    if (existing.length === 0 && seed && !seeded.current) {
      seeded.current = true;
      seed.forEach((s, i) => {
        const r = createRecord<T>(key, s, prefix);
        r.createdAt -= i * 1000; // preserve seed order (newest first)
      });
      return readAll<T>(key);
    }
    return existing;
  });

  const refresh = useCallback(() => setItems(readAll<T>(key)), [key]);
  useEffect(() => subscribe(key, refresh), [key, refresh]);

  return {
    items: [...items].sort((a, b) => b.createdAt - a.createdAt),
    add: (data: Omit<T, keyof Stored>) => createRecord<T>(key, data, prefix),
    update: (id: string, patch: Partial<Omit<T, "id">>) =>
      updateRecord<T>(key, id, patch),
    remove: (id: string) => removeRecord<T>(key, id),
  };
}

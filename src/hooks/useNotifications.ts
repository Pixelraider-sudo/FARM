import type { AppNotification } from "@/types";
import { STORAGE_KEYS, readAll, updateRecord } from "@/lib/storage";
import { useCollection } from "./useCollection";

const SEED: Array<Omit<AppNotification, "id" | "createdAt">> = [
  { type: "weather", title: "Heavy rainfall expected", body: "Rainfall above 40mm expected in the next 24 hours in your region.", read: false },
  { type: "alert", title: "Fall armyworm reported nearby", body: "Fall armyworm activity has been reported in neighboring farms. Scout your maize this week.", read: false },
  { type: "reminder", title: "Top-dressing due", body: "Maize planted 4 weeks ago is due for top-dressing fertilizer application.", read: false },
  { type: "market", title: "Maize prices up 8%", body: "County market prices for maize have risen this week.", read: true },
  { type: "ai", title: "New AI recommendation", body: "Based on your recent questions, the AI assistant has a soil health tip for you.", read: true },
];

export function useNotifications() {
  const col = useCollection<AppNotification>(STORAGE_KEYS.NOTIFICATIONS, "notif", SEED);
  const unread = col.items.filter((n) => !n.read).length;
  return {
    items: col.items,
    unread,
    markRead: (id: string) => col.update(id, { read: true }),
    markAllRead: () => readAll<AppNotification>(STORAGE_KEYS.NOTIFICATIONS).forEach((n) => !n.read && updateRecord<AppNotification>(STORAGE_KEYS.NOTIFICATIONS, n.id, { read: true })),
    remove: col.remove,
  };
}

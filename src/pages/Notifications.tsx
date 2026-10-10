import {
  Bell,
  BellOff,
  Bot,
  CloudRain,
  ShieldAlert,
  ShoppingBasket,
  Trash2,
  CalendarClock,
} from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/Misc";
import { useNotifications } from "@/hooks/useNotifications";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { cn, timeAgo } from "@/lib/utils";
import type { NotificationType } from "@/types";

const ICON: Record<NotificationType, typeof Bell> = {
  weather: CloudRain,
  alert: ShieldAlert,
  reminder: CalendarClock,
  market: ShoppingBasket,
  ai: Bot,
};

export default function Notifications() {
  useDocumentTitle("Notifications");
  const n = useNotifications();
  return (
    <>
      <PageHeader
        eyebrow="Notifications"
        scene="sky"
        title={
          <>
            What needs your{" "}
            <em className="accent-italic !text-lime">attention.</em>
          </>
        }
        lead={n.unread ? `${n.unread} unread` : "You're all caught up."}
      >
        {n.unread > 0 && (
          <Button variant="lime" onClick={n.markAllRead}>
            Mark all read
          </Button>
        )}
      </PageHeader>
      <section className="wrap mt-10 max-w-3xl">
        {n.items.length === 0 ? (
          <EmptyState
            icon={BellOff}
            title="Nothing here"
            body="New weather, pest and market notices will show up here."
          />
        ) : (
          <ul className="space-y-3">
            {n.items.map((x) => {
              const I = ICON[x.type] ?? Bell;
              return (
                <li
                  key={x.id}
                  className={cn(
                    "card flex items-start gap-4 p-5",
                    !x.read && "!border-clay/40 bg-lime/10",
                  )}
                >
                  <span
                    className={cn(
                      "grid h-11 w-11 shrink-0 place-items-center rounded-full",
                      x.read ? "bg-surface2 text-muted" : "bg-clay text-white",
                    )}
                  >
                    <I size={18} />
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <strong>{x.title}</strong>
                      <span className="label text-muted !text-[0.62rem]">
                        {timeAgo(x.createdAt)}
                      </span>
                    </div>
                    <p className="mt-1 text-muted">{x.body}</p>
                    {!x.read && (
                      <button
                        onClick={() => n.markRead(x.id)}
                        className="mt-2 text-sm font-bold text-brand hover:underline"
                      >
                        Mark as read
                      </button>
                    )}
                  </div>
                  <button
                    onClick={() => n.remove(x.id)}
                    aria-label="Delete notification"
                    className="grid h-9 w-9 place-items-center rounded-full text-muted hover:bg-clay hover:text-white"
                  >
                    <Trash2 size={15} />
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </section>
    </>
  );
}

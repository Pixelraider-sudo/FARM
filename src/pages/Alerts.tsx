import { useState } from "react";
import {
  AlertTriangle,
  CheckCircle2,
  CloudLightning,
  OctagonAlert,
} from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { Badge, BulletList, Chips, EmptyState } from "@/components/ui/Misc";
import { ALERTS, FARMER_NOTES, type AlertLevel } from "@/data/static";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { Bell } from "lucide-react";

const META: Record<
  AlertLevel,
  { label: string; icon: typeof AlertTriangle; cls: string }
> = {
  danger: {
    label: "Danger",
    icon: OctagonAlert,
    cls: "border-clay/40 bg-clay/10",
  },
  caution: {
    label: "Caution",
    icon: AlertTriangle,
    cls: "border-sun/50 bg-sun/12",
  },
  safe: {
    label: "Safe",
    icon: CheckCircle2,
    cls: "border-brand/30 bg-brand/8",
  },
};
const FILTERS = ["All alerts", "Danger", "Caution", "Safe"];

export default function Alerts() {
  useDocumentTitle("Alerts");
  const [f, setF] = useState("All alerts");
  const shown = ALERTS.filter(
    (a) => f === "All alerts" || META[a.level].label === f,
  );
  return (
    <>
      <PageHeader
        eyebrow="Precautions & alerts"
        scene="sky"
        title={
          <>
            Read this <em className="accent-italic !text-lime">before</em> you
            plant.
          </>
        }
        lead="Important guidance for safe and effective farming, updated for current conditions."
      />
      <section className="wrap mt-10 space-y-5">
        <div className="relative isolate overflow-hidden rounded-[2rem] bg-clay p-7 text-white sm:p-10">
          <CloudLightning className="absolute -right-6 -top-6 -z-10 h-48 w-48 opacity-15" />
          <span className="label flex items-center gap-2">
            <span className="pulse-dot h-2 w-2 rounded-full bg-white" /> Live
            weather warning
          </span>
          <p className="mt-3 max-w-3xl font-display text-2xl leading-snug sm:text-3xl">
            Heavy rainfall and strong winds are expected in your area over the
            next few hours. Stay indoors where possible, avoid flooded roads,
            and secure loose outdoor items.
          </p>
        </div>

        <Chips options={FILTERS} value={f} onChange={setF} />
        {shown.length === 0 ? (
          <EmptyState
            icon={Bell}
            title="No alerts match"
            body="Try another filter."
          />
        ) : (
          <ul className="grid gap-3 md:grid-cols-2">
            {shown.map((a) => {
              const m = META[a.level];
              return (
                <li
                  key={a.text}
                  className={`flex items-start gap-4 rounded-3xl border p-5 ${m.cls}`}
                >
                  <m.icon className="mt-0.5 shrink-0" />
                  <div className="flex-1">
                    <Badge level={a.level} className="mb-2">
                      {m.label}
                    </Badge>
                    <p className="font-semibold">{a.text}</p>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
        <div className="card p-7">
          <h3 className="mb-3 text-3xl">Notes for farmers</h3>
          <BulletList items={FARMER_NOTES} />
        </div>
      </section>
    </>
  );
}

import { useState } from "react";
import { Link } from "react-router-dom";
import { CloudSun, Info } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { SelectField } from "@/components/ui/Field";
import { Img } from "@/components/ui/Img";
import { entityImages } from "@/data/images";
import {
  REGIONS,
  REGION_NOTES,
  SEASONAL_PLANTING,
  SEASONS,
} from "@/data/static";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { cn } from "@/lib/utils";

function MiniCalendar() {
  const now = new Date();
  const first = new Date(now.getFullYear(), now.getMonth(), 1).getDay();
  const days = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
  const cells = [
    ...Array(first).fill(null),
    ...Array.from({ length: days }, (_, i) => i + 1),
  ];
  return (
    <div className="card p-6">
      <h3 className="mb-4 text-2xl">
        {now.toLocaleDateString(undefined, { month: "long", year: "numeric" })}
      </h3>
      <div className="grid grid-cols-7 gap-1 text-center text-sm">
        {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => (
          <span key={i} className="label py-1 text-muted">
            {d}
          </span>
        ))}
        {cells.map((d, i) => (
          <span
            key={i}
            className={cn(
              "grid aspect-square place-items-center rounded-full",
              d === now.getDate() && "bg-fg font-bold text-bg",
              d && d !== now.getDate() && "hover:bg-lime/50",
            )}
          >
            {d}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function Weather() {
  useDocumentTitle("Weather & seasons");
  const [region, setRegion] = useState<string>("rift-valley");
  const [season, setSeason] = useState<string>("long-rains");
  const note =
    REGION_NOTES[`${region}|${season}`] ??
    "Select a region and season to see tailored guidance.";

  return (
    <>
      <PageHeader
        eyebrow="Weather & seasons"
        scene="sky"
        title={
          <>
            Plant with the <em className="accent-italic !text-lime">sky.</em>
          </>
        }
        lead="Pick your region and season to see when conditions favor planting."
      />
      <section className="wrap mt-10 grid gap-5 lg:grid-cols-[1.4fr_1fr]">
        <div className="space-y-5">
          <div className="card p-6 sm:p-8">
            <div className="grid gap-4 sm:grid-cols-2">
              <SelectField
                id="region"
                label="Region"
                value={region}
                onChange={(e) => setRegion(e.target.value)}
                options={REGIONS.map((r) => ({
                  value: r.value,
                  label: r.label,
                }))}
              />
              <SelectField
                id="season"
                label="Season"
                value={season}
                onChange={(e) => setSeason(e.target.value)}
                options={SEASONS.map((r) => ({
                  value: r.value,
                  label: r.label,
                }))}
              />
            </div>
            <div
              key={`${region}${season}`}
              className="mt-6 flex items-start gap-4 rounded-2xl bg-lime p-5 text-limeink [animation:fade_.4s_ease]"
            >
              <CloudSun className="mt-0.5 shrink-0" />
              <p className="text-lg font-semibold leading-snug">{note}</p>
            </div>
          </div>
          <div className="card p-6 sm:p-8">
            <h3 className="mb-5 text-3xl">Crop planting info</h3>
            <ul className="divide-y divide-line">
              {SEASONAL_PLANTING.map((s) => (
                <li key={s.crop}>
                  <Link
                    to={`/crops/${s.slug}`}
                    className="group flex items-center gap-4 py-3 hover:bg-surface2/60"
                  >
                    <Img
                      srcs={entityImages("crop", s.slug, s.crop)}
                      alt={s.crop}
                      className="h-14 w-14 shrink-0 rounded-2xl"
                    />
                    <span className="flex-1">
                      <span className="block font-display text-2xl leading-none">
                        {s.crop}
                      </span>
                      <span className="text-sm text-muted">{s.note}</span>
                    </span>
                    <span className="text-muted transition-transform group-hover:translate-x-1">
                      →
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="space-y-5">
          <MiniCalendar />
          <div className="card flex gap-3 p-5 text-sm text-muted">
            <Info size={18} className="mt-0.5 shrink-0 text-clay" />
            Seasonal guidance is general. For live forecasts and warnings, check
            your national meteorological service.
          </div>
        </div>
      </section>
      <style>{`@keyframes fade{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:none}}`}</style>
    </>
  );
}

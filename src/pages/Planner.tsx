import { useMemo, useState, type FormEvent } from "react";
import { useSearchParams } from "react-router-dom";
import { CalendarCheck, Download, Save, Trash2 } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { SelectField, TextField } from "@/components/ui/Field";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Misc";
import { CROPS, getCrop } from "@/data";
import { buildSchedule } from "@/lib/planner";
import { useCollection } from "@/hooks/useCollection";
import { STORAGE_KEYS } from "@/lib/storage";
import { fmtDate, todayISO } from "@/lib/utils";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import type { PlannerPlan } from "@/types";

const icsDate = (d: Date) => d.toISOString().slice(0, 10).replace(/-/g, "");

export default function Planner() {
  useDocumentTitle("Season planner");
  const [params] = useSearchParams();
  const [slug, setSlug] = useState(getCrop(params.get("crop") ?? "")?.slug ?? "maize");
  const [date, setDate] = useState(todayISO());
  const [acres, setAcres] = useState("1");
  const [generated, setGenerated] = useState<{ slug: string; date: string; acres: number } | null>(null);
  const plans = useCollection<PlannerPlan>(STORAGE_KEYS.PLANNER_PLANS, "plan");

  const crop = generated ? getCrop(generated.slug) : undefined;
  const rows = useMemo(() => (crop && generated ? buildSchedule(crop, new Date(generated.date)) : []), [crop, generated]);

  const generate = (e: FormEvent) => {
    e.preventDefault();
    const n = parseFloat(acres);
    if (!date || !(n > 0)) return;
    setGenerated({ slug, date, acres: n });
    setTimeout(() => document.getElementById("plan-output")?.scrollIntoView({ behavior: "smooth", block: "start" }), 50);
  };

  const exportIcs = () => {
    if (!crop) return;
    const body = rows.map((r, i) => [
      "BEGIN:VEVENT", `UID:agrisense-${crop.slug}-${i}@agrisense`, `DTSTAMP:${icsDate(new Date())}T000000Z`,
      `DTSTART;VALUE=DATE:${icsDate(r.date)}`, `SUMMARY:${crop.name}: ${r.stage}`, `DESCRIPTION:${r.task.replace(/[,;\n]/g, " ")}`, "END:VEVENT",
    ].join("\r\n")).join("\r\n");
    const blob = new Blob([`BEGIN:VCALENDAR\r\nVERSION:2.0\r\nPRODID:-//AgriSense//Planner//EN\r\n${body}\r\nEND:VCALENDAR`], { type: "text/calendar" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob); a.download = `${crop.slug}-season-plan.ics`; a.click();
    URL.revokeObjectURL(a.href);
  };

  return (
    <>
      <PageHeader eyebrow="Season planner" scene="planner" title={<>From seed to <em className="accent-italic !text-lime">store,</em> dated.</>} lead="Choose a crop and planting date. We turn the crop's growth stages into a working schedule." />
      <section className="wrap mt-10 grid gap-5 lg:grid-cols-[380px_1fr]">
        <form onSubmit={generate} className="card space-y-5 self-start p-6 sm:p-8">
          <SelectField id="pl-crop" label="Crop" value={slug} onChange={(e) => setSlug(e.target.value)} options={CROPS.map((c) => ({ value: c.slug, label: c.name }))} />
          <TextField id="pl-date" label="Planting date" type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
          <TextField id="pl-acres" label="Farm size (acres)" type="number" min="0.1" step="0.1" value={acres} onChange={(e) => setAcres(e.target.value)} required />
          <Button type="submit" variant="primary" className="w-full" size="lg"><CalendarCheck size={18} /> Generate schedule</Button>
        </form>

        <div id="plan-output" className="scroll-mt-28 space-y-5">
          {!crop || !generated ? (
            <div className="card grid min-h-[320px] place-items-center border-dashed p-10 text-center shadow-none">
              <div><CalendarCheck size={40} className="mx-auto text-clay" /><h3 className="mt-4 text-3xl">Your plan appears here</h3><p className="mt-2 text-muted">Fill in the form and generate a schedule.</p></div>
            </div>
          ) : (
            <div className="card overflow-hidden">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line p-6">
                <div><h2 className="text-3xl">{crop.name}</h2><p className="text-sm text-muted">{generated.acres} acre{generated.acres === 1 ? "" : "s"} · planting {fmtDate(generated.date)}</p></div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" onClick={exportIcs}><Download size={15} /> .ics</Button>
                  <Button size="sm" variant="lime" onClick={() => plans.add({ cropSlug: crop.slug, cropName: crop.name, acres: generated.acres, plantingDate: generated.date })}><Save size={15} /> Save plan</Button>
                </div>
              </div>
              <ol className="divide-y divide-line">
                {rows.map((r, i) => (
                  <li key={i} className="grid gap-1 px-6 py-4 sm:grid-cols-[130px_120px_1fr] sm:gap-4">
                    <span className="font-mono text-sm font-semibold">{fmtDate(r.date)}</span>
                    <span><Badge>{r.stage}</Badge></span>
                    <span className="text-sm">{r.task}</span>
                  </li>
                ))}
              </ol>
            </div>
          )}

          {plans.items.length > 0 && (
            <div className="card p-6">
              <h3 className="mb-4 text-2xl">Saved plans</h3>
              <ul className="divide-y divide-line">
                {plans.items.map((p) => (
                  <li key={p.id} className="flex items-center gap-3 py-3">
                    <button className="flex-1 text-left hover:underline" onClick={() => { setSlug(p.cropSlug); setDate(p.plantingDate); setAcres(String(p.acres)); setGenerated({ slug: p.cropSlug, date: p.plantingDate, acres: p.acres }); }}>
                      <strong>{p.cropName}</strong> <span className="text-sm text-muted">· {p.acres} ac · {fmtDate(p.plantingDate)}</span>
                    </button>
                    <button onClick={() => plans.remove(p.id)} aria-label={`Delete ${p.cropName} plan`} className="grid h-9 w-9 place-items-center rounded-full text-muted hover:bg-clay/15 hover:text-clay"><Trash2 size={16} /></button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

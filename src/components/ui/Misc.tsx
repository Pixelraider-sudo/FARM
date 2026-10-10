import { useState, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { ChevronDown, Search, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Img } from "./Img";
import { entityImages, type EntityKind } from "@/data/images";

/* ───────── Level badge (risk / demand / alert) ───────── */
const LEVEL_STYLE: Record<string, string> = {
  High: "bg-clay/15 text-clay border-clay/30",
  Moderate: "bg-sun/20 text-[#8a5d00] dark:text-sun border-sun/40",
  Low: "bg-brand/10 text-brand border-brand/25",
  danger: "bg-clay/15 text-clay border-clay/30",
  caution: "bg-sun/20 text-[#8a5d00] dark:text-sun border-sun/40",
  safe: "bg-brand/10 text-brand border-brand/25",
};
export function Badge({ level, children, className }: { level?: string; children: ReactNode; className?: string }) {
  return (
    <span className={cn("label inline-flex items-center rounded-full border px-2.5 py-1 !text-[0.66rem]", level ? LEVEL_STYLE[level] : "border-line bg-surface2 text-muted", className)}>
      {children}
    </span>
  );
}

/* ───────── Entity card (crop / livestock / disease / article) ───────── */
interface EntityCardProps {
  kind: EntityKind; slug: string; name: string; to: string; meta: string; blurb?: string; badge?: ReactNode;
}
export function EntityCard({ kind, slug, name, to, meta, blurb, badge }: EntityCardProps) {
  return (
    <Link to={to} className="card group flex h-full flex-col overflow-hidden transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_30px_60px_-28px_rgb(18_38_27/0.55)]">
      <div className="relative">
        <Img srcs={entityImages(kind, slug, name)} alt={name} className="aspect-[4/3]" imgClassName="transition-transform duration-700 group-hover:scale-110" />
        <span className="label absolute left-4 top-4 rounded-full bg-bg/90 px-3 py-1 text-fg backdrop-blur !text-[0.66rem]">{meta}</span>
        {badge && <span className="absolute right-4 top-4">{badge}</span>}
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-2xl">{name}</h3>
        {blurb && <p className="mt-2 line-clamp-3 text-sm text-muted">{blurb}</p>}
        <span className="mt-auto flex items-center gap-1.5 pt-4 text-sm font-bold text-brand">
          Read guide <span className="transition-transform group-hover:translate-x-1.5">→</span>
        </span>
      </div>
    </Link>
  );
}

/* ───────── Search box + chips ───────── */
export function SearchBox({ value, onChange, placeholder }: { value: string; onChange: (v: string) => void; placeholder: string }) {
  return (
    <label className="relative block w-full max-w-md">
      <span className="sr-only">{placeholder}</span>
      <Search size={18} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted" />
      <input type="search" value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} className="input !rounded-full !pl-11" />
    </label>
  );
}
export function Chips({ options, value, onChange }: { options: string[]; value: string; onChange: (v: string) => void }) {
  return (
    <div className="flex flex-wrap gap-2" role="group">
      {options.map((o) => (
        <button key={o} className="chip" data-on={o === value} aria-pressed={o === value} onClick={() => onChange(o)}>{o}</button>
      ))}
    </div>
  );
}

/* ───────── Empty state ───────── */
export function EmptyState({ icon: Icon, title, body, action }: { icon: LucideIcon; title: string; body: string; action?: ReactNode }) {
  return (
    <div className="card grid place-items-center gap-3 border-dashed px-6 py-16 text-center shadow-none">
      <span className="grid h-16 w-16 place-items-center rounded-full bg-lime text-limeink"><Icon size={28} /></span>
      <h3 className="text-3xl">{title}</h3>
      <p className="max-w-md text-muted">{body}</p>
      {action && <div className="mt-2">{action}</div>}
    </div>
  );
}

/* ───────── Accordion (FAQs) ───────── */
export function Accordion({ items }: { items: Array<{ q: string; a: string }> }) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="divide-y divide-line overflow-hidden rounded-3xl border border-line bg-surface">
      {items.map((it, i) => (
        <div key={it.q}>
          <button className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left font-bold hover:bg-surface2" aria-expanded={open === i} onClick={() => setOpen(open === i ? null : i)}>
            {it.q}
            <ChevronDown size={18} className={cn("shrink-0 transition-transform", open === i && "rotate-180")} />
          </button>
          <div className={cn("grid transition-all duration-300", open === i ? "grid-rows-[1fr]" : "grid-rows-[0fr]")}>
            <p className="overflow-hidden px-6 text-muted"><span className="block pb-5">{it.a}</span></p>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ───────── Sparkline ───────── */
export function Sparkline({ values, up, className }: { values: number[]; up: boolean; className?: string }) {
  const w = 120, h = 40, pad = 3;
  const min = Math.min(...values), max = Math.max(...values);
  const pts = values.map((v, i) => [pad + (i * (w - pad * 2)) / (values.length - 1), h - pad - ((v - min) / (max - min || 1)) * (h - pad * 2)] as const);
  const line = pts.map(([x, y], i) => `${i ? "L" : "M"}${x.toFixed(1)} ${y.toFixed(1)}`).join(" ");
  const color = up ? "var(--brand)" : "var(--clay)";
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className={cn("h-10 w-28", className)} aria-hidden>
      <path d={`${line} L${w - pad} ${h} L${pad} ${h} Z`} fill={color} opacity="0.12" />
      <path d={line} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx={pts[pts.length - 1][0]} cy={pts[pts.length - 1][1]} r="3" fill={color} />
    </svg>
  );
}

/* ───────── Bullet list block ───────── */
export function BulletList({ items }: { items: string[] }) {
  return <ul className="prose-list">{items.map((i) => <li key={i}>{i}</li>)}</ul>;
}

/* ───────── Fact tile ───────── */
export function Fact({ label, value, icon: Icon }: { label: string; value: ReactNode; icon?: LucideIcon }) {
  return (
    <div className="rounded-2xl border border-line bg-surface2/60 p-4">
      <div className="label mb-1.5 flex items-center gap-2 text-muted">{Icon && <Icon size={14} />}{label}</div>
      <div className="font-semibold leading-snug">{value}</div>
    </div>
  );
}

/* ───────── Detail panel ───────── */
export function Panel({ title, icon: Icon, children, className }: { title: string; icon?: LucideIcon; children: ReactNode; className?: string }) {
  return (
    <section className={cn("card p-6 sm:p-8", className)}>
      <h3 className="mb-4 flex items-center gap-3 text-2xl">
        {Icon && <span className="grid h-10 w-10 place-items-center rounded-full bg-lime text-limeink"><Icon size={18} /></span>}
        {title}
      </h3>
      {children}
    </section>
  );
}

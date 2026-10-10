import { useEffect, useState, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { PageHeader } from "./PageHeader";
import { Img } from "./Img";
import { entityImages, type EntityKind } from "@/data/images";
import { cn } from "@/lib/utils";
import { Panel } from "./Misc";
import type { LucideIcon } from "lucide-react";

export interface TocItem { id: string; label: string }

/** A titled, anchorable section of a detail page. */
export function Section({ id, title, icon, children, className }: { id: string; title: string; icon?: LucideIcon; children: ReactNode; className?: string }) {
  return <div id={id} className="scroll-mt-28"><Panel title={title} icon={icon} className={className}>{children}</Panel></div>;
}

function useActiveSection(ids: string[]) {
  const [active, setActive] = useState(ids[0]);
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-20% 0px -65% 0px" },
    );
    ids.forEach((id) => { const el = document.getElementById(id); el && obs.observe(el); });
    return () => obs.disconnect();
  }, [ids.join("|")]); // eslint-disable-line react-hooks/exhaustive-deps
  return active;
}

interface ShellProps {
  kind: EntityKind; slug: string; name: string; category: string; eyebrow: string; lead: string;
  crumbs: Array<{ label: string; to?: string }>;
  facts?: ReactNode; toc: TocItem[]; children: ReactNode;
  related?: Array<{ slug: string; name: string; to: string; meta: string }>; relatedKind: EntityKind; relatedTitle: string;
}

export function DetailShell({ kind, slug, name, eyebrow, lead, crumbs, facts, toc, children, related, relatedKind, relatedTitle }: ShellProps) {
  const active = useActiveSection(toc.map((t) => t.id));
  return (
    <>
      <PageHeader eyebrow={eyebrow} title={name} lead={lead} image={entityImages(kind, slug, name)} crumbs={crumbs} />
      <div className="wrap mt-8 grid gap-8 lg:grid-cols-[230px_1fr]">
        <aside className="hidden lg:block">
          <nav className="sticky top-28" aria-label="On this page">
            <p className="label mb-3 text-muted">On this page</p>
            <ul className="border-l border-line">
              {toc.map((t) => (
                <li key={t.id}>
                  <a href={`#${t.id}`} onClick={(e) => { e.preventDefault(); document.getElementById(t.id)?.scrollIntoView({ behavior: "smooth" }); }}
                    className={cn("-ml-px block border-l-2 py-1.5 pl-4 text-sm transition-colors", active === t.id ? "border-clay font-bold text-fg" : "border-transparent text-muted hover:text-fg")}>
                    {t.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </aside>
        <div className="min-w-0 space-y-5">
          {facts && <div className="grid grid-cols-2 gap-3 md:grid-cols-4">{facts}</div>}
          {children}
        </div>
      </div>
      {related && related.length > 0 && (
        <section className="wrap mt-16">
          <h2 className="display mb-6 text-4xl">{relatedTitle}</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((r) => (
              <Link key={r.slug} to={r.to} className="card group flex items-center gap-4 p-3 pr-5 transition-transform hover:-translate-y-1">
                <Img srcs={entityImages(relatedKind, r.slug, r.name)} alt={r.name} className="h-16 w-16 shrink-0 rounded-2xl" />
                <span><span className="block font-display text-xl leading-tight">{r.name}</span><span className="label text-muted !text-[0.62rem]">{r.meta}</span></span>
              </Link>
            ))}
          </div>
        </section>
      )}
    </>
  );
}

/** Numbered vertical timeline (growth stages, etc). */
export function Timeline({ steps }: { steps: string[] }) {
  return (
    <ol className="relative space-y-1 border-l-2 border-dashed border-line pl-7">
      {steps.map((s, i) => (
        <li key={s} className="relative py-2">
          <span className="absolute -left-[2.35rem] top-2.5 grid h-7 w-7 place-items-center rounded-full bg-lime font-mono text-xs font-bold text-limeink">{i + 1}</span>
          {s}
        </li>
      ))}
    </ol>
  );
}

export function TagList({ items, linkFor }: { items: string[]; linkFor?: (name: string) => string | undefined }) {
  return (
    <div className="flex flex-wrap gap-2">
      {items.map((i) => {
        const to = linkFor?.(i);
        const cls = "rounded-full border border-line bg-surface2 px-3.5 py-1.5 text-sm font-semibold";
        return to ? <Link key={i} to={to} className={cn(cls, "hover:border-fg hover:bg-fg hover:text-bg")}>{i} ↗</Link> : <span key={i} className={cls}>{i}</span>;
      })}
    </div>
  );
}

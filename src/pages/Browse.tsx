import { useMemo, useState } from "react";
import { SearchX } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { Chips, EmptyState, EntityCard, SearchBox, Badge } from "@/components/ui/Misc";
import { Reveal } from "@/components/ui/Reveal";
import { ARTICLES, ARTICLE_CATEGORIES, CROPS, CROP_CATEGORIES, DISEASES, DISEASE_CATEGORIES, LIVESTOCK, LIVESTOCK_CATEGORIES } from "@/data";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import type { SceneKey } from "@/data/images";
import type { EntityKind } from "@/data/images";
import type { ReactNode } from "react";

interface Row { slug: string; name: string; category: string; blurb: string; to: string; badge?: ReactNode; haystack: string }
interface Cfg {
  title: string; eyebrow: string; heading: ReactNode; lead: string; scene: SceneKey; kind: EntityKind;
  categories: string[]; rows: Row[]; searchLabel: string; noun: string;
}

function BrowsePage({ cfg }: { cfg: Cfg }) {
  useDocumentTitle(cfg.title);
  const [cat, setCat] = useState("All");
  const [q, setQ] = useState("");
  const shown = useMemo(() => cfg.rows.filter((r) =>
    (cat === "All" || r.category === cat) && (!q.trim() || r.haystack.includes(q.trim().toLowerCase()))), [cfg.rows, cat, q]);

  return (
    <>
      <PageHeader eyebrow={cfg.eyebrow} title={cfg.heading} lead={cfg.lead} scene={cfg.scene} />
      <section className="wrap mt-10">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <Chips options={["All", ...cfg.categories]} value={cat} onChange={setCat} />
          <SearchBox value={q} onChange={setQ} placeholder={cfg.searchLabel} />
        </div>
        <p className="label mb-5 text-muted" aria-live="polite">{shown.length} {cfg.noun}{shown.length === 1 ? "" : "s"}</p>
        {shown.length === 0 ? (
          <EmptyState icon={SearchX} title="Nothing matches" body="Try a different category or clear the search." />
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {shown.map((r, i) => (
              <Reveal key={r.slug} delay={Math.min(i % 4, 3) * 0.05}>
                <EntityCard kind={cfg.kind} slug={r.slug} name={r.name} to={r.to} meta={r.category} blurb={r.blurb} badge={r.badge} />
              </Reveal>
            ))}
          </div>
        )}
      </section>
    </>
  );
}

export function CropsPage() {
  const rows = CROPS.map((c) => ({ slug: c.slug, name: c.name, category: c.category, blurb: c.overview, to: `/crops/${c.slug}`, haystack: `${c.name} ${c.category} ${c.overview} ${c.pests.join(" ")}`.toLowerCase() }));
  return <BrowsePage cfg={{ title: "Crops", eyebrow: "Crop library", heading: <>{CROPS.length} crops, <em className="accent-italic !text-lime">fully mapped</em></>, lead: "Climate, soil, spacing, fertilizer, pests and profit — the whole season for every crop.", scene: "field", kind: "crop", categories: CROP_CATEGORIES, rows, searchLabel: "Search crops…", noun: "crop" }} />;
}
export function LivestockPage() {
  const rows = LIVESTOCK.map((c) => ({ slug: c.slug, name: c.name, category: c.category, blurb: c.overview, to: `/livestock/${c.slug}`, haystack: `${c.name} ${c.category} ${c.overview}`.toLowerCase() }));
  return <BrowsePage cfg={{ title: "Livestock", eyebrow: "Livestock library", heading: <>Healthy animals, <em className="accent-italic !text-lime">steady income</em></>, lead: "Housing, nutrition, breeding, vaccination and the economics of each livestock type.", scene: "herd", kind: "livestock", categories: LIVESTOCK_CATEGORIES, rows, searchLabel: "Search livestock…", noun: "type" }} />;
}
export function DiseasesPage() {
  const rows = DISEASES.map((d) => ({ slug: d.slug, name: d.name, category: d.category, blurb: `Affects ${d.affectedCrops.join(", ")}. ${d.symptoms[0]}`, to: `/diseases/${d.slug}`, badge: <Badge level={d.riskLevel}>{d.riskLevel} risk</Badge>, haystack: `${d.name} ${d.category} ${d.affectedCrops.join(" ")} ${d.symptoms.join(" ")}`.toLowerCase() }));
  return <BrowsePage cfg={{ title: "Diseases", eyebrow: "Disease library", heading: <>Spot it <em className="accent-italic !text-lime">early.</em> Stop it faster.</>, lead: "Symptoms, causes, organic and chemical treatment, and prevention for the diseases that cost farmers most.", scene: "soil", kind: "disease", categories: DISEASE_CATEGORIES, rows, searchLabel: "Search diseases or crops…", noun: "disease" }} />;
}
export function LearnPage() {
  const rows = ARTICLES.map((a) => ({ slug: a.slug, name: a.title, category: a.category, blurb: a.excerpt, to: `/learn/${a.slug}`, badge: <span className="label rounded-full bg-lime px-2.5 py-1 text-limeink !text-[0.62rem]">{a.readTime}</span>, haystack: `${a.title} ${a.category} ${a.excerpt}`.toLowerCase() }));
  return <BrowsePage cfg={{ title: "Learning center", eyebrow: "Learning center", heading: <>Guides worth <em className="accent-italic !text-lime">reading</em></>, lead: "Short, practical explainers on climate-smart farming, soil, greenhouses and more.", scene: "seedling", kind: "article", categories: ARTICLE_CATEGORIES, rows, searchLabel: "Search articles…", noun: "article" }} />;
}

import { useMemo } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { SearchX } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { Img } from "@/components/ui/Img";
import { Chips, EmptyState, SearchBox } from "@/components/ui/Misc";
import { searchAll } from "@/data";
import { entityImages } from "@/data/images";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";

const KINDS = ["All", "Crop", "Livestock", "Disease", "Pest", "Article"];

export default function Search() {
  useDocumentTitle("Search");
  const [params, setParams] = useSearchParams();
  const q = params.get("q") ?? "";
  const kind = params.get("type") ?? "All";
  const results = useMemo(() => searchAll(q), [q]);
  const shown = results.filter((r) => kind === "All" || r.kind === kind);
  const update = (patch: Record<string, string>) => { const n = new URLSearchParams(params); Object.entries(patch).forEach(([k, v]) => (v && v !== "All" ? n.set(k, v) : n.delete(k))); setParams(n, { replace: true }); };

  return (
    <>
      <PageHeader eyebrow="Search" scene="field" title={<>Find <em className="accent-italic !text-lime">anything.</em></>} lead="Crops, livestock, diseases, pests and articles — one search box.">
        <SearchBox value={q} onChange={(v) => update({ q: v })} placeholder="Try “maize”, “blight”, “goats”…" />
      </PageHeader>
      <section className="wrap mt-10">
        {q.trim().length < 2 ? <p className="text-muted">Type at least two characters to search.</p> : (
          <>
            <div className="mb-6"><Chips options={KINDS} value={kind} onChange={(v) => update({ type: v })} /></div>
            <p className="label mb-4 text-muted" aria-live="polite">{shown.length} result{shown.length === 1 ? "" : "s"} for “{q}”</p>
            {shown.length === 0 ? <EmptyState icon={SearchX} title="No results" body="Check the spelling or try a broader term." /> : (
              <ul className="grid gap-3 md:grid-cols-2">
                {shown.map((r) => (
                  <li key={`${r.kind}-${r.slug}`}>
                    <Link to={r.to} className="card group flex items-center gap-4 p-3 pr-6 transition-transform hover:-translate-y-0.5">
                      <Img srcs={entityImages(r.imageKind, r.slug, r.title)} alt={r.title} className="h-20 w-20 shrink-0 rounded-2xl" />
                      <span className="min-w-0 flex-1"><span className="label text-clay !text-[0.62rem]">{r.kind}</span><span className="block truncate font-display text-2xl leading-tight">{r.title}</span><span className="block truncate text-sm text-muted">{r.subtitle}</span></span>
                      <span className="text-muted transition-transform group-hover:translate-x-1">→</span>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </>
        )}
      </section>
    </>
  );
}

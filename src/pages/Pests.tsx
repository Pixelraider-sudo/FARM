import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { Bug, FlaskConical, ShieldCheck, Stethoscope } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { Img } from "@/components/ui/Img";
import { Badge, Chips } from "@/components/ui/Misc";
import { Reveal } from "@/components/ui/Reveal";
import { PESTS, PEST_CROPS_ALL } from "@/data";
import { entityImages } from "@/data/images";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";

export default function Pests() {
  useDocumentTitle("Pests & diseases");
  const [params, setParams] = useSearchParams();
  const crop = params.get("crop") ?? "All crops";
  const list = useMemo(() => PESTS.filter((p) => crop === "All crops" || p.crop === crop), [crop]);

  return (
    <>
      <PageHeader eyebrow="Pest & disease ID" scene="soil" title={<>Know your <em className="accent-italic !text-lime">enemy.</em></>}
        lead="Spot the signs early. Symptoms, definitions and recommended control for every core crop on the platform." />
      <section className="wrap mt-10">
        <div className="mb-8"><Chips options={["All crops", ...PEST_CROPS_ALL]} value={crop} onChange={(v) => setParams(v === "All crops" ? {} : { crop: v })} /></div>
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {list.map((p, i) => (
            <Reveal key={p.id} delay={(i % 3) * 0.05}>
              <article className="card flex h-full flex-col overflow-hidden sm:flex-row xl:flex-col">
                <div className="relative sm:w-2/5 xl:w-full">
                  <Img srcs={entityImages("pest", p.id, p.name)} alt={p.name} className="h-full min-h-48 xl:aspect-[16/10] xl:h-auto" />
                  <span className="absolute left-3 top-3"><Badge level={p.kind === "Disease" ? "High" : "Moderate"} className="bg-bg/90 backdrop-blur">{p.kind}</Badge></span>
                </div>
                <div className="flex-1 p-5">
                  <div className="label text-muted">{p.crop}</div>
                  <h3 className="mb-3 mt-1 text-2xl">{p.name}</h3>
                  <dl className="space-y-3 text-sm">
                    {p.definition && <div><dt className="label mb-0.5 flex items-center gap-1.5 text-muted"><Bug size={12} />Definition</dt><dd>{p.definition}</dd></div>}
                    <div><dt className="label mb-0.5 flex items-center gap-1.5 text-muted"><Stethoscope size={12} />Symptoms</dt><dd>{p.symptoms}</dd></div>
                    <div><dt className="label mb-0.5 flex items-center gap-1.5 text-muted"><ShieldCheck size={12} />Control</dt><dd>{p.control}</dd></div>
                    <div><dt className="label mb-0.5 flex items-center gap-1.5 text-muted"><FlaskConical size={12} />{p.chemicalLabel}</dt><dd>{p.chemicals}</dd></div>
                  </dl>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
        <p className="mt-8 rounded-2xl border border-sun/40 bg-sun/12 p-4 text-sm"><strong>Safety first:</strong> always follow the product label for rates, protective equipment and pre-harvest intervals, and prefer scouting and cultural control before spraying.</p>
      </section>
    </>
  );
}

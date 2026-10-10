import { useParams } from "react-router-dom";
import {
  Bug,
  CalendarClock,
  CloudSun,
  Droplets,
  FlaskConical,
  Layers,
  Leaf,
  Package,
  Scissors,
  ShieldCheck,
  Shovel,
  Sprout,
  TrendingUp,
  Wheat,
} from "lucide-react";
import {
  DetailShell,
  Section,
  TagList,
  Timeline,
} from "@/components/ui/Detail";
import { Accordion, BulletList, Fact } from "@/components/ui/Misc";
import { LinkButton } from "@/components/ui/Button";
import { DISEASES, getCrop, relatedCrops } from "@/data";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import NotFound from "./NotFound";

const TOC = [
  { id: "climate", label: "Climate & soil" },
  { id: "planting", label: "Planting" },
  { id: "feeding", label: "Water & fertilizer" },
  { id: "stages", label: "Growth stages" },
  { id: "protection", label: "Pests & diseases" },
  { id: "harvest", label: "Harvest & storage" },
  { id: "money", label: "Yield & profit" },
  { id: "faq", label: "FAQs" },
];

export default function CropDetail() {
  const { slug } = useParams();
  const c = getCrop(slug);
  useDocumentTitle(c?.name);
  if (!c) return <NotFound what="crop" />;

  const diseaseLink = (name: string) => {
    const base = name.replace(/\s*\(.*?\)/g, "").toLowerCase();
    const d = DISEASES.find(
      (x) =>
        x.name.toLowerCase() === base ||
        base.includes(x.name.toLowerCase()) ||
        x.name.toLowerCase().includes(base),
    );
    return d ? `/diseases/${d.slug}` : undefined;
  };

  return (
    <DetailShell
      kind="crop"
      slug={c.slug}
      name={c.name}
      category={c.category}
      eyebrow={c.category}
      lead={c.overview}
      crumbs={[
        { label: "Home", to: "/" },
        { label: "Crops", to: "/crops" },
        { label: c.name },
      ]}
      toc={TOC}
      relatedKind="crop"
      relatedTitle="Grow it with"
      related={relatedCrops(c).map((r) => ({
        slug: r.slug,
        name: r.name,
        to: `/crops/${r.slug}`,
        meta: r.category,
      }))}
      facts={
        <>
          <Fact
            icon={CloudSun}
            label="Temperature"
            value={c.climate.temperature}
          />
          <Fact icon={Droplets} label="Rainfall" value={c.climate.rainfall} />
          <Fact icon={Layers} label="Altitude" value={c.climate.altitude} />
          <Fact icon={Leaf} label="Soil pH" value={c.soil.ph} />
        </>
      }
    >
      <Section id="climate" title="Climate & soil" icon={CloudSun}>
        <p>
          <strong>Suited to:</strong> {c.climate.suitable}.
        </p>
        <p className="mt-2">
          <strong>Soil:</strong> {c.soil.type}.
        </p>
        <h4 className="mb-2 mt-6">Seed varieties</h4>
        <BulletList items={c.seedVarieties} />
      </Section>

      <Section id="planting" title="Land prep & planting" icon={Shovel}>
        <h4 className="mb-2">Land preparation</h4>
        <BulletList items={c.landPreparation} />
        <div className="mt-6 grid gap-3 sm:grid-cols-3">
          <Fact label="Spacing" value={c.plantingGuide.spacing} />
          <Fact label="Seed rate" value={c.plantingGuide.seedRate} />
          <Fact label="Method" value={c.plantingGuide.method} />
        </div>
        <h4 className="mb-2 mt-6">Weed management</h4>
        <BulletList items={c.weedManagement} />
      </Section>

      <Section id="feeding" title="Water & fertilizer" icon={FlaskConical}>
        <p>
          <strong>Irrigation:</strong> {c.irrigation}
        </p>
        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          <Fact label="At planting" value={c.fertilizer.planting} />
          <Fact label="Top-dressing" value={c.fertilizer.topDressing} />
        </div>
      </Section>

      <Section id="stages" title="Growth stages" icon={Sprout}>
        <Timeline steps={c.growthStages} />
      </Section>

      <Section id="protection" title="Pests, diseases & protection" icon={Bug}>
        <h4 className="mb-2">Common pests</h4>
        <TagList items={c.pests} />
        <h4 className="mb-2 mt-6">
          Common diseases{" "}
          <span className="text-xs font-normal text-muted">
            (↗ opens the disease guide)
          </span>
        </h4>
        <TagList items={c.diseases} linkFor={diseaseLink} />
        <h4 className="mb-2 mt-6">Integrated pest management</h4>
        <BulletList items={c.ipm} />
        <h4 className="mb-2 mt-6">Organic practices</h4>
        <BulletList items={c.organic} />
      </Section>

      <Section id="harvest" title="Harvest & storage" icon={Scissors}>
        <p>
          <strong>Harvest:</strong> {c.harvesting}
        </p>
        <p className="mt-3">
          <strong className="inline-flex items-center gap-1.5">
            <Package size={15} />
            Storage:
          </strong>{" "}
          {c.storage}
        </p>
      </Section>

      <Section id="money" title="Yield & profitability" icon={TrendingUp}>
        <div className="grid gap-3 sm:grid-cols-2">
          <Fact
            icon={Wheat}
            label="Yield expectation"
            value={c.yieldExpectation}
          />
          <Fact
            icon={CalendarClock}
            label="Market demand"
            value={c.marketDemand}
          />
        </div>
        <p className="mt-4 text-muted">{c.profitability}</p>
      </Section>

      <Section id="faq" title="Frequently asked" icon={ShieldCheck}>
        <Accordion items={c.faqs} />
      </Section>

      <div className="card flex flex-wrap items-center justify-between gap-4 bg-lime !border-fg/20 p-6 text-limeink">
        <div>
          <h3 className="text-2xl">Ready to grow {c.name.toLowerCase()}?</h3>
          <p className="text-sm opacity-75">
            Generate a dated schedule from planting to storage.
          </p>
        </div>
        <LinkButton to={`/planner?crop=${c.slug}`} variant="primary">
          Plan this crop
        </LinkButton>
      </div>
    </DetailShell>
  );
}

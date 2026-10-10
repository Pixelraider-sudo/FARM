import { useParams } from "react-router-dom";
import {
  Banknote,
  Bone,
  Egg,
  HeartPulse,
  Home,
  ShieldPlus,
  Utensils,
  Wrench,
} from "lucide-react";
import { DetailShell, Section, TagList } from "@/components/ui/Detail";
import { Accordion, BulletList, Fact } from "@/components/ui/Misc";
import { getLivestock, relatedLivestock } from "@/data";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import NotFound from "./NotFound";

const TOC = [
  { id: "housing", label: "Housing" },
  { id: "nutrition", label: "Nutrition" },
  { id: "breeding", label: "Breeding" },
  { id: "health", label: "Health" },
  { id: "management", label: "Management" },
  { id: "economics", label: "Economics" },
  { id: "faq", label: "FAQs" },
];

export default function LivestockDetail() {
  const { slug } = useParams();
  const l = getLivestock(slug);
  useDocumentTitle(l?.name);
  if (!l) return <NotFound what="livestock guide" />;
  return (
    <DetailShell
      kind="livestock"
      slug={l.slug}
      name={l.name}
      category={l.category}
      eyebrow={l.category}
      lead={l.overview}
      crumbs={[
        { label: "Home", to: "/" },
        { label: "Livestock", to: "/livestock" },
        { label: l.name },
      ]}
      toc={TOC}
      relatedKind="livestock"
      relatedTitle="Related livestock"
      related={relatedLivestock(l).map((r) => ({
        slug: r.slug,
        name: r.name,
        to: `/livestock/${r.slug}`,
        meta: r.category,
      }))}
      facts={
        <>
          <Fact
            icon={Egg}
            label="Gestation / incubation"
            value={l.breeding.gestationOrIncubation}
          />
          <Fact
            icon={Bone}
            label="Breeding age"
            value={l.breeding.breedingAge}
          />
          <Fact
            icon={Banknote}
            label="Start-up cost"
            value={l.economics.startupCost}
          />
          <Fact
            icon={ShieldPlus}
            label="Vaccines"
            value={`${l.vaccination.length} key vaccines`}
          />
        </>
      }
    >
      <Section id="housing" title="Housing" icon={Home}>
        <BulletList items={l.housing} />
      </Section>
      <Section id="nutrition" title="Nutrition & water" icon={Utensils}>
        <div className="grid gap-3 sm:grid-cols-3">
          <Fact label="Feed types" value={l.nutrition.feedTypes} />
          <Fact label="Schedule" value={l.nutrition.feedingSchedule} />
          <Fact label="Water" value={l.nutrition.waterRequirements} />
        </div>
      </Section>
      <Section id="breeding" title="Breeding" icon={Egg}>
        <p>
          <strong>Method:</strong> {l.breeding.method}
        </p>
      </Section>
      <Section
        id="health"
        title="Vaccination, disease & parasites"
        icon={HeartPulse}
      >
        <h4 className="mb-2">Vaccination programme</h4>
        <BulletList items={l.vaccination} />
        <h4 className="mb-2 mt-6">Common diseases</h4>
        <TagList items={l.diseases} />
        {l.parasites.length > 0 && (
          <>
            <h4 className="mb-2 mt-6">Parasites</h4>
            <TagList items={l.parasites} />
          </>
        )}
      </Section>
      <Section id="management" title="Day-to-day management" icon={Wrench}>
        <BulletList items={l.management} />
      </Section>
      <Section id="economics" title="Economics" icon={Banknote}>
        <div className="grid gap-3 sm:grid-cols-3">
          <Fact label="Start-up" value={l.economics.startupCost} />
          <Fact label="Expected returns" value={l.economics.expectedReturns} />
          <Fact label="Market demand" value={l.economics.marketDemand} />
        </div>
      </Section>
      <Section id="faq" title="Frequently asked" icon={HeartPulse}>
        <Accordion items={l.faqs} />
      </Section>
    </DetailShell>
  );
}

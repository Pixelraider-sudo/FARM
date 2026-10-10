import { useParams } from "react-router-dom";
import { Activity, FlaskConical, HeartPulse, Microscope, ShieldCheck, Sprout, TestTube } from "lucide-react";
import { DetailShell, Section, TagList } from "@/components/ui/Detail";
import { Badge, BulletList, Fact } from "@/components/ui/Misc";
import { CROPS, getDisease, relatedDiseases } from "@/data";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import NotFound from "./NotFound";

const TOC = [
  { id: "symptoms", label: "Symptoms" }, { id: "cause", label: "Cause & diagnosis" }, { id: "treatment", label: "Treatment" },
  { id: "prevention", label: "Prevention" }, { id: "recovery", label: "Recovery" },
];

export default function DiseaseDetail() {
  const { slug } = useParams();
  const d = getDisease(slug);
  useDocumentTitle(d?.name);
  if (!d) return <NotFound what="disease" />;
  const cropLink = (name: string) => CROPS.find((c) => c.name.toLowerCase() === name.toLowerCase() || c.slug === name.toLowerCase())?.slug && `/crops/${CROPS.find((c) => c.name.toLowerCase() === name.toLowerCase())?.slug}`;

  return (
    <DetailShell
      kind="disease" slug={d.slug} name={d.name} category={d.category} eyebrow={`${d.category} disease`} lead={d.causes}
      crumbs={[{ label: "Home", to: "/" }, { label: "Diseases", to: "/diseases" }, { label: d.name }]}
      toc={TOC} relatedKind="disease" relatedTitle="Often confused with"
      related={relatedDiseases(d).map((r) => ({ slug: r.slug, name: r.name, to: `/diseases/${r.slug}`, meta: `${r.category} · ${r.riskLevel}` }))}
      facts={<>
        <Fact icon={Activity} label="Risk level" value={<Badge level={d.riskLevel}>{d.riskLevel}</Badge>} />
        <Fact icon={Microscope} label="Type" value={d.category} />
        <div className="col-span-2 rounded-2xl border border-line bg-surface2/60 p-4"><div className="label mb-2 text-muted">Affects</div><TagList items={d.affectedCrops} linkFor={cropLink} /></div>
      </>}
    >
      <Section id="symptoms" title="Symptoms to look for" icon={HeartPulse}><BulletList items={d.symptoms} /></Section>
      <Section id="cause" title="Cause & diagnosis" icon={Microscope}><p><strong>Cause:</strong> {d.causes}</p><p className="mt-3"><strong>Diagnosis:</strong> {d.diagnosis}</p></Section>
      <Section id="treatment" title="Treatment" icon={FlaskConical}>
        <p className="mb-5">{d.treatment}</p>
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-2xl border border-brand/30 bg-brand/8 p-5"><div className="label mb-2 flex items-center gap-2 text-brand"><Sprout size={14} />Organic</div>{d.organicTreatment}</div>
          <div className="rounded-2xl border border-sun/50 bg-sun/12 p-5"><div className="label mb-2 flex items-center gap-2 text-[#8a5d00] dark:text-sun"><TestTube size={14} />Chemical</div>{d.chemicalTreatment}</div>
        </div>
      </Section>
      <Section id="prevention" title="Prevention" icon={ShieldCheck}><BulletList items={d.prevention} /></Section>
      <Section id="recovery" title="Recovery outlook" icon={Activity}><p>{d.recovery}</p></Section>
    </DetailShell>
  );
}

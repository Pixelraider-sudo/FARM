import { Compass, Database, Gauge, Smartphone } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { Img } from "@/components/ui/Img";
import { LinkButton } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { CountUp } from "@/components/ui/CountUp";
import { CROPS, DISEASES, LIVESTOCK, PESTS } from "@/data";
import { SCENES } from "@/data/images";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";

const VALUES = [
  {
    icon: Compass,
    t: "Answers over noise",
    d: "Every page exists to answer a real question a farmer is asking — not to fill a menu.",
  },
  {
    icon: Database,
    t: "One source of truth",
    d: "Crops, livestock and diseases live in typed data modules, so content is consistent everywhere it appears.",
  },
  {
    icon: Smartphone,
    t: "Made for phones",
    d: "Responsive, thumb-friendly and light enough for mid-range devices and patchy connections.",
  },
  {
    icon: Gauge,
    t: "Fast by default",
    d: "Route-level code splitting, lazy images and no layout shift while pictures load.",
  },
];

export default function About() {
  useDocumentTitle("About");
  const stats = [
    [CROPS.length, "crop guides"],
    [LIVESTOCK.length, "livestock types"],
    [DISEASES.length, "disease profiles"],
    [PESTS.length, "pest & disease cards"],
  ] as const;
  return (
    <>
      <PageHeader
        eyebrow="About AgriSense"
        scene="about"
        title={
          <>
            Farming decisions,{" "}
            <em className="accent-italic !text-lime">backed by data.</em>
          </>
        }
        lead="A crop and livestock encyclopedia, disease and pest identification, seasonal guidance, market prices and an AI advisor — in one platform."
      />
      <section className="wrap mt-14 grid items-center gap-10 lg:grid-cols-2">
        <Reveal>
          <div className="label mb-4 text-clay">Our mission</div>
          <p className="font-display text-[clamp(1.8rem,3.4vw,2.8rem)] leading-tight">
            Give every farmer — whatever the size of the farm — the same quality
            of agronomic guidance that larger operations rely on.
          </p>
          <div className="mt-8">
            <LinkButton to="/register" size="lg">
              Get started free
            </LinkButton>{" "}
            <LinkButton
              to="/contact"
              variant="outline"
              size="lg"
              className="ml-2"
            >
              Contact us
            </LinkButton>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="relative">
            <Img
              srcs={SCENES.about}
              alt="Hands holding a seedling in soil"
              className="aspect-[5/4] rounded-[2.5rem]"
            />
            <div
              className="float absolute -bottom-5 -left-3 rounded-3xl bg-lime px-5 py-4 text-limeink shadow-xl sm:-left-8"
              style={{ ["--r" as string]: "-3deg" }}
            >
              <div className="font-display text-4xl">Free</div>
              <div className="label !text-[0.62rem]">to register</div>
            </div>
          </div>
        </Reveal>
      </section>
      <section className="wrap mt-24">
        <div className="grid grid-cols-2 gap-px overflow-hidden rounded-[2rem] bg-line lg:grid-cols-4">
          {stats.map(([n, l]) => (
            <div key={l} className="bg-surface p-7">
              <div className="display text-6xl">
                <CountUp to={n} />
              </div>
              <div className="label mt-2 text-muted">{l}</div>
            </div>
          ))}
        </div>
      </section>
      <section className="wrap mt-24">
        <h2 className="display mb-10 text-[clamp(2.2rem,4vw,3.4rem)]">
          How we <em className="accent-italic">build</em>
        </h2>
        <div className="grid gap-4 md:grid-cols-2">
          {VALUES.map((v, i) => (
            <Reveal key={v.t} delay={i * 0.06}>
              <div className="card flex h-full gap-5 p-7">
                <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-lime text-limeink">
                  <v.icon />
                </span>
                <div>
                  <h3 className="text-2xl">{v.t}</h3>
                  <p className="mt-1 text-muted">{v.d}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
        <p className="mt-6 text-sm text-muted">
          Built with React, TypeScript, Vite and Tailwind CSS.
        </p>
      </section>
    </>
  );
}

import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  Bot,
  Bug,
  CalendarRange,
  CloudRain,
  Sprout,
  TrendingDown,
  TrendingUp,
} from "lucide-react";
import { Img } from "@/components/ui/Img";
import { LinkButton } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHead } from "@/components/ui/SectionHead";
import { CountUp } from "@/components/ui/CountUp";
import { EntityCard, Sparkline } from "@/components/ui/Misc";
import {
  ARTICLES,
  CROPS,
  DISEASES,
  LIVESTOCK,
  MARKET_DATA,
  PESTS,
} from "@/data";
import { entityImages, SCENES } from "@/data/images";
import { MONTHS, PLANTING_CALENDAR, TICKER } from "@/data/static";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { cn } from "@/lib/utils";

function Hero() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 700], [0, 90]);
  const scale = useTransform(scrollY, [0, 700], [1.02, 1.14]);
  const stats = [
    { n: CROPS.length, l: "crop guides" },
    { n: LIVESTOCK.length, l: "livestock types" },
    { n: DISEASES.length + 0, l: "diseases mapped" },
    { n: 24, s: "/7", l: "alert watch" },
  ];
  return (
    <section className="wrap pt-28 sm:pt-32">
      <div className="grid items-end gap-8 lg:grid-cols-[1fr_auto]">
        <div>
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="label inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3.5 py-1.5"
          >
            <span className="pulse-dot h-2 w-2 rounded-full bg-clay" />{" "}
            AI-powered farming platform
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.2, 0.7, 0.2, 1] }}
            className="display mt-6 text-[clamp(3.4rem,10.5vw,9.5rem)]"
          >
            Smart farming <br className="hidden sm:block" />
            starts <em>here.</em>
          </motion.h1>
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.35 }}
          className="max-w-sm pb-3"
        >
          <p className="text-lg text-muted">
            Know exactly when to plant, spot pests before they spread, and
            protect every harvest — guidance built for real smallholder farms.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <LinkButton to="/register" variant="primary" size="lg">
              Start free{" "}
              <ArrowRight
                size={18}
                className="transition-transform group-hover:translate-x-1"
              />
            </LinkButton>
            <LinkButton to="/crops" variant="outline" size="lg">
              Browse crops
            </LinkButton>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 1 }}
        className="relative mt-10 overflow-hidden rounded-[2rem] bg-[#12261b] sm:rounded-[3rem]"
      >
        <motion.div
          style={{ y, scale }}
          className="aspect-[4/5] sm:aspect-[16/8] md:aspect-[21/9]"
        >
          <Img
            srcs={SCENES.hero}
            alt="Green crop rows at sunrise"
            className="!h-full"
            priority
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#12261b]/80 via-transparent to-transparent" />

        <div
          className="float absolute right-4 top-4 hidden max-w-[230px] rounded-3xl border border-white/30 bg-white/80 p-4 text-[#12261b] shadow-xl backdrop-blur-md sm:block md:right-8 md:top-8"
          style={{ ["--r" as string]: "3deg" }}
        >
          <div className="label mb-1 flex items-center gap-1.5 text-clay">
            <CloudRain size={13} /> Live alert
          </div>
          <p className="text-sm font-bold leading-snug">
            Heavy rainfall expected in Western region — delay top-dressing.
          </p>
        </div>
        <div
          className="float absolute left-4 top-[42%] hidden rounded-full bg-lime px-4 py-2.5 text-sm font-bold text-limeink shadow-xl md:block"
          style={{ ["--r" as string]: "-4deg", animationDelay: "-2s" }}
        >
          <Sprout size={15} className="mr-1.5 inline" /> Maize · plant now
        </div>

        <div className="absolute inset-x-0 bottom-0 grid grid-cols-2 gap-px bg-white/15 backdrop-blur-md sm:grid-cols-4">
          {stats.map((s) => (
            <div
              key={s.l}
              className="bg-[#12261b]/55 px-5 py-4 text-[#f4efe4] sm:px-8 sm:py-5"
            >
              <div className="font-display text-4xl sm:text-5xl">
                <CountUp to={s.n} suffix={s.s} />
              </div>
              <div className="label mt-1 text-white/60">{s.l}</div>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

function Ticker() {
  const line = [...TICKER, ...TICKER];
  return (
    <div
      className="marquee mt-16 -rotate-1 overflow-hidden border-y-2 border-fg bg-lime py-3 text-limeink"
      aria-label="Live alerts"
    >
      <div className="marquee-track">
        {[0, 1].map((k) => (
          <div
            key={k}
            className="flex shrink-0 items-center"
            aria-hidden={k === 1}
          >
            {line.map((t, i) => (
              <span
                key={`${k}-${i}`}
                className="flex items-center whitespace-nowrap font-display text-2xl italic"
              >
                {t}
                <Sprout size={20} className="mx-6 not-italic" />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

const THREATS = new Set([
  ...DISEASES.map((d) => d.name.toLowerCase()),
  ...PESTS.map((p) => p.name.toLowerCase()),
]).size;

function Bento() {
  const top = MARKET_DATA[0];
  return (
    <section className="wrap section-pad pt-28">
      <SectionHead
        index="01"
        eyebrow="Platform"
        title={
          <>
            Practical intelligence for <em className="accent-italic">every</em>{" "}
            stage of the season
          </>
        }
        lead="Built around the real questions farmers ask: what to plant, when to plant it, what's eating it and what it will sell for."
      />
      <div className="grid auto-rows-[minmax(0,1fr)] gap-4 md:grid-cols-6 md:grid-rows-[repeat(2,minmax(300px,auto))]">
        <Reveal className="md:col-span-3 md:row-span-1">
          <Link
            to="/crops"
            className="group relative block h-full min-h-[320px] overflow-hidden rounded-[2rem] bg-[#12261b] text-[#f4efe4]"
          >
            <Img
              srcs={SCENES.seedling}
              alt=""
              className="!absolute inset-0"
              imgClassName="transition-transform duration-700 group-hover:scale-105 opacity-80"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#12261b] via-[#12261b]/30 to-transparent" />
            <div className="relative flex h-full flex-col justify-end p-7">
              <Sprout className="mb-3 text-lime" />
              <h3 className="text-4xl">Crop guides</h3>
              <p className="mt-2 max-w-sm text-white/75">
                Soil, spacing, fertilizer, pests and yield for {CROPS.length}{" "}
                crops — in plain language.
              </p>
              <ArrowUpRight className="absolute right-6 top-6 text-lime transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
            </div>
          </Link>
        </Reveal>

        <Reveal delay={0.08} className="md:col-span-3">
          <Link
            to="/pests"
            className="group relative flex h-full min-h-[320px] flex-col justify-between overflow-hidden rounded-[2rem] bg-clay p-7 text-white"
          >
            <Bug size={26} />
            <div>
              <div className="display text-[clamp(3rem,6vw,5rem)]">
                {THREATS}
                <span className="text-white/60"> threats</span>
              </div>
              <h3 className="mt-1 text-3xl">Pest & disease ID</h3>
              <p className="mt-2 max-w-sm text-white/85">
                Symptoms, organic and chemical control, and prevention — before
                it spreads.
              </p>
            </div>
            <ArrowUpRight className="absolute right-6 top-6 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
          </Link>
        </Reveal>

        <Reveal delay={0.05} className="md:col-span-2">
          <Link
            to="/market"
            className="card group flex h-full min-h-[300px] flex-col justify-between p-7"
          >
            <div className="flex items-center justify-between">
              <span className="label text-muted">Market · {top.crop}</span>
              <span
                className={cn(
                  "label flex items-center gap-1",
                  top.changePercent >= 0 ? "text-brand" : "text-clay",
                )}
              >
                {top.changePercent >= 0 ? (
                  <TrendingUp size={14} />
                ) : (
                  <TrendingDown size={14} />
                )}
                {top.changePercent}%
              </span>
            </div>
            <div>
              <Sparkline
                values={top.trend}
                up={top.changePercent >= 0}
                className="!h-24 !w-full"
              />
              <div className="mt-3 font-display text-5xl">
                KSh {top.currentPrice}
              </div>
              <div className="text-sm text-muted">{top.unit}</div>
            </div>
            <span className="text-sm font-bold text-brand">
              Open Market Center →
            </span>
          </Link>
        </Reveal>

        <Reveal delay={0.1} className="md:col-span-2">
          <Link
            to="/calendar"
            className="card group flex h-full min-h-[300px] flex-col justify-between bg-lime !border-fg/20 p-7 text-limeink"
          >
            <CalendarRange />
            <div className="grid grid-cols-6 gap-1.5" aria-hidden>
              {PLANTING_CALENDAR[0].months
                .concat(PLANTING_CALENDAR[2].months)
                .map((on, i) => (
                  <span
                    key={i}
                    className={cn(
                      "aspect-square rounded-lg",
                      on ? "bg-limeink" : "bg-limeink/12",
                    )}
                  />
                ))}
            </div>
            <div>
              <h3 className="text-3xl">Planting calendar</h3>
              <p className="mt-1 text-sm text-limeink/75">
                The best months to sow, at a glance.
              </p>
            </div>
          </Link>
        </Reveal>

        <Reveal delay={0.15} className="md:col-span-2">
          <Link
            to="/assistant"
            className="card group flex h-full min-h-[300px] flex-col justify-between bg-[#12261b] p-7 text-[#f4efe4]"
          >
            <Bot className="text-lime" />
            <div className="space-y-2 text-sm" aria-hidden>
              <div className="ml-auto w-fit max-w-[85%] rounded-2xl rounded-br-md bg-white/10 px-3.5 py-2">
                My tomato leaves have brown rings?
              </div>
              <div className="w-fit max-w-[90%] rounded-2xl rounded-bl-md bg-lime px-3.5 py-2 text-limeink">
                Sounds like early blight — remove affected leaves and apply a
                protectant fungicide.
              </div>
            </div>
            <div>
              <h3 className="text-3xl">AI advisor</h3>
              <p className="mt-1 text-sm text-white/70">
                An agronomist in your pocket.
              </p>
            </div>
          </Link>
        </Reveal>
      </div>
    </section>
  );
}

function PlantNow() {
  const [m, setM] = useState(new Date().getMonth());
  const crops = PLANTING_CALENDAR.filter((c) => c.months[m] === 1);
  return (
    <section className="wrap pt-28">
      <div className="grid gap-10 overflow-hidden rounded-[2.5rem] bg-surface2 p-6 sm:p-12 lg:grid-cols-[1fr_1.2fr]">
        <div>
          <div className="label mb-4 flex items-center gap-3 text-muted">
            <span className="text-clay">02</span>
            <span className="h-px w-8 bg-current opacity-40" />
            Plant now
          </div>
          <h2 className="display text-[clamp(2.2rem,4.5vw,3.8rem)]">
            What goes in the ground in{" "}
            <em className="accent-italic">{MONTHS[m]}</em>?
          </h2>
          <p className="mt-4 text-muted">
            Pick a month to see which of the core crops are in their planting
            window.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            {MONTHS.map((x, i) => (
              <button
                key={x}
                className="chip"
                data-on={i === m}
                onClick={() => setM(i)}
                aria-pressed={i === m}
              >
                {x}
              </button>
            ))}
          </div>
        </div>
        <div className="grid content-start gap-3 sm:grid-cols-2">
          {crops.length === 0 && (
            <p className="card p-6 text-muted sm:col-span-2">
              No core crops are in their main planting window this month — a
              good time for land preparation and soil testing.
            </p>
          )}
          {crops.map((c, i) => (
            <motion.div
              key={`${m}-${c.slug}`}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <Link
                to={`/crops/${c.slug}`}
                className="card group flex items-center gap-4 p-3 pr-5 hover:-translate-y-1 transition-transform"
              >
                <Img
                  srcs={entityImages("crop", c.slug, c.crop)}
                  alt={c.crop}
                  className="h-16 w-16 shrink-0 rounded-2xl"
                />
                <span className="flex-1">
                  <span className="block font-display text-2xl leading-none">
                    {c.crop}
                  </span>
                  <span className="label mt-1 block text-brand">
                    Planting window
                  </span>
                </span>
                <ArrowUpRight
                  size={18}
                  className="text-muted group-hover:text-fg"
                />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FeaturedCrops() {
  const picks = [
    "maize",
    "tomatoes",
    "coffee",
    "potatoes",
    "avocado",
    "rice",
    "beans",
    "tea",
  ]
    .map((s) => CROPS.find((c) => c.slug === s)!)
    .filter(Boolean);
  return (
    <section className="pt-28">
      <div className="wrap">
        <SectionHead
          index="03"
          eyebrow="Crop library"
          title={
            <>
              Grown across the <em className="accent-italic">highlands</em> and
              beyond
            </>
          }
          action={
            <LinkButton to="/crops" variant="outline" size="sm">
              All {CROPS.length} crops <ArrowRight size={15} />
            </LinkButton>
          }
        />
      </div>
      <div className="flex snap-x snap-mandatory gap-4 overflow-x-auto px-[max(1rem,calc((100vw-1240px)/2+2.5rem))] pb-6 [scrollbar-width:none]">
        {picks.map((c) => (
          <div key={c.slug} className="w-[min(78vw,320px)] shrink-0 snap-start">
            <EntityCard
              kind="crop"
              slug={c.slug}
              name={c.name}
              to={`/crops/${c.slug}`}
              meta={c.category}
              blurb={c.overview}
            />
          </div>
        ))}
      </div>
    </section>
  );
}

function Markets() {
  const list = MARKET_DATA.slice(0, 4);
  return (
    <section className="wrap pt-28">
      <SectionHead
        index="04"
        eyebrow="Market pulse"
        title={
          <>
            Know what it <em className="accent-italic">sells</em> for
          </>
        }
        lead="Illustrative county price trends for eight major crops. Swap in a live feed when you connect a data source."
        action={
          <LinkButton to="/market" variant="outline" size="sm">
            Market Center <ArrowRight size={15} />
          </LinkButton>
        }
      />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {list.map((m, i) => (
          <Reveal key={m.crop} delay={i * 0.06}>
            <Link
              to="/market"
              className="card block p-6 transition-transform hover:-translate-y-1"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-2xl">{m.crop}</h3>
                <span
                  className={cn(
                    "label rounded-full px-2 py-1",
                    m.changePercent >= 0
                      ? "bg-brand/10 text-brand"
                      : "bg-clay/15 text-clay",
                  )}
                >
                  {m.changePercent > 0 && "+"}
                  {m.changePercent}%
                </span>
              </div>
              <div className="mt-5 font-display text-4xl">
                KSh {m.currentPrice}
              </div>
              <div className="text-xs text-muted">{m.unit}</div>
              <Sparkline
                values={m.trend}
                up={m.changePercent >= 0}
                className="mt-4 !w-full"
              />
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function LivestockBand() {
  const items = LIVESTOCK.slice(0, 4);
  return (
    <section className="wrap pt-28">
      <div className="grid overflow-hidden rounded-[2.5rem] bg-[#12261b] text-[#f4efe4] lg:grid-cols-2">
        <div className="relative min-h-[320px]">
          <Img
            srcs={SCENES.herd}
            alt="Cattle grazing"
            className="!absolute inset-0"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#12261b]/60 max-lg:bg-gradient-to-t" />
        </div>
        <div className="p-8 sm:p-12">
          <div className="label mb-4 flex items-center gap-3 text-white/60">
            <span className="text-lime">05</span>
            <span className="h-px w-8 bg-current opacity-40" />
            Livestock
          </div>
          <h2 className="display text-[clamp(2.2rem,4vw,3.4rem)]">
            Animals, <em className="!text-lime">too.</em>
          </h2>
          <p className="mt-4 max-w-md text-white/70">
            Housing, feeding, breeding, vaccination and economics for{" "}
            {LIVESTOCK.length} livestock types — from dairy cattle to bees.
          </p>
          <div className="mt-7 grid grid-cols-2 gap-2">
            {items.map((l) => (
              <Link
                key={l.slug}
                to={`/livestock/${l.slug}`}
                className="group flex items-center gap-3 rounded-2xl bg-white/7 p-2 pr-4 hover:bg-white/14"
              >
                <Img
                  srcs={entityImages("livestock", l.slug, l.name)}
                  alt={l.name}
                  className="h-12 w-12 shrink-0 rounded-xl"
                />
                <span className="text-sm font-bold leading-tight">
                  {l.name}
                </span>
              </Link>
            ))}
          </div>
          <LinkButton to="/livestock" variant="lime" className="mt-8">
            Explore livestock <ArrowRight size={16} />
          </LinkButton>
        </div>
      </div>
    </section>
  );
}

function Learn() {
  return (
    <section className="wrap pt-28">
      <SectionHead
        index="06"
        eyebrow="Learning center"
        title={
          <>
            Read a little. <em className="accent-italic">Grow</em> a lot.
          </>
        }
        action={
          <LinkButton to="/learn" variant="outline" size="sm">
            All articles <ArrowRight size={15} />
          </LinkButton>
        }
      />
      <div className="grid gap-4 md:grid-cols-3">
        {ARTICLES.slice(0, 3).map((a, i) => (
          <Reveal key={a.slug} delay={i * 0.08}>
            <EntityCard
              kind="article"
              slug={a.slug}
              name={a.title}
              to={`/learn/${a.slug}`}
              meta={a.category}
              blurb={a.excerpt}
              badge={
                <span className="label rounded-full bg-lime px-2.5 py-1 text-limeink !text-[0.62rem]">
                  {a.readTime}
                </span>
              }
            />
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function Cta() {
  return (
    <section className="wrap pt-28">
      <div className="relative isolate overflow-hidden rounded-[2.5rem] px-6 py-20 text-center text-[#f4efe4] sm:px-12 sm:py-28">
        <Img srcs={SCENES.field} alt="" className="!absolute inset-0 -z-20" />
        <div className="absolute inset-0 -z-10 bg-[#12261b]/75" />
        <h2 className="display mx-auto max-w-3xl text-[clamp(2.6rem,7vw,6rem)]">
          Plant smarter <em className="!text-lime">this season.</em>
        </h2>
        <p className="mx-auto mt-5 max-w-md text-lg text-white/75">
          Create a free account to save farms, track inventory and money, and
          get alerts that matter.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <LinkButton to="/register" variant="lime" size="lg">
            Register free <ArrowRight size={18} />
          </LinkButton>
          <LinkButton
            to="/planner"
            variant="outline"
            size="lg"
            className="!border-white/60 !text-white hover:!bg-white hover:!text-[#12261b]"
          >
            Try the planner
          </LinkButton>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  useDocumentTitle();
  return (
    <>
      <Hero />
      <Ticker />
      <Bento />
      <PlantNow />
      <FeaturedCrops />
      <Markets />
      <LivestockBand />
      <Learn />
      <Cta />
    </>
  );
}

import { useState } from "react";
import { TrendingDown, TrendingUp } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { Badge, Sparkline } from "@/components/ui/Misc";
import { MARKET_DATA } from "@/data";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { cn } from "@/lib/utils";
import type { MarketEntry } from "@/types";

function BigChart({ m }: { m: MarketEntry }) {
  const w = 640,
    h = 220,
    px = 36,
    py = 18;
  const min = Math.min(...m.trend) * 0.97,
    max = Math.max(...m.trend) * 1.03;
  const x = (i: number) => px + (i * (w - px * 2)) / (m.trend.length - 1);
  const y = (v: number) => h - py - ((v - min) / (max - min)) * (h - py * 2);
  const path = m.trend
    .map((v, i) => `${i ? "L" : "M"}${x(i).toFixed(1)} ${y(v).toFixed(1)}`)
    .join(" ");
  const up = m.changePercent >= 0,
    color = up ? "var(--brand)" : "var(--clay)";
  return (
    <svg
      viewBox={`0 0 ${w} ${h}`}
      className="w-full"
      role="img"
      aria-label={`${m.crop} 12-period price trend`}
    >
      {[0, 0.5, 1].map((t) => (
        <line
          key={t}
          x1={px}
          x2={w - px}
          y1={py + t * (h - py * 2)}
          y2={py + t * (h - py * 2)}
          stroke="var(--line)"
          strokeDasharray="4 6"
        />
      ))}
      {[max, (max + min) / 2, min].map((v, i) => (
        <text
          key={i}
          x={0}
          y={py + (i * (h - py * 2)) / 2 + 4}
          fontSize="10"
          fill="var(--muted)"
          fontFamily="var(--font-mono)"
        >
          {v.toFixed(0)}
        </text>
      ))}
      <path
        d={`${path} L${x(m.trend.length - 1)} ${h - py} L${x(0)} ${h - py} Z`}
        fill={color}
        opacity="0.1"
      />
      <path
        d={path}
        fill="none"
        stroke={color}
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {m.trend.map((v, i) => (
        <circle
          key={i}
          cx={x(i)}
          cy={y(v)}
          r={i === m.trend.length - 1 ? 5 : 2.5}
          fill={i === m.trend.length - 1 ? color : "var(--surface)"}
          stroke={color}
          strokeWidth="2"
        />
      ))}
    </svg>
  );
}

export default function Market() {
  useDocumentTitle("Market center");
  const [sel, setSel] = useState(MARKET_DATA[0].crop);
  const m = MARKET_DATA.find((x) => x.crop === sel)!;
  const counties = Object.entries(m.countyPrices).sort((a, b) => b[1] - a[1]);
  const maxC = counties[0][1];

  return (
    <>
      <PageHeader
        eyebrow="Market center"
        scene="market"
        title={
          <>
            Sell at the <em className="accent-italic !text-lime">right</em>{" "}
            price.
          </>
        }
        lead="County prices, demand and trends for eight major crops. Data shown is illustrative — connect a live feed before relying on it."
      />
      <section className="wrap mt-10 grid gap-5 lg:grid-cols-[360px_1fr]">
        <ul className="card divide-y divide-line self-start overflow-hidden">
          {MARKET_DATA.map((x) => {
            const up = x.changePercent >= 0;
            return (
              <li key={x.crop}>
                <button
                  onClick={() => setSel(x.crop)}
                  aria-pressed={sel === x.crop}
                  className={cn(
                    "flex w-full items-center gap-3 px-5 py-4 text-left transition-colors",
                    sel === x.crop
                      ? "bg-lime text-limeink"
                      : "hover:bg-surface2",
                  )}
                >
                  <span className="flex-1">
                    <span className="block font-display text-2xl leading-none">
                      {x.crop}
                    </span>
                    <span className="text-xs opacity-70">
                      KSh {x.currentPrice} · {x.unit}
                    </span>
                  </span>
                  <Sparkline values={x.trend} up={up} className="!h-8 !w-20" />
                  <span
                    className={cn(
                      "label w-14 text-right",
                      sel !== x.crop && (up ? "text-brand" : "text-clay"),
                    )}
                  >
                    {up ? "+" : ""}
                    {x.changePercent}%
                  </span>
                </button>
              </li>
            );
          })}
        </ul>

        <div className="space-y-5">
          <div className="card p-6 sm:p-8">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <div className="label text-muted">{m.unit}</div>
                <h2 className="display text-5xl">{m.crop}</h2>
              </div>
              <div className="text-right">
                <div className="font-display text-5xl">
                  KSh {m.currentPrice}
                </div>
                <div
                  className={cn(
                    "label mt-1 inline-flex items-center gap-1",
                    m.changePercent >= 0 ? "text-brand" : "text-clay",
                  )}
                >
                  {m.changePercent >= 0 ? (
                    <TrendingUp size={14} />
                  ) : (
                    <TrendingDown size={14} />
                  )}
                  {m.changePercent >= 0 ? "+" : ""}
                  {m.changePercent}% over period
                </div>
              </div>
            </div>
            <div className="mt-6">
              <BigChart m={m} />
            </div>
            <div className="mt-4 flex items-center gap-3 text-sm">
              <span className="label text-muted">Demand</span>
              <Badge level={m.demand}>{m.demand}</Badge>
            </div>
          </div>
          <div className="card p-6 sm:p-8">
            <h3 className="mb-5 text-3xl">Prices by county</h3>
            <ul className="space-y-3">
              {counties.map(([c, p], i) => (
                <li
                  key={c}
                  className="grid grid-cols-[88px_1fr_70px] items-center gap-3 text-sm"
                >
                  <span className="font-semibold">{c}</span>
                  <span className="h-3 overflow-hidden rounded-full bg-surface2">
                    <span
                      className={cn(
                        "block h-full rounded-full",
                        i === 0 ? "bg-clay" : "bg-brand",
                      )}
                      style={{ width: `${(p / maxC) * 100}%` }}
                    />
                  </span>
                  <span className="text-right font-mono font-semibold">
                    {p.toFixed(1)}
                  </span>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-xs text-muted">
              Highest-paying county is shown in orange.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

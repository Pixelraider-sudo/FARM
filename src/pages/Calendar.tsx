import { Link } from "react-router-dom";
import { Bug, ShieldCheck } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { MONTHS, PLANTING_CALENDAR } from "@/data/static";
import { BulletList } from "@/components/ui/Misc";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { cn } from "@/lib/utils";

export default function CalendarPage() {
  useDocumentTitle("Planting calendar");
  const now = new Date().getMonth();
  return (
    <>
      <PageHeader
        eyebrow="Planting calendar"
        scene="seedling"
        title={
          <>
            The best <em className="accent-italic !text-lime">months</em> to
            sow.
          </>
        }
        lead="Core crops across the long and short rains. The highlighted column is this month."
      />
      <section className="wrap mt-10">
        <div className="card overflow-x-auto p-3 sm:p-6">
          <table className="w-full min-w-[640px] border-separate border-spacing-1.5 text-center">
            <thead>
              <tr>
                <th className="w-28 text-left" />
                {MONTHS.map((m, i) => (
                  <th
                    key={m}
                    className={cn(
                      "label rounded-lg py-2 !text-[0.66rem]",
                      i === now ? "bg-clay text-white" : "text-muted",
                    )}
                  >
                    {m}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {PLANTING_CALENDAR.map((r) => (
                <tr key={r.crop}>
                  <th scope="row" className="text-left">
                    <Link
                      to={`/crops/${r.slug}`}
                      className="font-display text-xl hover:text-clay"
                    >
                      {r.crop}
                    </Link>
                  </th>
                  {r.months.map((on, i) => (
                    <td
                      key={i}
                      title={on ? `Plant ${r.crop} in ${MONTHS[i]}` : undefined}
                      className={cn(
                        "h-11 rounded-xl",
                        on ? "bg-brand" : "bg-surface2",
                        i === now &&
                          "ring-2 ring-clay ring-offset-2 ring-offset-surface",
                      )}
                    >
                      <span className="sr-only">{on ? "Plant" : "—"}</span>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          <div className="mt-3 flex items-center gap-4 px-2 text-xs text-muted">
            <span className="flex items-center gap-2">
              <span className="h-3 w-3 rounded bg-brand" /> Planting window
            </span>
            <span className="flex items-center gap-2">
              <span className="h-3 w-3 rounded bg-surface2 ring-1 ring-line" />{" "}
              Off-season
            </span>
          </div>
        </div>

        <div className="mt-5 grid gap-5 md:grid-cols-2">
          <div className="card bg-clay p-7 text-white !border-clay">
            <Bug />
            <h3 className="mt-3 text-3xl">Fall armyworm watch</h3>
            <p className="mt-2 text-white/85">
              Maize is prone to fall armyworm in March–April. Scout early and
              take preventive measures.
            </p>
          </div>
          <div className="card p-7">
            <ShieldCheck className="text-brand" />
            <h3 className="mb-3 mt-3 text-3xl">Planting precautions</h3>
            <BulletList
              items={[
                "Ensure proper spacing between crops.",
                "Use certified seeds for better yield.",
                "Regularly inspect for pests and remove infected plants.",
              ]}
            />
          </div>
        </div>
      </section>
    </>
  );
}

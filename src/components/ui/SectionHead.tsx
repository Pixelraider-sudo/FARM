import type { ReactNode } from "react";
import { Reveal } from "./Reveal";
import { cn } from "@/lib/utils";

interface Props {
  index?: string;
  eyebrow: string;
  title: ReactNode;
  lead?: ReactNode;
  align?: "left" | "center";
  action?: ReactNode;
  className?: string;
}

export function SectionHead({
  index,
  eyebrow,
  title,
  lead,
  align = "left",
  action,
  className,
}: Props) {
  return (
    <Reveal
      className={cn(
        "mb-10 flex flex-wrap items-end justify-between gap-6",
        align === "center" && "justify-center text-center",
        className,
      )}
    >
      <div className={cn("max-w-2xl", align === "center" && "mx-auto")}>
        <div
          className={cn(
            "label mb-4 flex items-center gap-3 text-muted",
            align === "center" && "justify-center",
          )}
        >
          {index && <span className="text-clay">{index}</span>}
          <span className="h-px w-8 bg-current opacity-40" />
          <span>{eyebrow}</span>
        </div>
        <h2 className="display text-[clamp(2.1rem,4.6vw,3.6rem)]">{title}</h2>
        {lead && <p className="mt-4 text-lg text-muted">{lead}</p>}
      </div>
      {action}
    </Reveal>
  );
}

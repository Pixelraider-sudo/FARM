import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { Img } from "./Img";
import { SCENES, type SceneKey } from "@/data/images";

interface Crumb {
  label: string;
  to?: string;
}
interface Props {
  eyebrow: string;
  title: ReactNode;
  lead?: ReactNode;
  scene?: SceneKey;
  image?: string[];
  crumbs?: Crumb[];
  children?: ReactNode;
}

/** Rounded image-backed page header used by every inner page. */
export function PageHeader({
  eyebrow,
  title,
  lead,
  scene = "field",
  image,
  crumbs,
  children,
}: Props) {
  return (
    <header className="wrap pt-28 sm:pt-32">
      <div className="relative isolate overflow-hidden rounded-[2rem] bg-[#12261b] px-6 py-14 text-[#f4efe4] sm:rounded-[2.5rem] sm:px-12 sm:py-20">
        <Img
          srcs={image ?? SCENES[scene]}
          alt=""
          className="!absolute inset-0 -z-20"
          imgClassName="opacity-60"
          priority
        />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(105deg,#12261b_8%,rgb(18_38_27/0.7)_45%,rgb(18_38_27/0.15))]" />
        {crumbs && (
          <nav
            aria-label="Breadcrumb"
            className="label mb-6 flex flex-wrap items-center gap-1.5 text-[#f4efe4]/70"
          >
            {crumbs.map((c, i) => (
              <span key={c.label} className="flex items-center gap-1.5">
                {i > 0 && <ChevronRight size={12} />}
                {c.to ? (
                  <Link to={c.to} className="hover:text-lime">
                    {c.label}
                  </Link>
                ) : (
                  <span className="text-[#f4efe4]">{c.label}</span>
                )}
              </span>
            ))}
          </nav>
        )}
        <span className="label inline-flex items-center gap-2 rounded-full bg-lime px-3 py-1 text-limeink">
          {eyebrow}
        </span>
        <h1 className="display mt-5 max-w-3xl text-[clamp(2.4rem,6vw,4.8rem)]">
          {title}
        </h1>
        {lead && (
          <p className="mt-5 max-w-xl text-lg text-[#f4efe4]/80">{lead}</p>
        )}
        {children && <div className="mt-8">{children}</div>}
      </div>
    </header>
  );
}

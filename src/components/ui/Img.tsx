import { useEffect, useState } from "react";
import { Leaf } from "lucide-react";
import { cn } from "@/lib/utils";

interface Props {
  srcs: string[];
  alt: string;
  className?: string;
  imgClassName?: string;
  priority?: boolean;
}

/** Online image with a fallback chain. Shows a painted placeholder while loading / if every source fails. */
export function Img({ srcs, alt, className, imgClassName, priority }: Props) {
  const [idx, setIdx] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const key = srcs.join("|");
  useEffect(() => {
    setIdx(0);
    setLoaded(false);
  }, [key]);

  const failed = idx >= srcs.length;
  return (
    <div className={cn("relative overflow-hidden bg-surface2", className)}>
      {!loaded && (
        <div
          className={cn(
            "absolute inset-0 grid place-items-center text-brand/40",
            failed
              ? "bg-gradient-to-br from-brand/25 via-surface2 to-lime/25"
              : "skeleton",
          )}
          role={failed ? "img" : undefined}
          aria-label={failed ? alt : undefined}
          aria-hidden={!failed}
        >
          <Leaf size={failed ? 44 : 36} strokeWidth={1.3} />
        </div>
      )}
      {!failed && (
        <img
          key={srcs[idx]}
          src={srcs[idx]}
          alt={alt}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          referrerPolicy="no-referrer"
          onLoad={() => setLoaded(true)}
          onError={() => setIdx((i) => i + 1)}
          className={cn(
            "h-full w-full object-cover transition-opacity duration-700",
            loaded ? "opacity-100" : "opacity-0",
            imgClassName,
          )}
        />
      )}
    </div>
  );
}

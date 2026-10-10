import { Link } from "react-router-dom";

export function LogoMark({ size = 36 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" aria-hidden>
      <rect width="100" height="100" rx="32" fill="currentColor" />
      <g fill="var(--lime)" stroke="var(--lime)" strokeWidth="3" strokeLinejoin="round" strokeLinecap="round">
        <path d="M50 80V42" fill="none" />
        <path d="M50 54C36 54 29 45 29 33c14 0 21 8 21 21z" />
        <path d="M50 62c12 0 19-8 19-19-12 0-19 7-19 19z" />
      </g>
    </svg>
  );
}

export function Logo({ light }: { light?: boolean }) {
  return (
    <Link to="/" className="flex items-center gap-2.5" aria-label="AgriSense home">
      <span className={light ? "text-[#f4efe4]" : "text-fg"}><LogoMark /></span>
      <span className="font-display text-[1.45rem] font-semibold tracking-tight">AgriSense</span>
    </Link>
  );
}

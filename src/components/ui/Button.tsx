import { Link, type LinkProps } from "react-router-dom";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "lime" | "outline" | "ghost" | "danger";
type Size = "sm" | "md" | "lg";

const base =
  "group inline-flex items-center justify-center gap-2 rounded-full font-semibold whitespace-nowrap transition-all duration-200 active:scale-[0.97] disabled:opacity-50 disabled:pointer-events-none";
const variants: Record<Variant, string> = {
  primary: "bg-fg text-bg hover:bg-brand hover:text-brandfg",
  lime: "bg-lime text-limeink hover:brightness-95 shadow-[0_8px_24px_-10px_var(--lime)]",
  outline: "border-[1.5px] border-fg/80 text-fg hover:bg-fg hover:text-bg",
  ghost: "text-fg hover:bg-fg/8",
  danger: "bg-clay text-white hover:brightness-110",
};
const sizes: Record<Size, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-[0.95rem]",
  lg: "px-8 py-4 text-base",
};

export const btnClass = (v: Variant = "primary", s: Size = "md", extra?: string) =>
  cn(base, variants[v], sizes[s], extra);

interface BtnProps extends ButtonHTMLAttributes<HTMLButtonElement> { variant?: Variant; size?: Size; children: ReactNode }
export function Button({ variant, size, className, children, ...rest }: BtnProps) {
  return <button className={btnClass(variant, size, className)} {...rest}>{children}</button>;
}

interface LinkBtnProps extends LinkProps { variant?: Variant; size?: Size }
export function LinkButton({ variant, size, className, children, ...rest }: LinkBtnProps) {
  return <Link className={btnClass(variant, size, className)} {...rest}>{children}</Link>;
}

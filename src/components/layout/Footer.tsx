import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, Check } from "lucide-react";
import { Logo } from "./Logo";

const COLS = [
  { title: "Library", links: [["Crops", "/crops"], ["Livestock", "/livestock"], ["Diseases", "/diseases"], ["Pests", "/pests"], ["Learning", "/learn"]] },
  { title: "Tools", links: [["Season Planner", "/planner"], ["Planting Calendar", "/calendar"], ["Market Center", "/market"], ["Finance", "/finance"], ["Inventory", "/inventory"]] },
  { title: "Company", links: [["About", "/about"], ["Contact", "/contact"], ["Community", "/community"], ["Log in", "/login"], ["Register", "/register"]] },
];

export function Footer() {
  const [done, setDone] = useState(false);
  const submit = (e: FormEvent) => { e.preventDefault(); setDone(true); };
  return (
    <footer className="mt-28 overflow-hidden rounded-t-[2.5rem] bg-[#12261b] text-[#f4efe4] sm:rounded-t-[3.5rem]">
      <div className="wrap pt-16">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_2fr]">
          <div>
            <Logo light />
            <p className="mt-5 max-w-sm text-[#f4efe4]/70">Planting windows, pest alerts and market insight — the same quality of agronomic guidance for every farm, whatever its size.</p>
            <form onSubmit={submit} className="mt-7 flex max-w-sm items-center gap-2 rounded-full border border-white/20 p-1.5 pl-5 focus-within:border-lime">
              {done ? (
                <span className="flex items-center gap-2 py-2 text-sm font-semibold text-lime"><Check size={16} /> You're on the list.</span>
              ) : (
                <>
                  <input type="email" required placeholder="you@farm.co.ke" aria-label="Email for newsletter" className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-white/40" />
                  <button className="rounded-full bg-lime px-5 py-2.5 text-sm font-bold text-limeink hover:brightness-95">Join</button>
                </>
              )}
            </form>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            {COLS.map((c) => (
              <div key={c.title}>
                <h4 className="label mb-4 text-lime">{c.title}</h4>
                <ul className="space-y-2.5">
                  {c.links.map(([l, to]) => (
                    <li key={to}><Link to={to} className="group inline-flex items-center gap-1 text-[#f4efe4]/80 hover:text-white">{l}<ArrowUpRight size={13} className="opacity-0 transition-opacity group-hover:opacity-100" /></Link></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div aria-hidden className="font-display -mb-[0.16em] mt-14 select-none text-center text-[clamp(4rem,19vw,17rem)] font-semibold italic leading-[0.8] tracking-tighter text-white/[0.06]">AgriSense</div>
      </div>
      <div className="border-t border-white/10">
        <div className="wrap flex flex-wrap items-center justify-between gap-2 py-5 text-xs text-white/50">
          <span>© {new Date().getFullYear()} AgriSense. Smart farming starts here.</span>
          <span>Price data is illustrative · Advice is general guidance, not a substitute for a local extension officer.</span>
        </div>
      </div>
    </footer>
  );
}

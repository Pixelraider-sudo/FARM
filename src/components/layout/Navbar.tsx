import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Bell, ChevronDown, Menu, Moon, Sun, X } from "lucide-react";
import { Logo } from "./Logo";
import { PRIMARY_NAV, TOOLS } from "./nav-data";
import { useTheme } from "@/hooks/useTheme";
import { useNotifications } from "@/hooks/useNotifications";
import { btnClass } from "@/components/ui/Button";
import { cn, timeAgo } from "@/lib/utils";

function useOutside(ref: React.RefObject<HTMLElement | null>, onOut: () => void) {
  useEffect(() => {
    const h = (e: MouseEvent) => ref.current && !ref.current.contains(e.target as Node) && onOut();
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, [ref, onOut]);
}

export function Navbar() {
  const { pathname } = useLocation();
  const { dark, toggle } = useTheme();
  const { items, unread, markAllRead, markRead } = useNotifications();
  const [scrolled, setScrolled] = useState(false);
  const [mobile, setMobile] = useState(false);
  const [tools, setTools] = useState(false);
  const [bell, setBell] = useState(false);
  const [progress, setProgress] = useState(0);
  const toolsRef = useRef<HTMLDivElement>(null);
  const bellRef = useRef<HTMLDivElement>(null);
  useOutside(toolsRef, () => setTools(false));
  useOutside(bellRef, () => setBell(false));

  useEffect(() => {
    const on = () => {
      setScrolled(window.scrollY > 24);
      const h = document.documentElement;
      setProgress(h.scrollHeight - h.clientHeight > 0 ? (window.scrollY / (h.scrollHeight - h.clientHeight)) * 100 : 0);
    };
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  useEffect(() => { setMobile(false); setTools(false); setBell(false); }, [pathname]);
  useEffect(() => { document.body.style.overflow = mobile ? "hidden" : ""; }, [mobile]);

  const toolsActive = TOOLS.some((t) => pathname.startsWith(t.to));
  const linkCls = ({ isActive }: { isActive: boolean }) =>
    cn("rounded-full px-3.5 py-2 text-sm font-semibold transition-colors", isActive ? "bg-fg text-bg" : "hover:bg-fg/8");

  return (
    <>
      <div className="fixed left-0 top-0 z-[70] h-[3px] bg-lime" style={{ width: `${progress}%` }} aria-hidden />
      <header className="fixed inset-x-0 top-3 z-50 px-3 sm:top-4 sm:px-6">
        <div className={cn(
          "mx-auto flex max-w-[1240px] items-center justify-between gap-3 rounded-full border py-2 pl-4 pr-2 transition-all duration-300 sm:pl-5",
          scrolled ? "border-line bg-bg/85 shadow-card backdrop-blur-xl" : "border-transparent bg-bg/60 backdrop-blur-md",
        )}>
          <Logo />

          <nav className="hidden items-center gap-0.5 lg:flex" aria-label="Primary">
            {PRIMARY_NAV.map((n) => <NavLink key={n.to} to={n.to} className={linkCls}>{n.label}</NavLink>)}
            <div ref={toolsRef} className="relative">
              <button
                onClick={() => setTools((t) => !t)} aria-expanded={tools} aria-haspopup="true"
                className={cn("flex items-center gap-1 rounded-full px-3.5 py-2 text-sm font-semibold transition-colors", toolsActive ? "bg-fg text-bg" : "hover:bg-fg/8")}
              >
                Tools <ChevronDown size={14} className={cn("transition-transform", tools && "rotate-180")} />
              </button>
              <AnimatePresence>
                {tools && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 8 }}
                    className="card absolute right-0 top-[calc(100%+12px)] grid w-[620px] grid-cols-2 gap-1 p-3"
                  >
                    {TOOLS.map((t) => (
                      <Link key={t.to} to={t.to} className="flex items-center gap-3 rounded-2xl p-3 transition-colors hover:bg-surface2">
                        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-lime text-limeink"><t.icon size={18} /></span>
                        <span><span className="block text-sm font-bold">{t.label}</span><span className="block text-xs text-muted">{t.desc}</span></span>
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </nav>

          <div className="flex items-center gap-1">
            <div ref={bellRef} className="relative">
              <button onClick={() => setBell((b) => !b)} aria-label={`Notifications${unread ? `, ${unread} unread` : ""}`} aria-expanded={bell}
                className="relative grid h-10 w-10 place-items-center rounded-full hover:bg-fg/8">
                <Bell size={18} />
                {unread > 0 && <span className="pulse-dot absolute right-1.5 top-1.5 grid h-4 min-w-4 place-items-center rounded-full bg-clay px-1 text-[10px] font-bold text-white">{unread}</span>}
              </button>
              <AnimatePresence>
                {bell && (
                  <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 8 }}
                    className="card fixed right-3 top-[72px] w-[min(380px,calc(100vw-1.5rem))] overflow-hidden sm:absolute sm:right-0 sm:top-[calc(100%+12px)]">
                    <div className="flex items-center justify-between border-b border-line px-5 py-3">
                      <span className="font-display text-xl">Notifications</span>
                      <button onClick={markAllRead} className="text-xs font-bold text-brand hover:underline">Mark all read</button>
                    </div>
                    <ul className="max-h-80 overflow-y-auto">
                      {items.slice(0, 5).map((n) => (
                        <li key={n.id}>
                          <button onClick={() => markRead(n.id)} className={cn("flex w-full gap-3 border-b border-line/60 px-5 py-3 text-left hover:bg-surface2", !n.read && "bg-lime/10")}>
                            <span className={cn("mt-1.5 h-2 w-2 shrink-0 rounded-full", n.read ? "bg-line" : "bg-clay")} />
                            <span><span className="block text-sm font-bold">{n.title}</span><span className="block line-clamp-2 text-xs text-muted">{n.body}</span><span className="label mt-1 block !text-[0.6rem] text-muted">{timeAgo(n.createdAt)}</span></span>
                          </button>
                        </li>
                      ))}
                    </ul>
                    <Link to="/notifications" className="block px-5 py-3 text-center text-sm font-bold text-brand hover:bg-surface2">View all notifications →</Link>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <button onClick={toggle} aria-label="Toggle dark mode" className="grid h-10 w-10 place-items-center rounded-full hover:bg-fg/8">
              {dark ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <Link to="/login" className="hidden px-3 text-sm font-semibold hover:underline sm:block">Log in</Link>
            <Link to="/register" className={btnClass("lime", "sm", "hidden sm:inline-flex")}>Get started</Link>
            <button onClick={() => setMobile(true)} aria-label="Open menu" className="grid h-10 w-10 place-items-center rounded-full bg-fg text-bg lg:hidden"><Menu size={18} /></button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {mobile && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[75] overflow-y-auto bg-[#12261b] p-5 text-[#f4efe4] lg:hidden">
            <div className="flex items-center justify-between">
              <Logo light />
              <button onClick={() => setMobile(false)} aria-label="Close menu" className="grid h-10 w-10 place-items-center rounded-full bg-lime text-limeink"><X size={18} /></button>
            </div>
            <nav className="mt-8 flex flex-col" aria-label="Mobile">
              {[...PRIMARY_NAV].map((n, i) => (
                <motion.div key={n.to} initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: i * 0.04 }}>
                  <Link to={n.to} className="flex items-baseline justify-between border-b border-white/10 py-3 font-display text-4xl hover:text-lime">
                    {n.label}<span className="label text-white/40">0{i + 1}</span>
                  </Link>
                </motion.div>
              ))}
            </nav>
            <p className="label mb-3 mt-8 text-white/50">Tools</p>
            <div className="grid grid-cols-2 gap-2">
              {TOOLS.map((t) => (
                <Link key={t.to} to={t.to} className="flex items-center gap-2 rounded-2xl bg-white/6 p-3 text-sm font-semibold hover:bg-white/12"><t.icon size={16} className="text-lime" />{t.label}</Link>
              ))}
            </div>
            <div className="mt-8 flex gap-3">
              <Link to="/login" className={btnClass("outline", "md", "flex-1 !border-white/40 !text-white hover:!bg-white hover:!text-[#12261b]")}>Log in</Link>
              <Link to="/register" className={btnClass("lime", "md", "flex-1")}>Get started</Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

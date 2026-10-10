import { useMemo } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, Bell, Bot, Bug, CalendarRange, Lightbulb, MapPinned, ShoppingBasket, Wallet } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { Sparkline } from "@/components/ui/Misc";
import { StatTile } from "@/components/ui/CrudBits";
import { useCollection } from "@/hooks/useCollection";
import { useNotifications } from "@/hooks/useNotifications";
import { STORAGE_KEYS } from "@/lib/storage";
import { CROPS, MARKET_DATA } from "@/data";
import { PLANTING_CALENDAR } from "@/data/static";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { cn, fmtMoney } from "@/lib/utils";
import type { Farm, InventoryItem, Transaction } from "@/types";

const ACTIONS = [
  { to: "/assistant", label: "Ask AI assistant", icon: Bot }, { to: "/planner", label: "Plan a season", icon: CalendarRange },
  { to: "/pests", label: "Check pests", icon: Bug }, { to: "/calendar", label: "Planting calendar", icon: CalendarRange },
];

export default function Dashboard() {
  useDocumentTitle("Dashboard");
  const farms = useCollection<Farm>(STORAGE_KEYS.FARMS, "farm").items;
  const inv = useCollection<InventoryItem>(STORAGE_KEYS.INVENTORY, "inv").items;
  const fin = useCollection<Transaction>(STORAGE_KEYS.FINANCE, "txn").items;
  const { items: notifs, unread } = useNotifications();

  const now = new Date();
  const hour = now.getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";
  const acres = farms.reduce((s, f) => s + (parseFloat(f.size) || 0), 0);
  const profit = fin.reduce((s, t) => s + (t.type === "income" ? 1 : -1) * (parseFloat(t.amount) || 0), 0);
  const lowStock = inv.filter((i) => parseFloat(i.quantity) <= parseFloat(i.lowStockThreshold)).length;
  const plantNow = PLANTING_CALENDAR.filter((c) => c.months[now.getMonth()]);
  const tipCrop = useMemo(() => CROPS[(now.getDate() * 7) % CROPS.length], []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <PageHeader eyebrow={now.toLocaleDateString(undefined, { weekday: "long", month: "long", day: "numeric" })} scene="hero" title={<>{greeting}, <em className="accent-italic !text-lime">farmer.</em></>} lead="Here's how your season is shaping up." />
      <section className="wrap mt-8 space-y-5">
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          <StatTile label="Farms" value={farms.length} sub={`${acres.toFixed(1)} acres total`} />
          <StatTile label="Unread alerts" value={unread} tone={unread ? "bad" : "good"} />
          <StatTile label="Low stock" value={lowStock} tone={lowStock ? "bad" : "good"} />
          <StatTile label="Net profit" value={fmtMoney(profit)} tone={profit >= 0 ? "good" : "bad"} />
        </div>

        <div className="grid gap-5 lg:grid-cols-3">
          <div className="card p-6 lg:col-span-2">
            <h3 className="mb-4 flex items-center gap-2 text-2xl"><Lightbulb className="text-clay" size={20} /> Today's recommendations</h3>
            <ul className="space-y-3 text-[0.97rem]">
              <li className="rounded-2xl bg-surface2 p-4">Check soil moisture before your next irrigation — inconsistent watering is one of the most common causes of reduced yield.</li>
              <li className="rounded-2xl bg-surface2 p-4"><Link to={`/crops/${tipCrop.slug}`} className="font-bold text-brand hover:underline">{tipCrop.name}</Link> has a full planting guide — open it if you're growing it this season.</li>
              <li className="rounded-2xl bg-surface2 p-4">
                {plantNow.length ? <>In planting window this month: {plantNow.map((c, i) => <span key={c.slug}>{i > 0 && ", "}<Link to={`/crops/${c.slug}`} className="font-bold text-brand hover:underline">{c.crop}</Link></span>)}.</> : "No core crops are in their main window — a good month for land prep and soil tests."}
              </li>
            </ul>
          </div>
          <div className="card p-6">
            <h3 className="mb-4 text-2xl">Quick actions</h3>
            <div className="grid grid-cols-2 gap-2">
              {ACTIONS.map((a) => <Link key={a.label} to={a.to} className="flex flex-col gap-3 rounded-2xl bg-surface2 p-4 text-sm font-bold transition-colors hover:bg-lime hover:text-limeink"><a.icon size={18} />{a.label}</Link>)}
            </div>
          </div>
        </div>

        <div className="grid gap-5 lg:grid-cols-3">
          <div className="card p-6">
            <div className="mb-4 flex items-center justify-between"><h3 className="flex items-center gap-2 text-2xl"><MapPinned size={20} /> Farms</h3><Link to="/farms" className="text-sm font-bold text-brand">Manage →</Link></div>
            {farms.length === 0 ? <p className="text-muted">No farms yet. <Link to="/farms" className="font-bold text-brand hover:underline">Add your first farm</Link> for a personalised summary.</p> : (
              <ul className="divide-y divide-line">{farms.slice(0, 3).map((f) => <li key={f.id} className="flex justify-between py-3"><span><strong>{f.name}</strong><span className="block text-xs text-muted">{f.county}</span></span><span className="chip !text-xs">{f.size || "—"} ac</span></li>)}</ul>
            )}
          </div>
          <div className="card p-6">
            <div className="mb-4 flex items-center justify-between"><h3 className="flex items-center gap-2 text-2xl"><ShoppingBasket size={20} /> Market</h3><Link to="/market" className="text-sm font-bold text-brand">View →</Link></div>
            <ul className="space-y-3">
              {MARKET_DATA.slice(0, 4).map((m) => (
                <li key={m.crop} className="flex items-center gap-3"><span className="w-20 font-semibold">{m.crop}</span><Sparkline values={m.trend} up={m.changePercent >= 0} className="!h-7 !w-20" /><span className={cn("label ml-auto", m.changePercent >= 0 ? "text-brand" : "text-clay")}>{m.changePercent >= 0 ? "+" : ""}{m.changePercent}%</span></li>
              ))}
            </ul>
          </div>
          <div className="card p-6">
            <div className="mb-4 flex items-center justify-between"><h3 className="flex items-center gap-2 text-2xl"><Bell size={20} /> Notifications</h3><Link to="/notifications" className="text-sm font-bold text-brand">All →</Link></div>
            <ul className="space-y-3">{notifs.slice(0, 4).map((n) => <li key={n.id} className={cn("flex gap-3 text-sm", !n.read && "font-bold")}><span className={cn("mt-1.5 h-2 w-2 shrink-0 rounded-full", n.read ? "bg-line" : "bg-clay")} />{n.title}</li>)}</ul>
          </div>
        </div>

        <div className="relative isolate flex flex-wrap items-center justify-between gap-4 overflow-hidden rounded-[2rem] bg-[#12261b] p-7 text-[#f4efe4] sm:p-9">
          <div><span className="label text-lime">AI insight</span><p className="mt-2 max-w-xl font-display text-2xl leading-snug">Ask the assistant about your specific crops, pests or planting timing for a tailored answer.</p></div>
          <Link to="/assistant" className="inline-flex items-center gap-2 rounded-full bg-lime px-6 py-3 font-bold text-limeink">Open assistant <ArrowUpRight size={18} /></Link>
        </div>
        <p className="flex items-center gap-2 text-xs text-muted"><Wallet size={13} /> Dashboard figures are computed from data saved in this browser.</p>
      </section>
    </>
  );
}

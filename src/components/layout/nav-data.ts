import {
  Bot,
  Boxes,
  CalendarRange,
  GraduationCap,
  Info,
  LayoutDashboard,
  Mail,
  MapPinned,
  Search,
  ShoppingBasket,
  Users,
  Wallet,
  BellRing,
  type LucideIcon,
} from "lucide-react";

export interface NavItem {
  to: string;
  label: string;
  end?: boolean;
}
export const PRIMARY_NAV: NavItem[] = [
  { to: "/crops", label: "Crops" },
  { to: "/livestock", label: "Livestock" },
  { to: "/diseases", label: "Diseases" },
  { to: "/pests", label: "Pests" },
  { to: "/weather", label: "Weather" },
  { to: "/dashboard", label: "Dashboard" },
];
export interface ToolItem extends NavItem {
  icon: LucideIcon;
  desc: string;
}
export const TOOLS: ToolItem[] = [
  {
    to: "/market",
    label: "Market Center",
    icon: ShoppingBasket,
    desc: "County prices & trends",
  },
  {
    to: "/planner",
    label: "Season Planner",
    icon: CalendarRange,
    desc: "Build a crop schedule",
  },
  {
    to: "/farms",
    label: "My Farms",
    icon: MapPinned,
    desc: "Plots, soil & water",
  },
  {
    to: "/inventory",
    label: "Inventory",
    icon: Boxes,
    desc: "Stock with low alerts",
  },
  { to: "/finance", label: "Finance", icon: Wallet, desc: "Income & expenses" },
  {
    to: "/calendar",
    label: "Planting Calendar",
    icon: CalendarRange,
    desc: "Best months to sow",
  },
  {
    to: "/alerts",
    label: "Alerts",
    icon: BellRing,
    desc: "Cautions & warnings",
  },
  {
    to: "/learn",
    label: "Learning Center",
    icon: GraduationCap,
    desc: "Guides & explainers",
  },
  {
    to: "/community",
    label: "Community",
    icon: Users,
    desc: "Farmer-to-farmer Q&A",
  },
  {
    to: "/assistant",
    label: "AI Assistant",
    icon: Bot,
    desc: "Ask your agronomist",
  },
  { to: "/search", label: "Search", icon: Search, desc: "Find anything" },
  { to: "/about", label: "About", icon: Info, desc: "Why AgriSense" },
  { to: "/contact", label: "Contact", icon: Mail, desc: "Talk to the team" },
];
export { LayoutDashboard };

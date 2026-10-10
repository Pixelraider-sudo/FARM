import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import Home from "@/pages/Home";

// Route-level code splitting keeps the first load small.
const lz = <T extends { default: React.ComponentType }>(f: () => Promise<T>) => lazy(f);
const named = <K extends string>(f: () => Promise<Record<K, React.ComponentType>>, k: K) => lazy(async () => ({ default: (await f())[k] }));

const Dashboard = lz(() => import("@/pages/Dashboard"));
const CropsPage = named(() => import("@/pages/Browse"), "CropsPage");
const LivestockPage = named(() => import("@/pages/Browse"), "LivestockPage");
const DiseasesPage = named(() => import("@/pages/Browse"), "DiseasesPage");
const LearnPage = named(() => import("@/pages/Browse"), "LearnPage");
const CropDetail = lz(() => import("@/pages/CropDetail"));
const LivestockDetail = lz(() => import("@/pages/LivestockDetail"));
const DiseaseDetail = lz(() => import("@/pages/DiseaseDetail"));
const ArticleDetail = lz(() => import("@/pages/ArticleDetail"));
const Pests = lz(() => import("@/pages/Pests"));
const Weather = lz(() => import("@/pages/Weather"));
const Market = lz(() => import("@/pages/Market"));
const Planner = lz(() => import("@/pages/Planner"));
const Calendar = lz(() => import("@/pages/Calendar"));
const Alerts = lz(() => import("@/pages/Alerts"));
const Farms = lz(() => import("@/pages/Farms"));
const Inventory = lz(() => import("@/pages/Inventory"));
const Finance = lz(() => import("@/pages/Finance"));
const Community = lz(() => import("@/pages/Community"));
const Notifications = lz(() => import("@/pages/Notifications"));
const Search = lz(() => import("@/pages/Search"));
const Assistant = lz(() => import("@/pages/Assistant"));
const About = lz(() => import("@/pages/About"));
const Contact = lz(() => import("@/pages/Contact"));
const Login = named(() => import("@/pages/Auth"), "Login");
const Register = named(() => import("@/pages/Auth"), "Register");
const NotFound = lz(() => import("@/pages/NotFound"));

function Fallback() {
  return <div className="wrap pt-32"><div className="skeleton h-72 rounded-[2.5rem]" /><div className="mt-6 grid gap-4 sm:grid-cols-3"><div className="skeleton h-48 rounded-3xl" /><div className="skeleton h-48 rounded-3xl" /><div className="skeleton h-48 rounded-3xl" /></div></div>;
}

export default function App() {
  return (
    <Suspense fallback={<Fallback />}>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="crops" element={<CropsPage />} />
          <Route path="crops/:slug" element={<CropDetail />} />
          <Route path="livestock" element={<LivestockPage />} />
          <Route path="livestock/:slug" element={<LivestockDetail />} />
          <Route path="diseases" element={<DiseasesPage />} />
          <Route path="diseases/:slug" element={<DiseaseDetail />} />
          <Route path="pests" element={<Pests />} />
          <Route path="weather" element={<Weather />} />
          <Route path="market" element={<Market />} />
          <Route path="planner" element={<Planner />} />
          <Route path="calendar" element={<Calendar />} />
          <Route path="alerts" element={<Alerts />} />
          <Route path="farms" element={<Farms />} />
          <Route path="inventory" element={<Inventory />} />
          <Route path="finance" element={<Finance />} />
          <Route path="learn" element={<LearnPage />} />
          <Route path="learn/:slug" element={<ArticleDetail />} />
          <Route path="community" element={<Community />} />
          <Route path="notifications" element={<Notifications />} />
          <Route path="search" element={<Search />} />
          <Route path="assistant" element={<Assistant />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

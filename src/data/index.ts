import { CROPS } from "./crops";
import { LIVESTOCK } from "./livestock";
import { DISEASES } from "./diseases";
import { ARTICLES } from "./articles";
import { MARKET_DATA } from "./market";
import { PESTS } from "./pests";
import type { Crop, Disease, Livestock } from "@/types";

export { CROPS, LIVESTOCK, DISEASES, ARTICLES, MARKET_DATA, PESTS };
export const PEST_CROPS_ALL = ["Maize", "Beans", "Potatoes", "Tomatoes", "Rice", "Coffee", "Tea"];

const uniqSorted = (xs: string[]) => [...new Set(xs)].sort();
export const CROP_CATEGORIES = uniqSorted(CROPS.map((c) => c.category));
export const LIVESTOCK_CATEGORIES = uniqSorted(LIVESTOCK.map((c) => c.category));
export const DISEASE_CATEGORIES = uniqSorted(DISEASES.map((c) => c.category));
export const ARTICLE_CATEGORIES = uniqSorted(ARTICLES.map((c) => c.category));

export const getCrop = (slug?: string) => CROPS.find((c) => c.slug === slug);
export const getLivestock = (slug?: string) => LIVESTOCK.find((c) => c.slug === slug);
export const getDisease = (slug?: string) => DISEASES.find((c) => c.slug === slug);
export const getArticle = (slug?: string) => ARTICLES.find((c) => c.slug === slug);

const pick = <T>(slugs: string[], list: T[], key: (t: T) => string) =>
  slugs.map((s) => list.find((x) => key(x) === s)).filter((x): x is T => Boolean(x));

export const relatedCrops = (c: Crop) => pick(c.relatedCrops, CROPS, (x) => x.slug);
export const relatedLivestock = (l: Livestock) => pick(l.relatedLivestock, LIVESTOCK, (x) => x.slug);
export const relatedDiseases = (d: Disease) => pick(d.relatedDiseases, DISEASES, (x) => x.slug);

export const diseasesForCrop = (name: string) =>
  DISEASES.filter((d) => d.affectedCrops.some((a) => a.toLowerCase() === name.toLowerCase()));

const norm = (s: string) => s.toLowerCase();
const hit = (q: string, ...fields: Array<string | string[]>) =>
  fields.flat().some((f) => norm(f).includes(q));

export interface SearchResult {
  kind: "Crop" | "Livestock" | "Disease" | "Pest" | "Article";
  title: string;
  subtitle: string;
  to: string;
  imageKind: "crop" | "livestock" | "disease" | "article" | "pest";
  slug: string;
}

export function searchAll(query: string): SearchResult[] {
  const q = norm(query.trim());
  if (q.length < 2) return [];
  const r: SearchResult[] = [];
  CROPS.filter((c) => hit(q, c.name, c.category, c.overview, c.pests, c.diseases)).forEach((c) =>
    r.push({ kind: "Crop", title: c.name, subtitle: c.category, to: `/crops/${c.slug}`, imageKind: "crop", slug: c.slug }));
  LIVESTOCK.filter((c) => hit(q, c.name, c.category, c.overview, c.diseases)).forEach((c) =>
    r.push({ kind: "Livestock", title: c.name, subtitle: c.category, to: `/livestock/${c.slug}`, imageKind: "livestock", slug: c.slug }));
  DISEASES.filter((d) => hit(q, d.name, d.category, d.affectedCrops, d.symptoms)).forEach((d) =>
    r.push({ kind: "Disease", title: d.name, subtitle: `${d.category} · ${d.riskLevel} risk`, to: `/diseases/${d.slug}`, imageKind: "disease", slug: d.slug }));
  PESTS.filter((p) => hit(q, p.name, p.crop, p.symptoms, p.control)).forEach((p) =>
    r.push({ kind: "Pest", title: p.name, subtitle: `${p.kind} · ${p.crop}`, to: `/pests?crop=${p.crop}`, imageKind: "pest", slug: p.id }));
  ARTICLES.filter((a) => hit(q, a.title, a.category, a.excerpt)).forEach((a) =>
    r.push({ kind: "Article", title: a.title, subtitle: `${a.category} · ${a.readTime}`, to: `/learn/${a.slug}`, imageKind: "article", slug: a.slug }));
  return r;
}

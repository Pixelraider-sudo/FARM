import { ORIGINAL_IMAGES } from "./imageSources";

/** All imagery is loaded from the web. Every entry resolves to a *chain* of URLs;
 *  <Img /> walks the chain on error and finally falls back to a painted placeholder. */

const unsplash = (id: string, w = 1200) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=70`;

const hash = (s: string) => [...s].reduce((a, c) => (a * 31 + c.charCodeAt(0)) >>> 0, 7);

/** Keyword-matched stock photo; `lock` keeps the same picture for the same entity. */
export const flickr = (tags: string, seed: string, w = 900, h = 700) =>
  `https://loremflickr.com/${w}/${h}/${encodeURIComponent(tags.replace(/\s+/g, ""))
    .replace(/%2C/g, ",")}?lock=${hash(seed) % 997}`;

const wiki = (fileUrl: string) => fileUrl; // original Wikimedia URLs are kept as-is

export type SceneKey =
  | "hero" | "field" | "seedling" | "harvest" | "soil" | "herd"
  | "market" | "sky" | "community" | "login" | "register" | "about" | "planner";

const S = (id: string, tags: string, w = 1600): string[] => [unsplash(id, w), flickr(tags, id, w, Math.round(w * 0.66))];

export const SCENES: Record<SceneKey, string[]> = {
  hero: S("1500382017468-9049fed747ef", "farm,field,sunrise", 2000),
  field: S("1560493676-04071c5f467b", "farm,crops,rows"),
  seedling: S("1416879595882-3373a0480b5b", "seedling,plant,soil"),
  harvest: S("1523741543316-beb7fc7023d8", "harvest,farmer,vegetables"),
  soil: S("1464226184884-fa280b87c399", "soil,farming,tractor"),
  herd: S("1500595046743-cd271d694d30", "cattle,farm,pasture"),
  market: S("1488459716781-31db52582fe9", "market,vegetables,produce"),
  sky: S("1500937386664-56d1dfef3854", "rain,clouds,farm"),
  community: S("1592982537447-7440770cbfc9", "farmers,community,africa"),
  login: S("1625246333195-78d9c38ad449", "farm,morning,field", 1400),
  register: S("1574943320219-553eb213f72d", "farm,greenhouse,plants", 1400),
  about: S("1471193945509-9ad0617afabf", "hands,soil,plant"),
  planner: S("1530836369250-ef72a3f5cda8", "tractor,field,farm"),
};

export type EntityKind = "crop" | "livestock" | "disease" | "article" | "pest";

const EXTRA_TAGS: Record<EntityKind, string> = {
  crop: "crop,farm", livestock: "farm,animal", disease: "plant,leaf,disease", article: "agriculture,farm", pest: "insect,crop,pest",
};

/** Image chain for a data entity. Keeps the original online photo when the data set had one. */
export function entityImages(kind: EntityKind, slug: string, name: string): string[] {
  const original = ORIGINAL_IMAGES[`${kind}:${slug}`];
  const keyword = `${name.split(/[(/]/)[0].trim().split(" ").slice(0, 2).join(",")},${EXTRA_TAGS[kind]}`;
  const chain: string[] = [];
  if (original) chain.push(wiki(original));
  chain.push(flickr(keyword, `${kind}:${slug}`));
  chain.push(flickr(EXTRA_TAGS[kind], `fallback:${slug}`));
  return chain;
}

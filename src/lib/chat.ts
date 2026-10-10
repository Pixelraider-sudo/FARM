import { useCallback, useRef, useState } from "react";
import { CROPS, DISEASES, LIVESTOCK, MARKET_DATA } from "@/data";

export interface ChatLink { to: string; label: string }
export interface ChatMessage { id: number; role: "user" | "bot"; text: string; links?: ChatLink[]; offline?: boolean }

const SYSTEM_PROMPT = `You are the AgriSense virtual farm advisor — a friendly, knowledgeable agronomist colleague.
Help with: platform features (crop & livestock guides, pest & disease ID, planting calendar, alerts, community), getting started,
and practical general guidance for crops and livestock (planting windows, common pests/diseases, soil needs).
Keep replies concise (2-5 sentences unless asked for detail), warm and practical.
Politely decline topics outside farming/the platform. Never claim exact real-time weather, prices, or medical/legal advice —
point to the relevant AgriSense page for exact numbers.`;

const ENDPOINT = (import.meta.env.VITE_CHAT_ENDPOINT as string | undefined)?.trim();

export const QUICK_REPLIES = [
  "When should I plant maize?",
  "How do I spot fall armyworm?",
  "What is the price of tomatoes?",
  "Help me plan my season",
];

/* ─────────── Offline advisor: answers from the on-site knowledge base ─────────── */
function offlineReply(raw: string): { text: string; links: ChatLink[] } {
  const msg = raw.toLowerCase();

  const crop = CROPS.find((c) => msg.includes(c.name.toLowerCase()) || msg.includes(c.slug.replace("-", " ")));
  const livestock = LIVESTOCK.find((l) => msg.includes(l.name.toLowerCase()) || (l.slug === "chicken" && /poultry|hen/.test(msg)));
  const disease = DISEASES.find((d) => msg.includes(d.name.toLowerCase()));

  if (disease) {
    return {
      text: `${disease.name} is a ${disease.category.toLowerCase()} problem (${disease.riskLevel.toLowerCase()} risk) affecting ${disease.affectedCrops.join(", ")}. Key signs: ${disease.symptoms[0].toLowerCase()}. ${disease.treatment}`,
      links: [{ to: `/diseases/${disease.slug}`, label: `${disease.name} guide` }],
    };
  }
  if (/armyworm/.test(msg)) {
    return {
      text: "Fall armyworm shows up as ragged holes in young leaves and sawdust-like frass in the whorl. Scout weekly from emergence, use pheromone traps, and treat early with neem or spinosad when you see larvae — young larvae are far easier to control.",
      links: [{ to: "/pests?crop=Maize", label: "Maize pests" }],
    };
  }
  if (/price|cost|sell|market/.test(msg)) {
    const m = MARKET_DATA.find((x) => msg.includes(x.crop.toLowerCase()));
    if (m) {
      return {
        text: `${m.crop} is currently around KSh ${m.currentPrice} ${m.unit} (${m.changePercent >= 0 ? "+" : ""}${m.changePercent}% over the period) with ${m.demand.toLowerCase()} demand. Note this is illustrative data — check county prices in the Market Center before you sell.`,
        links: [{ to: "/market", label: "Market Center" }],
      };
    }
    return { text: "The Market Center lists county-by-county prices, 12-point trends and demand for eight major crops. Tell me which crop and I'll summarise it.", links: [{ to: "/market", label: "Market Center" }] };
  }
  if (crop && /plant|when|sow|season|grow|spacing|fertili|harvest|yield/.test(msg)) {
    return {
      text: `${crop.name}: ${crop.plantingGuide.method}. Spacing ${crop.plantingGuide.spacing}; seed rate ${crop.plantingGuide.seedRate}. At planting use ${crop.fertilizer.planting.toLowerCase()}. Expect ${crop.yieldExpectation.toLowerCase()}`,
      links: [{ to: `/crops/${crop.slug}`, label: `${crop.name} guide` }, { to: "/calendar", label: "Planting calendar" }],
    };
  }
  if (crop) {
    return { text: `${crop.overview} Watch for ${crop.pests.slice(0, 2).join(" and ").toLowerCase()}.`, links: [{ to: `/crops/${crop.slug}`, label: `${crop.name} guide` }] };
  }
  if (livestock) {
    return { text: `${livestock.overview} Feed: ${livestock.nutrition.feedTypes.toLowerCase()}.`, links: [{ to: `/livestock/${livestock.slug}`, label: `${livestock.name} guide` }] };
  }
  if (/pest|disease|bug|insect|spot|wilt|blight/.test(msg)) {
    return { text: "Browse the Pest and Disease libraries for symptoms, organic and chemical control, and prevention. Tell me the crop and what you're seeing and I'll narrow it down.", links: [{ to: "/pests", label: "Pest library" }, { to: "/diseases", label: "Diseases" }] };
  }
  if (/plan|schedule|season/.test(msg)) {
    return { text: "The Season Planner turns a crop and a planting date into a dated schedule — land prep, fertilizer, weeding, top-dressing, harvest and storage.", links: [{ to: "/planner", label: "Season Planner" }] };
  }
  if (/weather|rain|drought/.test(msg)) {
    return { text: "Pick your region and season in Weather & Seasons to see what favors planting. For live forecasts, check your national met service.", links: [{ to: "/weather", label: "Weather & Seasons" }] };
  }
  if (/hello|hi\b|hey/.test(msg)) {
    return { text: "Hello! I can help with crop guides, pests and diseases, planting timing and prices. What are you growing?", links: [] };
  }
  return { text: "I can help with 26 crops, 8 livestock types, pest & disease identification, planting timing and market prices. Try asking about a specific crop or problem.", links: [{ to: "/crops", label: "Browse crops" }] };
}

async function callBackend(history: ChatMessage[], message: string): Promise<string> {
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), 15000);
  try {
    const res = await fetch(ENDPOINT!, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ history: history.map((h) => ({ role: h.role, text: h.text })), message, system: SYSTEM_PROMPT }),
      signal: ctrl.signal,
    });
    if (!res.ok) throw new Error(`Backend ${res.status}`);
    const data = (await res.json()) as { reply?: string; text?: string };
    const text = data.reply ?? data.text ?? "";
    if (!text) throw new Error("Empty reply");
    return text;
  } finally {
    clearTimeout(t);
  }
}

const GREETING: ChatMessage = {
  id: 0, role: "bot",
  text: "Hi, I'm your AgriSense advisor. Ask me about a crop, a pest you're seeing, planting dates or prices.",
};

export function useChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([GREETING]);
  const [loading, setLoading] = useState(false);
  const idRef = useRef(1);
  const busy = useRef(false);

  const send = useCallback(async (text: string) => {
    const clean = text.trim();
    if (!clean || busy.current) return;
    busy.current = true;
    const userMsg: ChatMessage = { id: idRef.current++, role: "user", text: clean };
    let history: ChatMessage[] = [];
    setMessages((m) => { history = m; return [...m, userMsg]; });
    setLoading(true);

    let reply: ChatMessage;
    if (ENDPOINT) {
      try {
        reply = { id: idRef.current++, role: "bot", text: await callBackend(history, clean) };
      } catch {
        const o = offlineReply(clean);
        reply = { id: idRef.current++, role: "bot", text: `I couldn't reach the live advisor, so here's what I know offline. ${o.text}`, links: o.links, offline: true };
      }
    } else {
      await new Promise((r) => setTimeout(r, 650));
      const o = offlineReply(clean);
      reply = { id: idRef.current++, role: "bot", text: o.text, links: o.links, offline: true };
    }
    setMessages((m) => [...m, reply]);
    setLoading(false);
    busy.current = false;
  }, []);

  const reset = useCallback(() => setMessages([GREETING]), []);
  return { messages, loading, send, reset, live: Boolean(ENDPOINT) };
}

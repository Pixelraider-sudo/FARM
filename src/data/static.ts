export const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"] as const;

/** 1 = plant that month. Mirrors the original planting calendar. */
export const PLANTING_CALENDAR: Array<{ crop: string; slug: string; months: number[] }> = [
  { crop: "Maize", slug: "maize", months: [1, 1, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0] },
  { crop: "Beans", slug: "beans", months: [0, 1, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0] },
  { crop: "Tomatoes", slug: "tomatoes", months: [0, 0, 1, 1, 1, 1, 0, 0, 1, 1, 0, 0] },
  { crop: "Potatoes", slug: "potatoes", months: [0, 0, 1, 1, 1, 0, 1, 0, 1, 1, 0, 0] },
  { crop: "Rice", slug: "rice", months: [0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 0, 0] },
  { crop: "Coffee", slug: "coffee", months: [0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 0, 0] },
  { crop: "Tea", slug: "tea", months: [0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 0, 0] },
];

export const REGIONS = [
  { value: "rift-valley", label: "Rift Valley" },
  { value: "western", label: "Western" },
  { value: "coastal", label: "Coastal" },
] as const;
export const SEASONS = [
  { value: "long-rains", label: "Long rains" },
  { value: "dry-season", label: "Dry season" },
  { value: "irrigation", label: "Irrigation crops" },
] as const;

export const REGION_NOTES: Record<string, string> = {
  "rift-valley|long-rains": "Rift Valley long rains typically run March–May: ideal for maize and beans.",
  "rift-valley|dry-season": "Dry season in the Rift Valley favors irrigated vegetables and drought-tolerant crops.",
  "rift-valley|irrigation": "With irrigation, tomatoes and potatoes can be grown year-round in the Rift Valley.",
  "western|long-rains": "Western region long rains (March–May) suit maize, beans and sugarcane.",
  "western|dry-season": "Dry season in Western Kenya is best for early land preparation and short-season crops.",
  "western|irrigation": "Irrigated plots in Western Kenya can support rice and vegetables through the dry months.",
  "coastal|long-rains": "Coastal long rains favor cassava, cowpeas and coconut-intercropped plots.",
  "coastal|dry-season": "Coastal dry season requires drought-tolerant varieties and mulching to retain moisture.",
  "coastal|irrigation": "Irrigated coastal farms can grow rice and horticultural crops year-round.",
};

export const SEASONAL_PLANTING = [
  { crop: "Maize", slug: "maize", note: "Long rains: plant between March–April." },
  { crop: "Tomatoes", slug: "tomatoes", note: "Dry season: plant between June–July." },
  { crop: "Sugarcane", slug: "sugarcane", note: "Irrigation: plant any time with water supply." },
];

export type AlertLevel = "danger" | "caution" | "safe";
export const ALERTS: Array<{ level: AlertLevel; text: string }> = [
  { level: "danger", text: "Avoid planting maize during drought forecast." },
  { level: "caution", text: "Rotate crops to prevent soil-borne diseases." },
  { level: "safe", text: "Use certified seeds for better yield." },
  { level: "caution", text: "Early spraying prevents armyworm spread." },
];
export const FARMER_NOTES = [
  "Check weather forecasts before planting.",
  "Follow recommended crop rotation schedules.",
  "Always use certified and disease-free seeds.",
  "Stay updated on pest alerts from local authorities.",
];
export const TICKER = [
  "Heavy rainfall expected in the Western region",
  "Fall armyworm alert in maize farms",
  "Maize: best planted at the start of the rainy season",
  "Tomatoes: watch for early blight",
  "Potatoes: ensure proper drainage",
  "Rice: maintain consistent water levels",
];
export const KENYA_COUNTIES = ["Nairobi", "Nakuru", "Kisumu", "Eldoret", "Mombasa", "Meru"];

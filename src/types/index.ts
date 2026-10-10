export interface Faq {
  q: string;
  a: string;
}

export interface Crop {
  slug: string;
  name: string;
  category: string;
  overview: string;
  climate: {
    suitable: string;
    temperature: string;
    rainfall: string;
    altitude: string;
  };
  soil: { type: string; ph: string };
  seedVarieties: string[];
  landPreparation: string[];
  plantingGuide: { spacing: string; seedRate: string; method: string };
  irrigation: string;
  fertilizer: { planting: string; topDressing: string };
  weedManagement: string[];
  growthStages: string[];
  pests: string[];
  diseases: string[];
  ipm: string[];
  organic: string[];
  harvesting: string;
  storage: string;
  yieldExpectation: string;
  profitability: string;
  marketDemand: string;
  faqs: Faq[];
  relatedCrops: string[];
}

export interface Livestock {
  slug: string;
  name: string;
  category: string;
  overview: string;
  housing: string[];
  nutrition: {
    feedTypes: string;
    feedingSchedule: string;
    waterRequirements: string;
  };
  breeding: {
    method: string;
    gestationOrIncubation: string;
    breedingAge: string;
  };
  vaccination: string[];
  diseases: string[];
  parasites: string[];
  management: string[];
  economics: {
    startupCost: string;
    expectedReturns: string;
    marketDemand: string;
  };
  faqs: Faq[];
  relatedLivestock: string[];
}

export type RiskLevel = "Low" | "Moderate" | "High";

export interface Disease {
  slug: string;
  name: string;
  category: string;
  affectedCrops: string[];
  symptoms: string[];
  causes: string;
  diagnosis: string;
  treatment: string;
  organicTreatment: string;
  chemicalTreatment: string;
  prevention: string[];
  riskLevel: RiskLevel;
  recovery: string;
  relatedDiseases: string[];
}

export interface Article {
  slug: string;
  title: string;
  category: string;
  readTime: string;
  excerpt: string;
  body: string[];
}

export type Demand = "Low" | "Moderate" | "High";

export interface MarketEntry {
  crop: string;
  unit: string;
  currentPrice: number;
  changePercent: number;
  trend: number[];
  countyPrices: Record<string, number>;
  demand: Demand;
}

export interface PestEntry {
  id: string;
  kind: "Pest" | "Disease";
  name: string;
  crop: string;
  definition?: string;
  symptoms: string;
  control: string;
  chemicals: string;
  chemicalLabel: "Pesticides" | "Fungicides";
}

/* ---------- persisted user records ---------- */
export interface Stored {
  id: string;
  createdAt: number;
  updatedAt?: number;
}

export interface Farm extends Stored {
  name: string;
  county: string;
  village: string;
  lat: string;
  lng: string;
  size: string;
  altitude: string;
  soil: string;
  ph: string;
  water: string;
  irrigation: string;
  crops: string;
  notes: string;
}

export interface InventoryItem extends Stored {
  name: string;
  category: string;
  quantity: string;
  unit: string;
  lowStockThreshold: string;
  notes: string;
}

export interface Transaction extends Stored {
  type: "income" | "expense";
  amount: string;
  category: string;
  date: string;
  description: string;
}

export type NotificationType =
  "weather" | "alert" | "reminder" | "market" | "ai";
export interface AppNotification extends Stored {
  type: NotificationType;
  title: string;
  body: string;
  read: boolean;
}

export interface PostComment {
  author: string;
  text: string;
}
export interface CommunityPost extends Stored {
  author: string;
  title: string;
  body: string;
  tag: string;
  likes: number;
  comments: PostComment[];
}

export interface PlannerPlan extends Stored {
  cropSlug: string;
  cropName: string;
  acres: number;
  plantingDate: string;
}

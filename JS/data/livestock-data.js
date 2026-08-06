/* =========================================================
   AgriSense — Livestock Database (ES6 Module)
   Structured husbandry data for 8 livestock types.
   Mirrors the crops-data.js pattern: one data module, one
   dynamic detail page, no duplicated per-animal HTML files.
========================================================= */

export const LIVESTOCK = [
  {
    "slug": "dairy-cattle",
    "name": "Dairy Cattle",
    "category": "Cattle",
    "image": "https://upload.wikimedia.org/wikipedia/commons/2/26/Holstein_cow_large.jpg",
    "overview": "Dairy cattle are kept primarily for milk production, requiring consistent nutrition, clean housing and a structured breeding and milking routine to sustain output.",
    "housing": [
      "Well-ventilated, dry shed with at least 3-4 sq m per cow",
      "Non-slip flooring with adequate drainage to prevent mastitis-causing bacteria",
      "Separate calving pen away from the main herd",
      "Shade and clean water points in the paddock"
    ],
    "nutrition": {
      "feedTypes": "Napier grass, hay, silage, dairy meal concentrate, mineral supplements",
      "feedingSchedule": "3 times daily alongside milking; concentrate proportional to milk yield",
      "waterRequirements": "A lactating cow needs 60-100 litres of clean water daily depending on yield and temperature"
    },
    "breeding": {
      "method": "Artificial insemination (preferred for genetic improvement) or natural bull service",
      "gestationOrIncubation": "Approximately 9 months (280-285 days)",
      "breedingAge": "First service at 15-18 months, once the heifer reaches about 60% of mature body weight"
    },
    "vaccination": [
      "Foot and Mouth Disease (FMD)",
      "Lumpy Skin Disease",
      "Black Quarter",
      "Anthrax (in endemic areas)",
      "Brucellosis (heifer calves)"
    ],
    "diseases": [
      "Mastitis",
      "Foot and Mouth Disease",
      "East Coast Fever (tick-borne)",
      "Milk fever (metabolic, around calving)"
    ],
    "parasites": [
      "Ticks (vectors for East Coast Fever)",
      "Liver flukes",
      "Gastrointestinal worms"
    ],
    "management": [
      "Keep detailed milk yield and breeding records per animal",
      "Deworm on a regular schedule (typically every 3 months)",
      "Dip or spray for ticks weekly during high-risk seasons",
      "Practice proper drying-off management 2 months before calving"
    ],
    "economics": {
      "startupCost": "Moderate to high — dominated by the cost of a quality dairy animal and shed construction",
      "expectedReturns": "Daily milk income provides steady cash flow; a good dairy cow can produce 15-25+ litres/day depending on breed and management",
      "marketDemand": "Consistently strong local demand for fresh milk, plus opportunities to sell to cooperatives and processors"
    },
    "faqs": [
      {
        "q": "Which dairy breeds are most common?",
        "a": "Friesian, Ayrshire, Jersey and Guernsey are widely kept, often crossed with local breeds for better heat and disease tolerance."
      },
      {
        "q": "How can I improve milk yield?",
        "a": "Consistent, balanced feeding, clean water access, a stress-free environment and a good breeding programme all contribute more to yield than any single intervention."
      }
    ],
    "relatedLivestock": [
      "beef-cattle",
      "goats"
    ]
  },
  {
    "slug": "beef-cattle",
    "name": "Beef Cattle",
    "category": "Cattle",
    "image": "https://upload.wikimedia.org/wikipedia/commons/6/60/Beef_cattle_grazing.jpg",
    "overview": "Beef cattle are raised for meat production, typically on a growth and fattening cycle that emphasizes weight gain, pasture management and herd health over milk output.",
    "housing": [
      "Open paddocks with rotational grazing paddocks",
      "Simple shelter or windbreak for extreme weather",
      "Sturdy handling pens/crush for vaccination and treatment"
    ],
    "nutrition": {
      "feedTypes": "Natural or improved pasture, supplemented with hay and mineral licks; fattening stock may get concentrate feed",
      "feedingSchedule": "Continuous grazing access; concentrate feeding introduced 2-3 months before slaughter for finishing",
      "waterRequirements": "30-70 litres per day depending on size, temperature and feed type"
    },
    "breeding": {
      "method": "Natural bull mating is common; AI used in more intensive operations",
      "gestationOrIncubation": "Approximately 9 months (283 days)",
      "breedingAge": "Heifers typically bred at 18-24 months once they reach adequate body weight"
    },
    "vaccination": [
      "Foot and Mouth Disease",
      "Lumpy Skin Disease",
      "Black Quarter",
      "Anthrax (in endemic areas)"
    ],
    "diseases": [
      "Foot and Mouth Disease",
      "East Coast Fever",
      "Trypanosomiasis (in tsetse-prone areas)",
      "Pneumonia"
    ],
    "parasites": [
      "Ticks",
      "Tsetse flies (trypanosomiasis vector)",
      "Internal worms"
    ],
    "management": [
      "Rotate grazing paddocks to prevent overgrazing and reduce parasite load",
      "Deworm and dip/spray on a routine schedule",
      "Separate and monitor animals during the finishing/fattening phase",
      "Keep growth and weight records to track performance"
    ],
    "economics": {
      "startupCost": "Land-dependent — grazing land is the primary cost driver, animal cost is moderate",
      "expectedReturns": "Slower cash cycle than dairy; returns realized at sale after a growth/fattening period of 1-3 years depending on system",
      "marketDemand": "Strong, steady demand for beef domestically, with premium prices for well-finished animals"
    },
    "faqs": [
      {
        "q": "How long does it take to raise beef cattle for market?",
        "a": "Depending on breed, feeding intensity and target weight, animals are typically finished for sale between 18 months and 3 years."
      }
    ],
    "relatedLivestock": [
      "dairy-cattle",
      "goats",
      "sheep"
    ]
  },
  {
    "slug": "goats",
    "name": "Goats",
    "category": "Small Stock",
    "image": "https://upload.wikimedia.org/wikipedia/commons/2/2b/Boer_Goat.jpg",
    "overview": "Goats are hardy, adaptable livestock suited to a wide range of climates, kept for meat, milk, or both, and valued for their relatively low input requirements.",
    "housing": [
      "Raised, slatted floor shed to keep animals dry and reduce parasite exposure",
      "Good ventilation without direct draughts",
      "Separate pens for kids, does and bucks"
    ],
    "nutrition": {
      "feedTypes": "Browse, pasture, crop residues, and supplementary concentrate for lactating or fattening animals",
      "feedingSchedule": "Free grazing/browsing during the day with supplementary feed evening and morning for productive animals",
      "waterRequirements": "3-5 litres per day, more for lactating does"
    },
    "breeding": {
      "method": "Natural mating is standard; AI is used in some improved dairy goat programmes",
      "gestationOrIncubation": "Approximately 5 months (145-155 days)",
      "breedingAge": "Does can be bred from 8-12 months once they reach sufficient body weight"
    },
    "vaccination": [
      "Peste des Petits Ruminants (PPR)",
      "Enterotoxaemia (pulpy kidney)",
      "Foot rot prevention through management"
    ],
    "diseases": [
      "Peste des Petits Ruminants (PPR)",
      "Contagious Caprine Pleuropneumonia (CCPP)",
      "Coccidiosis in kids"
    ],
    "parasites": [
      "Internal worms (major concern in goats)",
      "Ticks",
      "Mange mites"
    ],
    "management": [
      "Deworm regularly, particularly kids which are highly susceptible",
      "Trim hooves periodically to prevent foot rot",
      "Keep bucks separate from does outside planned breeding",
      "Provide mineral/salt licks continuously"
    ],
    "economics": {
      "startupCost": "Low — goats are one of the most accessible livestock enterprises to start",
      "expectedReturns": "Fast reproductive cycle (can kid twice a year) supports relatively quick returns",
      "marketDemand": "Strong demand for goat meat, particularly around festive seasons, and growing dairy goat market"
    },
    "faqs": [
      {
        "q": "Are goats easier to keep than cattle?",
        "a": "Generally yes — goats need less land, less water, and tolerate poorer forage better than cattle, making them a lower-risk entry point into livestock keeping."
      }
    ],
    "relatedLivestock": [
      "sheep",
      "beef-cattle"
    ]
  },
  {
    "slug": "sheep",
    "name": "Sheep",
    "category": "Small Stock",
    "image": "https://upload.wikimedia.org/wikipedia/commons/d/d4/Sheep_in_a_field.jpg",
    "overview": "Sheep are kept mainly for meat and wool, well suited to grassland areas, and generally require similar management to goats with some differences in grazing behavior and disease risk.",
    "housing": [
      "Simple, well-ventilated shed or open-sided structure",
      "Dry bedding area, especially important around lambing",
      "Fenced paddocks for controlled grazing"
    ],
    "nutrition": {
      "feedTypes": "Pasture grazing supplemented with hay and mineral blocks; concentrate for finishing lambs",
      "feedingSchedule": "Continuous grazing access with supplementary feeding during dry seasons or finishing",
      "waterRequirements": "4-6 litres per day, higher for lactating ewes"
    },
    "breeding": {
      "method": "Natural mating with a ram; controlled breeding seasons common in commercial flocks",
      "gestationOrIncubation": "Approximately 5 months (147-150 days)",
      "breedingAge": "Ewes typically bred from 8-12 months"
    },
    "vaccination": [
      "Peste des Petits Ruminants (PPR)",
      "Enterotoxaemia",
      "Sheep and Goat Pox"
    ],
    "diseases": [
      "Foot rot",
      "Peste des Petits Ruminants",
      "Pneumonia in lambs"
    ],
    "parasites": [
      "Internal worms",
      "Ticks",
      "Liver flukes in wetter areas"
    ],
    "management": [
      "Rotate grazing to manage worm burden",
      "Shear wool breeds on a regular schedule for health and hygiene",
      "Monitor lambing closely, especially with first-time ewes",
      "Keep flock records for breeding and health history"
    ],
    "economics": {
      "startupCost": "Low to moderate, similar to goats",
      "expectedReturns": "Reliable returns from meat sales, with wool as a secondary income stream in wool-breed flocks",
      "marketDemand": "Consistent local demand for mutton, particularly during festive and cultural events"
    },
    "faqs": [
      {
        "q": "Do sheep and goats need different management?",
        "a": "They are similar, but sheep tend to graze low grass rather than browse shrubs like goats do, and are somewhat more susceptible to certain parasites in wetter conditions."
      }
    ],
    "relatedLivestock": [
      "goats",
      "beef-cattle"
    ]
  },
  {
    "slug": "chicken",
    "name": "Chicken",
    "category": "Poultry",
    "image": "https://upload.wikimedia.org/wikipedia/commons/2/2b/Chickens_in_a_farmyard.jpg",
    "overview": "Chickens are kept for eggs, meat, or both, offering one of the fastest production cycles in livestock farming and requiring careful attention to biosecurity and vaccination.",
    "housing": [
      "Well-ventilated coop with roosting perches and nesting boxes for layers",
      "Deep litter or slatted floor for ease of cleaning",
      "Predator-proof fencing for free-range or semi-free-range systems",
      "Adequate floor space — roughly 0.1-0.2 sq m per bird depending on system"
    ],
    "nutrition": {
      "feedTypes": "Commercial layer or broiler mash/pellets, supplemented with kitchen scraps and grit for free-range birds",
      "feedingSchedule": "Ad-lib feeding for broilers; measured daily rations for layers to control body condition",
      "waterRequirements": "Clean water available at all times — critical for both growth and egg production"
    },
    "breeding": {
      "method": "Natural mating with a rooster, or artificial incubation of fertile eggs",
      "gestationOrIncubation": "21 days incubation for eggs to hatch",
      "breedingAge": "Pullets typically start laying at 18-22 weeks of age"
    },
    "vaccination": [
      "Newcastle Disease",
      "Infectious Bursal Disease (Gumboro)",
      "Fowl Typhoid",
      "Marek's Disease (day-old chicks)"
    ],
    "diseases": [
      "Newcastle Disease",
      "Coccidiosis",
      "Fowl Typhoid",
      "Avian Influenza (notify authorities immediately if suspected)"
    ],
    "parasites": [
      "Lice and mites",
      "Intestinal worms"
    ],
    "management": [
      "Follow a strict vaccination calendar from day-old",
      "Practice all-in-all-out flock management where possible to reduce disease carryover",
      "Maintain strict biosecurity — limit visitor access and disinfect footwear at entry points",
      "Cull and isolate sick birds immediately"
    ],
    "economics": {
      "startupCost": "Low — one of the most accessible livestock enterprises, especially for layers or small broiler batches",
      "expectedReturns": "Fast turnover: broilers ready in 6-8 weeks, layers producing within 5 months of hatching",
      "marketDemand": "Very high and consistent demand for both eggs and poultry meat year-round"
    },
    "faqs": [
      {
        "q": "Should I start with layers or broilers?",
        "a": "Layers provide a longer, steadier income stream from eggs; broilers offer a faster but one-off return per batch — many farmers eventually run both."
      }
    ],
    "relatedLivestock": [
      "fish",
      "rabbits"
    ]
  },
  {
    "slug": "fish",
    "name": "Fish Farming",
    "category": "Aquaculture",
    "image": "https://upload.wikimedia.org/wikipedia/commons/6/6f/Tilapia_pond.jpg",
    "overview": "Fish farming (aquaculture) involves raising fish, most commonly tilapia and catfish, in ponds or tanks, offering a productive use of water resources and a fast-growing protein source.",
    "housing": [
      "Earthen pond or lined tank, properly sized and depth-managed for the species",
      "Adequate water inflow/outflow or aeration system",
      "Netting or fencing to prevent predator access (birds, otters)"
    ],
    "nutrition": {
      "feedTypes": "Commercial floating fish pellets appropriate to growth stage, supplemented by natural pond productivity (plankton) where managed",
      "feedingSchedule": "2-3 times daily at consistent times and locations in the pond",
      "waterRequirements": "Water quality (oxygen, pH, temperature) matters more than volume — regular monitoring is essential"
    },
    "breeding": {
      "method": "Natural spawning in ponds, or controlled hatchery production of fingerlings",
      "gestationOrIncubation": "Tilapia eggs hatch in about 3-5 days; fry are mouth-brooded by the female for further protection",
      "breedingAge": "Tilapia can begin breeding as early as 3-6 months, which can lead to overpopulation if not managed with mono-sex stocking"
    },
    "vaccination": [
      "Formal vaccination is uncommon in smallholder ponds — disease prevention relies mainly on water quality and stocking density management"
    ],
    "diseases": [
      "Fungal infections (from poor water quality)",
      "Parasitic infestations (e.g. Ich)",
      "Bacterial gill disease"
    ],
    "parasites": [
      "External parasites (Ich, flukes)",
      "Fish lice in poorly managed ponds"
    ],
    "management": [
      "Stock at the correct density for pond size to avoid stunted growth",
      "Test and manage water quality regularly (oxygen levels are the most common limiting factor)",
      "Use mono-sex (all-male) tilapia fingerlings to prevent uncontrolled breeding",
      "Harvest on a defined cycle rather than continuously to manage pond productivity"
    ],
    "economics": {
      "startupCost": "Moderate — pond construction or tank setup is the main upfront cost",
      "expectedReturns": "Tilapia typically reach market size (250-500g) in 6-8 months under good management",
      "marketDemand": "Strong and growing demand for fresh fish, particularly in urban and peri-urban markets"
    },
    "faqs": [
      {
        "q": "Why use all-male tilapia fingerlings?",
        "a": "Tilapia breed very readily; without sex control, ponds quickly become overcrowded with small, stunted fish, so mono-sex stocking is standard practice for commercial production."
      }
    ],
    "relatedLivestock": [
      "chicken"
    ]
  },
  {
    "slug": "rabbits",
    "name": "Rabbit Farming",
    "category": "Small Stock",
    "image": "https://upload.wikimedia.org/wikipedia/commons/1/1f/Rabbit_in_montana.jpg",
    "overview": "Rabbits are compact, fast-reproducing livestock suited to limited space, kept primarily for meat, offering an efficient feed-to-meat conversion ratio.",
    "housing": [
      "Raised hutches with wire mesh flooring for hygiene and ventilation",
      "Separate compartments for does, bucks and weaned kits",
      "Protection from direct sun, rain and predators"
    ],
    "nutrition": {
      "feedTypes": "Pelleted rabbit feed, fresh forage/greens, and hay for fibre",
      "feedingSchedule": "Twice daily, with fresh water and fibre-rich hay available at all times",
      "waterRequirements": "0.5-1 litre per day, more for lactating does"
    },
    "breeding": {
      "method": "Natural mating; does are induced ovulators, meaning mating itself triggers ovulation",
      "gestationOrIncubation": "Approximately 31 days",
      "breedingAge": "Does can be bred from 5-6 months once mature"
    },
    "vaccination": [
      "Routine vaccination is limited in most smallholder systems; disease prevention relies on hygiene and biosecurity"
    ],
    "diseases": [
      "Coccidiosis",
      "Snuffles (respiratory infection)",
      "Ear mites"
    ],
    "parasites": [
      "Ear mites",
      "Fleas",
      "Internal worms"
    ],
    "management": [
      "Keep hutches clean and dry to prevent respiratory and skin disease",
      "Separate kits from the doe at 6-8 weeks for weaning",
      "Avoid overcrowding, which increases stress and disease spread",
      "Cull breeding stock that consistently underperforms"
    ],
    "economics": {
      "startupCost": "Very low — minimal space and infrastructure requirements",
      "expectedReturns": "Rapid reproduction (does can kindle 4-6 times a year) supports quick, compounding returns",
      "marketDemand": "Growing niche demand for rabbit meat, plus opportunities in breeding stock sales"
    },
    "faqs": [
      {
        "q": "How much space do rabbits actually need?",
        "a": "Considerably less than most livestock — a well-designed hutch system can be productive even on a small urban or peri-urban plot."
      }
    ],
    "relatedLivestock": [
      "chicken"
    ]
  },
  {
    "slug": "bees",
    "name": "Bee Keeping",
    "category": "Apiculture",
    "image": "https://upload.wikimedia.org/wikipedia/commons/4/4b/Bee_hive.jpg",
    "overview": "Beekeeping produces honey, beeswax and other hive products while also providing valuable pollination services, requiring specialized but relatively low-maintenance management once hives are established.",
    "housing": [
      "Langstroth or top-bar hives placed in a quiet, shaded location away from human and livestock traffic",
      "Hives raised off the ground on stands to deter ants and other pests",
      "Water source nearby for the colony"
    ],
    "nutrition": {
      "feedTypes": "Bees forage naturally on nectar and pollen from surrounding flowering plants and crops",
      "feedingSchedule": "Supplementary sugar syrup feeding may be needed during dearth periods or when establishing a new colony",
      "waterRequirements": "A nearby clean water source supports colony health, especially in dry seasons"
    },
    "breeding": {
      "method": "Natural colony reproduction through swarming, or managed splits of strong colonies",
      "gestationOrIncubation": "Queen bee egg to adult worker takes about 21 days",
      "breedingAge": "New colonies from a split or caught swarm typically take a full season to establish before first harvest"
    },
    "vaccination": [
      "Not applicable — hive health is managed through hygiene, hive inspection and pest control rather than vaccination"
    ],
    "diseases": [
      "American foulbrood",
      "Nosema",
      "Chalkbrood"
    ],
    "parasites": [
      "Varroa mites",
      "Wax moths",
      "Small hive beetle"
    ],
    "management": [
      "Inspect hives regularly for queen health, brood pattern and pest signs",
      "Harvest honey without overharvesting — leave enough for colony survival through dearth periods",
      "Site hives away from pesticide-sprayed fields where possible",
      "Maintain hive hygiene to reduce disease and pest pressure"
    ],
    "economics": {
      "startupCost": "Low to moderate — hive construction/purchase and protective equipment are the main costs",
      "expectedReturns": "A well-managed hive can produce 15-25+ kg of honey per harvest depending on region and forage availability",
      "marketDemand": "Strong demand for pure honey and growing interest in beeswax and other hive products"
    },
    "faqs": [
      {
        "q": "How long before a new hive produces honey?",
        "a": "A newly established colony typically needs a full season (several months) to build up strength before it can be harvested without harming the colony."
      }
    ],
    "relatedLivestock": []
  }
];

export const LIVESTOCK_CATEGORIES = [...new Set(LIVESTOCK.map((a) => a.category))].sort();

export function getAllLivestock() {
  return LIVESTOCK;
}

export function getLivestockBySlug(slug) {
  return LIVESTOCK.find((a) => a.slug === slug) || null;
}

export function getLivestockByCategory(category) {
  if (!category || category === "all") return LIVESTOCK;
  return LIVESTOCK.filter((a) => a.category === category);
}

export function searchLivestock(query) {
  const q = (query || "").trim().toLowerCase();
  if (!q) return LIVESTOCK;
  return LIVESTOCK.filter(
    (a) =>
      a.name.toLowerCase().includes(q) ||
      a.category.toLowerCase().includes(q) ||
      a.overview.toLowerCase().includes(q)
  );
}

export function getRelatedLivestock(slug) {
  const animal = getLivestockBySlug(slug);
  if (!animal || !animal.relatedLivestock) return [];
  return animal.relatedLivestock.map((s) => getLivestockBySlug(s)).filter(Boolean);
}

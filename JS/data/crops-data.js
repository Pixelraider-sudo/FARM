/* =========================================================
   AgriSense — Crop Database (ES6 Module)
   Structured agronomic data for 26 major crops.
   Import this module wherever crop data is needed rather
   than duplicating content across pages.
========================================================= */

export const CROPS = [
  {
    "slug": "maize",
    "name": "Maize",
    "category": "Cereals",
    "image": "../assets/maize.jpg",
    "overview": "Maize is East Africa's leading staple cereal, grown for grain, silage and animal feed. It performs best as a rain-fed crop in medium-to-high potential zones but can also be irrigated.",
    "climate": {
      "suitable": "Warm, sub-humid to semi-arid zones",
      "temperature": "18°C – 27°C",
      "rainfall": "500 – 1200 mm per season",
      "altitude": "0 – 2100 m above sea level"
    },
    "soil": {
      "type": "Deep, well-drained loam or sandy loam",
      "ph": "5.5 – 7.0"
    },
    "seedVarieties": [
      "H614 / H628 (highland hybrids)",
      "DK8031 / DK777 (drought-tolerant hybrids)",
      "WH505 (medium altitude)",
      "Local open-pollinated varieties for reserve seed"
    ],
    "landPreparation": [
      "Plough 2–3 weeks before planting to allow soil settling",
      "Harrow to break clods and create a fine tilth",
      "Incorporate well-rotted manure or compost"
    ],
    "plantingGuide": {
      "spacing": "75cm between rows, 25–30cm between plants",
      "seedRate": "20–25 kg/acre",
      "method": "Plant 2 seeds per hole at 3–5cm depth, thin to 1 plant after emergence"
    },
    "irrigation": "Rain-fed in most regions; supplement with furrow or drip irrigation during dry spells, especially at tasseling and grain-filling.",
    "fertilizer": {
      "planting": "DAP or NPK at planting, ~50kg/acre",
      "topDressing": "CAN or Urea top-dressed at knee-height (4–6 weeks) and again at tasseling"
    },
    "weedManagement": [
      "First weeding at 2–3 weeks after emergence",
      "Second weeding at 5–6 weeks",
      "Pre-emergence herbicides can reduce early competition"
    ],
    "growthStages": [
      "Germination (5–10 days)",
      "Vegetative growth & knee-high stage (3–6 weeks)",
      "Tasseling & silking (8–10 weeks)",
      "Grain filling (10–14 weeks)",
      "Physiological maturity & drying (14–18 weeks)"
    ],
    "pests": [
      "Fall armyworm",
      "Stem borers",
      "Maize weevil (storage)"
    ],
    "diseases": [
      "Maize Lethal Necrosis (MLN)",
      "Grey Leaf Spot",
      "Maize Streak Virus"
    ],
    "ipm": [
      "Scout weekly during vegetative stage",
      "Intercrop with legumes to disrupt pest cycles",
      "Use pheromone traps for armyworm monitoring",
      "Rotate with non-cereal crops"
    ],
    "organic": [
      "Use compost and green manure instead of synthetic fertilizer",
      "Neem-based sprays for early pest pressure",
      "Encourage natural predators like birds and parasitic wasps"
    ],
    "harvesting": "Harvest when husks turn brown and kernels are hard (18–20% moisture); dry to 13% before storage.",
    "storage": "Store shelled, dried grain in hermetic bags (e.g. PICS bags) or airtight metal silos to prevent weevil damage.",
    "yieldExpectation": "Smallholder rain-fed: 15–25 bags (90kg)/acre; with hybrid seed and good management: 30–40 bags/acre.",
    "profitability": "Moderate margins; profitability depends heavily on input costs and post-harvest losses — hermetic storage significantly improves returns.",
    "marketDemand": "Consistently high domestic demand as a staple; prices peak just before harvest and dip during glut periods.",
    "faqs": [
      {
        "q": "How long does maize take to mature?",
        "a": "Most varieties mature in 90–180 days depending on altitude and variety maturity class."
      },
      {
        "q": "Can maize be grown twice a year?",
        "a": "Yes, in areas with reliable long and short rains or irrigation, two seasons per year are possible."
      }
    ],
    "relatedCrops": [
      "beans",
      "sorghum",
      "millet"
    ]
  },
  {
    "slug": "rice",
    "name": "Rice",
    "category": "Cereals",
    "image": "../assets/rice.jpg",
    "overview": "Rice is grown under irrigated (paddy), rain-fed lowland, and upland systems. Irrigated schemes produce the most reliable and highest yields.",
    "climate": {
      "suitable": "Warm, humid lowlands and irrigated schemes",
      "temperature": "20°C – 35°C",
      "rainfall": "1000 – 2000 mm (or full irrigation)",
      "altitude": "0 – 1300 m above sea level"
    },
    "soil": {
      "type": "Heavy clay or clay-loam that retains water well",
      "ph": "5.0 – 6.5"
    },
    "seedVarieties": [
      "Basmati 370",
      "IR2793 (Sindano)",
      "NERICA (upland varieties)",
      "BW196"
    ],
    "landPreparation": [
      "Puddle and level paddies for even water distribution",
      "Prepare nursery beds for transplanting 21–25 days before main planting"
    ],
    "plantingGuide": {
      "spacing": "20cm x 20cm for transplanting",
      "seedRate": "40–50 kg/acre (direct seeding) or 3-4kg nursery seed/acre (transplanting)",
      "method": "Transplant 2–3 seedlings per hill, or direct-seed in rows"
    },
    "irrigation": "Maintain 5–10cm standing water through vegetative and reproductive stages; drain 2 weeks before harvest.",
    "fertilizer": {
      "planting": "DAP at transplanting, ~50kg/acre",
      "topDressing": "Urea split at tillering and panicle initiation"
    },
    "weedManagement": [
      "Hand weeding at 2 and 6 weeks after transplanting",
      "Maintain consistent water depth to suppress weeds"
    ],
    "growthStages": [
      "Nursery/germination (10–25 days)",
      "Tillering (25–55 days)",
      "Panicle initiation & flowering (55–90 days)",
      "Grain filling & ripening (90–120 days)"
    ],
    "pests": [
      "Rice stem borer",
      "Rice bugs",
      "Birds (Quelea)"
    ],
    "diseases": [
      "Rice blast",
      "Bacterial leaf blight",
      "Sheath rot"
    ],
    "ipm": [
      "Use certified, disease-free seed",
      "Maintain field sanitation between seasons",
      "Synchronize planting across a scheme to disrupt pest and bird pressure"
    ],
    "organic": [
      "Azolla or green manure to boost soil nitrogen",
      "Duck-rice integration for weed and pest control in some systems"
    ],
    "harvesting": "Harvest at 20–25% grain moisture when 80–85% of the panicle has turned golden.",
    "storage": "Dry to 12–14% moisture and store in sealed bags away from moisture and rodents.",
    "yieldExpectation": "Irrigated schemes: 25–35 bags (90kg)/acre; rain-fed upland: 8–15 bags/acre.",
    "profitability": "High-value cereal with strong domestic demand; irrigated production is capital intensive but has the best margins.",
    "marketDemand": "Growing demand, with significant reliance on imports — good opportunity for local, quality-graded rice.",
    "faqs": [
      {
        "q": "Does rice need standing water the whole season?",
        "a": "Most lowland irrigated rice needs standing water through vegetative and reproductive stages, drained before harvest; upland rice relies on rainfall instead."
      }
    ],
    "relatedCrops": [
      "maize",
      "sugarcane"
    ]
  },
  {
    "slug": "wheat",
    "name": "Wheat",
    "category": "Cereals",
    "image": "https://upload.wikimedia.org/wikipedia/commons/9/94/Wheat_close-up.JPG",
    "overview": "A cool-season cereal grown mainly in highland areas for flour production; usually cultivated on a larger, mechanized scale.",
    "climate": {
      "suitable": "Cool highlands with a dry harvesting window",
      "temperature": "10°C – 24°C",
      "rainfall": "600 – 1100 mm per season",
      "altitude": "1500 – 2900 m above sea level"
    },
    "soil": {
      "type": "Well-drained loam to clay-loam soils",
      "ph": "6.0 – 7.5"
    },
    "seedVarieties": [
      "Kenya Kingbird",
      "Kenya Korongo",
      "Robin",
      "Eagle10"
    ],
    "landPreparation": [
      "Deep plough and harrow to a fine tilth",
      "Ensure good drainage to avoid waterlogging"
    ],
    "plantingGuide": {
      "spacing": "Drilled in rows 20–25cm apart",
      "seedRate": "40–50 kg/acre",
      "method": "Drill or broadcast seed at 3–5cm depth"
    },
    "irrigation": "Mostly rain-fed; supplemental irrigation used in some large-scale schemes during dry spells.",
    "fertilizer": {
      "planting": "DAP at planting, ~50kg/acre",
      "topDressing": "CAN or Urea top-dressed at tillering"
    },
    "weedManagement": [
      "Pre-emergence herbicide application",
      "Post-emergence broadleaf herbicide at tillering stage"
    ],
    "growthStages": [
      "Germination & tillering (0–6 weeks)",
      "Stem elongation (6–9 weeks)",
      "Heading & flowering (9–12 weeks)",
      "Grain filling & ripening (12–18 weeks)"
    ],
    "pests": [
      "Aphids",
      "Armyworms",
      "Wheat stem sawfly"
    ],
    "diseases": [
      "Wheat rust (stem, leaf, yellow)",
      "Septoria leaf blotch",
      "Fusarium head blight"
    ],
    "ipm": [
      "Grow rust-resistant varieties",
      "Rotate with legumes or break crops",
      "Timely planting to avoid peak rust pressure"
    ],
    "organic": [
      "Crop rotation with legumes to build soil nitrogen",
      "Compost application ahead of planting"
    ],
    "harvesting": "Harvest at full maturity when grain is hard and straw has dried; usually combine-harvested on larger farms.",
    "storage": "Dry to below 13% moisture and store in weevil-proof, well-ventilated stores or silos.",
    "yieldExpectation": "15–25 bags (90kg)/acre under rain-fed smallholder conditions; 30+ bags/acre on well-managed mechanized farms.",
    "profitability": "Reasonable margins on larger, mechanized plots; less common for very small farms due to equipment needs.",
    "marketDemand": "Strong, consistent demand from milling industry; local production still trails national consumption.",
    "faqs": [
      {
        "q": "Can wheat be grown by smallholders?",
        "a": "Yes, though mechanization for planting and harvesting significantly improves efficiency and is common even among smaller commercial growers."
      }
    ],
    "relatedCrops": [
      "barley",
      "maize"
    ]
  },
  {
    "slug": "sorghum",
    "name": "Sorghum",
    "category": "Cereals",
    "image": "https://upload.wikimedia.org/wikipedia/commons/4/48/Sorghum_bicolor01.jpg",
    "overview": "A drought-tolerant cereal well suited to semi-arid areas, used for food, brewing and animal feed.",
    "climate": {
      "suitable": "Semi-arid and arid lowlands",
      "temperature": "20°C – 35°C",
      "rainfall": "400 – 800 mm per season",
      "altitude": "0 – 1800 m above sea level"
    },
    "soil": {
      "type": "Tolerant of poor, sandy and heavier soils alike",
      "ph": "5.5 – 7.5"
    },
    "seedVarieties": [
      "Gadam",
      "Seredo",
      "Sila",
      "Local red sorghum landraces"
    ],
    "landPreparation": [
      "Light ploughing and harrowing",
      "Timely planting at the onset of rains for good establishment"
    ],
    "plantingGuide": {
      "spacing": "60–75cm between rows, 15–20cm between plants",
      "seedRate": "3–4 kg/acre",
      "method": "Drill or plant in shallow furrows at 2–3cm depth"
    },
    "irrigation": "Almost entirely rain-fed given its drought tolerance; irrigation rarely necessary.",
    "fertilizer": {
      "planting": "DAP at low rates (~25kg/acre) on poorer soils",
      "topDressing": "Light CAN top-dressing at knee-height if soil fertility is low"
    },
    "weedManagement": [
      "Weed at 2–3 weeks and again at 6 weeks after emergence",
      "Critical to keep weed-free during early establishment"
    ],
    "growthStages": [
      "Germination (5–10 days)",
      "Vegetative growth (3–7 weeks)",
      "Panicle initiation & flowering (8–10 weeks)",
      "Grain filling & maturity (12–16 weeks)"
    ],
    "pests": [
      "Sorghum shoot fly",
      "Stem borers",
      "Quelea birds"
    ],
    "diseases": [
      "Anthracnose",
      "Grain mould",
      "Sorghum smut"
    ],
    "ipm": [
      "Use bird-scaring and synchronized planting to reduce Quelea losses",
      "Rotate crops to break disease cycles",
      "Select resistant varieties like Gadam"
    ],
    "organic": [
      "Minimal input crop — compost and manure improve yields on depleted soils",
      "Intercropping with legumes for soil fertility"
    ],
    "harvesting": "Harvest when grain is hard and heads have dried; birds can cause major losses if harvest is delayed.",
    "storage": "Dry thoroughly and store in sealed containers or hermetic bags to prevent weevils.",
    "yieldExpectation": "8–15 bags (90kg)/acre under smallholder rain-fed conditions.",
    "profitability": "Lower input costs make it profitable even with modest yields, especially in drought-prone areas.",
    "marketDemand": "Growing demand from breweries and food processors alongside traditional household use.",
    "faqs": [
      {
        "q": "Why grow sorghum instead of maize in dry areas?",
        "a": "Sorghum tolerates drought and poor soils far better than maize, making it a more reliable staple in semi-arid regions."
      }
    ],
    "relatedCrops": [
      "millet",
      "maize"
    ]
  },
  {
    "slug": "millet",
    "name": "Millet",
    "category": "Cereals",
    "image": "https://upload.wikimedia.org/wikipedia/commons/6/68/Finger_millet.jpg",
    "overview": "A hardy, nutrient-dense cereal (commonly finger millet) grown in semi-arid to sub-humid zones, valued for drought tolerance and long storage life.",
    "climate": {
      "suitable": "Semi-arid to sub-humid regions",
      "temperature": "20°C – 30°C",
      "rainfall": "500 – 1000 mm per season",
      "altitude": "500 – 2000 m above sea level"
    },
    "soil": {
      "type": "Well-drained sandy loam to loam soils",
      "ph": "5.0 – 7.0"
    },
    "seedVarieties": [
      "U15",
      "Gulu E",
      "P224",
      "Local landraces"
    ],
    "landPreparation": [
      "Fine tilth is essential due to small seed size",
      "Level the seedbed to avoid waterlogging"
    ],
    "plantingGuide": {
      "spacing": "30cm between rows for drilling",
      "seedRate": "3–5 kg/acre",
      "method": "Broadcast or drill shallow (1–2cm) due to small seed size"
    },
    "irrigation": "Rain-fed; drought-tolerant once established.",
    "fertilizer": {
      "planting": "DAP at modest rate (~25kg/acre)",
      "topDressing": "Light CAN application at tillering if needed"
    },
    "weedManagement": [
      "Early weeding is critical as seedlings are small and easily outcompeted",
      "Weed at 2–3 weeks and 5–6 weeks after emergence"
    ],
    "growthStages": [
      "Germination (4–7 days)",
      "Tillering (3–6 weeks)",
      "Flowering (7–9 weeks)",
      "Grain maturity (12–16 weeks)"
    ],
    "pests": [
      "Birds (major threat)",
      "Stem borers",
      "Aphids"
    ],
    "diseases": [
      "Blast disease",
      "Smut"
    ],
    "ipm": [
      "Coordinate planting dates across a community to reduce bird pressure",
      "Rotate with legumes",
      "Use certified, clean seed"
    ],
    "organic": [
      "Naturally low-input crop; compost application improves yield on poor soils"
    ],
    "harvesting": "Harvest when the ear/finger heads turn brown and grain is hard; often harvested slightly early to reduce bird losses.",
    "storage": "Millet stores exceptionally well when properly dried, often for 2+ years in traditional granaries.",
    "yieldExpectation": "6–12 bags (90kg)/acre depending on rainfall and management.",
    "profitability": "Low input costs and excellent storability make it a resilient income source, especially valuable during drought years.",
    "marketDemand": "Rising demand from health-food and porridge-flour markets in addition to traditional use.",
    "faqs": [
      {
        "q": "Why does millet store so much better than maize?",
        "a": "Its small, hard grain and low moisture content make it naturally more resistant to weevils and mould when properly dried."
      }
    ],
    "relatedCrops": [
      "sorghum",
      "maize"
    ]
  },
  {
    "slug": "beans",
    "name": "Beans",
    "category": "Legumes",
    "image": "../assets/beans.jpg",
    "overview": "Common beans are a key protein source and soil-improving legume, widely intercropped with maize across East Africa.",
    "climate": {
      "suitable": "Warm, moderate-rainfall mid-altitude zones",
      "temperature": "15°C – 27°C",
      "rainfall": "400 – 900 mm per season",
      "altitude": "0 – 2000 m above sea level"
    },
    "soil": {
      "type": "Well-drained loam soils, avoid waterlogging",
      "ph": "5.5 – 7.0"
    },
    "seedVarieties": [
      "Rosecoco",
      "Mwitemania",
      "KK8 (Nyayo)",
      "GLP2 (Mexican 142)"
    ],
    "landPreparation": [
      "Plough and harrow to a fine, well-drained tilth",
      "Remove crop residue from previous disease-prone crops"
    ],
    "plantingGuide": {
      "spacing": "50cm between rows, 10cm between plants",
      "seedRate": "8–10 kg/acre",
      "method": "Plant 2 seeds per hole at 3–5cm depth"
    },
    "irrigation": "Mostly rain-fed; sensitive to both drought and waterlogging, so drainage matters more than irrigation in most areas.",
    "fertilizer": {
      "planting": "DAP at planting, ~50kg/acre",
      "topDressing": "Usually minimal — beans fix their own nitrogen once nodulation begins"
    },
    "weedManagement": [
      "Weed at 2–3 weeks after emergence before flowering",
      "Avoid deep cultivation near roots to protect nodules"
    ],
    "growthStages": [
      "Germination (5–10 days)",
      "Vegetative growth (2–5 weeks)",
      "Flowering (5–7 weeks)",
      "Pod filling & maturity (7–10 weeks)"
    ],
    "pests": [
      "Bean fly",
      "Aphids",
      "Bean weevil (storage)"
    ],
    "diseases": [
      "Bean rust",
      "Angular leaf spot",
      "Bean common mosaic virus"
    ],
    "ipm": [
      "Rotate with cereals to break disease cycles",
      "Use certified, clean seed",
      "Scout early for bean fly at seedling stage"
    ],
    "organic": [
      "Beans naturally fix nitrogen, benefiting the following crop",
      "Wood ash or neem extract for mild aphid control"
    ],
    "harvesting": "Harvest when pods are dry and rattle; delayed harvest increases shattering losses.",
    "storage": "Dry to below 13% moisture and store in hermetic bags to prevent bean weevil damage.",
    "yieldExpectation": "4–8 bags (90kg)/acre for smallholders; up to 12 bags/acre with good variety and management.",
    "profitability": "Strong margins given relatively low input costs and consistently high market prices.",
    "marketDemand": "High and stable domestic demand as a household protein staple.",
    "faqs": [
      {
        "q": "Why intercrop beans with maize?",
        "a": "Beans fix nitrogen that benefits the maize, use different rooting depths, and provide two harvests from the same plot."
      }
    ],
    "relatedCrops": [
      "maize",
      "green-grams",
      "cowpeas"
    ]
  },
  {
    "slug": "green-grams",
    "name": "Green Grams",
    "category": "Legumes",
    "image": "https://upload.wikimedia.org/wikipedia/commons/6/6b/Mung_bean_%28Vigna_radiata%29.jpg",
    "overview": "A fast-maturing, drought-tolerant legume (also known as mung bean) popular in dry lowland areas as a short-cycle cash crop.",
    "climate": {
      "suitable": "Semi-arid and dry lowland regions",
      "temperature": "20°C – 35°C",
      "rainfall": "350 – 700 mm per season",
      "altitude": "0 – 1600 m above sea level"
    },
    "soil": {
      "type": "Well-drained sandy loam soils",
      "ph": "5.5 – 7.5"
    },
    "seedVarieties": [
      "N26",
      "KS20",
      "Biashara"
    ],
    "landPreparation": [
      "Light ploughing is sufficient",
      "Ensure good drainage"
    ],
    "plantingGuide": {
      "spacing": "45cm between rows, 10cm between plants",
      "seedRate": "6–8 kg/acre",
      "method": "Plant seeds at 2–3cm depth"
    },
    "irrigation": "Rain-fed; well suited to areas with unreliable rainfall due to its short growth cycle.",
    "fertilizer": {
      "planting": "Light DAP application (~25kg/acre) on poor soils",
      "topDressing": "Rarely needed given nitrogen fixation"
    },
    "weedManagement": [
      "One or two weedings within the first 4 weeks are usually sufficient"
    ],
    "growthStages": [
      "Germination (4–6 days)",
      "Vegetative growth (2–4 weeks)",
      "Flowering (4–6 weeks)",
      "Pod maturity (8–10 weeks)"
    ],
    "pests": [
      "Aphids",
      "Pod borers",
      "Bruchids (storage)"
    ],
    "diseases": [
      "Powdery mildew",
      "Cercospora leaf spot"
    ],
    "ipm": [
      "Harvest promptly to avoid pod shattering and bruchid infestation",
      "Rotate with cereals"
    ],
    "organic": [
      "Minimal input crop; compost improves yield on depleted soils"
    ],
    "harvesting": "Pods mature unevenly — harvest in 2–3 rounds as pods turn black/brown and dry.",
    "storage": "Dry thoroughly and store in airtight containers to prevent bruchid beetle damage.",
    "yieldExpectation": "3–6 bags (90kg)/acre, with potential for 2–3 crops per year in favorable areas.",
    "profitability": "Good returns given its short cycle allows multiple crops per year and strong export demand.",
    "marketDemand": "Growing export demand, particularly to Asian markets, alongside local consumption.",
    "faqs": [
      {
        "q": "How fast does green gram mature?",
        "a": "Most varieties mature in 60–90 days, making it possible to fit 2–3 crops into a year in the right conditions."
      }
    ],
    "relatedCrops": [
      "beans",
      "cowpeas",
      "groundnuts"
    ]
  },
  {
    "slug": "groundnuts",
    "name": "Groundnuts",
    "category": "Legumes",
    "image": "https://upload.wikimedia.org/wikipedia/commons/4/4c/Peanut_plant.jpg",
    "overview": "Groundnuts (peanuts) are a nitrogen-fixing legume grown for both food and oil, well suited to sandy soils in warm lowland areas.",
    "climate": {
      "suitable": "Warm lowland areas with well-distributed rainfall",
      "temperature": "22°C – 30°C",
      "rainfall": "500 – 1000 mm per season",
      "altitude": "0 – 1500 m above sea level"
    },
    "soil": {
      "type": "Light, well-drained sandy loam (essential for pod development)",
      "ph": "5.5 – 6.5"
    },
    "seedVarieties": [
      "Homabay CG7",
      "Red Valencia",
      "ICGV-12991"
    ],
    "landPreparation": [
      "Deep ploughing to loosen soil for pod penetration",
      "Ridge or mound planting improves drainage"
    ],
    "plantingGuide": {
      "spacing": "45–60cm between rows, 10–15cm between plants",
      "seedRate": "25–35 kg/acre (shelled seed)",
      "method": "Plant at 5cm depth, ensure loose soil around the row for pegging"
    },
    "irrigation": "Rain-fed; consistent moisture during flowering and pegging is important for good pod set.",
    "fertilizer": {
      "planting": "Light phosphorus application (e.g. TSP) at planting; avoid excess nitrogen",
      "topDressing": "Gypsum at flowering can improve pod fill"
    },
    "weedManagement": [
      "Weed before flowering/pegging begins — cultivation after pegging can damage developing pods"
    ],
    "growthStages": [
      "Germination (7–10 days)",
      "Vegetative growth (3–5 weeks)",
      "Flowering & pegging (5–8 weeks)",
      "Pod filling & maturity (12–16 weeks)"
    ],
    "pests": [
      "Aphids",
      "Leaf miners",
      "Groundnut rosette vectors (aphids)"
    ],
    "diseases": [
      "Groundnut rosette virus",
      "Early and late leaf spot",
      "Aflatoxin-causing fungi (post-harvest)"
    ],
    "ipm": [
      "Use certified seed to reduce rosette virus risk",
      "Timely harvest and proper drying to prevent aflatoxin",
      "Rotate with cereals"
    ],
    "organic": [
      "Naturally nitrogen-fixing; minimal fertilizer needed",
      "Proper drying and storage is the most important organic control against aflatoxin"
    ],
    "harvesting": "Harvest when leaves yellow and pods show developed veining inside the shell; lift carefully to avoid pod loss.",
    "storage": "Dry pods thoroughly before shelling and store in a dry, well-ventilated space — critical for preventing aflatoxin contamination.",
    "yieldExpectation": "4–8 bags (90kg)/acre shelled, depending on variety and rainfall distribution.",
    "profitability": "Good margins from both food and oil markets, though aflatoxin risk requires careful post-harvest handling.",
    "marketDemand": "Strong local and regional demand for consumption and cooking oil production.",
    "faqs": [
      {
        "q": "Why is drying so important for groundnuts?",
        "a": "Poorly dried groundnuts are highly susceptible to aflatoxin-producing fungi, which pose serious health and market-access risks."
      }
    ],
    "relatedCrops": [
      "green-grams",
      "beans",
      "cowpeas"
    ]
  },
  {
    "slug": "potatoes",
    "name": "Irish Potatoes",
    "category": "Roots & Tubers",
    "image": "../assets/potatoes.jpg",
    "overview": "A fast-growing tuber crop and important food security and cash crop in cool highland areas.",
    "climate": {
      "suitable": "Cool highland zones",
      "temperature": "15°C – 20°C",
      "rainfall": "600 – 1200 mm per season",
      "altitude": "1500 – 2800 m above sea level"
    },
    "soil": {
      "type": "Loose, well-drained loam soil rich in organic matter",
      "ph": "5.0 – 6.5"
    },
    "seedVarieties": [
      "Shangi",
      "Dutch Robjin",
      "Kenya Mpya",
      "Unica"
    ],
    "landPreparation": [
      "Deep ploughing and ridging to allow tuber expansion",
      "Incorporate well-decomposed manure before planting"
    ],
    "plantingGuide": {
      "spacing": "75cm between rows, 30cm between plants",
      "seedRate": "8–12 bags (50kg) of certified seed tubers/acre",
      "method": "Plant sprouted seed tubers at 10cm depth in ridges"
    },
    "irrigation": "Rain-fed in most highland zones; drip or furrow irrigation used in drier highland pockets.",
    "fertilizer": {
      "planting": "DAP or NPK 17:17:17 at planting, ~100kg/acre",
      "topDressing": "CAN top-dressed at 4–5 weeks, combined with earthing up"
    },
    "weedManagement": [
      "Earth up (hill soil around stems) at 4–5 weeks — this also controls weeds and covers developing tubers"
    ],
    "growthStages": [
      "Sprouting & emergence (2–3 weeks)",
      "Vegetative growth (3–6 weeks)",
      "Tuber initiation (6–8 weeks)",
      "Tuber bulking & maturity (10–16 weeks)"
    ],
    "pests": [
      "Potato tuber moth",
      "Aphids (also spread viruses)",
      "Cutworms"
    ],
    "diseases": [
      "Late blight",
      "Bacterial wilt",
      "Potato virus Y"
    ],
    "ipm": [
      "Use certified, disease-free seed tubers every season",
      "Practice 2–3 year rotation away from Solanaceae crops",
      "Spray protectively before rains during late blight season"
    ],
    "organic": [
      "Well-decomposed compost instead of synthetic fertilizer",
      "Copper-based sprays are commonly used in organic late blight management"
    ],
    "harvesting": "Harvest when haulms yellow and die back, typically 3–4 months after planting; harvest in dry conditions where possible.",
    "storage": "Cure tubers in a cool, dark, well-ventilated store; avoid light exposure which causes greening.",
    "yieldExpectation": "80–120 bags (50kg)/acre for smallholders using certified seed and good management; up to 180+ bags/acre commercially.",
    "profitability": "High-value crop with strong margins, though seed cost and late blight management are significant expenses.",
    "marketDemand": "Very high and growing demand from fresh markets, processors (crisps/chips) and hospitality sector.",
    "faqs": [
      {
        "q": "Why use certified seed potatoes instead of saving your own?",
        "a": "Farm-saved seed accumulates viruses and bacterial wilt over generations, sharply reducing yield — certified seed resets this cycle."
      }
    ],
    "relatedCrops": [
      "sweet-potatoes",
      "cassava",
      "tomatoes"
    ]
  },
  {
    "slug": "sweet-potatoes",
    "name": "Sweet Potatoes",
    "category": "Roots & Tubers",
    "image": "https://upload.wikimedia.org/wikipedia/commons/4/43/Sweet_potatoes.jpg",
    "overview": "A resilient, nutritious tuber crop grown from vine cuttings, valued for both food security and orange-fleshed varieties rich in vitamin A.",
    "climate": {
      "suitable": "Warm lowland to mid-altitude zones",
      "temperature": "20°C – 30°C",
      "rainfall": "500 – 1200 mm per season",
      "altitude": "0 – 2000 m above sea level"
    },
    "soil": {
      "type": "Light, well-drained sandy loam",
      "ph": "5.5 – 6.8"
    },
    "seedVarieties": [
      "Kabode (orange-fleshed)",
      "Vitaa (orange-fleshed)",
      "SPK004",
      "Local landraces"
    ],
    "landPreparation": [
      "Make ridges or mounds 30cm high for good tuber development",
      "Incorporate manure into ridges before planting"
    ],
    "plantingGuide": {
      "spacing": "75cm between ridges, 30cm between plants",
      "seedRate": "8000–10,000 vine cuttings/acre",
      "method": "Plant 30cm vine cuttings at a slant, burying two-thirds of the vine"
    },
    "irrigation": "Drought-tolerant once established; light irrigation helps establishment in dry planting periods.",
    "fertilizer": {
      "planting": "Light DAP application at planting; avoid excess nitrogen which favors vine growth over tubers",
      "topDressing": "Potassium-rich fertilizer improves tuber quality"
    },
    "weedManagement": [
      "Weed within the first 6 weeks before vines cover the ground and naturally suppress weeds"
    ],
    "growthStages": [
      "Vine establishment (2–3 weeks)",
      "Vine growth & ground cover (3–8 weeks)",
      "Tuber bulking (8–14 weeks)",
      "Maturity (14–20 weeks)"
    ],
    "pests": [
      "Sweet potato weevil",
      "Aphids"
    ],
    "diseases": [
      "Sweet potato virus disease (SPVD)",
      "Fusarium wilt"
    ],
    "ipm": [
      "Use clean, virus-free vine cuttings",
      "Rotate fields to reduce weevil carryover",
      "Hill soil around the base to reduce weevil access to tubers"
    ],
    "organic": [
      "Compost-based fertility management works well",
      "Ash application can help deter some soil pests"
    ],
    "harvesting": "Harvest 4–6 months after planting when leaves start yellowing; lift carefully to avoid bruising.",
    "storage": "Cure tubers for a few days in a warm, humid spot to heal cuts, then store in a cool, dry, well-ventilated place.",
    "yieldExpectation": "60–100 bags (50kg)/acre for smallholders with good vine quality and spacing.",
    "profitability": "Low input costs relative to yield make this a reliably profitable food-security and cash crop.",
    "marketDemand": "Growing demand for orange-fleshed varieties driven by nutrition programs, alongside steady traditional market demand.",
    "faqs": [
      {
        "q": "Why choose orange-fleshed sweet potato varieties?",
        "a": "They are significantly richer in vitamin A than traditional white-fleshed varieties, and are increasingly favored by health programs and processors."
      }
    ],
    "relatedCrops": [
      "potatoes",
      "cassava"
    ]
  },
  {
    "slug": "cassava",
    "name": "Cassava",
    "category": "Roots & Tubers",
    "image": "https://upload.wikimedia.org/wikipedia/commons/8/85/Cassava-2.jpg",
    "overview": "An extremely drought-tolerant root crop grown from stem cuttings, valued as a food-security crop able to remain in the ground during shortages.",
    "climate": {
      "suitable": "Warm lowland to mid-altitude zones, tolerant of poor rainfall",
      "temperature": "20°C – 32°C",
      "rainfall": "500 – 1500 mm per season",
      "altitude": "0 – 1800 m above sea level"
    },
    "soil": {
      "type": "Tolerant of poor, sandy soils; avoid waterlogged clay",
      "ph": "5.0 – 7.0"
    },
    "seedVarieties": [
      "Karembo",
      "Kibandameno",
      "MM96/4271"
    ],
    "landPreparation": [
      "Light ploughing and ridging in heavier soils",
      "Minimal tillage needed on lighter soils"
    ],
    "plantingGuide": {
      "spacing": "1m between rows, 1m between plants",
      "seedRate": "4000–5000 stem cuttings/acre",
      "method": "Plant 25–30cm woody stem cuttings at a slant or vertically"
    },
    "irrigation": "Rain-fed; among the most drought-tolerant food crops available once established.",
    "fertilizer": {
      "planting": "Minimal fertilizer needed; light DAP on very poor soils",
      "topDressing": "Not usually necessary"
    },
    "weedManagement": [
      "Weed during the first 3–4 months until canopy closes and naturally suppresses weeds"
    ],
    "growthStages": [
      "Sprouting (2–4 weeks)",
      "Vegetative growth & canopy formation (1–4 months)",
      "Root bulking (4–9 months)",
      "Maturity (9–24 months depending on variety)"
    ],
    "pests": [
      "Cassava mealybug",
      "Cassava green mite"
    ],
    "diseases": [
      "Cassava mosaic virus",
      "Cassava brown streak disease"
    ],
    "ipm": [
      "Plant only certified, disease-free cuttings",
      "Rogue and destroy virus-infected plants promptly",
      "Rotate planting material sources to avoid disease buildup"
    ],
    "organic": [
      "Naturally low-input; suited to organic and minimal-input systems",
      "Intercropping with legumes improves overall plot fertility"
    ],
    "harvesting": "Roots can be harvested from 9 months onward and left in the ground as a food reserve for up to 2 years in some varieties.",
    "storage": "Fresh roots deteriorate within days of harvest; typically processed quickly into flour, chips or left unharvested until needed.",
    "yieldExpectation": "60–120 bags (50kg)/acre depending on variety and duration in the ground.",
    "profitability": "Low input cost and long harvest flexibility make it a resilient, if lower cash-value, staple crop.",
    "marketDemand": "Steady demand for fresh consumption and growing demand from flour and starch processors.",
    "faqs": [
      {
        "q": "Can cassava be left in the ground if I don't need it yet?",
        "a": "Yes — this is one of cassava's biggest advantages, acting as a standing food reserve during lean periods."
      }
    ],
    "relatedCrops": [
      "sweet-potatoes",
      "potatoes"
    ]
  },
  {
    "slug": "tomatoes",
    "name": "Tomatoes",
    "category": "Vegetables",
    "image": "../assets/tomatoes.jpg",
    "overview": "A high-value vegetable crop grown widely in both open-field and greenhouse systems, requiring careful disease management.",
    "climate": {
      "suitable": "Warm zones with moderate humidity",
      "temperature": "18°C – 27°C",
      "rainfall": "400 – 600 mm per season (or irrigated)",
      "altitude": "0 – 2100 m above sea level"
    },
    "soil": {
      "type": "Well-drained loam soil rich in organic matter",
      "ph": "6.0 – 6.8"
    },
    "seedVarieties": [
      "Anna F1",
      "Rambo F1",
      "Kilele F1",
      "Money Maker"
    ],
    "landPreparation": [
      "Raise nursery beds for seedlings 4–6 weeks before transplanting",
      "Prepare main field with deep ploughing and manure incorporation"
    ],
    "plantingGuide": {
      "spacing": "75cm between rows, 45–60cm between plants",
      "seedRate": "80–100g seed/acre (nursery-raised)",
      "method": "Transplant healthy 4–6 week old seedlings into the main field"
    },
    "irrigation": "Consistent, even watering is critical — irregular watering causes blossom end rot and fruit cracking; drip irrigation is ideal.",
    "fertilizer": {
      "planting": "DAP at transplanting, ~50kg/acre",
      "topDressing": "CAN or NPK top-dressed at flowering and again at fruit set"
    },
    "weedManagement": [
      "Weed regularly, especially before staking",
      "Mulching helps suppress weeds and retain moisture"
    ],
    "growthStages": [
      "Nursery stage (4–6 weeks)",
      "Vegetative growth after transplant (2–4 weeks)",
      "Flowering (5–7 weeks)",
      "Fruiting & ripening (8–14 weeks)"
    ],
    "pests": [
      "Tuta absoluta (tomato leafminer)",
      "Whiteflies",
      "Aphids"
    ],
    "diseases": [
      "Early blight",
      "Late blight",
      "Bacterial wilt"
    ],
    "ipm": [
      "Stake and prune to improve airflow and reduce disease pressure",
      "Use pheromone traps for Tuta absoluta monitoring",
      "Practice 3-year rotation away from Solanaceae crops"
    ],
    "organic": [
      "Neem-based sprays for early pest pressure",
      "Copper-based fungicides commonly used organically for blight"
    ],
    "harvesting": "Harvest at the breaker stage (color change starting) for market transport, or fully ripe for immediate local sale.",
    "storage": "Store in a cool, well-ventilated area; avoid direct sunlight and refrigeration for best flavor retention.",
    "yieldExpectation": "8–15 tonnes/acre in open field with good management; greenhouse production can exceed 25 tonnes/acre.",
    "profitability": "High value but input- and labor-intensive; disease management costs are a major factor in profitability.",
    "marketDemand": "Consistently high demand, though prices fluctuate significantly with seasonal supply gluts.",
    "faqs": [
      {
        "q": "Why do my tomatoes get blossom end rot?",
        "a": "This is usually caused by inconsistent watering affecting calcium uptake, not a disease — even, regular irrigation is the main fix."
      }
    ],
    "relatedCrops": [
      "onions",
      "capsicum",
      "potatoes"
    ]
  },
  {
    "slug": "onions",
    "name": "Onions",
    "category": "Vegetables",
    "image": "https://upload.wikimedia.org/wikipedia/commons/8/85/Onions.jpg",
    "overview": "A widely grown bulb vegetable valued for its long shelf life and consistent market demand, grown from either seed or transplants.",
    "climate": {
      "suitable": "Warm, dry conditions especially during bulbing",
      "temperature": "15°C – 25°C",
      "rainfall": "350 – 550 mm per season (or irrigated)",
      "altitude": "0 – 2000 m above sea level"
    },
    "soil": {
      "type": "Well-drained loam or sandy loam soil",
      "ph": "6.0 – 6.8"
    },
    "seedVarieties": [
      "Red Creole",
      "Bombay Red",
      "Jambar F1"
    ],
    "landPreparation": [
      "Fine, well-levelled seedbed for nursery raising",
      "Deep ploughing in the main field to allow bulb expansion"
    ],
    "plantingGuide": {
      "spacing": "20cm between rows, 10cm between plants",
      "seedRate": "2–3 kg seed/acre (nursery-raised)",
      "method": "Transplant 6–8 week old seedlings into the main field"
    },
    "irrigation": "Regular irrigation needed through vegetative growth; reduce watering as bulbs mature to encourage curing.",
    "fertilizer": {
      "planting": "DAP at transplanting, ~50kg/acre",
      "topDressing": "CAN top-dressed during bulb formation; avoid excess nitrogen late in the season"
    },
    "weedManagement": [
      "Onions compete poorly with weeds — frequent shallow weeding is essential, especially early on"
    ],
    "growthStages": [
      "Nursery stage (6–8 weeks)",
      "Vegetative growth after transplant (4–6 weeks)",
      "Bulb initiation (8–10 weeks)",
      "Bulb maturity & curing (14–20 weeks)"
    ],
    "pests": [
      "Onion thrips",
      "Cutworms"
    ],
    "diseases": [
      "Purple blotch",
      "Downy mildew",
      "Bacterial soft rot (storage)"
    ],
    "ipm": [
      "Rotate with non-allium crops",
      "Avoid overhead irrigation late in the season to reduce fungal risk",
      "Cure bulbs thoroughly before storage to prevent rot"
    ],
    "organic": [
      "Neem extract for thrips management",
      "Wood ash dusting as a mild pest deterrent"
    ],
    "harvesting": "Harvest when about half the tops have fallen over and necks have softened; cure in the field or shade for 1–2 weeks.",
    "storage": "Store cured, dry bulbs in a well-ventilated, dry area — good curing is the single biggest factor in storage life.",
    "yieldExpectation": "8–14 tonnes/acre for smallholders with good management.",
    "profitability": "Strong margins due to long shelf life allowing farmers to sell when prices are favorable.",
    "marketDemand": "Very high, stable year-round demand as a kitchen staple.",
    "faqs": [
      {
        "q": "Why do my stored onions rot quickly?",
        "a": "This is usually due to insufficient curing before storage or high storage humidity — ensure necks are fully dry and stores are well-ventilated."
      }
    ],
    "relatedCrops": [
      "garlic",
      "tomatoes",
      "capsicum"
    ]
  },
  {
    "slug": "cabbage",
    "name": "Cabbage",
    "category": "Vegetables",
    "image": "https://upload.wikimedia.org/wikipedia/commons/2/28/Cabbage_and_cross_section_on_white.jpg",
    "overview": "A cool-season leafy vegetable grown widely for local markets, valued for reliable yields and relatively simple management.",
    "climate": {
      "suitable": "Cool to moderate temperature zones",
      "temperature": "15°C – 20°C",
      "rainfall": "400 – 500 mm per season (or irrigated)",
      "altitude": "1200 – 2700 m above sea level"
    },
    "soil": {
      "type": "Fertile, well-drained loam soil",
      "ph": "6.0 – 6.8"
    },
    "seedVarieties": [
      "Gloria F1",
      "Copenhagen Market",
      "Drumhead"
    ],
    "landPreparation": [
      "Raise nursery beds for seedlings",
      "Deep plough and incorporate manure into the main field"
    ],
    "plantingGuide": {
      "spacing": "60cm between rows, 45cm between plants",
      "seedRate": "150–200g seed/acre (nursery-raised)",
      "method": "Transplant 4–5 week old seedlings into the main field"
    },
    "irrigation": "Consistent moisture is important, especially during head formation; drip or furrow irrigation recommended in dry spells.",
    "fertilizer": {
      "planting": "DAP at transplanting, ~50kg/acre",
      "topDressing": "CAN top-dressed at 3 and 6 weeks after transplanting"
    },
    "weedManagement": [
      "Weed regularly until canopy closes, typically 2–3 weedings needed"
    ],
    "growthStages": [
      "Nursery stage (4–5 weeks)",
      "Vegetative growth (3–5 weeks after transplant)",
      "Head formation (6–10 weeks)",
      "Maturity (10–14 weeks)"
    ],
    "pests": [
      "Diamondback moth",
      "Cabbage aphids",
      "Cutworms"
    ],
    "diseases": [
      "Black rot",
      "Downy mildew",
      "Clubroot"
    ],
    "ipm": [
      "Rotate with non-brassica crops for at least 2 seasons",
      "Use pheromone traps and Bt sprays for diamondback moth",
      "Remove and destroy infected plant debris"
    ],
    "organic": [
      "Neem-based sprays for common pests",
      "Companion planting with strong-smelling herbs to deter some pests"
    ],
    "harvesting": "Harvest when heads are firm and solid when pressed, before they split.",
    "storage": "Store in a cool, humid environment; fresh cabbage keeps for a few weeks under good conditions.",
    "yieldExpectation": "15–25 tonnes/acre with good management.",
    "profitability": "Reliable, moderate-margin crop with relatively fast turnover, good for consistent cash flow.",
    "marketDemand": "Steady year-round demand as a common household vegetable.",
    "faqs": [
      {
        "q": "How do I control diamondback moth without excessive spraying?",
        "a": "Rotate insecticide modes of action, use Bt-based biopesticides, and consider pheromone traps to monitor and time interventions."
      }
    ],
    "relatedCrops": [
      "kale",
      "spinach"
    ]
  },
  {
    "slug": "kale",
    "name": "Kale (Sukuma Wiki)",
    "category": "Vegetables",
    "image": "https://upload.wikimedia.org/wikipedia/commons/1/1f/Collard_Greens_Bundle.jpg",
    "overview": "A fast-growing, continuously-harvested leafy green and one of the most widely eaten vegetables in East African households.",
    "climate": {
      "suitable": "Wide climatic tolerance from highland to mid-altitude zones",
      "temperature": "15°C – 25°C",
      "rainfall": "400 – 600 mm per season (or irrigated)",
      "altitude": "0 – 2500 m above sea level"
    },
    "soil": {
      "type": "Fertile, well-drained loam soil",
      "ph": "5.5 – 6.8"
    },
    "seedVarieties": [
      "Thousand Headed",
      "Marrow Stem",
      "Collard"
    ],
    "landPreparation": [
      "Fine seedbed for direct sowing or nursery raising",
      "Incorporate manure generously as kale is a heavy feeder"
    ],
    "plantingGuide": {
      "spacing": "45–60cm between rows, 30cm between plants",
      "seedRate": "300–400g seed/acre",
      "method": "Direct sow or transplant 3–4 week old seedlings"
    },
    "irrigation": "Regular watering supports continuous leaf production; drought stress causes bitter, tough leaves.",
    "fertilizer": {
      "planting": "DAP at planting, ~50kg/acre",
      "topDressing": "CAN top-dressed after each major harvest round to sustain leaf regrowth"
    },
    "weedManagement": [
      "Weed regularly, particularly important between harvest rounds"
    ],
    "growthStages": [
      "Germination/establishment (2–3 weeks)",
      "Vegetative growth to first harvest (5–8 weeks)",
      "Continuous leaf harvest (ongoing for several months)"
    ],
    "pests": [
      "Aphids",
      "Diamondback moth",
      "Cutworms"
    ],
    "diseases": [
      "Black rot",
      "Powdery mildew"
    ],
    "ipm": [
      "Harvest regularly to reduce pest buildup on older leaves",
      "Rotate planting sites seasonally",
      "Remove and destroy heavily infested leaves"
    ],
    "organic": [
      "Compost-based fertility management supports repeated harvesting",
      "Neem sprays for aphid and moth control"
    ],
    "harvesting": "Harvest outer leaves progressively from 6–8 weeks, allowing the plant to keep producing for several months.",
    "storage": "Best sold and consumed fresh; wilts quickly, though refrigeration extends shelf life by a few days.",
    "yieldExpectation": "Continuous harvest over several months can total 15–20 tonnes/acre cumulatively.",
    "profitability": "Excellent cash flow crop due to frequent, ongoing harvests rather than a single payout.",
    "marketDemand": "Very high, constant daily demand as a household staple vegetable.",
    "faqs": [
      {
        "q": "How often can I harvest kale from the same plants?",
        "a": "Leaves can typically be picked every 1–2 weeks for several months if plants are well fed and watered."
      }
    ],
    "relatedCrops": [
      "cabbage",
      "spinach"
    ]
  },
  {
    "slug": "carrots",
    "name": "Carrots",
    "category": "Vegetables",
    "image": "https://upload.wikimedia.org/wikipedia/commons/5/5a/Carrots_of_many_colors.jpg",
    "overview": "A root vegetable grown in loose, deep soils, valued for its market versatility from fresh sale to processing.",
    "climate": {
      "suitable": "Cool to moderate temperature zones",
      "temperature": "15°C – 22°C",
      "rainfall": "400 – 500 mm per season (or irrigated)",
      "altitude": "600 – 2500 m above sea level"
    },
    "soil": {
      "type": "Deep, loose, stone-free sandy loam (essential for straight roots)",
      "ph": "6.0 – 6.8"
    },
    "seedVarieties": [
      "Nantes",
      "Chantenay",
      "Kuroda"
    ],
    "landPreparation": [
      "Deep ploughing and thorough removal of stones and clods",
      "Raised beds improve drainage and root formation"
    ],
    "plantingGuide": {
      "spacing": "20–25cm between rows, 5cm between plants (thinned)",
      "seedRate": "2–3 kg seed/acre",
      "method": "Direct sow thinly, then thin seedlings to correct spacing at 3 weeks"
    },
    "irrigation": "Regular, even watering — inconsistent moisture causes root splitting and poor shape.",
    "fertilizer": {
      "planting": "Light DAP application at planting; excess nitrogen causes forking",
      "topDressing": "Potassium-rich top-dressing supports root development"
    },
    "weedManagement": [
      "Weed carefully by hand early on since carrot seedlings are delicate and slow to establish"
    ],
    "growthStages": [
      "Germination (10–20 days)",
      "Seedling establishment & thinning (3–5 weeks)",
      "Root bulking (6–10 weeks)",
      "Maturity (10–14 weeks)"
    ],
    "pests": [
      "Carrot fly",
      "Aphids"
    ],
    "diseases": [
      "Leaf blight (Alternaria)",
      "Root rot in waterlogged soils"
    ],
    "ipm": [
      "Rotate with non-root crops to reduce carrot fly pressure",
      "Use fine seedbeds and stone-free soil to prevent forked roots",
      "Avoid waterlogging to prevent root rot"
    ],
    "organic": [
      "Companion planting with onions can help deter carrot fly",
      "Compost-enriched soil improves texture and root quality"
    ],
    "harvesting": "Harvest when roots reach desired size, typically 10–14 weeks after sowing; loosen soil before pulling to avoid breakage.",
    "storage": "Store in cool, humid conditions; roots keep for several weeks under good storage or longer with refrigeration.",
    "yieldExpectation": "10–18 tonnes/acre with good soil preparation and consistent watering.",
    "profitability": "Good margins, especially for well-shaped, uniform roots sold to supermarkets or processors.",
    "marketDemand": "Steady demand from fresh markets, supermarkets and juice/processing industries.",
    "faqs": [
      {
        "q": "Why are my carrots forked or twisted?",
        "a": "This is usually caused by stony soil, compaction, or excess nitrogen — deep, loose, stone-free soil with balanced fertilization prevents it."
      }
    ],
    "relatedCrops": [
      "onions",
      "cabbage"
    ]
  },
  {
    "slug": "capsicum",
    "name": "Capsicum (Bell Pepper)",
    "category": "Vegetables",
    "image": "https://upload.wikimedia.org/wikipedia/commons/0/0a/Bell_peppers.jpg",
    "overview": "A high-value vegetable grown in open field or greenhouses, popular for both fresh consumption and export markets.",
    "climate": {
      "suitable": "Warm, moderate-humidity zones",
      "temperature": "18°C – 27°C",
      "rainfall": "400 – 600 mm per season (or irrigated)",
      "altitude": "0 – 2000 m above sea level"
    },
    "soil": {
      "type": "Well-drained fertile loam soil rich in organic matter",
      "ph": "6.0 – 6.8"
    },
    "seedVarieties": [
      "California Wonder",
      "Yolo Wonder",
      "Nobili F1"
    ],
    "landPreparation": [
      "Raise nursery beds for seedlings",
      "Deep plough and incorporate compost into the main field"
    ],
    "plantingGuide": {
      "spacing": "60cm between rows, 45cm between plants",
      "seedRate": "150–200g seed/acre (nursery-raised)",
      "method": "Transplant 5–6 week old seedlings into the main field"
    },
    "irrigation": "Consistent watering is essential, particularly during flowering and fruit set; drip irrigation works very well.",
    "fertilizer": {
      "planting": "DAP at transplanting, ~50kg/acre",
      "topDressing": "NPK top-dressed at flowering and again during fruiting"
    },
    "weedManagement": [
      "Weed regularly and mulch to suppress weeds and conserve soil moisture"
    ],
    "growthStages": [
      "Nursery stage (5–6 weeks)",
      "Vegetative growth after transplant (3–5 weeks)",
      "Flowering & fruit set (6–9 weeks)",
      "Fruit maturity & harvest (10–16 weeks)"
    ],
    "pests": [
      "Aphids",
      "Thrips",
      "Fruit flies"
    ],
    "diseases": [
      "Bacterial wilt",
      "Anthracnose",
      "Powdery mildew"
    ],
    "ipm": [
      "Stake plants to improve air circulation",
      "Rotate away from Solanaceae crops for at least 2–3 seasons",
      "Use yellow sticky traps to monitor thrips and aphids"
    ],
    "organic": [
      "Neem-based sprays for common pests",
      "Compost-based fertility management for sustained fruiting"
    ],
    "harvesting": "Harvest green fruit at full size, or allow to ripen to red/yellow for premium markets; regular picking encourages continued fruiting.",
    "storage": "Store in a cool, well-ventilated place; refrigeration extends shelf life for several days.",
    "yieldExpectation": "10–18 tonnes/acre in open field; greenhouse production can be significantly higher.",
    "profitability": "High value, especially for export-grade or colored (ripe) fruit, though input and labor costs are considerable.",
    "marketDemand": "Strong domestic demand plus growing export opportunities for high-grade produce.",
    "faqs": [
      {
        "q": "Should I harvest capsicum green or let it ripen to red?",
        "a": "Green harvest gives faster turnover and higher volume; ripened (red/yellow) fruit commands a premium price but takes longer and reduces overall yield per plant."
      }
    ],
    "relatedCrops": [
      "tomatoes",
      "onions"
    ]
  },
  {
    "slug": "avocado",
    "name": "Avocado",
    "category": "Fruits",
    "image": "https://upload.wikimedia.org/wikipedia/commons/e/e5/Avocados.jpg",
    "overview": "A high-value perennial tree crop with strong export demand, particularly Hass avocado, requiring several years to reach full production.",
    "climate": {
      "suitable": "Mid to high altitude zones with moderate rainfall",
      "temperature": "15°C – 25°C",
      "rainfall": "1000 – 1600 mm per year",
      "altitude": "1000 – 2100 m above sea level"
    },
    "soil": {
      "type": "Deep, well-drained loam soil — avoid waterlogging which causes root rot",
      "ph": "6.0 – 6.5"
    },
    "seedVarieties": [
      "Hass (export)",
      "Fuerte",
      "Local (Kienyeji) types for grafting rootstock"
    ],
    "landPreparation": [
      "Dig planting holes 60cm x 60cm x 60cm well ahead of planting",
      "Mix topsoil with well-rotted manure before backfilling"
    ],
    "plantingGuide": {
      "spacing": "7m x 7m to 8m x 8m for mature tree canopy spread",
      "seedRate": "Approx. 70–90 grafted seedlings/acre",
      "method": "Plant grafted seedlings at the same depth as in the nursery bag"
    },
    "irrigation": "Young trees need regular watering to establish; mature trees benefit from supplemental irrigation during dry spells for consistent fruiting.",
    "fertilizer": {
      "planting": "Manure and a starter dose of DAP at planting",
      "topDressing": "Annual NPK application increased as the tree matures, plus micronutrients like boron and zinc"
    },
    "weedManagement": [
      "Keep a weed-free ring around the base of young trees",
      "Mulch to suppress weeds and retain soil moisture"
    ],
    "growthStages": [
      "Establishment (year 1–2)",
      "Vegetative growth (year 2–3)",
      "First flowering & light fruiting (year 3–4)",
      "Full production (year 5 onward)"
    ],
    "pests": [
      "False codling moth",
      "Fruit flies",
      "Thrips"
    ],
    "diseases": [
      "Root rot (Phytophthora)",
      "Cercospora spot",
      "Anthracnose"
    ],
    "ipm": [
      "Ensure excellent drainage to prevent root rot — this is the single biggest avocado risk",
      "Prune to improve airflow and reduce fungal pressure",
      "Use fruit fly traps during fruiting season"
    ],
    "organic": [
      "Compost mulching supports root health and moisture retention",
      "Copper-based sprays commonly used for fungal disease management"
    ],
    "harvesting": "Harvest by maturity indicators (oil content, skin color change for some varieties) rather than by a fixed calendar date; typically 6–12 months after flowering.",
    "storage": "Harvested fruit is firm and ripens off the tree over 5–10 days at room temperature; cold storage extends shelf life for export.",
    "yieldExpectation": "Mature trees (5+ years) can yield 150–300+ fruits per tree annually depending on variety and management.",
    "profitability": "Very high long-term profitability, especially for export-grade Hass, though it requires patience during the 3–5 year establishment period.",
    "marketDemand": "Strong and growing export demand, particularly to European markets, alongside solid domestic demand.",
    "faqs": [
      {
        "q": "How long before an avocado tree produces fruit?",
        "a": "Grafted trees typically begin light fruiting in year 3–4 and reach full production around year 5, much faster than seedling trees which can take 7+ years."
      }
    ],
    "relatedCrops": [
      "mango",
      "macadamia",
      "passion-fruit"
    ]
  },
  {
    "slug": "mango",
    "name": "Mango",
    "category": "Fruits",
    "image": "https://upload.wikimedia.org/wikipedia/commons/1/17/Hapus_Mango.jpg",
    "overview": "A hardy, drought-tolerant fruit tree suited to warm lowland areas, valued for both fresh consumption and processing.",
    "climate": {
      "suitable": "Warm lowland to mid-altitude zones with a distinct dry season",
      "temperature": "24°C – 35°C",
      "rainfall": "600 – 1200 mm per year",
      "altitude": "0 – 1200 m above sea level"
    },
    "soil": {
      "type": "Deep, well-drained soil, tolerant of a range of soil types",
      "ph": "5.5 – 7.5"
    },
    "seedVarieties": [
      "Apple mango",
      "Kent",
      "Tommy Atkins",
      "Ngowe"
    ],
    "landPreparation": [
      "Dig planting holes 60cm x 60cm x 60cm ahead of planting",
      "Mix topsoil with manure before backfilling"
    ],
    "plantingGuide": {
      "spacing": "8m x 8m to 10m x 10m for mature canopy spread",
      "seedRate": "Approx. 45–65 grafted seedlings/acre",
      "method": "Plant grafted seedlings at nursery depth, stake young trees against wind"
    },
    "irrigation": "Drought-tolerant once established; young trees need regular watering, and a dry period before flowering actually improves fruit set.",
    "fertilizer": {
      "planting": "Manure at planting",
      "topDressing": "Annual NPK application, increased with tree age and canopy size"
    },
    "weedManagement": [
      "Maintain a weed-free basin around young trees",
      "Mulching helps retain moisture around the root zone"
    ],
    "growthStages": [
      "Establishment (year 1–2)",
      "Vegetative growth (year 2–3)",
      "First flowering & fruiting (year 3–5)",
      "Full production (year 6 onward)"
    ],
    "pests": [
      "Fruit flies",
      "Mango seed weevil",
      "Mealybugs"
    ],
    "diseases": [
      "Anthracnose",
      "Powdery mildew",
      "Bacterial black spot"
    ],
    "ipm": [
      "Use fruit fly traps and bait stations during fruiting season",
      "Prune for airflow to reduce fungal disease pressure",
      "Practice orchard sanitation — remove fallen, infected fruit"
    ],
    "organic": [
      "Neem-based sprays for common pests",
      "Copper-based fungicides for anthracnose management"
    ],
    "harvesting": "Harvest at physiological maturity (slight color change, full shoulder development); pick with a short stem to avoid latex burn on fruit skin.",
    "storage": "Store at room temperature to ripen over 5–9 days; cold storage slows ripening for transport and export.",
    "yieldExpectation": "Mature trees (8+ years) can yield 300–1000+ fruits annually depending on variety and management.",
    "profitability": "High long-term profitability with relatively low input costs once trees are established.",
    "marketDemand": "Strong domestic and regional demand, with growing export and processing (juice/pulp) markets.",
    "faqs": [
      {
        "q": "Why did my mango tree flower but not fruit well?",
        "a": "Poor fruit set is often caused by high humidity or rain during flowering disrupting pollination, or pest damage to flowers — this varies significantly by season."
      }
    ],
    "relatedCrops": [
      "avocado",
      "banana",
      "passion-fruit"
    ]
  },
  {
    "slug": "banana",
    "name": "Banana",
    "category": "Fruits",
    "image": "https://upload.wikimedia.org/wikipedia/commons/8/8a/Bananas_white_background.jpg",
    "overview": "A perennial crop grown from suckers or tissue-culture plantlets, providing continuous harvests once established and valued for both food and cash income.",
    "climate": {
      "suitable": "Warm, humid mid-altitude zones",
      "temperature": "20°C – 30°C",
      "rainfall": "1000 – 2000 mm per year (or irrigated)",
      "altitude": "0 – 2000 m above sea level"
    },
    "soil": {
      "type": "Deep, fertile, well-drained loam soil rich in organic matter",
      "ph": "5.5 – 7.0"
    },
    "seedVarieties": [
      "Grand Naine",
      "Williams Hybrid",
      "Ng'ombe (cooking banana)",
      "Tissue-culture plantlets (recommended for disease-free start)"
    ],
    "landPreparation": [
      "Dig planting holes 60cm x 60cm x 60cm",
      "Mix topsoil generously with manure before planting"
    ],
    "plantingGuide": {
      "spacing": "3m x 3m for most commercial varieties",
      "seedRate": "Approx. 450–500 suckers or plantlets/acre",
      "method": "Plant healthy suckers or tissue-culture plantlets at the same depth as the nursery bag"
    },
    "irrigation": "Requires consistent moisture — irrigation strongly improves yield and bunch size in areas with unreliable rainfall.",
    "fertilizer": {
      "planting": "Manure at planting",
      "topDressing": "Regular NPK and potassium-rich top-dressing every few months — bananas are heavy feeders"
    },
    "weedManagement": [
      "Mulch heavily around the base to suppress weeds and retain moisture",
      "Remove excess suckers to manage plant density"
    ],
    "growthStages": [
      "Establishment (0–3 months)",
      "Vegetative growth (3–9 months)",
      "Flowering / bunch emergence (9–12 months)",
      "Bunch filling & maturity (12–15 months)"
    ],
    "pests": [
      "Banana weevil",
      "Nematodes"
    ],
    "diseases": [
      "Banana bacterial wilt (BXW)",
      "Panama disease (Fusarium wilt)",
      "Black Sigatoka"
    ],
    "ipm": [
      "Use clean tissue-culture planting material to avoid disease carryover",
      "Disinfect tools between plants to prevent bacterial wilt spread",
      "De-bud (remove the male flower) to reduce bacterial wilt transmission risk"
    ],
    "organic": [
      "Heavy mulching with crop residue supports soil fertility and moisture",
      "Regular removal of dead leaves reduces fungal disease pressure"
    ],
    "harvesting": "Harvest when fingers are well-filled and rounded but still green, then ripen off the plant.",
    "storage": "Green bananas ripen at room temperature over several days; refrigeration is not recommended before ripening as it damages the fruit.",
    "yieldExpectation": "One healthy mat can produce a bunch every 9–12 months once established, with bunches averaging 15–30kg.",
    "profitability": "Good ongoing income once established, since it's a perennial crop with continuous, staggered harvests rather than one seasonal payout.",
    "marketDemand": "High and consistent year-round demand as both a food staple and snack fruit.",
    "faqs": [
      {
        "q": "Why is bacterial wilt such a serious risk for banana?",
        "a": "It spreads easily through contaminated tools, infected planting material, and insect vectors visiting the male flower, and can wipe out an entire plantation if not managed proactively."
      }
    ],
    "relatedCrops": [
      "mango",
      "passion-fruit"
    ]
  },
  {
    "slug": "watermelon",
    "name": "Watermelon",
    "category": "Fruits",
    "image": "https://upload.wikimedia.org/wikipedia/commons/1/12/Citrullus_lanatus1.jpg",
    "overview": "A fast-growing, high-value fruit crop grown in warm lowland areas, popular for its short cycle and strong seasonal market demand.",
    "climate": {
      "suitable": "Warm lowland areas with a dry harvesting window",
      "temperature": "22°C – 32°C",
      "rainfall": "400 – 600 mm per season (or irrigated)",
      "altitude": "0 – 1500 m above sea level"
    },
    "soil": {
      "type": "Well-drained sandy loam soil",
      "ph": "6.0 – 6.8"
    },
    "seedVarieties": [
      "Sugar Baby",
      "Crimson Sweet",
      "Charleston Gray"
    ],
    "landPreparation": [
      "Prepare mounds or ridges 1–2m apart for good drainage",
      "Incorporate manure into planting holes"
    ],
    "plantingGuide": {
      "spacing": "2m between rows, 1m between plants",
      "seedRate": "1–1.5 kg seed/acre",
      "method": "Plant 2–3 seeds per hole at 2–3cm depth, thin to strongest plant"
    },
    "irrigation": "Regular watering during vegetative growth and fruit development; reduce watering as fruit approaches maturity to concentrate sugars.",
    "fertilizer": {
      "planting": "DAP at planting, ~50kg/acre",
      "topDressing": "Potassium-rich top-dressing during flowering and fruit development"
    },
    "weedManagement": [
      "Weed until vines spread and naturally suppress weeds",
      "Mulching helps control weeds and keep fruit clean"
    ],
    "growthStages": [
      "Germination (5–10 days)",
      "Vine establishment (2–4 weeks)",
      "Flowering & fruit set (4–7 weeks)",
      "Fruit development & ripening (8–12 weeks)"
    ],
    "pests": [
      "Aphids",
      "Fruit flies",
      "Leaf miners"
    ],
    "diseases": [
      "Powdery mildew",
      "Fusarium wilt",
      "Anthracnose"
    ],
    "ipm": [
      "Rotate with non-cucurbit crops for at least 2 seasons",
      "Support fruit off the ground with mulch or straw to reduce rot",
      "Use fruit fly traps during fruiting"
    ],
    "organic": [
      "Neem sprays for common pests",
      "Well-decomposed compost improves fruit sweetness and yield"
    ],
    "harvesting": "Harvest when the tendril nearest the fruit dries and the underside (ground spot) turns yellow; thumping produces a dull, hollow sound when ripe.",
    "storage": "Store in a cool, shaded area; whole watermelons keep for 2–3 weeks under good conditions.",
    "yieldExpectation": "8–15 tonnes/acre depending on variety and management.",
    "profitability": "Good returns from a short cropping cycle, allowing multiple crops per year in favorable areas.",
    "marketDemand": "High seasonal demand, particularly during hot months and festive periods.",
    "faqs": [
      {
        "q": "How do I know when a watermelon is ripe without cutting it?",
        "a": "Check that the tendril near the stem has dried and browned, and that the ground spot underneath has turned from white to yellow."
      }
    ],
    "relatedCrops": [
      "pumpkin",
      "capsicum"
    ]
  },
  {
    "slug": "passion-fruit",
    "name": "Passion Fruit",
    "category": "Fruits",
    "image": "https://upload.wikimedia.org/wikipedia/commons/6/64/Passion_fruit_and_cross_section.jpg",
    "overview": "A vigorous climbing vine grown on trellises, producing high-value fruit for both fresh markets and juice processing.",
    "climate": {
      "suitable": "Mid to high altitude zones with moderate rainfall",
      "temperature": "18°C – 28°C",
      "rainfall": "900 – 1500 mm per year",
      "altitude": "1000 – 2000 m above sea level"
    },
    "soil": {
      "type": "Well-drained, fertile loam soil rich in organic matter",
      "ph": "5.5 – 6.5"
    },
    "seedVarieties": [
      "Purple passion",
      "Yellow passion (KPF4, grafted onto yellow rootstock for disease tolerance)"
    ],
    "landPreparation": [
      "Set up a sturdy trellis system before planting",
      "Dig planting holes and incorporate generous manure"
    ],
    "plantingGuide": {
      "spacing": "3m x 2m along trellis lines",
      "seedRate": "Approx. 700–800 grafted seedlings/acre",
      "method": "Plant grafted seedlings at the base of trellis posts and train vines upward"
    },
    "irrigation": "Regular watering supports vigorous growth and consistent flowering; drip irrigation works well on trellised systems.",
    "fertilizer": {
      "planting": "Manure at planting",
      "topDressing": "Regular NPK top-dressing through the growing and fruiting season, as passion fruit is a heavy feeder"
    },
    "weedManagement": [
      "Keep the base weed-free and mulch to retain moisture",
      "Regular pruning also helps manage vine density and airflow"
    ],
    "growthStages": [
      "Establishment (0–3 months)",
      "Vine training & vegetative growth (3–6 months)",
      "Flowering (6–8 months)",
      "Fruiting (8–12 months onward, with ongoing cycles)"
    ],
    "pests": [
      "Fruit flies",
      "Aphids",
      "Mealybugs"
    ],
    "diseases": [
      "Fusarium wilt",
      "Brown spot",
      "Woodiness virus"
    ],
    "ipm": [
      "Use grafted, disease-tolerant planting material",
      "Prune regularly to improve airflow and reduce fungal pressure",
      "Control aphids promptly to limit virus spread"
    ],
    "organic": [
      "Compost-based fertility supports sustained flowering and fruiting",
      "Neem sprays for common pests"
    ],
    "harvesting": "Harvest when fruit changes to full purple or yellow color and starts to naturally drop; regular picking rounds are needed as fruiting is continuous.",
    "storage": "Store in a cool, well-ventilated place; fruit keeps for 1–2 weeks, with wrinkled skin indicating optimal ripeness for juicing.",
    "yieldExpectation": "Mature vines can produce 10–20 tonnes/acre annually under good management.",
    "profitability": "High-value crop with strong ongoing income once vines are established and trellised properly.",
    "marketDemand": "Strong domestic fresh-fruit demand plus growing juice-processing and export markets.",
    "faqs": [
      {
        "q": "Why is grafted planting material recommended for passion fruit?",
        "a": "Grafting purple passion onto disease-tolerant yellow passion rootstock significantly improves resistance to soil-borne diseases like Fusarium wilt."
      }
    ],
    "relatedCrops": [
      "mango",
      "avocado"
    ]
  },
  {
    "slug": "coffee",
    "name": "Coffee",
    "category": "Cash Crops",
    "image": "../assets/coffee.jpg",
    "overview": "A perennial highland cash crop with a long productive lifespan, requiring careful pest, disease and processing management to reach premium markets.",
    "climate": {
      "suitable": "Cool to warm highland zones with well-distributed rainfall",
      "temperature": "15°C – 24°C",
      "rainfall": "1000 – 1800 mm per year",
      "altitude": "1400 – 2100 m above sea level"
    },
    "soil": {
      "type": "Deep, well-drained volcanic or loam soil rich in organic matter",
      "ph": "5.0 – 6.5"
    },
    "seedVarieties": [
      "SL28",
      "SL34",
      "Ruiru 11 (disease-resistant)",
      "Batian (disease-resistant)"
    ],
    "landPreparation": [
      "Dig planting holes 60cm x 60cm x 60cm well ahead of planting",
      "Mix topsoil with generous manure before backfilling"
    ],
    "plantingGuide": {
      "spacing": "2.5m x 2.5m for most varieties",
      "seedRate": "Approx. 600–700 seedlings/acre",
      "method": "Plant seedlings from polythene bags at the same depth as in the nursery"
    },
    "irrigation": "Rain-fed in most highland areas; supplemental irrigation used in drier zones, especially during flowering.",
    "fertilizer": {
      "planting": "Manure and a starter dose of DAP at planting",
      "topDressing": "Annual NPK application split across the season, plus foliar feeds during heavy fruiting years"
    },
    "weedManagement": [
      "Keep a weed-free basin around each tree",
      "Mulch to suppress weeds and conserve moisture"
    ],
    "growthStages": [
      "Establishment (year 1–2)",
      "Vegetative growth (year 2–3)",
      "First flowering & cherries (year 3–4)",
      "Full production (year 5 onward)"
    ],
    "pests": [
      "Coffee berry borer",
      "Antestia bug",
      "Leaf miners"
    ],
    "diseases": [
      "Coffee berry disease (CBD)",
      "Coffee leaf rust",
      "Bacterial blight of coffee"
    ],
    "ipm": [
      "Plant disease-resistant varieties like Ruiru 11 or Batian where CBD/rust pressure is high",
      "Prune regularly to improve airflow and light penetration",
      "Strip-pick and destroy fallen, infected berries"
    ],
    "organic": [
      "Compost mulching supports soil health and moisture retention",
      "Copper-based sprays commonly used organically for CBD and rust management"
    ],
    "harvesting": "Hand-pick only fully ripe, red cherries in multiple rounds through the harvest season for best quality.",
    "storage": "Process promptly (wet or dry method) after picking; store dried parchment in a cool, dry place before milling.",
    "yieldExpectation": "Mature trees (5+ years) can yield 2–4 kg of cherry per tree annually under good management.",
    "profitability": "High long-term value, especially for specialty-grade coffee, though it requires a multi-year establishment investment before full returns.",
    "marketDemand": "Strong global export demand, with specialty and certified (organic/fair-trade) coffee commanding premium prices.",
    "faqs": [
      {
        "q": "Why does coffee take so long to become profitable?",
        "a": "Trees need 3–5 years to reach significant production, but a well-managed tree can then produce for 20–30+ years, making it a genuine long-term investment."
      }
    ],
    "relatedCrops": [
      "tea",
      "avocado",
      "macadamia"
    ]
  },
  {
    "slug": "tea",
    "name": "Tea",
    "category": "Cash Crops",
    "image": "../assets/tea.jpg",
    "overview": "A perennial plantation crop grown for its young leaves and buds, requiring cool, high-altitude conditions and regular, skilled plucking.",
    "climate": {
      "suitable": "Cool, high-altitude zones with regular rainfall",
      "temperature": "13°C – 22°C",
      "rainfall": "1200 – 2000 mm per year, well distributed",
      "altitude": "1500 – 2700 m above sea level"
    },
    "soil": {
      "type": "Deep, well-drained acidic loam soil rich in organic matter",
      "ph": "4.5 – 5.5"
    },
    "seedVarieties": [
      "TRFK clones (e.g. 6/8, 11/4)",
      "Seedling tea (older, less uniform stands)"
    ],
    "landPreparation": [
      "Dig planting holes and incorporate acidic, organic-rich topsoil",
      "Establish contour terraces on sloped land to reduce erosion"
    ],
    "plantingGuide": {
      "spacing": "1.2m x 0.75m for most clonal varieties",
      "seedRate": "Approx. 4300–4800 clonal cuttings/acre",
      "method": "Plant rooted clonal cuttings at nursery depth, mulch immediately after planting"
    },
    "irrigation": "Rain-fed in most tea-growing zones; consistent, well-distributed rainfall is critical for continuous leaf flush.",
    "fertilizer": {
      "planting": "Manure and phosphorus at planting",
      "topDressing": "Regular NPK application, typically split across multiple applications through the growing season"
    },
    "weedManagement": [
      "Weed regularly until canopy closes and shades out most weeds",
      "Mulch young plantings to suppress weeds and retain moisture"
    ],
    "growthStages": [
      "Establishment (year 1–2)",
      "Formative pruning & bush shaping (year 2–3)",
      "First plucking (year 3)",
      "Full production (year 4 onward, with regular pruning cycles)"
    ],
    "pests": [
      "Tea mosquito bug",
      "Red spider mite"
    ],
    "diseases": [
      "Blister blight",
      "Root rot"
    ],
    "ipm": [
      "Prune on a regular cycle to maintain a productive plucking table and manage pest habitat",
      "Scout regularly given the frequent harvest cycle",
      "Ensure good field drainage to reduce root rot risk"
    ],
    "organic": [
      "Compost and organic mulch commonly used given tea's sensitivity to residues",
      "Careful, targeted control methods preferred due to frequent harvest intervals"
    ],
    "harvesting": "Pluck two leaves and a bud every 7–14 days depending on growth rate and season — timing and technique strongly affect quality.",
    "storage": "Fresh leaf should reach the factory within hours of plucking for processing; not typically stored on-farm.",
    "yieldExpectation": "Mature, well-managed bushes can produce 2000–2500+ kg of green leaf per acre annually.",
    "profitability": "Reliable, ongoing income given the frequent harvest cycle, though returns depend heavily on factory payout rates.",
    "marketDemand": "Strong, established export market, with specialty and orthodox teas commanding premium pricing.",
    "faqs": [
      {
        "q": "Why is regular, frequent plucking so important for tea?",
        "a": "Timely plucking keeps the bush in active vegetative growth and ensures leaf is harvested at peak tenderness — delays reduce both yield and quality."
      }
    ],
    "relatedCrops": [
      "coffee",
      "macadamia"
    ]
  },
  {
    "slug": "sugarcane",
    "name": "Sugarcane",
    "category": "Cash Crops",
    "image": "https://upload.wikimedia.org/wikipedia/commons/9/97/Sugarcane_field.jpg",
    "overview": "A long-duration cash crop grown for sugar processing, propagated from stem cuttings and typically harvested once every 12–18 months.",
    "climate": {
      "suitable": "Warm, humid lowland to mid-altitude zones",
      "temperature": "20°C – 32°C",
      "rainfall": "1200 – 1800 mm per year (or irrigated)",
      "altitude": "0 – 1600 m above sea level"
    },
    "soil": {
      "type": "Deep, fertile, well-drained loam to clay-loam soil",
      "ph": "6.0 – 7.5"
    },
    "seedVarieties": [
      "CO945",
      "N14",
      "KEN82-472"
    ],
    "landPreparation": [
      "Deep ploughing and furrowing to prepare planting rows",
      "Incorporate manure or compost into furrows before planting"
    ],
    "plantingGuide": {
      "spacing": "1m between furrows",
      "seedRate": "Approx. 3–4 tonnes of seed cane (setts)/acre",
      "method": "Lay 2–3 budded setts end-to-end in furrows and cover lightly with soil"
    },
    "irrigation": "Rain-fed in high-rainfall zones; irrigated schemes common in drier sugarcane belts for consistent growth.",
    "fertilizer": {
      "planting": "DAP or NPK at planting, ~100kg/acre",
      "topDressing": "Nitrogen top-dressing at 2–3 months and again during peak vegetative growth"
    },
    "weedManagement": [
      "Weed during early establishment before the crop canopies over",
      "Herbicides commonly used on larger commercial plantings"
    ],
    "growthStages": [
      "Germination & establishment (0–2 months)",
      "Tillering (2–4 months)",
      "Grand growth / stalk elongation (4–9 months)",
      "Maturity & ripening (10–18 months)"
    ],
    "pests": [
      "Sugarcane stem borer",
      "White grubs"
    ],
    "diseases": [
      "Smut",
      "Ratoon stunting disease"
    ],
    "ipm": [
      "Use certified, disease-free seed cane",
      "Rotate or fallow fields periodically to manage soil-borne pests",
      "Remove and destroy smut-infected stools promptly"
    ],
    "organic": [
      "Trash mulching (leaving cane residue on the field) improves soil organic matter",
      "Compost application supports ratoon crop vigor"
    ],
    "harvesting": "Harvest at peak sucrose content, typically 12–18 months after planting depending on variety and zone; ratoon crops can be harvested for several subsequent cycles.",
    "storage": "Cane deteriorates quickly after cutting and should be delivered to the mill within 24–48 hours for best sugar recovery.",
    "yieldExpectation": "30–50+ tonnes/acre depending on variety, zone and ratoon cycle.",
    "profitability": "Stable, long-cycle income, particularly valuable through multiple ratoon harvests from a single planting, though heavily tied to milling contracts and payment schedules.",
    "marketDemand": "Consistent institutional demand through contracted sugar mills in growing zones.",
    "faqs": [
      {
        "q": "What is a 'ratoon' crop in sugarcane?",
        "a": "After the first harvest, the cut stalks regrow from the same root system — this regrowth is called a ratoon crop, and can be harvested for several more cycles before replanting is needed."
      }
    ],
    "relatedCrops": [
      "rice",
      "maize"
    ]
  },
  {
    "slug": "macadamia",
    "name": "Macadamia",
    "category": "Cash Crops",
    "image": "https://upload.wikimedia.org/wikipedia/commons/6/60/Macadamia_nuts.jpg",
    "overview": "A long-lived nut tree crop increasingly popular as a high-value export commodity, requiring patience during a multi-year establishment period.",
    "climate": {
      "suitable": "Mid to high altitude zones with moderate, well-distributed rainfall",
      "temperature": "16°C – 25°C",
      "rainfall": "1000 – 1800 mm per year",
      "altitude": "1000 – 2100 m above sea level"
    },
    "soil": {
      "type": "Deep, well-drained loam soil — sensitive to waterlogging",
      "ph": "5.0 – 6.5"
    },
    "seedVarieties": [
      "MRG20",
      "695",
      "741 (grafted varieties recommended over seedling trees)"
    ],
    "landPreparation": [
      "Dig planting holes 60cm x 60cm x 60cm well ahead of planting",
      "Mix topsoil with manure before backfilling"
    ],
    "plantingGuide": {
      "spacing": "8m x 8m for mature canopy spread",
      "seedRate": "Approx. 65–70 grafted seedlings/acre",
      "method": "Plant grafted seedlings at nursery depth, stake against wind while young"
    },
    "irrigation": "Young trees benefit from regular watering during establishment; mature trees are relatively drought-tolerant but yield better with consistent moisture during nut development.",
    "fertilizer": {
      "planting": "Manure at planting",
      "topDressing": "Annual NPK application increased as the tree matures and canopy expands"
    },
    "weedManagement": [
      "Maintain a weed-free basin around young trees",
      "Mulch to conserve moisture and suppress weeds"
    ],
    "growthStages": [
      "Establishment (year 1–2)",
      "Vegetative growth (year 2–4)",
      "First flowering & light nut set (year 4–5)",
      "Full production (year 7 onward)"
    ],
    "pests": [
      "Macadamia felted coccid",
      "Stink bugs",
      "Fruit-spotting bugs"
    ],
    "diseases": [
      "Husk spot",
      "Root rot (Phytophthora)"
    ],
    "ipm": [
      "Ensure good drainage to prevent root rot",
      "Prune to maintain airflow and manageable tree height for harvesting",
      "Monitor for stink bug damage during nut development"
    ],
    "organic": [
      "Compost mulching for soil and root health",
      "Careful orchard sanitation to reduce fungal and pest carryover"
    ],
    "harvesting": "Nuts drop naturally when mature — collect from the ground regularly to prevent quality loss from prolonged ground contact.",
    "storage": "Dry nuts-in-shell to appropriate moisture before storage; store in a cool, dry, well-ventilated space away from pests.",
    "yieldExpectation": "Mature trees (10+ years) can yield 40–70+ kg of nut-in-shell annually.",
    "profitability": "Very high long-term value given strong export prices, but requires significant patience through a long establishment period before meaningful returns.",
    "marketDemand": "Strong and growing global export demand, particularly for high-quality, well-processed nut-in-shell.",
    "faqs": [
      {
        "q": "Why choose grafted macadamia trees over seedlings?",
        "a": "Grafted trees reach productive maturity years earlier than seedling trees and produce more uniform, higher-quality nuts true to the parent variety."
      }
    ],
    "relatedCrops": [
      "avocado",
      "coffee"
    ]
  }
];

export const CATEGORIES = [...new Set(CROPS.map((c) => c.category))].sort();

export function getAllCrops() {
  return CROPS;
}

export function getCropBySlug(slug) {
  return CROPS.find((c) => c.slug === slug) || null;
}

export function getCropsByCategory(category) {
  if (!category || category === "all") return CROPS;
  return CROPS.filter((c) => c.category === category);
}

export function searchCrops(query) {
  const q = (query || "").trim().toLowerCase();
  if (!q) return CROPS;
  return CROPS.filter(
    (c) =>
      c.name.toLowerCase().includes(q) ||
      c.category.toLowerCase().includes(q) ||
      c.overview.toLowerCase().includes(q)
  );
}

export function getRelatedCrops(slug) {
  const crop = getCropBySlug(slug);
  if (!crop || !crop.relatedCrops) return [];
  return crop.relatedCrops.map((s) => getCropBySlug(s)).filter(Boolean);
}

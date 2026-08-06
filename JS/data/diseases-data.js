/* =========================================================
   AgriSense — Disease Database (ES6 Module)
   14 diseases with symptoms, diagnosis, treatment
   and prevention. Separate from the Pest library per the
   platform's information architecture.
========================================================= */

export const DISEASES = [
  {
    "slug": "late-blight",
    "name": "Late Blight",
    "category": "Fungal",
    "image": "https://upload.wikimedia.org/wikipedia/commons/6/6a/Late_blight.jpg",
    "affectedCrops": [
      "Potatoes",
      "Tomatoes"
    ],
    "symptoms": [
      "Dark, water-soaked lesions on leaves that quickly turn brown/black",
      "White fungal growth on the underside of leaves in humid conditions",
      "Rapid collapse and rotting of foliage",
      "Brown rot on tubers with a granular, dry texture"
    ],
    "causes": "Caused by the oomycete Phytophthora infestans, which thrives in cool, wet, humid conditions and spreads rapidly via wind-blown spores.",
    "diagnosis": "Distinctive water-soaked leaf lesions that expand quickly, combined with white sporulation on leaf undersides during humid mornings, are the key diagnostic signs.",
    "treatment": "Apply a protectant fungicide preventively before disease onset, switching to a curative product at the first sign of infection; remove and destroy infected plant material.",
    "organicTreatment": "Copper-based fungicides applied preventively; ensure good field drainage and airflow; avoid overhead irrigation in the evening.",
    "chemicalTreatment": "Protectant fungicides (e.g. mancozeb-based products) applied on a preventive schedule during high-risk weather; systemic fungicides for curative action once infection is detected — always follow label rates and pre-harvest intervals.",
    "prevention": [
      "Use certified, disease-free seed/seedlings",
      "Practice 2-3 year crop rotation away from Solanaceae crops",
      "Ensure good field drainage and plant spacing for airflow",
      "Monitor weather forecasts — late blight risk spikes during cool, wet spells"
    ],
    "riskLevel": "High",
    "recovery": "Once tubers or fruit are affected, they cannot be saved — focus shifts to protecting the remaining healthy crop and preventing spread to neighboring fields.",
    "relatedDiseases": [
      "early-blight",
      "bacterial-wilt"
    ]
  },
  {
    "slug": "early-blight",
    "name": "Early Blight",
    "category": "Fungal",
    "image": "https://upload.wikimedia.org/wikipedia/commons/3/3a/Early_blight_of_potato.jpg",
    "affectedCrops": [
      "Tomatoes",
      "Potatoes"
    ],
    "symptoms": [
      "Dark brown spots with concentric rings (target-like pattern) on older leaves first",
      "Yellowing of leaf tissue around lesions",
      "Premature leaf drop starting from the lower canopy",
      "Sunken, dark lesions on fruit near the stem end"
    ],
    "causes": "Caused by the fungus Alternaria solani, favored by warm temperatures and alternating wet/dry conditions, and often worsened by plant stress or nutrient deficiency.",
    "diagnosis": "The concentric 'target-spot' ring pattern on lesions, starting on older/lower leaves, distinguishes early blight from most other leaf diseases.",
    "treatment": "Remove and destroy affected lower leaves promptly; apply fungicide at first sign of disease and continue on a protective schedule through the season.",
    "organicTreatment": "Copper-based or biological fungicides; maintain plant vigor through balanced fertilization since stressed plants are more susceptible.",
    "chemicalTreatment": "Chlorothalonil or mancozeb-based protectant fungicides applied on a 7-14 day schedule during high-risk periods, rotating modes of action to prevent resistance.",
    "prevention": [
      "Stake or trellis plants to improve airflow and reduce leaf wetness",
      "Mulch to prevent soil splash onto lower leaves",
      "Rotate crops away from Solanaceae for 2+ seasons",
      "Avoid overhead irrigation; water at the base"
    ],
    "riskLevel": "Moderate",
    "recovery": "Plants generally survive early blight if managed promptly, though yield and fruit quality can be reduced if infection progresses unchecked.",
    "relatedDiseases": [
      "late-blight"
    ]
  },
  {
    "slug": "maize-lethal-necrosis",
    "name": "Maize Lethal Necrosis (MLN)",
    "category": "Viral",
    "image": "https://upload.wikimedia.org/wikipedia/commons/6/6e/Maize_field.jpg",
    "affectedCrops": [
      "Maize"
    ],
    "symptoms": [
      "Chlorotic mottling (yellow streaking) starting from the leaf base",
      "Severe stunting of affected plants",
      "Premature plant death in severe cases",
      "Poor or no cob/grain formation"
    ],
    "causes": "Caused by a synergistic co-infection of Maize Chlorotic Mottle Virus (MCMV) and a cereal potyvirus, typically transmitted by insect vectors like thrips and aphids, and through contaminated seed.",
    "diagnosis": "Characteristic yellow leaf mottling combined with severe stunting, confirmed definitively through laboratory virus testing where available.",
    "treatment": "There is no curative treatment for viral infection — management focuses entirely on prevention and controlling insect vectors to limit spread.",
    "organicTreatment": "Remove and destroy infected plants promptly to reduce virus reservoirs; encourage natural predators of aphids and thrips.",
    "chemicalTreatment": "Insecticide application to control vector populations (thrips, aphids) can reduce transmission, though this does not cure already-infected plants.",
    "prevention": [
      "Use certified, virus-tested seed",
      "Rogue and destroy infected plants immediately upon detection",
      "Control alternate host weeds near maize fields",
      "Avoid planting maize continuously in the same field without rotation"
    ],
    "riskLevel": "High",
    "recovery": "Infected plants do not recover; the focus is on removing them to protect the remaining healthy crop and prevent regional spread.",
    "relatedDiseases": [
      "maize-streak-virus"
    ]
  },
  {
    "slug": "maize-streak-virus",
    "name": "Maize Streak Virus",
    "category": "Viral",
    "image": "https://upload.wikimedia.org/wikipedia/commons/e/e13/Maize_leaves.jpg",
    "affectedCrops": [
      "Maize",
      "Sorghum"
    ],
    "symptoms": [
      "Narrow, broken yellow-white streaks running parallel to leaf veins",
      "Stunted growth, especially when infected at a young age",
      "Reduced cob size and grain fill"
    ],
    "causes": "Caused by Maize Streak Virus, transmitted by leafhoppers, with early-season infection causing the most severe yield loss.",
    "diagnosis": "The distinctive parallel streak pattern along leaf veins is highly characteristic and usually sufficient for field diagnosis.",
    "treatment": "No curative treatment exists — management relies on resistant varieties and vector control.",
    "organicTreatment": "Encourage natural leafhopper predators; remove volunteer maize and grass weeds that host the virus between seasons.",
    "chemicalTreatment": "Early-season insecticide seed treatment or foliar spray can reduce leafhopper transmission during the vulnerable seedling stage.",
    "prevention": [
      "Plant streak-tolerant/resistant maize varieties",
      "Plant early and uniformly to reduce the window of vulnerability",
      "Control grassy weeds around fields that host the virus and its vector"
    ],
    "riskLevel": "Moderate",
    "recovery": "Plants infected early rarely recover fully; later infections cause comparatively less yield impact.",
    "relatedDiseases": [
      "maize-lethal-necrosis"
    ]
  },
  {
    "slug": "coffee-berry-disease",
    "name": "Coffee Berry Disease (CBD)",
    "category": "Fungal",
    "image": "https://upload.wikimedia.org/wikipedia/commons/7/7e/Coffee_berries.jpg",
    "affectedCrops": [
      "Coffee"
    ],
    "symptoms": [
      "Dark, sunken lesions on green berries",
      "Premature berry drop",
      "Mummified, blackened berries remaining on the tree",
      "Lesions can also appear on young shoots and leaves"
    ],
    "causes": "Caused by the fungus Colletotrichum kahawae, favored by cool, wet conditions during berry development, particularly at higher altitudes.",
    "diagnosis": "Sunken dark lesions on young green berries, often appearing suddenly after rainy periods, are the primary diagnostic sign.",
    "treatment": "Remove and destroy infected and mummified berries; apply fungicide sprays timed to protect berries during the vulnerable green-berry stage.",
    "organicTreatment": "Copper-based fungicide sprays; strict orchard sanitation removing fallen and mummified berries each season.",
    "chemicalTreatment": "Protectant fungicides applied preventively before and during the rainy season when berries are most vulnerable, following recommended spray intervals.",
    "prevention": [
      "Plant CBD-resistant varieties (e.g. Ruiru 11, Batian) in high-risk zones",
      "Prune to improve airflow and reduce humidity within the canopy",
      "Time fungicide sprays to coincide with the vulnerable green-berry stage"
    ],
    "riskLevel": "High",
    "recovery": "Infected berries cannot be saved, but healthy remaining berries can be protected with prompt fungicide intervention.",
    "relatedDiseases": [
      "coffee-leaf-rust"
    ]
  },
  {
    "slug": "coffee-leaf-rust",
    "name": "Coffee Leaf Rust",
    "category": "Fungal",
    "image": "https://upload.wikimedia.org/wikipedia/commons/1/17/Coffee_leaf_rust.jpg",
    "affectedCrops": [
      "Coffee"
    ],
    "symptoms": [
      "Orange-yellow powdery spots on the underside of leaves",
      "Yellowing and premature leaf drop",
      "Reduced photosynthetic capacity leading to lower yield and dieback in severe cases"
    ],
    "causes": "Caused by the fungus Hemileia vastatrix, spread by wind-borne spores and favored by moderate temperatures and high humidity.",
    "diagnosis": "The orange-yellow powdery pustules on leaf undersides are highly distinctive and easily confirmed by rubbing a finger across the spot.",
    "treatment": "Apply copper-based or systemic fungicide at the first sign of infection; improve tree nutrition to support recovery.",
    "organicTreatment": "Copper-based fungicide sprays; ensure balanced soil fertility since well-nourished trees show more tolerance.",
    "chemicalTreatment": "Systemic and protectant fungicide combinations applied on a preventive schedule in high-risk, humid zones.",
    "prevention": [
      "Plant rust-resistant varieties (e.g. Ruiru 11, Batian)",
      "Maintain adequate shade and spacing to reduce humidity build-up",
      "Ensure balanced fertilization, as nutrient-stressed trees are more susceptible"
    ],
    "riskLevel": "Moderate",
    "recovery": "Trees generally recover with prompt fungicide treatment and improved nutrition, though repeated severe infections can weaken trees over several seasons.",
    "relatedDiseases": [
      "coffee-berry-disease"
    ]
  },
  {
    "slug": "banana-bacterial-wilt",
    "name": "Banana Bacterial Wilt (BXW)",
    "category": "Bacterial",
    "image": "https://upload.wikimedia.org/wikipedia/commons/8/8a/Bananas_white_background.jpg",
    "affectedCrops": [
      "Banana"
    ],
    "symptoms": [
      "Yellowing and wilting of leaves starting from the youngest",
      "Premature ripening and yellowing of fruit",
      "Brown-black discoloration of internal tissue when the stem is cut",
      "Oozing of bacterial liquid from cut plant parts"
    ],
    "causes": "Caused by the bacterium Xanthomonas campestris pv. musacearum, spread through contaminated tools, infected planting material, and insects visiting the male flower.",
    "diagnosis": "Cutting a suspect stem reveals characteristic brown-black vascular discoloration and often bacterial ooze — a reliable field diagnostic test.",
    "treatment": "There is no cure — infected plants must be completely uprooted and destroyed to prevent further spread within the plantation.",
    "organicTreatment": "No organic chemical treatment exists; management is entirely through sanitation — tool disinfection and prompt removal of infected plants.",
    "chemicalTreatment": "No effective chemical treatment exists for bacterial wilt; antibiotics are not practical or approved for field crop use.",
    "prevention": [
      "Disinfect tools (e.g. with bleach solution) between plants when pruning or harvesting",
      "Remove the male flower bud after the last hand of fruit forms, to prevent insect-borne transmission",
      "Use only clean, certified planting material",
      "Uproot and destroy infected plants immediately, including the corm"
    ],
    "riskLevel": "High",
    "recovery": "No recovery is possible once a plant is infected — the entire mat is typically destroyed to protect the surrounding plantation.",
    "relatedDiseases": [
      "bacterial-wilt"
    ]
  },
  {
    "slug": "bacterial-wilt",
    "name": "Bacterial Wilt",
    "category": "Bacterial",
    "image": "https://upload.wikimedia.org/wikipedia/commons/1/12/Tomato_plants.jpg",
    "affectedCrops": [
      "Tomatoes",
      "Potatoes",
      "Capsicum"
    ],
    "symptoms": [
      "Sudden wilting of the whole plant despite adequate soil moisture",
      "Wilting often starts with younger leaves during the heat of the day, recovering at night in early stages",
      "Brown discoloration of vascular tissue visible when the stem is cut",
      "Milky bacterial ooze from a cut stem placed in water"
    ],
    "causes": "Caused by the soil-borne bacterium Ralstonia solanacearum, which survives in soil and water for years and enters through root wounds.",
    "diagnosis": "The 'stem-in-water' test — a cut stem placed in a glass of water releasing a milky bacterial stream — is a reliable field diagnostic.",
    "treatment": "No effective cure exists once a plant is infected — remove and destroy affected plants to reduce the soil-borne bacterial load.",
    "organicTreatment": "Soil solarization (covering moist soil with clear plastic to heat-sterilize it) can reduce bacterial populations between seasons.",
    "chemicalTreatment": "No reliable chemical cure exists for field use; copper-based products offer limited suppression at best.",
    "prevention": [
      "Practice long crop rotation (4+ years) away from Solanaceae crops in infected fields",
      "Use resistant or grafted rootstock varieties where available",
      "Avoid working in fields when soil is wet to reduce root damage and bacterial spread",
      "Improve field drainage, as the bacterium thrives in waterlogged soil"
    ],
    "riskLevel": "High",
    "recovery": "Infected plants do not recover; management focuses on preventing spread to unaffected areas of the field.",
    "relatedDiseases": [
      "late-blight",
      "banana-bacterial-wilt"
    ]
  },
  {
    "slug": "powdery-mildew",
    "name": "Powdery Mildew",
    "category": "Fungal",
    "image": "https://upload.wikimedia.org/wikipedia/commons/6/60/Powdery_mildew_on_leaf.jpg",
    "affectedCrops": [
      "Cucumber",
      "Watermelon",
      "Beans",
      "Capsicum"
    ],
    "symptoms": [
      "White, powdery fungal growth on leaf surfaces and stems",
      "Yellowing and curling of affected leaves",
      "Stunted growth and reduced fruit quality in severe infections"
    ],
    "causes": "Caused by various related fungal species, favored by warm days, cool nights, and high humidity without leaf wetness — often worse in poorly ventilated plantings.",
    "diagnosis": "The white, dusty powder coating on leaf surfaces is highly distinctive and rarely confused with other diseases.",
    "treatment": "Apply sulfur-based or systemic fungicide at first sign of infection; remove heavily infected leaves to reduce spore load.",
    "organicTreatment": "Sulfur-based sprays or a diluted milk/water spray solution (a widely used home-garden remedy); neem oil also offers some suppression.",
    "chemicalTreatment": "Systemic fungicides (e.g. triazole-based products) are effective for established infections; rotate modes of action to prevent resistance buildup.",
    "prevention": [
      "Ensure adequate plant spacing for airflow",
      "Avoid excessive nitrogen fertilization, which promotes susceptible soft growth",
      "Plant resistant varieties where available",
      "Water at the base rather than overhead to keep foliage dry"
    ],
    "riskLevel": "Low",
    "recovery": "Plants generally recover well with prompt treatment, though severe, prolonged infections can reduce overall yield.",
    "relatedDiseases": [
      "downy-mildew"
    ]
  },
  {
    "slug": "downy-mildew",
    "name": "Downy Mildew",
    "category": "Fungal",
    "image": "https://upload.wikimedia.org/wikipedia/commons/9/94/Downy_mildew_leaf.jpg",
    "affectedCrops": [
      "Onions",
      "Cucumber",
      "Cabbage"
    ],
    "symptoms": [
      "Pale yellow patches on the upper leaf surface",
      "Grey-purple fuzzy growth on the corresponding leaf underside",
      "Leaf curling, browning, and premature death in severe cases"
    ],
    "causes": "Caused by oomycete pathogens favored by cool, moist, humid conditions, especially prolonged leaf wetness overnight.",
    "diagnosis": "The pairing of yellow patches on top with fuzzy grey-purple growth directly beneath on the leaf underside is the key diagnostic sign.",
    "treatment": "Apply a protectant fungicide at the first sign of disease; improve field drainage and airflow to reduce leaf wetness duration.",
    "organicTreatment": "Copper-based fungicides applied preventively; avoid overhead irrigation, particularly in the evening.",
    "chemicalTreatment": "Protectant fungicides applied on a preventive schedule during cool, humid weather; systemic products for curative action on established infections.",
    "prevention": [
      "Rotate crops away from susceptible families for at least 2 seasons",
      "Space plants adequately for airflow",
      "Avoid working in wet fields, which can spread spores",
      "Remove and destroy crop debris after harvest"
    ],
    "riskLevel": "Moderate",
    "recovery": "Plants can recover with prompt treatment, though yield and quality losses often persist from the period of active infection.",
    "relatedDiseases": [
      "powdery-mildew"
    ]
  },
  {
    "slug": "fusarium-wilt",
    "name": "Fusarium Wilt",
    "category": "Fungal",
    "image": "https://upload.wikimedia.org/wikipedia/commons/d/de/Wilting_tomato_plant.jpg",
    "affectedCrops": [
      "Tomatoes",
      "Banana",
      "Passion Fruit",
      "Sweet Potatoes"
    ],
    "symptoms": [
      "Yellowing and wilting of lower leaves first, progressing upward",
      "One-sided wilting or yellowing is common in early stages",
      "Brown discoloration of vascular tissue when the stem is cut lengthwise",
      "Stunted growth and eventual plant death"
    ],
    "causes": "Caused by soil-borne Fusarium fungi that enter through the roots and block the plant's water-conducting tissue; the pathogen can persist in soil for many years.",
    "diagnosis": "One-sided yellowing/wilting combined with brown vascular discoloration when the stem is cut lengthwise is the standard diagnostic combination.",
    "treatment": "No curative treatment exists once vascular infection is established — remove and destroy infected plants to limit further soil contamination.",
    "organicTreatment": "Soil solarization between seasons; incorporating well-composted organic matter can support beneficial soil microbes that suppress Fusarium.",
    "chemicalTreatment": "No reliable curative chemical treatment exists for field use; some seed/seedling treatments offer limited early protection.",
    "prevention": [
      "Use resistant varieties or grafted rootstock where available (especially important for banana and passion fruit)",
      "Practice long crop rotation in infected fields",
      "Avoid moving soil or planting material from infected fields to clean ones",
      "Improve field drainage, as wet conditions worsen disease severity"
    ],
    "riskLevel": "High",
    "recovery": "Infected plants typically do not recover; the priority is preventing the pathogen from spreading to unaffected soil.",
    "relatedDiseases": [
      "bacterial-wilt"
    ]
  },
  {
    "slug": "anthracnose",
    "name": "Anthracnose",
    "category": "Fungal",
    "image": "https://upload.wikimedia.org/wikipedia/commons/6/6a/Anthracnose_on_leaf.jpg",
    "affectedCrops": [
      "Beans",
      "Mango",
      "Watermelon",
      "Sorghum"
    ],
    "symptoms": [
      "Dark, sunken lesions on fruit, pods, stems or leaves",
      "Lesions often develop a pinkish spore mass in humid conditions",
      "Premature fruit drop and reduced marketable yield"
    ],
    "causes": "Caused by Colletotrichum fungal species, favored by warm, wet, humid conditions, and often spread through infected seed or crop debris.",
    "diagnosis": "Dark, sunken lesions with a characteristic pink or salmon-colored spore mass under humid conditions are the primary diagnostic feature.",
    "treatment": "Remove and destroy infected plant parts; apply fungicide at first sign of disease, particularly during fruit development.",
    "organicTreatment": "Copper-based fungicide sprays; ensure good field sanitation by removing infected debris after harvest.",
    "chemicalTreatment": "Protectant fungicides applied preventively during warm, humid conditions when disease pressure is highest.",
    "prevention": [
      "Use certified, disease-free seed",
      "Rotate crops away from susceptible species for 2+ seasons",
      "Avoid overhead irrigation which spreads spores via splashing water",
      "Prune for airflow in tree and vine crops"
    ],
    "riskLevel": "Moderate",
    "recovery": "Plants generally recover with prompt management, though fruit already showing lesions is typically unmarketable.",
    "relatedDiseases": [
      "coffee-berry-disease"
    ]
  },
  {
    "slug": "rice-blast",
    "name": "Rice Blast",
    "category": "Fungal",
    "image": "https://upload.wikimedia.org/wikipedia/commons/7/70/Rice_blast_lesions.jpg",
    "affectedCrops": [
      "Rice"
    ],
    "symptoms": [
      "Diamond or spindle-shaped grey-centered lesions on leaves",
      "Neck rot causing the panicle to break and fail to fill with grain",
      "Lesions on nodes causing stem breakage"
    ],
    "causes": "Caused by the fungus Magnaporthe oryzae, favored by high humidity, dense planting, and excessive nitrogen fertilization.",
    "diagnosis": "The distinctive diamond-shaped lesions with grey centers and brown margins on leaves are the primary diagnostic sign, along with neck rot at the panicle base.",
    "treatment": "Apply fungicide at first sign of leaf lesions, and again at booting stage if disease pressure is high, to protect the developing panicle.",
    "organicTreatment": "Avoid excess nitrogen application, which increases susceptibility; maintain balanced water management rather than continuous flooding stress.",
    "chemicalTreatment": "Systemic fungicides applied at tillering and again at booting stage in high-risk fields provide the most effective protection.",
    "prevention": [
      "Plant blast-resistant rice varieties where available",
      "Avoid excessive nitrogen fertilization",
      "Maintain proper plant spacing to reduce humidity within the canopy",
      "Practice field sanitation, removing infected straw after harvest"
    ],
    "riskLevel": "High",
    "recovery": "Leaf infections can be managed with prompt fungicide use; neck blast affecting the panicle causes irreversible yield loss for that season.",
    "relatedDiseases": []
  },
  {
    "slug": "clubroot",
    "name": "Clubroot",
    "category": "Fungal",
    "image": "https://upload.wikimedia.org/wikipedia/commons/2/29/Clubroot_symptoms.jpg",
    "affectedCrops": [
      "Cabbage",
      "Kale"
    ],
    "symptoms": [
      "Wilting during the heat of the day, especially in young plants",
      "Stunted, yellowing growth above ground",
      "Swollen, distorted, club-shaped roots when plants are uprooted"
    ],
    "causes": "Caused by the soil-borne organism Plasmodiophora brassicae, which can persist in soil for many years and is spread via contaminated soil, tools, or transplants.",
    "diagnosis": "Uprooting a wilting or stunted plant to reveal characteristic swollen, club-shaped root galls is the definitive diagnostic sign.",
    "treatment": "No curative treatment exists for infected plants — remove and destroy affected plants and avoid replanting brassicas in the same soil for several years.",
    "organicTreatment": "Raising soil pH with lime can suppress the pathogen, as clubroot is less severe in less acidic soils.",
    "chemicalTreatment": "No reliable curative chemical treatment exists in smallholder field conditions; soil fumigation is used in some intensive commercial operations.",
    "prevention": [
      "Practice long rotation (5+ years) away from brassica crops in infected fields",
      "Raise soil pH toward neutral through liming",
      "Use clean transplants from disease-free nurseries",
      "Improve field drainage, as wet soils favor the pathogen"
    ],
    "riskLevel": "High",
    "recovery": "No recovery is possible for infected plants; the pathogen persists in soil, so prevention and long rotation are the only real long-term management options.",
    "relatedDiseases": []
  }
];

export const DISEASE_CATEGORIES = [...new Set(DISEASES.map((d) => d.category))].sort();

export function getAllDiseases() { return DISEASES; }
export function getDiseaseBySlug(slug) { return DISEASES.find((d) => d.slug === slug) || null; }
export function getDiseasesByCategory(category) {
  if (!category || category === "all") return DISEASES;
  return DISEASES.filter((d) => d.category === category);
}
export function searchDiseases(query) {
  const q = (query || "").trim().toLowerCase();
  if (!q) return DISEASES;
  return DISEASES.filter(
    (d) => d.name.toLowerCase().includes(q) || d.affectedCrops.join(" ").toLowerCase().includes(q)
  );
}
export function getRelatedDiseases(slug) {
  const disease = getDiseaseBySlug(slug);
  if (!disease || !disease.relatedDiseases) return [];
  return disease.relatedDiseases.map((s) => getDiseaseBySlug(s)).filter(Boolean);
}

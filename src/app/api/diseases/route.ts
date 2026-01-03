import { NextResponse } from "next/server";
import path from "path";
import fs from "fs/promises";

// Force dynamic to ensures we always read one the latest data on request
export const dynamic = 'force-dynamic';

// Helper to read data fresh from disk
async function getConditions() {
  try {
    const filePath = path.join(process.cwd(), "src", "data", "conditions.json");
    const data = await fs.readFile(filePath, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Failed to load conditions.json:", error);
    return [];
  }
}

/* -----------------------------
   FALLBACK: DISEASE CARDS
-------------------------------- */
const FALLBACK_DISEASES = [
  {
    id: "diabetes-type-2",
    name: "Diabetes Type 2",
    icon: "🩺",
    category: "Metabolic",
    prevalence: "8.5%",
    description: "A chronic condition affecting how your body processes blood sugar (glucose).",
    symptoms: ["Increased thirst", "Frequent urination", "Hunger", "Fatigue", "Blurred vision"],
    treatments: ["Metformin", "Insulin therapy", "Lifestyle changes", "Diet management"],
    specialists: ["Endocrinologist", "Diabetologist"],
    riskFactors: ["Obesity", "Sedentary lifestyle", "Family history", "Age over 45"]
  },
  {
    id: "hypertension",
    name: "Hypertension",
    icon: "❤️",
    category: "Cardiovascular",
    prevalence: "31%",
    description: "High blood pressure is a common condition affecting the body's arteries.",
    symptoms: ["Headaches", "Shortness of breath", "Nosebleeds", "Dizziness"],
    treatments: ["ACE inhibitors", "Beta blockers", "Diuretics", "Lifestyle modifications"],
    specialists: ["Cardiologist", "General Physician"],
    riskFactors: ["High salt intake", "Stress", "Obesity", "Lack of exercise"]
  },
  {
    id: "asthma",
    name: "Asthma",
    icon: "🫁",
    category: "Respiratory",
    prevalence: "6.5%",
    description: "A condition in which airways narrow and swell, producing extra mucus.",
    symptoms: ["Wheezing", "Shortness of breath", "Chest tightness", "Coughing"],
    treatments: ["Inhalers", "Bronchodilators", "Corticosteroids", "Allergy medications"],
    specialists: ["Pulmonologist", "Allergist"],
    riskFactors: ["Allergies", "Family history", "Smoking exposure", "Air pollution"]
  },
  {
    id: "migraine",
    name: "Migraine",
    icon: "🧠",
    category: "Neurological",
    prevalence: "15%",
    description: "A neurological disorder characterized by recurrent headaches.",
    symptoms: ["Severe headache", "Nausea", "Light sensitivity", "Aura"],
    treatments: ["Triptans", "Pain relievers", "Anti-nausea drugs", "Preventive medications"],
    specialists: ["Neurologist", "Headache specialist"],
    riskFactors: ["Stress", "Hormonal changes", "Certain foods", "Sleep changes"]
  },
  {
    id: "arthritis",
    name: "Arthritis",
    icon: "🦴",
    category: "Musculoskeletal",
    prevalence: "22%",
    description: "Inflammation of one or more joints causing pain and stiffness.",
    symptoms: ["Joint pain", "Stiffness", "Swelling", "Reduced mobility"],
    treatments: ["NSAIDs", "Physical therapy", "Corticosteroids", "DMARDs"],
    specialists: ["Rheumatologist", "Orthopedist"],
    riskFactors: ["Age", "Family history", "Obesity", "Joint injuries"]
  },
  {
    id: "depression",
    name: "Depression",
    icon: "😔",
    category: "Mental Health",
    prevalence: "7%",
    description: "A mental health disorder causing persistent sadness and loss of interest.",
    symptoms: ["Persistent sadness", "Loss of interest", "Fatigue", "Sleep changes"],
    treatments: ["Antidepressants", "Psychotherapy", "CBT", "Lifestyle changes"],
    specialists: ["Psychiatrist", "Psychologist"],
    riskFactors: ["Trauma", "Chronic stress", "Family history", "Substance abuse"]
  }
];

/* -----------------------------
   FALLBACK: CONDITIONS A–Z
-------------------------------- */
const FALLBACK_CONDITIONS_AZ = [
  { letter: "A", conditions: ["Asthma", "Anemia", "Arthritis"] },
  { letter: "B", conditions: ["Bronchitis", "Back pain"] },
  { letter: "C", conditions: ["COVID-19", "Cancer", "Common cold"] },
  { letter: "D", conditions: ["Depression", "Diabetes"] },
  { letter: "H", conditions: ["Hypertension", "Heart disease"] },
];

/* -----------------------------
   HELPERS & ICONS
-------------------------------- */
const ICONS = ["🩺", "❤️", "🫁", "🧠", "🦴", "😔", "🔬", "🦠"];
const CATEGORIES = ["General Health", "Chronic", "Infection", "Genetic", "Lifestyle"];

/* -----------------------------
   HANDLER
-------------------------------- */
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const type = searchParams.get("type"); // diseases | conditions | null
  const query = searchParams.get("query")?.toLowerCase().trim() || "";

  // Load fresh data
  const scrapedConditions = await getConditions();
  const hasLocalData = scrapedConditions && scrapedConditions.length > 0;

  console.log(`[API/Diseases] Query: "${query}", Local Data: ${hasLocalData}, Items: ${scrapedConditions.length}`);

  let conditionsList = [];
  let diseasesCards = [];

  if (hasLocalData) {
    // 0. Filter Source Data (Keyword Search)
    let filtered = scrapedConditions;
    if (query) {
      const keywords = query.split(/\s+/).filter(Boolean);
      filtered = scrapedConditions.filter((item: any) => {
        const text = `${item.name} ${item.description || ""}`.toLowerCase();
        return keywords.every((keyword: string) => text.includes(keyword));
      });
    }

    // 1. Prepare Conditions List (limit to 50 for search performance)
    conditionsList = filtered.slice(0, 50).map((item: any) => ({
      name: item.name,
      description: item.description,
      url: item.url
    }));

    // 2. Prepare Disease Cards
    // If searching, show up to 20 results as cards
    // If not searching, show featured 9 items
    const limit = query ? 20 : 9;
    diseasesCards = filtered.slice(0, limit).map((item: any, i: number) => ({
      id: item.id || `fallback-id-${i}`,
      name: item.name || "Unknown Condition",
      icon: ICONS[i % ICONS.length],
      category: CATEGORIES[i % CATEGORIES.length],
      prevalence: "Varies",
      description: item.description || "No description available.",
      symptoms: (Array.isArray(item.symptoms) && item.symptoms.length > 0) ? item.symptoms : ["See details"],
      treatments: (Array.isArray(item.treatments) && item.treatments.length > 0) ? item.treatments : ["Consult a GP"],
      specialists: ["General Practitioner", "Specialist"],
      riskFactors: ["See details on NHS website"]
    }));
  } else {
    // Fallback
    conditionsList = FALLBACK_CONDITIONS_AZ.flatMap(g => g.conditions.map(c => ({ name: c, description: "Fallback data", url: "#" })));
    diseasesCards = FALLBACK_DISEASES;
  }

  /* ---- RESPONSES ---- */

  // Only conditions A–Z
  if (type === "conditions") {
    return NextResponse.json({
      source: hasLocalData ? "local-scraper" : "fallback",
      conditions: conditionsList
    });
  }

  // Only disease cards
  if (type === "diseases") {
    return NextResponse.json({
      source: hasLocalData ? "local-scraper" : "fallback",
      diseases: diseasesCards
    });
  }

  // Default → BOTH
  return NextResponse.json({
    source: hasLocalData ? "local-scraper" : "fallback",
    diseases: diseasesCards,
    conditions: conditionsList
  });
}

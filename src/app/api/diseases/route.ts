import { NextResponse } from "next/server";

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

function getRandomItem(arr: string[]): string {
  return arr[Math.floor(Math.random() * arr.length)];
}

/* -----------------------------
   HANDLER
-------------------------------- */
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const type = searchParams.get("type"); // diseases | conditions | null

  let nhsConditionsList: any[] = [];
  let nhsDiseasesCards: any[] = [];

  /* ---- Try NHS A–Z (optional) ---- */
  if (process.env.NHS_API_KEY) {
    try {
      console.log("[API] Attempting to fetch from NHS API...");
      // Official NHS Sandbox Endpoint: https://sandbox.api.service.nhs.uk/nhs-website-content/conditions-a-to-z
      const res = await fetch(
        "https://sandbox.api.service.nhs.uk/nhs-website-content/conditions-a-to-z",
        {
          headers: {
            accept: "application/json",
            apikey: process.env.NHS_API_KEY,
            "User-Agent": "QuantAI-HealthBot/1.0",
          },
          // Cache for a short time to improve performance/reduce rate limits
          next: { revalidate: 3600 }
        }
      );

      if (!res.ok) {
        console.warn(`[API] NHS API Failed: Status ${res.status} ${res.statusText}`);
        // Log body only if useful for debugging (careful with PII/size)
        const errorText = await res.text().catch(() => "No body");
        console.warn(`[API] Error Body: ${errorText.substring(0, 200)}`);
      } else {
        const raw = await res.json();
        console.log(`[API] Success. Received ${raw.hasPart?.length || 0} items.`);

        // 1. Raw list for A-Z
        nhsConditionsList =
          raw.hasPart?.map((item: any) => ({
            name: item.name,
            description: item.description ?? "",
            url: item.url ?? "",
          })) ?? [];

        // 2. Map to Disease Cards (Take first 9 for the grid)
        nhsDiseasesCards = nhsConditionsList.slice(0, 9).map((item, index) => ({
          id: `nhs-${index}`,
          name: item.name,
          icon: ICONS[index % ICONS.length], // consistent icon assignment
          category: CATEGORIES[index % CATEGORIES.length], // consistent category
          prevalence: "Varies", // API doesn't provide this
          description: item.description || "No description available from NHS.",
          // Provide generic lists so UI doesn't break or look empty
          symptoms: ["See NHS website for detailed symptoms", "Variable symptoms"],
          treatments: ["Consult a GP", "See NHS website for treatments"],
          specialists: ["General Practitioner", "Specialist"],
          riskFactors: ["See NHS website for risk factors"]
        }));
      }
    } catch (e) {
      console.error("[API] NHS Network/Parse Error:", e);
      // silently fall back
    }
  } else {
    console.warn("[API] NHS_API_KEY is missing in env. Skipping external fetch.");
  }

  /* ---- RESPONSES ---- */

  // Only conditions A–Z
  if (type === "conditions") {
    return NextResponse.json({
      source: nhsConditionsList.length ? "nhs" : "fallback",
      conditions: nhsConditionsList.length
        ? nhsConditionsList
        : FALLBACK_CONDITIONS_AZ,
    });
  }

  // Only disease cards
  if (type === "diseases") {
    // If API loaded successfully, use mapped API data. Otherwise fallback.
    const useApiData = nhsDiseasesCards.length > 0;

    return NextResponse.json({
      source: useApiData ? "nhs" : "fallback",
      diseases: useApiData ? nhsDiseasesCards : FALLBACK_DISEASES,
    });
  }

  // Default → BOTH
  return NextResponse.json({
    source: nhsConditionsList.length ? "mixed" : "fallback",
    diseases: nhsDiseasesCards.length > 0 ? nhsDiseasesCards : FALLBACK_DISEASES,
    conditions: nhsConditionsList.length
      ? nhsConditionsList
      : FALLBACK_CONDITIONS_AZ,
  });
}

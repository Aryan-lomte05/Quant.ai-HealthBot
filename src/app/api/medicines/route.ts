import { NextResponse } from "next/server";

/* -----------------------------
   FALLBACK: MEDICINE DATABASE
-------------------------------- */
const FALLBACK_MEDICINES = [
    {
        id: 1,
        name: "Paracetamol",
        genericName: "Acetaminophen",
        type: "Pain Reliever & Fever Reducer",
        category: "Analgesic",
        dosage: "500-1000mg every 4-6 hours",
        maxDaily: "4000mg/day",
        icon: "💊",
        price: "₹20-50",
        manufacturer: "Multiple",
        description: "Common over-the-counter medication for pain and fever relief.",
        uses: ["Headache", "Fever", "Muscle pain", "Toothache", "Cold symptoms"],
        sideEffects: ["Nausea", "Allergic reactions", "Liver damage (overdose)", "Stomach upset (rare)"],
        interactions: ["Alcohol (liver damage risk)", "Warfarin (bleeding risk)", "Isoniazid"],
        warnings: ["Do not exceed maximum dose", "Avoid with liver disease", "Check other medications for paracetamol"],
        storage: "Store at room temperature, away from moisture"
    },
    {
        id: 2,
        name: "Ibuprofen",
        genericName: "Ibuprofen",
        type: "NSAID - Anti-inflammatory",
        category: "NSAID",
        dosage: "200-400mg every 4-6 hours",
        maxDaily: "1200mg/day (OTC)",
        icon: "💉",
        price: "₹30-80",
        manufacturer: "Multiple",
        description: "Nonsteroidal anti-inflammatory drug for pain, fever, and inflammation.",
        uses: ["Arthritis", "Menstrual pain", "Headache", "Dental pain", "Fever"],
        sideEffects: ["Stomach upset", "Heartburn", "Nausea", "Ulcers", "Increased bleeding risk"],
        interactions: ["Aspirin", "Blood thinners", "ACE inhibitors", "Lithium", "Methotrexate"],
        warnings: ["Take with food", "Avoid with stomach ulcers", "Risk of heart attack/stroke"],
        storage: "Keep in original container, room temperature"
    },
    {
        id: 3,
        name: "Metformin",
        genericName: "Metformin HCl",
        type: "Type 2 Diabetes Medication",
        category: "Antidiabetic",
        dosage: "500-2000mg daily with meals",
        maxDaily: "2550mg/day",
        icon: "🧪",
        price: "₹50-150",
        manufacturer: "Various",
        description: "First-line medication for managing type 2 diabetes.",
        uses: ["Type 2 diabetes", "Prediabetes", "PCOS"],
        sideEffects: ["Diarrhea", "Nausea", "Stomach upset", "Vitamin B12 deficiency", "Lactic acidosis (rare)"],
        interactions: ["Alcohol", "Iodinated contrast dyes", "Carbonic anhydrase inhibitors"],
        warnings: ["Monitor kidney function", "Stop before surgery", "Risk of lactic acidosis"],
        storage: "Store at room temperature, protect from light"
    },
    {
        id: 4,
        name: "Amoxicillin",
        genericName: "Amoxicillin",
        type: "Antibiotic",
        category: "Penicillin",
        dosage: "250-500mg every 8 hours",
        maxDaily: "1500mg/day (varies)",
        icon: "💊",
        price: "₹40-120",
        manufacturer: "Multiple",
        description: "Common antibiotic for bacterial infections.",
        uses: ["Respiratory infections", "Ear infections", "Urinary tract infections", "Dental infections"],
        sideEffects: ["Diarrhea", "Nausea", "Rash", "Yeast infection", "Allergic reaction"],
        interactions: ["Oral contraceptives", "Probenecid", "Methotrexate"],
        warnings: ["Complete full course", "Allergic to penicillin", "May reduce contraceptive effectiveness"],
        storage: "Refrigerate liquid form, protect from light"
    },
    {
        id: 5,
        name: "Omeprazole",
        genericName: "Omeprazole",
        type: "Proton Pump Inhibitor",
        category: "Gastric",
        dosage: "20-40mg once daily",
        maxDaily: "40mg/day",
        icon: "💊",
        price: "₹60-200",
        manufacturer: "Various",
        description: "Reduces stomach acid production for treating acid reflux and ulcers.",
        uses: ["GERD", "Peptic ulcers", "Heartburn", "Zollinger-Ellison syndrome"],
        sideEffects: ["Headache", "Nausea", "Diarrhea", "Stomach pain", "Vitamin B12 deficiency"],
        interactions: ["Clopidogrel", "Warfarin", "Diazepam", "Antifungals"],
        warnings: ["Take before meals", "Long-term use risks", "May mask stomach cancer"],
        storage: "Store in dry place, away from moisture"
    },
    {
        id: 6,
        name: "Losartan",
        genericName: "Losartan Potassium",
        type: "Blood Pressure Medication",
        category: "ARB",
        dosage: "25-100mg once daily",
        maxDaily: "100mg/day",
        icon: "💉",
        price: "₹80-250",
        manufacturer: "Multiple",
        description: "Angiotensin receptor blocker for treating high blood pressure.",
        uses: ["Hypertension", "Diabetic nephropathy", "Heart failure"],
        sideEffects: ["Dizziness", "Fatigue", "Low blood pressure", "Hyperkalemia"],
        interactions: ["Potassium supplements", "NSAIDs", "Lithium", "Diuretics"],
        warnings: ["Not for pregnancy", "Monitor kidney function", "Check potassium levels"],
        storage: "Store at room temperature, protect from moisture"
    }
];

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get("query")?.toLowerCase() || "";

    let nhsMedicines: any[] = [];
    let source = "fallback";

    /* ---- Try NHS API (optional) ---- */
    if (process.env.NHS_API_KEY) {
        try {
            // NOTE: Using general search 'health-a-to-z' as 'medicines-a-to-z' 
            // might be strict or paged differently. We filter results manually.
            console.log(`[API] Fetching medicines for query: "${query}"`);
            // Official NHS Sandbox Endpoint: https://sandbox.api.service.nhs.uk/nhs-website-content/medicines-a-to-z
            const res = await fetch(
                "https://sandbox.api.service.nhs.uk/nhs-website-content/medicines-a-to-z",
                {
                    headers: {
                        accept: "application/json",
                        apikey: process.env.NHS_API_KEY,
                        "User-Agent": "QuantAI-HealthBot/1.0",
                    },
                    next: { revalidate: 3600 }
                }
            );

            if (res.ok) {
                const raw = await res.json();

                // Filter results that match the query if it exists
                // Otherwise take a slice of general items
                let items = raw.hasPart || [];

                if (query) {
                    items = items.filter((item: any) =>
                        item.name.toLowerCase().includes(query) ||
                        (item.description && item.description.toLowerCase().includes(query))
                    );
                }

                if (items.length > 0) {
                    source = "nhs";
                    nhsMedicines = items.slice(0, 9).map((item: any, i: number) => ({
                        id: `nhs-med-${i}`,
                        name: item.name,
                        genericName: item.name, // API doesn't distinguish
                        category: "General Health",
                        type: "NHS Listed Item",
                        description: item.description || "See NHS website for details.",
                        icon: "💊",
                        // Fillers for fields API doesn't provide
                        dosage: "Refer to package/doctor",
                        uses: ["See NHS website"],
                        sideEffects: ["See NHS website"],
                        warnings: ["Consult a doctor before use"],
                        storage: "Keep away from children",
                        price: "varies",
                        maxDaily: "varies"
                    }));
                }
            } else {
                console.warn(`[API] NHS Medicine Search Failed: ${res.status}`);
            }
        } catch (e) {
            console.error("[API] NHS Medicine Search Error:", e);
        }
    }

    // Fallback Logic
    if (nhsMedicines.length === 0) {
        source = "fallback";
        // Filter local fallback data
        nhsMedicines = FALLBACK_MEDICINES.filter(m =>
            m.name.toLowerCase().includes(query) ||
            m.category.toLowerCase().includes(query) ||
            m.uses.some(u => u.toLowerCase().includes(query))
        );
    }

    return NextResponse.json({
        source,
        medicines: nhsMedicines
    });
}

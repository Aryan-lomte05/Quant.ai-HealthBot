import { NextResponse } from "next/server";
import path from "path";
import fs from "fs/promises";

// Force dynamic
export const dynamic = 'force-dynamic';

// Helper to read data fresh from disk
async function getMedicines() {
    try {
        const filePath = path.join(process.cwd(), "src", "data", "medicines.json");
        const data = await fs.readFile(filePath, "utf-8");
        return JSON.parse(data);
    } catch (error) {
        console.error("Failed to load medicines.json:", error);
        return [];
    }
}

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
    // ... (rest omitted for brevity, rely on file)
];

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get("query")?.toLowerCase().trim() || "";

    // Use local scraped data
    const scrapedMedicines = await getMedicines();
    const hasLocalData = scrapedMedicines && scrapedMedicines.length > 0;

    console.log(`[API/Medicines] Query: "${query}", Local Data: ${hasLocalData}, Items: ${scrapedMedicines.length}`);

    let medicines = [];
    let source = "fallback";

    if (hasLocalData) {
        source = "local-scraper";
        // 1. Filter based on query
        let filtered = scrapedMedicines;
        if (query) {
            const keywords = query.split(/\s+/).filter(Boolean);
            filtered = scrapedMedicines.filter((item: any) => {
                const text = `${item.name} ${item.description || ""} ${item.category || ""} ${item.uses?.join(" ") || ""}`.toLowerCase();
                return keywords.every((keyword: string) => text.includes(keyword));
            });
        }

        // 2. Map complexity to frontend
        // We take up to 20 items to avoid payload bloat
        medicines = filtered.slice(0, 20).map((item: any) => ({
            id: item.id,
            name: item.name,
            genericName: item.genericName || item.name,
            category: item.category || "General Health",
            type: item.type || "Medication",
            description: item.description,
            icon: item.icon || "💊",
            // Fallback for missing fields in scrape
            dosage: item.dosage || "Information not available. Consult a doctor or pharmacist.",
            uses: item.uses && item.uses.length > 0 ? item.uses : [item.description ? "See detailed description" : "See NHS website for details."],
            sideEffects: item.sideEffects && item.sideEffects.length > 0 ? item.sideEffects : ["Refer to packaging or official NHS website for details."],
            interactions: item.interactions && item.interactions.length > 0 ? item.interactions : ["Consult a doctor or pharmacist."],
            warnings: ["Keep out of reach of children"],
            storage: "Store in a cool, dry place",
            price: item.price || "N/A",
            maxDaily: "As prescribed",
            url: item.url // Pass URL for linking
        }));

    } else {
        source = "fallback";
        medicines = FALLBACK_MEDICINES.filter(m =>
            m.name.toLowerCase().includes(query) ||
            m.category.toLowerCase().includes(query) ||
            m.uses.some(u => u.toLowerCase().includes(query))
        );
    }

    return NextResponse.json({
        source,
        medicines
    });
}

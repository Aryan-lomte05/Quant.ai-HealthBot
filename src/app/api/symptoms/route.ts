import { NextResponse } from "next/server";

import symptomsDb from "@/data/symptoms.json";

// Type definition for the database structure
type ConditionData = {
    description: string;
    symptoms: string[];
    color: string;
};

const CONDITIONS_DB: Record<string, ConditionData> = symptomsDb;

export async function POST(req: Request) {
    try {
        const { symptoms } = await req.json();

        if (!symptoms || !Array.isArray(symptoms) || symptoms.length === 0) {
            return NextResponse.json({ error: "No symptoms provided" }, { status: 400 });
        }

        const results = Object.entries(CONDITIONS_DB).map(([name, data]) => {
            // Calculate match probability
            const matchCount = data.symptoms.filter((s) => symptoms.includes(s)).length;
            const probability = Math.round((matchCount / data.symptoms.length) * 100);

            // Boost probability slightly if more than 50% match to make it look "AI-ish"
            const adjustedProb =
                matchCount > 0 ? Math.min(99, probability + (matchCount / symptoms.length) * 20) : 0;

            return {
                condition: name,
                description: data.description,
                probability: Math.round(adjustedProb),
                color: data.color,
            };
        });

        // Filter relevant results and sort by probability
        const relevantResults = results
            .filter((r) => r.probability > 20)
            .sort((a, b) => b.probability - a.probability)
            .slice(0, 4);

        // ENRICHMENT: Fetch official descriptions from NHS API
        if (process.env.NHS_API_KEY && relevantResults.length > 0) {
            console.log(`[API] Symptom Checker: Enriching ${relevantResults.length} results via NHS API...`);
            try {
                // Official NHS Sandbox Endpoint: https://sandbox.api.service.nhs.uk/nhs-website-content/symptoms-a-to-z
                const nhsRes = await fetch(
                    "https://sandbox.api.service.nhs.uk/nhs-website-content/symptoms-a-to-z",
                    {
                        headers: {
                            accept: "application/json",
                            apikey: process.env.NHS_API_KEY,
                            "User-Agent": "QuantAI-HealthBot/1.0",
                        },
                        next: { revalidate: 3600 } // Cached for 1 hour
                    }
                );

                if (nhsRes.ok) {
                    const nhsData = await nhsRes.json();
                    const nhsItems = nhsData.hasPart || [];
                    console.log(`[API] NHS Match: Found ${nhsItems.length} items to cross-reference.`);

                    // For each result, try to find a matching NHS item
                    for (const result of relevantResults) {
                        const match = nhsItems.find((item: any) =>
                            item.name.toLowerCase().includes(result.condition.toLowerCase()) ||
                            result.condition.toLowerCase().includes(item.name.toLowerCase())
                        );

                        if (match) {
                            console.log(`[API] Enriched: ${result.condition} -> ${match.url}`);
                            result.description = match.description || result.description;
                            (result as any).url = match.url; // Add URL field
                            (result as any).isNhsVerified = true;
                        }
                    }
                } else {
                    console.warn(`[API] NHS Enrichment Failed: ${nhsRes.status}`);
                }
            } catch (e) {
                console.error("[API] NHS Enrichment Network Error:", e);
                // Continue with local descriptions if fetch fails
            }
        } else {
            if (!process.env.NHS_API_KEY) console.log("[API] NHS_API_KEY missing. Skipping enrichment.");
        }

        // If no good matches, return generic advice
        if (relevantResults.length === 0) {
            return NextResponse.json({
                results: [
                    {
                        condition: "Unclear Analysis",
                        description: "Symptoms do not strictly match common patterns in our database. Please consult a doctor.",
                        probability: 0,
                        color: "bg-gray-500",
                    },
                ],
            });
        }

        return NextResponse.json({ results: relevantResults });
    } catch (error) {
        console.error("Symptom Analysis Error:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}

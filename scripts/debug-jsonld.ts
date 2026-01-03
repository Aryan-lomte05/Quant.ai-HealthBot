
const jsonLd = {
    "@context": "http://schema.org",
    "@type": "MedicalWebPage",
    "description": "Find out how zolpidem treats sleeping problems (insomnia) and how to take it.",
    "hasPart": [
        {
            "@type": "HealthTopicContent",
            "description": "Zolpidem is a sleeping pill you can get on prescription. It’s used to treat sleeping problems (insomnia).",
            "hasHealthAspect": "http://schema.org/OverviewHealthAspect",
            "hasPart": [
                {
                    "@type": "WebPageElement",
                    "headline": "",
                    "text": "<p>Zolpidem is a sleeping pill that can be taken for short-term treatment of severe <a href=\"/conditions/insomnia/\">insomnia</a>.</p><p>It helps you fall asleep more quickly...</p>"
                }
            ],
            "headline": "",
            "url": "https://www.nhs.uk/medicines/zolpidem/about-zolpidem/#overview"
        },
        {
            "@type": "HealthTopicContent",
            "description": "Taking zolpidem with other medicines, herbal remedies, vitamins or supplements can cause problems. Check with a pharmacist or doctor.",
            "hasHealthAspect": "http://schema.org/InteractionsHealthAspect",
            "hasPart": [
                {
                    "@type": "WebPageElement",
                    "headline": "",
                    "text": "<p>Some medicines and zolpidem can affect each other...</p>"
                },
                {
                    "@type": "WebPageElement",
                    "headline": "Meds New IA (H2) - Cautions with other medicines alert",
                    "text": "<p>Tell your doctor or pharmacist if you're taking any other medicines...</p>"
                }
            ],
            "headline": "Cautions with other medicines",
            "url": "https://www.nhs.uk/medicines/zolpidem/taking-zolpidem-with-other-medicines-and-herbal-supplements/#interactions"
        }
    ]
};

function stripHtml(html: string): string {
    if (!html) return "";
    return html.replace(/<[^>]*>/g, " ")
        .replace(/\s+/g, " ")
        .replace(/&amp;/g, "&")
        .trim();
}

function process(data: any) {
    const result: any = {
        uses: [],
        interactions: []
    };

    const parts = data.hasPart || [];
    for (const part of parts) {
        const headline = (part.headline || "").toLowerCase();
        const aspect = (part.hasHealthAspect || "").toLowerCase();
        const partDesc = part.description || "";

        // Recursive text extractor
        const getText = (p: any): string => {
            if (p.hasPart) return p.hasPart.map((sub: any) => getText(sub)).join(" ");
            return p.text || "";
        };
        const rawText = getText(part);
        console.log(`[DEBUG] Aspect: ${aspect}, Headline: ${headline}`);

        // Uses
        if (aspect.includes('overview') || headline.includes('about') || headline.includes('what is')) {
            const txt = partDesc.length > rawText.length ? partDesc : rawText;
            const clean = stripHtml(txt);
            console.log(`[DEBUG] Found Uses candidate: ${clean.substring(0, 50)}...`);
            if (clean) result.uses.push(clean);
        }

        // Interactions
        if (aspect.includes('interactions') || headline.includes('taking') || headline.includes('medicines')) {
            const clean = stripHtml(rawText);
            console.log(`[DEBUG] Found Interactions candidate: ${clean.substring(0, 50)}...`);
            if (clean) result.interactions.push(clean);
        }
    }
    return result;
}

const outcome = process(jsonLd);
console.log("Outcome:", JSON.stringify(outcome, null, 2));

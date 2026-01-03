
import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';

// --- Configuration ---
const MEDICINES_URL = "https://www.nhs.uk/medicines/";
const CONDITIONS_URL = "https://www.nhs.uk/conditions/";
const CONCURRENCY_LIMIT = 5;
const MEDICINES_FILE = path.join(process.cwd(), "src", "data", "medicines.json");
const CONDITIONS_FILE = path.join(process.cwd(), "src", "data", "conditions.json");

// --- Helper Functions ---
function stripHtml(html: string): string {
    if (!html) return "";
    return html.replace(/<[^>]*>/g, " ")
        .replace(/\s+/g, " ")
        .replace(/&amp;/g, "&")
        .trim();
}

// --- Main Scraper Class ---
class DeepScraper {
    private browser: any;
    private existingMedicines: any[] = [];
    private existingConditions: any[] = [];

    constructor() {
        // Load existing data
        if (fs.existsSync(MEDICINES_FILE)) {
            try {
                this.existingMedicines = JSON.parse(fs.readFileSync(MEDICINES_FILE, 'utf-8'));
                console.log(`Loaded ${this.existingMedicines.length} existing medicines.`);
            } catch (e) {
                console.error("Error loading medicines file, starting fresh.");
            }
        }
        if (fs.existsSync(CONDITIONS_FILE)) {
            try {
                this.existingConditions = JSON.parse(fs.readFileSync(CONDITIONS_FILE, 'utf-8'));
                console.log(`Loaded ${this.existingConditions.length} existing conditions.`);
            } catch (e) {
                console.error("Error loading conditions file, starting fresh.");
            }
        }
    }

    async init() {
        this.browser = await puppeteer.launch({
            headless: true,
            args: ['--no-sandbox', '--disable-setuid-sandbox']
        });
        // Add UA to all pages
        const page = await this.browser.newPage();
        await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');
        await page.close();
    }

    async close() {
        if (this.browser) await this.browser.close();
    }

    constructUrl(name: string, type: 'medicine' | 'condition') {
        let slug = name.toLowerCase()
            .replace(/\s+/g, '-')
            .replace(/[()]/g, '')
            .replace(/&/g, 'and')
            .replace(/'/g, '')
            .replace(/--+/g, '-')
            .replace(/^-|-$/g, '');

        const base = type === 'medicine' ? 'https://www.nhs.uk/medicines/' : 'https://www.nhs.uk/conditions/';
        return `${base}${slug}/`;
    }

    async main() {
        await this.init();
        console.log("🚀 Starting Full Deep Scrape...");

        console.log(`Loaded ${this.existingMedicines.length} existing medicines.`);
        console.log(`Loaded ${this.existingConditions.length} existing conditions.`);

        // 1. Scrape Medicines (Skip Index Fetch)
        console.log("💊 Processing Medicines (Cached List)...");
        const medQueue = this.existingMedicines.map((m: any) => ({
            name: m.name,
            url: m.url || this.constructUrl(m.name, 'medicine')
        }));
        await this.processBatch(medQueue, 'medicine');
        console.log("✅ Medicines scrape complete.");

        // 2. Scrape Conditions (Skip Index Fetch)
        console.log("🩺 Processing Conditions (Cached List)...");
        const condQueue = this.existingConditions.map((c: any) => ({
            name: c.name,
            url: c.url || this.constructUrl(c.name, 'condition')
        }));
        await this.processBatch(condQueue, 'condition');
        console.log("✅ Conditions scrape complete.");

        await this.close();
        console.log("🎉 All Done!");
    }

    async getLinks(url: string) {
        const page = await this.browser.newPage();
        await page.setRequestInterception(true);
        page.on('request', (req: any) => {
            if (['image', 'stylesheet', 'font'].includes(req.resourceType())) req.abort();
            else req.continue();
        });

        try {
            await page.goto(url, { waitUntil: 'domcontentloaded' });
            return await page.evaluate(() => {
                const anchors = Array.from(document.querySelectorAll('.nhsuk-list.nhsuk-list--border li a'));
                return anchors.map((a: any) => ({
                    name: a.innerText.trim(),
                    url: a.href
                }));
            });
        } finally {
            await page.close();
        }
    }

    async processBatch(items: any[], type: 'medicine' | 'condition') {
        const queue = [...items];
        const total = queue.length;
        let processed = 0;

        // Loop to process
        while (queue.length > 0) {
            const batch = queue.splice(0, CONCURRENCY_LIMIT);

            const promises = batch.map(async (item) => {
                try {
                    // Check if we already have good data
                    // Logic: existing item has ID, Descr, and REAL data (not placeholder)?
                    // But to be safe, we scrape everything to fill gaps like 'Uses/Interactions'

                    const scrapedData = await this.scrapeDetail(item.url, type, item.name);

                    if (type === 'medicine') {
                        this.updateMedicine(item.name, item.url, scrapedData);
                    } else {
                        this.updateCondition(item.name, item.url, scrapedData);
                    }

                } catch (e) {
                    console.error(`Failed ${item.name}: ${e}`);
                }

                processed++;
                // Simple progress bar
                if (processed % 10 === 0 || processed === total) {
                    process.stdout.write(`\r[${type.toUpperCase()}] Progress: ${processed}/${total} (${Math.round(processed / total * 100)}%)`);
                }

                // Save less frequently to avoid EBUSY
                if (processed % 50 === 0 || processed === total) {
                    this.saveData();
                }
            });

            await Promise.all(promises);

            // Incremental Save (safer)
            // Removed per-batch save to avoid lock contention
        }
        console.log("");
    }

    updateMedicine(name: string, url: string, data: any) {
        let index = this.existingMedicines.findIndex((m: any) => m.name.toLowerCase() === name.toLowerCase());

        // Default structure
        const defaultItem = {
            id: `medicine-${this.existingMedicines.length + 1}`,
            name: name,
            url: url,
            description: data.description || `Official NHS information about ${name}.`,
            category: "General Health",
            icon: "💊",
            type: "Tablet",
            genericName: name,
            dosage: data.dosage || "Follow prescription instructions.",
            sideEffects: data.sideEffects || "Consult your GP.",
            uses: (data.uses && data.uses.length) ? data.uses : ["General Treatment"],
            interactions: (data.interactions && data.interactions.length) ? data.interactions : ["Consult GP"]
        };

        if (index !== -1) {
            // Merge
            const existing = this.existingMedicines[index];
            existing.url = url; // Ensure URL is saved

            if (data.description && data.description.length > 10) existing.description = data.description;
            if (data.dosage) existing.dosage = data.dosage;
            if (data.sideEffects) existing.sideEffects = data.sideEffects;
            if (data.uses && data.uses.length > 0) existing.uses = data.uses;
            else if (!existing.uses) existing.uses = ["General Treatment"];

            if (data.interactions && data.interactions.length > 0) existing.interactions = data.interactions;
            else if (!existing.interactions) existing.interactions = ["Consult GP"];

            this.existingMedicines[index] = existing;
        } else {
            this.existingMedicines.push(defaultItem);
        }
    }

    updateCondition(name: string, url: string, data: any) {
        let index = this.existingConditions.findIndex((c: any) => c.name.toLowerCase() === name.toLowerCase());

        const defaultItem = {
            id: `condition-${this.existingConditions.length + 1}`,
            name: name,
            url: url,
            description: data.description || `Official NHS information about ${name}.`,
            category: "Condition",
            icon: "🩺",
            prevalence: "Common",
            symptoms: (data.symptoms && data.symptoms.length) ? data.symptoms : ["See GP"],
            treatments: (data.treatments && data.treatments.length) ? data.treatments : ["See GP"]
        };

        if (index !== -1) {
            const existing = this.existingConditions[index];
            existing.url = url; // Ensure URL is updated

            if (data.description && data.description.length > 10) existing.description = data.description;
            if (data.symptoms && data.symptoms.length > 0) existing.symptoms = data.symptoms;
            if (data.treatments && data.treatments.length > 0) existing.treatments = data.treatments;

            this.existingConditions[index] = existing;
        } else {
            this.existingConditions.push(defaultItem);
        }
    }

    saveData() {
        fs.writeFileSync(MEDICINES_FILE, JSON.stringify(this.existingMedicines, null, 2));
        fs.writeFileSync(CONDITIONS_FILE, JSON.stringify(this.existingConditions, null, 2));
    }

    async scrapeDetail(url: string, type: 'medicine' | 'condition', name: string) {
        const page = await this.browser.newPage();
        await page.setRequestInterception(true);
        page.on('request', (req: any) => {
            if (['image', 'stylesheet', 'font'].includes(req.resourceType())) req.abort();
            else req.continue();
        });

        try {
            await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 30000 });

            // Extract JSON-LD
            const data = await page.evaluate(() => {
                const scripts = Array.from(document.querySelectorAll('script[type="application/ld+json"]'));
                let medicalPage = null;
                for (const s of scripts) {
                    try {
                        const json = JSON.parse(s.innerHTML);
                        // Check for common Schema.org types used by NHS
                        if (json['@type'] === 'MedicalWebPage' || json['@type'] === 'MedicalCondition' || json['about']?.['@type'] === 'Drug') {
                            medicalPage = json;
                            break;
                        }
                    } catch (e) { continue; }
                }
                return medicalPage;
            });

            const result: any = {
                description: "",
                uses: [],
                interactions: [],
                dosage: "",
                sideEffects: "",
                symptoms: [],
                treatments: []
            };

            if (data) {
                if (data.description) result.description = data.description;

                const parts = data.hasPart || [];
                for (const part of parts) {
                    const headline = (part.headline || "").toLowerCase();
                    const aspect = (part.hasHealthAspect || "").toLowerCase();
                    const partDesc = part.description || "";

                    // Recursive text extractor with SMART JOIN
                    const getText = (p: any): string => {
                        if (p.hasPart) {
                            return p.hasPart.map((sub: any) => getText(sub)).join(" ");
                            // Note: We rely on stripHtml to add dots for block elements inside the text.
                            // But if 'sub' is purely text node structure, we might need manual join.
                            // Let's rely on the HTML content usually present in 'text' field.
                        }
                        return p.text || "";
                    };
                    let rawText = getText(part);

                    // Filters for "Junk" text
                    const junkPhrases = ["Contraindications", "How it's used", "Side effects", "Pregnancy", "Interactions"];
                    // If rawText starts with a menu-like list, try to strip it?
                    // Hard to catch perfectly, but let's at least clean the HTML better.

                    if (type === 'medicine') {
                        // Uses
                        if (aspect.includes('overview') || headline.includes('about') || headline.includes('what is')) {
                            // Prefer partDesc if it's concise, else rawText
                            // NHS usually puts a good summary in 'partDesc'.
                            // rawText often contains the entire "Since you are taking..."

                            let txt = partDesc.length > 20 && partDesc.length < rawText.length ? partDesc : rawText;

                            // Specific fix for "TOC" artifact if it appears at start
                            if (txt.startsWith("Contraindications")) {
                                const split = txt.split("Overview");
                                if (split.length > 1) txt = split[1];
                            }

                            const clean = stripHtml(txt);
                            if (clean && !result.uses.includes(clean)) result.uses.push(clean);
                        }
                        // Interactions
                        if (aspect.includes('interactions') || headline.includes('taking') || headline.includes('medicines')) {
                            const clean = stripHtml(rawText);
                            if (clean && !result.interactions.includes(clean)) result.interactions.push(clean);
                        }
                        // Dosage
                        if (aspect.includes('usage') || headline.includes('dosage') || headline.includes('how to take')) {
                            result.dosage = stripHtml(rawText);
                        }
                        // Side Effects
                        if (aspect.includes('sideeffects') || headline.includes('side effects')) {
                            // Try to listify if possible
                            if (part.hasPart) {
                                const list = part.hasPart.map((p: any) => p.headline).filter((h: any) => h).join(", ");
                                result.sideEffects = list || stripHtml(rawText);
                            } else {
                                result.sideEffects = stripHtml(rawText);
                            }
                        }
                    } else {
                        // Condition
                        if (headline.includes('symptom')) {
                            const clean = stripHtml(rawText);
                            if (clean) result.symptoms.push(clean);
                        }
                        if (headline.includes('treatment')) {
                            const clean = stripHtml(rawText);
                            if (clean) result.treatments.push(clean);
                        }
                    }
                }
            }

            // Fallback: HTML DOM Scraping if JSON-LD missed fields
            const fallbackData = await page.evaluate(() => {
                const getSectionText = (keywords: string[]) => {
                    const headers = Array.from(document.querySelectorAll('h2, h3'));
                    const target = headers.find(h => {
                        const t = (h as HTMLElement).innerText.toLowerCase();
                        return keywords.some(k => t.includes(k));
                    });

                    if (target) {
                        let content = [];
                        let curr: any = target.nextElementSibling;
                        // Grab up to 3 siblings or until next header
                        let count = 0;
                        while (curr && count < 5) {
                            if (['H2', 'H3'].includes(curr.tagName)) break;
                            if (curr.innerText && curr.innerText.trim().length > 0) {
                                content.push(curr.innerText.trim());
                            }
                            curr = curr.nextElementSibling;
                            count++;
                        }
                        return content.join(". ");
                    }
                    return null;
                };

                return {
                    symptoms: getSectionText(['symptom', 'sign', 'check if']),
                    treatments: getSectionText(['treatment', 'cure', 'how to treat']),
                    uses: getSectionText(['about', 'what is', 'overview']),
                    interactions: getSectionText(['interaction', 'taking other medicine', 'Caution']),
                    dosage: getSectionText(['dosage', 'how to take']),
                    sideEffects: getSectionText(['side effect'])
                };
            });

            // Merge Fallback if empty or placeholder
            const isPlaceholder = (arr: string[]) => arr.length === 0 || (arr.length === 1 && (arr[0].includes("not available") || arr[0] === "See GP"));

            if (type === 'condition') {
                if (isPlaceholder(result.symptoms) && fallbackData.symptoms) {
                    result.symptoms = [fallbackData.symptoms]; // Replace placeholder
                }
                if (isPlaceholder(result.treatments) && fallbackData.treatments) {
                    result.treatments = [fallbackData.treatments];
                }
            }
            if (type === 'medicine') {
                if (isPlaceholder(result.uses) && fallbackData.uses) result.uses = [fallbackData.uses];
                if (isPlaceholder(result.interactions) && fallbackData.interactions) result.interactions = [fallbackData.interactions];

                if ((!result.dosage || result.dosage.includes("not available")) && fallbackData.dosage) result.dosage = fallbackData.dosage;
                if ((!result.sideEffects || result.sideEffects.includes("not available")) && fallbackData.sideEffects) result.sideEffects = fallbackData.sideEffects;
            }

            // Dedupe and Clean
            const cleanFinal = (arr: string[]) => [...new Set(arr)].filter(Boolean).map(s => s.replace(/\.\./g, '.'));
            result.uses = cleanFinal(result.uses);
            result.interactions = cleanFinal(result.interactions);
            result.symptoms = cleanFinal(result.symptoms);
            result.treatments = cleanFinal(result.treatments);

            // Strip HTML from text fields if any crept in
            if (result.dosage) result.dosage = stripHtml(result.dosage);
            if (result.sideEffects) result.sideEffects = stripHtml(result.sideEffects);
            if (result.description) result.description = stripHtml(result.description);

            return result;

        } catch (e) {
            // Silent fail for single page
            return {};
        } finally {
            await page.close();
        }
    }
}
// Run
new DeepScraper().main().catch(console.error);

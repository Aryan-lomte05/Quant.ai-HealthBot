
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
    }

    async close() {
        if (this.browser) await this.browser.close();
    }

    async scrape() {
        await this.init();
        console.log("🚀 Starting Full Deep Scrape...");

        // 1. Scrape Medicines
        console.log("💊 Fetching Medicine A-Z...");
        const medicineLinks = await this.getLinks(MEDICINES_URL);
        console.log(`Found ${medicineLinks.length} medicines.`);

        await this.processBatch(medicineLinks, 'medicine');
        console.log("✅ Medicines scrape complete.");

        // 2. Scrape Conditions (Already done)
        // console.log("🩺 Fetching Condition A-Z...");
        // const conditionLinks = await this.getLinks(CONDITIONS_URL);
        // console.log(`Found ${conditionLinks.length} conditions.`);

        // await this.processBatch(conditionLinks, 'condition');
        // console.log("✅ Conditions scrape complete.");

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
                        this.updateMedicine(item.name, scrapedData);
                    } else {
                        this.updateCondition(item.name, scrapedData);
                    }

                } catch (e) {
                    console.error(`Failed ${item.name}: ${e}`);
                }

                processed++;
                // Simple progress bar
                if (processed % 5 === 0 || processed === total) {
                    process.stdout.write(`\r[${type.toUpperCase()}] Progress: ${processed}/${total} (${Math.round(processed / total * 100)}%)`);
                }
            });

            await Promise.all(promises);

            // Incremental Save (safer)
            this.saveData();
        }
        console.log("");
    }

    updateMedicine(name: string, data: any) {
        let index = this.existingMedicines.findIndex((m: any) => m.name.toLowerCase() === name.toLowerCase());

        // Default structure
        const defaultItem = {
            id: `medicine-${this.existingMedicines.length + 1}`,
            name: name,
            description: data.description || `Official NHS information about ${name}.`,
            category: "General Health",
            price: "£5.00 - £15.00",
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

            if (data.description && data.description.length > 10) existing.description = data.description;
            if (data.dosage) existing.dosage = data.dosage;
            if (data.sideEffects) existing.sideEffects = data.sideEffects;
            if (data.uses && data.uses.length > 0) existing.uses = data.uses;
            else if (!existing.uses) existing.uses = ["General Treatment"]; // Ensure field exists

            if (data.interactions && data.interactions.length > 0) existing.interactions = data.interactions;
            else if (!existing.interactions) existing.interactions = ["Consult GP"]; // Ensure field exists

            this.existingMedicines[index] = existing;
        } else {
            this.existingMedicines.push(defaultItem);
        }
    }

    updateCondition(name: string, data: any) {
        let index = this.existingConditions.findIndex((c: any) => c.name.toLowerCase() === name.toLowerCase());

        const defaultItem = {
            id: `condition-${this.existingConditions.length + 1}`,
            name: name,
            description: data.description || `Official NHS information about ${name}.`,
            category: "Condition",
            icon: "🩺",
            prevalence: "Common",
            symptoms: (data.symptoms && data.symptoms.length) ? data.symptoms : ["See GP"],
            treatments: (data.treatments && data.treatments.length) ? data.treatments : ["See GP"]
        };

        if (index !== -1) {
            const existing = this.existingConditions[index];
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

                    // Recursive text extractor
                    const getText = (p: any): string => {
                        if (p.hasPart) return p.hasPart.map((sub: any) => getText(sub)).join(" ");
                        return p.text || "";
                    };
                    const rawText = getText(part);

                    if (type === 'medicine') {
                        // Uses
                        if (aspect.includes('overview') || headline.includes('about') || headline.includes('what is')) {
                            const txt = partDesc.length > rawText.length ? partDesc : rawText;
                            const clean = txt.replace(/<[^>]*>/g, " ").trim();
                            // Try to find specific sentences? For now, the paragraph is fine.
                            if (clean) result.uses.push(clean);
                        }
                        // Interactions
                        if (aspect.includes('interactions') || headline.includes('taking') || headline.includes('medicines')) {
                            const clean = rawText.replace(/<[^>]*>/g, " ").trim();
                            if (clean) result.interactions.push(clean);
                        }
                        // Dosage
                        if (aspect.includes('usage') || headline.includes('dosage') || headline.includes('how to take')) {
                            result.dosage = rawText.replace(/<[^>]*>/g, " ").trim();
                        }
                        // Side Effects
                        if (aspect.includes('sideeffects') || headline.includes('side effects')) {
                            // Try to listify
                            if (part.hasPart) {
                                // Sometimes hasPart has headlines for each side effect
                                const list = part.hasPart.map((p: any) => p.headline).filter((h: any) => h).join(", ");
                                result.sideEffects = list || rawText.replace(/<[^>]*>/g, " ").trim();
                            } else {
                                result.sideEffects = rawText.replace(/<[^>]*>/g, " ").trim();
                            }
                        }
                    } else {
                        // Condition
                        if (headline.includes('symptom')) {
                            result.symptoms.push(rawText.replace(/<[^>]*>/g, " ").trim());
                        }
                        if (headline.includes('treatment')) {
                            result.treatments.push(rawText.replace(/<[^>]*>/g, " ").trim());
                        }
                    }
                }
            }

            // Clean up
            result.description = stripHtml(result.description);
            result.dosage = stripHtml(result.dosage);
            result.sideEffects = stripHtml(result.sideEffects);
            result.uses = result.uses.map(stripHtml).filter(Boolean);
            result.interactions = result.interactions.map(stripHtml).filter(Boolean);
            result.symptoms = result.symptoms.map(stripHtml).filter(Boolean);
            result.treatments = result.treatments.map(stripHtml).filter(Boolean);

            return result;

        } catch (e) {
            // Silent fail for single page
            return {};
        } finally {
            await page.close();
        }
    }
}

new DeepScraper().scrape().catch(console.error);

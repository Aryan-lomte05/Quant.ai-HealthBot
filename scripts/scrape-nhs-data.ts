import * as cheerio from 'cheerio';
import fs from 'fs/promises';
import path from 'path';
import pLimit from 'p-limit';

const BASE_URL = 'https://www.nhs.uk';
const CONCURRENCY_LIMIT = 5; // Be polite to the server
const MAX_ITEMS_TO_SCRAPE = 1000; // Safety cap

interface ScrapedItem {
    id: string;
    name: string;
    description: string;
    url: string;
    category?: string;
    symptoms?: string[];
    treatments?: string[];
    icon?: string; // Placeholder for UI
}

interface MedicineItem {
    id: string;
    name: string;
    description: string;
    url: string;
    category: string;
    genericName?: string;
    type?: string;
    price?: string; // Mocked
    icon?: string; // Placeholder
    dosage?: string;
    sideEffects?: string[];
    uses?: string[];
    interactions?: string[];
}

async function fetchPage(url: string): Promise<string> {
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`Failed to fetch ${url}: ${response.statusText}`);
        return await response.text();
    } catch (error) {
        console.error(`Error fetching ${url}:`, error);
        return '';
    }
}

async function scrapeConditions() {
    console.log('🏥 Scraping Conditions A-Z...');
    const html = await fetchPage(`${BASE_URL}/conditions/`);
    if (!html) return [];

    const $ = cheerio.load(html);
    const links: { name: string; url: string }[] = [];

    // Select all links in the A-Z list
    $('.nhsuk-list--links a').each((_, el) => {
        const name = $(el).text().trim();
        const href = $(el).attr('href');
        if (href && name) {
            links.push({ name, url: href.startsWith('http') ? href : `${BASE_URL}${href}` });
        }
    });

    console.log(`Found ${links.length} conditions. Scraping details for first ${Math.min(links.length, MAX_ITEMS_TO_SCRAPE)}...`);

    const limit = pLimit(CONCURRENCY_LIMIT);
    const detailedConditions: ScrapedItem[] = [];

    const tasks = links.slice(0, MAX_ITEMS_TO_SCRAPE).map((link, index) => limit(async () => {
        if (index % 10 === 0) console.log(`Processing ${index + 1}/${links.length}...`);

        const pageHtml = await fetchPage(link.url);
        if (!pageHtml) return;

        const $page = cheerio.load(pageHtml);

        // Extract Description
        const description = $page('.nhsuk-main-wrapper p:first-of-type').text().trim() ||
            $page('.nhsuk-lede-text').text().trim() ||
            "No description available.";

        // Extract Symptoms
        const symptoms: string[] = [];
        $page('h2:contains("Symptoms"), h2:contains("Check if you have")').nextUntil('h2').find('li').each((_, el) => {
            symptoms.push($page(el).text().trim());
        });

        // Extract Treatments
        const treatments: string[] = [];
        $page('h2:contains("Treatment"), h2:contains("How to treat")').nextUntil('h2').find('li').each((_, el) => {
            treatments.push($page(el).text().trim());
        });

        detailedConditions.push({
            id: `condition-${index}`,
            name: link.name,
            description,
            url: link.url,
            category: 'Health Condition',
            symptoms: symptoms.slice(0, 5), // Limit to 5 for UI
            treatments: treatments.slice(0, 5),
            icon: '🩺'
        });
    }));

    await Promise.all(tasks);
    return detailedConditions;
}

async function scrapeMedicines() {
    console.log('💊 Scraping Medicines A-Z...');
    const html = await fetchPage(`${BASE_URL}/medicines/`);
    if (!html) return [];

    const $ = cheerio.load(html);
    const links: { name: string; url: string }[] = [];

    $('.nhsuk-list--links a').each((_, el) => {
        const name = $(el).text().trim();
        const href = $(el).attr('href');
        if (href && name) {
            links.push({ name, url: href.startsWith('http') ? href : `${BASE_URL}${href}` });
        }
    });

    console.log(`Found ${links.length} medicines. Scraping details...`);

    const limit = pLimit(CONCURRENCY_LIMIT);
    const detailedMedicines: MedicineItem[] = [];

    // Scrape all items depth-wise as requested
    const MAX_DEEP_SCRAPE = links.length;

    // Helper to fetch text from a sub-page
    const fetchSubPageContent = async (url: string, selector: string = '.nhsuk-main-wrapper'): Promise<string[]> => {
        try {
            const html = await fetchPage(url);
            if (!html) return [];
            const $ = cheerio.load(html);
            const content: string[] = [];
            // Get first few paragraphs or list items from the main wrapper
            $(selector).find('p, li').slice(0, 5).each((_, el) => {
                const text = $(el).text().trim();
                // Basic cleanup
                if (text && text.length > 20 && !text.includes("Find out more")) {
                    content.push(text);
                }
            });
            return content;
        } catch (e) {
            return [];
        }
    };

    const tasks = links.slice(0, links.length).map((link, index) => limit(async () => {
        if (index % 5 === 0) console.log(`Processing medicine ${index + 1}/${links.length}...`);

        const shouldDeepScrape = index < MAX_DEEP_SCRAPE;
        let description = "No description available.";
        let dosage = "Information not available. Consult a doctor or pharmacist.";
        let sideEffects = ["Refer to packaging or official NHS website for details."];
        let uses = ["See NHS website for details."];
        let interactions = ["Consult a doctor or pharmacist."];
        let genericName = link.name;

        try {
            // 1. Visit Main Hub Page
            const pageHtml = await fetchPage(link.url);
            if (!pageHtml) return;
            const $page = cheerio.load(pageHtml);

            description = $page('.nhsuk-main-wrapper p:first-of-type').text().trim() ||
                $page('.nhsuk-lede-text').text().trim() ||
                description;

            genericName = description.match(/\((.*?)\)/)?.[1] || link.name;

            if (shouldDeepScrape) {
                // 2. Extract Sub-links (Robust Regex Match)
                const getLink = (regexPatterns: RegExp[]) => {
                    let foundUrl: string | undefined;
                    $page('a').each((_, el) => {
                        const text = $page(el).text().trim();
                        if (regexPatterns.some(p => p.test(text))) {
                            const href = $page(el).attr('href');
                            if (href) {
                                foundUrl = href.startsWith('http') ? href : `https://www.nhs.uk${href}`;
                                return false; // Break cheerio loop
                            }
                        }
                    });
                    return foundUrl;
                };

                const aboutUrl = getLink([/about/i, /what is/i, /who can take/i]);
                // Fix: allow words between 'how' and 'to' (e.g. 'How and when to take')
                const dosageUrl = getLink([/how.*to.*(take|use|give)/i, /dosage/i, /using/i]);
                const sideEffectsUrl = getLink([/side effects/i]);
                const interactionsUrl = getLink([/taking.*with/i, /interactions/i, /medicines/i, /mixing/i]);

                // 3. Fetch Sub-pages (Concurrent)
                const [fetchedUses, fetchedDosage, fetchedSideEffects, fetchedInteractions] = await Promise.all([
                    aboutUrl ? fetchSubPageContent(aboutUrl) : Promise.resolve([]),
                    dosageUrl ? fetchSubPageContent(dosageUrl) : Promise.resolve([]),
                    sideEffectsUrl ? fetchSubPageContent(sideEffectsUrl) : Promise.resolve([]),
                    interactionsUrl ? fetchSubPageContent(interactionsUrl) : Promise.resolve([])
                ]);

                if (fetchedUses.length > 0) uses = fetchedUses;
                if (fetchedDosage.length > 0) dosage = fetchedDosage.join(' ');
                if (fetchedSideEffects.length > 0) sideEffects = fetchedSideEffects;
                if (fetchedInteractions.length > 0) interactions = fetchedInteractions;

                // 4. Fallback: Single Page Extraction (if Hub scrape missed)
                const extractSection = (regexPatterns: RegExp[]) => {
                    let content: string[] = [];
                    regexPatterns.some(pattern => {
                        const headers = $page('h2, h3').filter((_, el) => pattern.test($page(el).text()));
                        if (headers.length > 0) {
                            headers.first().nextUntil('h2, h3').each((_, el) => {
                                const text = $page(el).text().trim();
                                if (text && text.length > 20 && !text.includes("Find out more")) content.push(text);
                            });
                            return true;
                        }
                        return false;
                    });
                    return content.slice(0, 5);
                };

                if (uses[0] === "See NHS website for details.") {
                    const extracted = extractSection([/about/i, /what is/i, /who can take/i]);
                    if (extracted.length > 0) uses = extracted;
                }
                if (dosage === "Information not available. Consult a doctor or pharmacist.") {
                    const extracted = extractSection([/how.*to.*(take|use|give)/i, /dosage/i, /using/i]);
                    if (extracted.length > 0) dosage = extracted.join(' ');
                }
                if (sideEffects[0] === "Refer to packaging or official NHS website for details.") {
                    const extracted = extractSection([/side effects/i]);
                    if (extracted.length > 0) sideEffects = extracted;
                }
                if (interactions[0] === "Consult a doctor or pharmacist.") {
                    const extracted = extractSection([/taking.*with/i, /interactions/i, /medicines/i, /mixing/i]);
                    if (extracted.length > 0) interactions = extracted;
                }
            }

            detailedMedicines.push({
                id: `medicine-${index}`,
                name: link.name,
                description,
                url: link.url,
                category: 'Medicine',
                genericName,
                type: 'Tablet/Liquid',
                price: 'N/A', // Updated from hardcoded 'Free'
                icon: '💊',
                dosage,
                sideEffects,
                uses,
                interactions
            });

        } catch (err) {
            console.error(`Failed to scrape ${link.name}:`, err);
        }
    }));

    await Promise.all(tasks);
    return detailedMedicines;
}

async function main() {
    const dataDir = path.join(process.cwd(), 'src', 'data');
    await fs.mkdir(dataDir, { recursive: true });

    // 1. Scrape Conditions
    const conditions = await scrapeConditions();
    await fs.writeFile(path.join(dataDir, 'conditions.json'), JSON.stringify(conditions, null, 2));
    console.log(`✅ Saved ${conditions.length} conditions to src/data/conditions.json`);

    // 2. Scrape Medicines
    const medicines = await scrapeMedicines();
    await fs.writeFile(path.join(dataDir, 'medicines.json'), JSON.stringify(medicines, null, 2));
    console.log(`✅ Saved ${medicines.length} medicines to src/data/medicines.json`);

    // 3. Generate Symptoms (from Conditions for now)
    // We filter conditions that have "symptoms" in the name or just use a subset
    // Or we scrape https://www.nhs.uk/conditions/symptoms/ if it existed, but it redirects.
    // For now, we'll create a simpler list based on the scraped conditions that HAVE symptoms listed.
    const symptomsList = conditions
        .filter(c => c.symptoms && c.symptoms.length > 0)
        .map(c => ({
            condition: c.name,
            symptoms: c.symptoms,
            url: c.url
        }));

    // Also try to scrape a specific symptoms page if known, but Health A-Z covers it.
    // We will save this derived list.
    await fs.writeFile(path.join(dataDir, 'symptoms_source.json'), JSON.stringify(symptomsList, null, 2));
    console.log(`✅ Saved symptoms source data to src/data/symptoms_source.json`);
}

main().catch(console.error);

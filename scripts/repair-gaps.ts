
import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';

// Config
const CONDITIONS_FILE = path.join(process.cwd(), "src", "data", "conditions.json");
const CONCURRENCY = 5;

// Helper
function stripHtml(html: string): string {
    if (!html) return "";
    let processed = html
        .replace(/<\/li>/g, ". ")
        .replace(/<\/p>/g, ". ")
        .replace(/<\/h[1-6]>/g, ": ")
        .replace(/<br\s*\/?>/g, ". ");
    return processed.replace(/<[^>]*>/g, " ")
        .replace(/\.\s*\./g, ".")
        .replace(/\s+/g, " ")
        .trim();
}

async function main() {
    const conditions = JSON.parse(fs.readFileSync(CONDITIONS_FILE, 'utf-8'));
    const gaps = conditions.filter((c: any) =>
        !c.symptoms ||
        c.symptoms.length === 0 ||
        (c.symptoms.length === 1 && (c.symptoms[0].includes('See GP') || c.symptoms[0].includes('Symptoms not available')))
    );

    console.log(`Found ${gaps.length} gaps to repair.`);

    const browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage']
    });

    let processed = 0;
    const save = () => fs.writeFileSync(CONDITIONS_FILE, JSON.stringify(conditions, null, 2));

    // Process Gaps
    for (let i = 0; i < gaps.length; i += CONCURRENCY) {
        const batch = gaps.slice(i, i + CONCURRENCY);

        await Promise.all(batch.map(async (item: any) => {
            const page = await browser.newPage();
            // Block heavy resources
            await page.setRequestInterception(true);
            page.on('request', (req) => {
                if (['image', 'media', 'font', 'stylesheet'].includes(req.resourceType())) req.abort();
                else req.continue();
            });

            try {
                await page.goto(item.url || `https://www.nhs.uk/conditions/${item.id}/`, { waitUntil: 'domcontentloaded', timeout: 30000 });

                // Try to find Symptoms H2
                const scraped = await page.evaluate((itemName) => {
                    // Debug helper
                    const debugLog: string[] = [];

                    // 1. Selector Strategy
                    const getSection = (keywords: string[]) => {
                        const allElems = Array.from(document.querySelectorAll('h1, h2, h3, h4, h5, strong, b'));
                        const header = allElems.find(el => {
                            const text = (el as HTMLElement).innerText.toLowerCase();
                            return keywords.some(k => text.includes(k));
                        });

                        if (header) {
                            let content = [];
                            let curr: any = header.nextElementSibling;
                            let limit = 0;
                            // Scan up to 10 siblings or until next header
                            while (curr && limit < 10) {
                                if (['H1', 'H2', 'H3'].includes(curr.tagName)) break;
                                if (curr.innerText && curr.innerText.trim()) {
                                    content.push(curr.innerText.trim());
                                }
                                curr = curr.nextElementSibling;
                                limit++;
                            }
                            // If no siblings, try parent's next sibling (if header is wrapped in div)
                            if (content.length === 0 && header.parentElement) {
                                let parentSym = header.parentElement.nextElementSibling;
                                if (parentSym && parentSym.tagName === 'P') content.push(parentSym.innerText);
                            }

                            return content.join(". ");
                        }
                        return null;
                    };

                    const symptoms = getSection(['symptoms', 'check if', 'signs']);
                    const treatments = getSection(['treatment', 'cure', 'how to treat']);

                    return { symptoms, treatments };
                }, item.name);

                // Update item reference (modify inside 'conditions' array)
                const target = conditions.find((c: any) => c.id === item.id);
                if (target) {
                    if (scraped.symptoms) target.symptoms = [stripHtml(scraped.symptoms)];
                    if (scraped.treatments) target.treatments = [stripHtml(scraped.treatments)];

                    if (target.symptoms[0].length < 5) target.symptoms = ["Check details on NHS website"]; // Valid fallback if scrape fails
                }

            } catch (e) {
                // Ignore
            } finally {
                await page.close();
            }
        }));

        processed += batch.length;
        process.stdout.write(`\rRepaired: ${processed}/${gaps.length}`);
        if (processed % 20 === 0) save();
    }

    save();
    console.log("\nDone repairing gaps.");
    await browser.close();
}

main();

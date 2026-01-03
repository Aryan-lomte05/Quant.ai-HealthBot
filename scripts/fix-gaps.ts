
import * as cheerio from 'cheerio';
import fs from 'fs';
import path from 'path';

const COLLISIONS_FILE = path.join(process.cwd(), "src", "data", "conditions.json");

async function main() {
    const conditions = JSON.parse(fs.readFileSync(COLLISIONS_FILE, 'utf-8'));

    // Identify Gaps
    const gaps = conditions.filter((c: any) =>
        !c.symptoms ||
        c.symptoms.length === 0 ||
        (c.symptoms.length === 1 && (c.symptoms[0].includes('See GP') || c.symptoms[0].includes('not available')))
    );

    console.log(`Targeting ${gaps.length} gaps...`);

    let fixed = 0;

    for (const item of gaps) {
        if (!item.url) continue;

        try {
            // console.log(`Fetching ${item.name}...`);
            const res = await fetch(item.url, {
                headers: {
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
                }
            });

            if (res.status === 404) {
                console.log(`404 for ${item.name}`);
                continue;
            }

            const html = await res.text();
            const $ = cheerio.load(html);

            // Logic: Find Header containing "Symptoms"
            let symptomText = "";
            $('h2, h3').each((i, el) => {
                const text = $(el).text().toLowerCase();
                if (text.includes('symptom') || text.includes('check if')) {
                    // Get all next siblings until next header
                    const content = $(el).nextUntil('h2, h3').text();
                    if (content.length > symptomText.length) {
                        symptomText = content;
                    }
                }
            });

            // Logic: Treatments
            let treatmentText = "";
            $('h2, h3').each((i, el) => {
                const text = $(el).text().toLowerCase();
                if (text.includes('treatment') || text.includes('how to treat')) {
                    const content = $(el).nextUntil('h2, h3').text();
                    if (content.length > treatmentText.length) treatmentText = content;
                }
            });

            // Clean text
            const clean = (t: string) => t.replace(/\s+/g, ' ').trim();

            let updated = false;
            if (symptomText.length > 20) {
                item.symptoms = [clean(symptomText)];
                updated = true;
            }
            if (treatmentText.length > 20) {
                item.treatments = [clean(treatmentText)];
                updated = true;
            }

            if (updated) {
                fixed++;
                process.stdout.write('.');
            } else {
                process.stdout.write('x');
            }

        } catch (e) {
            console.error(e);
        }
    }

    console.log(`\nFixed ${fixed} items.`);
    fs.writeFileSync(COLLISIONS_FILE, JSON.stringify(conditions, null, 2));
}

main();

import * as cheerio from 'cheerio';

const URL = 'https://www.nhs.uk/medicines/colchicine/';

async function fetchPage(url: string) {
    console.log(`Fetching ${url}...`);
    try {
        const res = await fetch(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
            }
        });
        if (!res.ok) console.log(`HTTP Error: ${res.status} ${res.statusText}`);
        const html = await res.text();
        console.log(`Response length: ${html.length}`);
        console.log(`Preview: ${html.substring(0, 500)}`);
        return html;
    } catch (err) {
        console.error("Fetch failed:", err);
        return "";
    }
}

async function debug() {
    const html = await fetchPage(URL);
    if (!html) return;
    const $ = cheerio.load(html);

    console.log('--- Links ---');
    $('a').each((_, el) => {
        const text = $(el).text().trim();
        const href = $(el).attr('href');
        if (text && href && (text.includes('take') || text.includes('Side') || text.includes('About'))) {
            console.log(`LINK: [${text}] -> ${href}`);
        }
    });

    console.log('\n--- Headers (H2, H3) ---');
    $('h2, h3').each((_, el) => {
        console.log(`HEADER: [${$(el).text().trim()}]`);
    });

    console.log('\n--- Extraction Test ---');
    const extract = (patterns: RegExp[]) => {
        let content: string[] = [];
        patterns.some(pattern => {
            const headers = $('h2, h3').filter((_, el) => pattern.test($(el).text()));
            if (headers.length > 0) {
                console.log(`Matched pattern ${pattern} on header: ${headers.first().text()}`);
                headers.first().nextUntil('h2, h3').each((_, el) => {
                    content.push($(el).text().trim());
                });
                return true;
            }
            return false;
        });
        return content;
    };

    const dosage = extract([/how.*to.*(take|use|give)/i, /dosage/i, /using/i]);
    console.log('Extracted Dosage:', dosage.length > 0 ? dosage[0].substring(0, 50) + '...' : 'NONE');
}

debug();

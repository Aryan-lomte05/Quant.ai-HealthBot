
import puppeteer from 'puppeteer';
import fs from 'fs/promises';

async function debugPage() {
    const browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox']
    });
    const page = await browser.newPage();
    try {
        await page.goto('https://www.nhs.uk/medicines/zolpidem/', { waitUntil: 'domcontentloaded' });
        const html = await page.content();
        await fs.writeFile('debug_zolpidem.html', html);
        console.log('Saved debug_zolpidem.html');

        await page.goto('https://www.nhs.uk/conditions/type-1-diabetes/', { waitUntil: 'domcontentloaded' });
        const html2 = await page.content();
        await fs.writeFile('debug_diabetes.html', html2);
        console.log('Saved debug_diabetes.html');

    } finally {
        await browser.close();
    }
}
debugPage();

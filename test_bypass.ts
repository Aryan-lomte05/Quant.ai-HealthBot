
import puppeteer from 'puppeteer';

(async () => {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');
    try {
        console.log("Navigating with UA...");
        const res = await page.goto("https://www.nhs.uk/conditions/botulism/", { waitUntil: 'domcontentloaded' });
        console.log("Status:", res.status());

        const title = await page.evaluate(() => document.title);
        console.log("Title:", title);

        const links = await page.evaluate(() => {
            const anchors = Array.from(document.querySelectorAll('.nhsuk-list.nhsuk-list--border li a'));
            return anchors.length;
        });
        console.log("Found links:", links);

    } catch (e) { console.error(e); }
    await browser.close();
})();

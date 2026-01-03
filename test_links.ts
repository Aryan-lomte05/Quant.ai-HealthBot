
import puppeteer from 'puppeteer';

(async () => {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    try {
        console.log("Navigating...");
        await page.goto("https://www.nhs.uk/medicines/", { waitUntil: 'domcontentloaded' });
        console.log("Page loaded.");

        const links = await page.evaluate(() => {
            const anchors = Array.from(document.querySelectorAll('.nhsuk-list.nhsuk-list--border li a, .nhsuk-az-link'));
            return anchors.length;
        });
        console.log("Found links:", links);

        // Check Conditions URL too
        await page.goto("https://www.nhs.uk/conditions/", { waitUntil: 'domcontentloaded' });
        const condLinks = await page.evaluate(() => {
            const anchors = Array.from(document.querySelectorAll('.nhsuk-list.nhsuk-list--border li a'));
            return anchors.length;
        });
        console.log("Found conditions:", condLinks);

    } catch (e) { console.error(e); }
    await browser.close();
})();

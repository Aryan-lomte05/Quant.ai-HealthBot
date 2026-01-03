import fs from 'fs/promises';
import path from 'path';

async function debug() {
    const url = 'https://www.nhs.uk/conditions/';
    console.log(`Fetching ${url}...`);
    const res = await fetch(url);
    const html = await res.text();
    await fs.writeFile('debug-conditions.html', html);
    console.log('Saved debug-conditions.html');
}

debug();

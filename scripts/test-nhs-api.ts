import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const API_KEY = process.env.NHS_API_KEY;

if (!API_KEY) {
    console.error("❌ NO API KEY FOUND IN .env.local");
    process.exit(1);
}

console.log(`🔑 Using API Key: ${API_KEY.substring(0, 5)}...`);

const endpoints = [
    "https://sandbox.api.service.nhs.uk/nhs-website-content/health-a-to-z",
    "https://sandbox.api.service.nhs.uk/nhs-website-content/medicines-a-to-z",
    "https://sandbox.api.service.nhs.uk/nhs-website-content/conditions-a-to-z",
    "https://sandbox.api.service.nhs.uk/nhs-website-content/symptoms-a-to-z",
];

async function testEndpoints() {
    for (const url of endpoints) {
        console.log(`\nTesting: ${url}`);
        try {
            const start = Date.now();
            const res = await fetch(url, {
                headers: {
                    "apikey": API_KEY,
                    "accept": "application/json"
                }
            });
            const time = Date.now() - start;
            console.log(`Status: ${res.status} ${res.statusText} (${time}ms)`);
            if (res.ok) {
                console.log("✅ SUCCESS!");
            } else {
                console.log("❌ FAILED");
            }
        } catch (e) {
            console.error("💥 NETWORK ERROR:", e.message);
        }
    }
}

testEndpoints();

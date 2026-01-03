
// Using global fetch (Node 18+)
// Actually simpler: just use global fetch. If it fails, I'll see.
// Most modern Next.js envs have node 18+.

async function testSearch() {
    const BASE_URL = 'http://localhost:3000';

    console.log('--- Testing Disease Search API ---');
    try {
        const url = `${BASE_URL}/api/diseases?query=diabetes`;
        console.log(`Fetching: ${url}`);
        const res = await fetch(url);
        if (!res.ok) throw new Error(`HTTP Error: ${res.status}`);

        const data: any = await res.json();
        const results = data.diseases || [];
        console.log(`Query "diabetes": Found ${results.length} items.`);

        if (results.length > 0) {
            console.log(`   First result: ${results[0].name}`);
            // Verify structure matches expected
            if (!results[0].treatments) console.warn('WARNING: Treatments field missing in result');
        } else {
            console.warn('WARNING: No results found for "diabetes". Check data ingestion.');
        }

        // Test empty query
        const emptyUrl = `${BASE_URL}/api/diseases`;
        const emptyRes = await fetch(emptyUrl);
        const emptyData: any = await emptyRes.json();
        console.log(`Empty Query: Found ${(emptyData.diseases || []).length} items (default list).`);

    } catch (error) {
        console.error('Disease Search verification failed:', error);
    }

    console.log('\n--- Testing Medicine Search API ---');
    try {
        const url = `${BASE_URL}/api/medicines?query=paracetamol`;
        console.log(`Fetching: ${url}`);
        const res = await fetch(url);
        if (!res.ok) throw new Error(`HTTP Error: ${res.status}`);

        const data: any = await res.json();
        const results = data.medicines || [];
        console.log(`Query "paracetamol": Found ${results.length} items.`);

        if (results.length > 0) {
            console.log(`   First result: ${results[0].name}`);
        } else {
            // Try a broader query if paracetamol is not there, maybe 'pain'
            console.log('   No direct match for paracetamol, trying "pain"...');
            const url2 = `${BASE_URL}/api/medicines?query=pain`;
            const res2 = await fetch(url2);
            const data2: any = await res2.json();
            console.log(`   Query "pain": Found ${(data2.medicines || []).length} items.`);
        }

    } catch (error) {
        console.error('Medicine Search verification failed:', error);
    }
}

testSearch();

import fs from 'fs';
import path from 'path';

// Load Data
const conditionsPath = path.join(process.cwd(), 'src/data/conditions.json');
const medicinesPath = path.join(process.cwd(), 'src/data/medicines.json');

const conditions = JSON.parse(fs.readFileSync(conditionsPath, 'utf-8'));
const medicines = JSON.parse(fs.readFileSync(medicinesPath, 'utf-8'));

console.log(`✅ Loaded ${conditions.length} conditions.`);
console.log(`✅ Loaded ${medicines.length} medicines.`);

// Simulate Diseases Endpoint Logic
function getDiseases() {
    const cards = conditions.slice(0, 9).map((item: any, i: number) => ({
        id: item.id,
        name: item.name,
        symptoms: item.symptoms?.length || 0
    }));
    return cards;
}

// Simulate Medicines Search Logic
function searchMedicines(query: string) {
    return medicines.filter((item: any) =>
        item.name.toLowerCase().includes(query) ||
        (item.description && item.description.toLowerCase().includes(query))
    ).slice(0, 5).map((m: any) => m.name);
}

// Run Tests
console.log('\n--- Testing Disease Cards ---');
const cards = getDiseases();
console.log('Sample Card:', cards[0]);
if (cards.length > 0 && cards[0].name) console.log('✅ Disease Cards Logic OK');
else console.error('❌ Disease Cards Logic FAILED');

console.log('\n--- Testing Medicine Search "pain" ---');
const painMeds = searchMedicines('pain');
console.log('Results:', painMeds);
if (painMeds.length > 0) console.log('✅ Medicine Search OK');
else console.error('❌ Medicine Search FAILED');

console.log('\n--- Testing Medicine Search "paracetamol" ---');
const paraMeds = searchMedicines('paracetamol'); // Should find local if scraped, or fallback? 
// Note: Scraped data might not have "Paracetamol" if it wasn't in A-Z or under that name.
// But we have fallback logic in the actual route. 
// This script only tests the *local* scraped data.
console.log('Results:', paraMeds);

if (conditions.length > 0 && medicines.length > 0) {
    console.log('\n✅ Data Integration Verified: Files are valid and queryable.');
} else {
    console.error('\n❌ Data Integration Issues: Files empty?');
}

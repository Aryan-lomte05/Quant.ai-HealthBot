
import fs from 'fs/promises';
import path from 'path';

// Define the shape of our medicine data
interface MedicineItem {
    id: string;
    name: string;
    description: string;
    dosage: string;
    sideEffects: string[];
    uses: string[];
    interactions: string[];
    url: string;
}

const GENERIC_DOSAGE = "Refer to packaging.";
const GENERIC_SIDE_EFFECTS = "See leaflet.";
const GENERIC_USES = "Consult generic description.";
const GENERIC_INTERACTIONS = "Consult a pharmacist.";

async function auditMedicines() {
    const filePath = path.join(process.cwd(), 'src', 'data', 'medicines.json');
    const data = await fs.readFile(filePath, 'utf-8');
    const medicines: MedicineItem[] = JSON.parse(data);

    let total = medicines.length;
    let perfect = 0;
    let problematic: any[] = [];

    medicines.forEach(m => {
        let issues = [];

        // Check for generic placeholders or empty data
        if (m.dosage === GENERIC_DOSAGE || m.dosage.includes("Refer to packaging")) issues.push("Generic Dosage");
        if (m.sideEffects.includes(GENERIC_SIDE_EFFECTS) || m.sideEffects.length === 0) issues.push("Generic/Empty Side Effects");
        if (m.uses.includes(GENERIC_USES) || m.uses.length === 0) issues.push("Generic/Empty Uses");
        if (m.interactions.includes(GENERIC_INTERACTIONS) || m.interactions.length === 0) issues.push("Generic/Empty Interactions");

        if (issues.length === 0) {
            perfect++;
        } else {
            problematic.push({
                name: m.name,
                url: m.url,
                issues: issues
            });
        }
    });

    console.log(`\n🔍 AUDIT REPORT (${total} medicines processed)`);
    console.log(`✅ Fully Detailed Entries: ${perfect} (${((perfect / total) * 100).toFixed(1)}%)`);
    console.log(`⚠️  Entries with Generic/Missing Data: ${problematic.length} (${((problematic.length / total) * 100).toFixed(1)}%)`);

    console.log(`\n📋 Top 20 Problematic Entries:`);
    problematic.slice(0, 20).forEach(p => {
        console.log(`- ${p.name}`);
        console.log(`  Url: ${p.url}`);
        console.log(`  Issues: ${p.issues.join(', ')}`);
    });

    // Save detailed report
    await fs.writeFile('medicine-audit-report.json', JSON.stringify(problematic, null, 2));
    console.log(`\n📄 Full report saved to medicine-audit-report.json`);
}

auditMedicines().catch(console.error);


const fs = require('fs');
const conditions = JSON.parse(fs.readFileSync('src/data/conditions.json', 'utf8'));

console.log("Loaded conditions:", conditions.length);

const query = "z";
const filtered = conditions.filter(c =>
    c.name.toLowerCase().includes(query) ||
    c.description?.toLowerCase().includes(query) ||
    c.category?.toLowerCase().includes(query)
);

console.log("Filtered 'z' count:", filtered.length);

filtered.forEach(c => {
    console.log(`[${c.id}] ${c.name}`);
    if (!c.symptoms) console.error("!!! MISSING SYMPTOMS ARRAY !!!");
    if (!c.treatments) console.error("!!! MISSING TREATMENTS ARRAY !!!");
    // Simulate mapping
    try {
        const x = c.symptoms.map(s => s);
    } catch (e) {
        console.error("!!! CRASH MAPPING SYMPTOMS !!!", e);
    }
});

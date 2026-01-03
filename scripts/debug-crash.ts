// Type definitions for medical conditions
interface Condition {
    name: string;
    description?: string;
    category?: string;
}

const conditions: Condition[] = [];

const query = "z";
const filtered = conditions.filter((c: Condition) =>
    c.name.toLowerCase().includes(query) ||
    c.description?.toLowerCase().includes(query) ||
    c.category?.toLowerCase().includes(query)
);

console.log(filtered);

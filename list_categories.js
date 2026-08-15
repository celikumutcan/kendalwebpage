const fs = require('fs');
const data = JSON.parse(fs.readFileSync('src/data/products.json', 'utf8'));
const categories = new Set();
for (const key in data) {
    const item = data[key];
    if (item.category && item.category.tr) {
        item.category.tr.forEach(c => categories.add(c));
    }
}
console.log(Array.from(categories).sort().join('\n'));
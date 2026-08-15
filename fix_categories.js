const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, 'src', 'data', 'products.json');
const dataContent = fs.readFileSync(dataPath, 'utf8');
const data = JSON.parse(dataContent);

const replacements = {
    "Dış Aydınlatma": "Dış Mekan Aydınlatma",
    "Ampuller": "Ampul",
    "Led Ampuller": "Led Ampul",
    "Dış Mekan Şerit Led, Neon ve Ledli Hortumlar": "Şerit Led"
};

let updatedCount = 0;

for (const key in data) {
    const item = data[key];
    if (item.category && item.category.tr) {
        let changed = false;
        item.category.tr = item.category.tr.map(cat => {
            if (replacements[cat]) {
                changed = true;
                return replacements[cat];
            }
            return cat;
        });
        
        // Remove duplicates if any were created by merging
        if (changed) {
            item.category.tr = [...new Set(item.category.tr)];
            updatedCount++;
        }
    }
}

fs.writeFileSync(dataPath, JSON.stringify(data, null, 2), 'utf8');
console.log(`Updated categories for ${updatedCount} products.`);

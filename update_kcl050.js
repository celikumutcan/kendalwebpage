const fs = require('fs');
const path = 'src/data/products.json';
const data = JSON.parse(fs.readFileSync(path, 'utf8'));

let updated = 0;
for(const k in data) {
    if (data[k].name && data[k].name.tr && data[k].name.tr.includes('KCL050')) {
        data[k].category.tr = ["Şerit Led"];
        data[k].category.en = ["Strip LED"];
        updated++;
    }
}

if (updated > 0) {
    fs.writeFileSync(path, JSON.stringify(data, null, 2), 'utf8');
    console.log(`Updated ${updated} products.`);
} else {
    console.log('Product not found.');
}
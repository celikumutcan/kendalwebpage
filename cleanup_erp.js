const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, 'src', 'data', 'products.json');
const slugMapFilePath = path.join(__dirname, 'src', 'data', 'slug-map.json');

const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf8'));
const slugMap = JSON.parse(fs.readFileSync(slugMapFilePath, 'utf8'));

const targetId = "7966";
const canonicalId = "KES210";

if (products[targetId]) {
    delete products[targetId];
    console.log(`Deleted legacy product ID ${targetId}`);
} else {
    console.log(`Product ID ${targetId} not found.`);
}

let redirectedCount = 0;
for (const [slug, oldId] of Object.entries(slugMap)) {
    if (oldId === targetId) {
        slugMap[slug] = canonicalId;
        redirectedCount++;
    }
}

fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 2), 'utf8');
fs.writeFileSync(slugMapFilePath, JSON.stringify(slugMap, null, 2), 'utf8');
console.log(`Redirected ${redirectedCount} slugs to ${canonicalId}.`);

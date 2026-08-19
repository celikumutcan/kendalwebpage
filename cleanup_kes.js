const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, 'src', 'data', 'products.json');
const slugMapFilePath = path.join(__dirname, 'src', 'data', 'slug-map.json');

const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf8'));
const slugMap = JSON.parse(fs.readFileSync(slugMapFilePath, 'utf8'));

// Longest prefixes first
const targetPrefixes = ["KES700", "KES701"];
const idToCanonical = {};

let deletedCount = 0;

for (const key of Object.keys(products)) {
    const product = products[key];
    const id = product.id;
    const model = product.model;
    const nameTr = product.name?.tr || "";

    if (/^\d+$/.test(id)) {
        for (const prefix of targetPrefixes) {
            if ((model && model.startsWith(prefix)) || nameTr.includes(prefix)) {
                console.log(`Found legacy product: ID=${id}, Model=${model}, Name=${nameTr} -> mapped to ${prefix}`);
                idToCanonical[id] = prefix;
                delete products[key];
                deletedCount++;
                break;
            }
        }
    }
}

let redirectedCount = 0;

for (const [slug, oldId] of Object.entries(slugMap)) {
    if (idToCanonical[oldId]) {
        slugMap[slug] = idToCanonical[oldId];
        redirectedCount++;
    }
}

if (deletedCount > 0) {
    fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 2), 'utf8');
    fs.writeFileSync(slugMapFilePath, JSON.stringify(slugMap, null, 2), 'utf8');
    console.log(`Deleted ${deletedCount} legacy products.`);
    console.log(`Redirected ${redirectedCount} slugs to canonical IDs.`);
} else {
    console.log('No legacy products found to delete.');
}

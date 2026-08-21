const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src/data/products.json');
const products = JSON.parse(fs.readFileSync(filePath, 'utf8'));

['KBA780', 'KBA781', 'KBA782', 'KBA795'].forEach(id => {
  products[id].category = { "tr": ["Solar Armatür"], "en": ["Solar Luminaire"] };
  console.log(id, 'güncellendi');
});

fs.writeFileSync(filePath, JSON.stringify(products, null, 2), 'utf8');

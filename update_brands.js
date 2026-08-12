const fs = require('fs');
const path = './src/data/products.json';
const data = JSON.parse(fs.readFileSync(path, 'utf8'));

const globalProducts = [
  'GDL420', 'GDL418', 'GDL419', 'GDL414', 'KES170', 'KES171', 'KES172',
  'KES173', 'GES230', 'GES231', 'GES232', 'GES233', 'GES234', 'GES240',
  'GES241', 'GES242', 'GES243', 'GES244', 'KCL016', 'KCL060', 'KCL007',
  'KCL050', 'KCL051', 'KCL013', 'KCL019', 'KTL180', 'KTL181', 'GLF292',
  'GLF293', 'GLF295', 'GLF296', 'GLF297', 'KKP285A', 'KKP285B', 'KKP285C'
];

let updatedCount = 0;
for (const key in data) {
  const p = data[key];
  if (p.model) {
      const match = globalProducts.find(gp => p.model.toUpperCase().startsWith(gp.toUpperCase()));
      if (match) {
          p.brand = 'global';
          updatedCount++;
      }
  }
}

fs.writeFileSync(path, JSON.stringify(data, null, 2));
console.log('Updated ' + updatedCount + ' products.');

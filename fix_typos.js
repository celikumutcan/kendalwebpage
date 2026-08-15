const fs = require('fs');
const path = 'src/data/products.json';
let content = fs.readFileSync(path, 'utf8');

// Replace "Backlıght" with "Backlight" globally (case-sensitive)
// Also check for "BACKLIGHT" if there's any weird casing, but standard JS replace with 'g' flag should be enough for the specific typo.
const count1 = (content.match(/Backlıght/g) || []).length;
const count2 = (content.match(/BACKLıGHT/g) || []).length;
const count3 = (content.match(/backlıght/g) || []).length;

content = content.replace(/Backlıght/g, 'Backlight');
content = content.replace(/BACKLıGHT/g, 'BACKLIGHT');
content = content.replace(/backlıght/g, 'backlight');

if (count1 + count2 + count3 > 0) {
    fs.writeFileSync(path, content, 'utf8');
    console.log(`Replaced ${count1} 'Backlıght', ${count2} 'BACKLıGHT', ${count3} 'backlıght' typos.`);
} else {
    console.log('No typos found.');
}
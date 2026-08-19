const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const productsFilePath = path.join(__dirname, 'src', 'data', 'products.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf8'));

const imagesDir = path.join(__dirname, 'public', 'images', 'urunler');
const allFiles = fs.readdirSync(imagesDir);

let updatedCount = 0;

function getFileHash(filePath) {
    if (!fs.existsSync(filePath)) return null;
    const fileBuffer = fs.readFileSync(filePath);
    const hashSum = crypto.createHash('md5');
    hashSum.update(fileBuffer);
    return hashSum.digest('hex');
}

for (const key of Object.keys(products)) {
    const product = products[key];
    const id = product.id;
    const idLower = id.toLowerCase();
    
    // Find all potential images matching the ID
    const matchingImages = allFiles.filter(file => 
        file.toLowerCase().startsWith(idLower) && 
        (file.endsWith('.webp') || file.endsWith('.png') || file.endsWith('.jpg'))
    );
    
    if (matchingImages.length > 0) {
        const uniqueHashes = new Set();
        const finalImages = [];
        
        // 1. First, hash and add the main product image so we don't duplicate it
        if (product.image) {
            const mainImagePath = path.join(__dirname, 'public', 'images', product.image);
            const mainHash = getFileHash(mainImagePath);
            if (mainHash) {
                uniqueHashes.add(mainHash);
            }
        }
        
        // 2. Hash and process all matching images
        for (const img of matchingImages) {
            const fullPath = path.join(imagesDir, img);
            const hash = getFileHash(fullPath);
            
            if (hash && !uniqueHashes.has(hash)) {
                uniqueHashes.add(hash);
                // Keep this image because it's unique
                finalImages.push(`urunler/${img}`);
            }
        }
        
        // Only update if we found valid unique additional images
        if (finalImages.length > 0) {
            // we will overwrite the product.images with the clean, deduplicated list
            product.images = finalImages;
            updatedCount++;
        } else {
            // if there are no additional unique images, remove the field to keep JSON clean
            if (product.images && product.images.length > 0) {
                // Check if they previously had images that are now deemed duplicates
                delete product.images;
                updatedCount++;
            }
        }
    }
}

if (updatedCount > 0) {
    fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 2), 'utf8');
    console.log(`Updated ${updatedCount} products with clean, deduplicated multiple images.`);
} else {
    console.log('No products needed updates for images.');
}

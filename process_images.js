const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

async function processImages() {
    const desktopPath = 'C:\\Users\\umutcan.celik\\Desktop\\Yeni Fotoğraflar';
    const outputDir = path.join(__dirname, 'public', 'images', 'yeni-urunler');
    const productsJsonPath = path.join(__dirname, 'src', 'data', 'products.json');

    // Ensure output directory exists
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
    }

    // Read desktop files
    let files;
    try {
        files = fs.readdirSync(desktopPath);
    } catch (err) {
        console.error("Could not read Desktop folder:", err);
        return;
    }

    const imageFiles = files.filter(f => f.toLowerCase().endsWith('.jpg') || f.toLowerCase().endsWith('.png'));
    const processedModels = [];

    // Process and convert images
    for (const file of imageFiles) {
        const inputPath = path.join(desktopPath, file);
        const basename = path.parse(file).name; // e.g. KES170
        const webpFilename = `${basename}.webp`;
        const outputPath = path.join(outputDir, webpFilename);

        console.log(`Processing ${file} -> ${webpFilename}...`);
        
        try {
            await sharp(inputPath)
                .webp({ quality: 75 })
                .toFile(outputPath);
            
            processedModels.push({
                basename: basename, // e.g. KES170
                webpRelativePath: `yeni-urunler/${webpFilename}`
            });
        } catch (err) {
            console.error(`Error processing ${file}:`, err);
        }
    }

    console.log(`Processed ${processedModels.length} images.`);

    // Read and update products.json
    let productsData;
    try {
        productsData = JSON.parse(fs.readFileSync(productsJsonPath, 'utf8'));
    } catch (err) {
        console.error("Could not read products.json:", err);
        return;
    }

    let updatedCount = 0;

    Object.values(productsData).forEach(product => {
        // If the product doesn't have an image, or it's one of the ones we know are empty
        // Actually, let's just assign it if the model matches, even if it already has one,
        // because it ensures the new optimized image is used.
        for (const { basename, webpRelativePath } of processedModels) {
            // Check if the product model includes the basename (e.g., KSL6002-40W... includes KSL6002)
            // Or if it's an exact match.
            // Some models are "240214062825" which are exact matches.
            if (product.model.includes(basename)) {
                // If it already has an image and it's not empty, we override it.
                // But let's only override if it's empty, or if we are forcing an update.
                // Since user wants to assign these new images, we assign them.
                product.image = webpRelativePath;
                updatedCount++;
                break; // Stop checking other basenames for this product
            }
        }
    });

    // Write updated JSON
    fs.writeFileSync(productsJsonPath, JSON.stringify(productsData, null, 4));
    console.log(`Updated ${updatedCount} products in products.json.`);
}

processImages();

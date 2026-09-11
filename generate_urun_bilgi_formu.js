const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

const repoPath = 'C:/Users/umutcan.celik/Documents/GitHub/kendalwebpage';

const kendalLogoStr = path.join(repoPath, 'public/images/kendal-logo.svg');
const brandLogoStr = path.join(repoPath, 'public/images/brands/k2-logo.svg');
const productImagePathStr = path.join(repoPath, 'public/images/urunler/kes119-5wsari.webp');

const kendalLogoBase64 = fs.readFileSync(kendalLogoStr, 'base64');
const brandLogoBase64 = fs.readFileSync(brandLogoStr, 'base64');
const productBase64 = fs.readFileSync(productImagePathStr, 'base64');

const kendalLogo = `data:image/svg+xml;base64,${kendalLogoBase64}`;
const brandLogo = `data:image/svg+xml;base64,${brandLogoBase64}`;
const productImagePath = `data:image/webp;base64,${productBase64}`;

const htmlContent = `
<!DOCTYPE html>
<html lang="tr">
<head>
    <meta charset="UTF-8">
    <title>KES119 Ürün Bilgi Formu</title>
    <style>
        * {
            box-sizing: border-box;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
        }

        @page {
            margin: 0;
            size: A4;
        }

        body {
            font-family: Arial, Helvetica, sans-serif;
            margin: 0;
            padding: 0;
            color: #222;
            background-color: #fff;
            position: relative;
            min-height: 100vh;
            overflow: hidden;
        }

        /* HEADER */
        .header {
            background-color: #111;
            color: #fff;
            padding: 40px 52px 30px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-bottom: 4px solid #E60000;
            margin: 0 -2px; /* Bleed to prevent white line */
        }

        .logo-container img {
            height: 65px;
        }

        .header-text {
            text-align: right;
        }

        .header-text h1 {
            font-size: 26px;
            font-weight: 700;
            margin: 0 0 5px 0;
            letter-spacing: 1px;
            color: #fff;
        }

        .header-text h2 {
            font-size: 13px;
            font-weight: 400;
            color: #aaa;
            margin: 0;
            letter-spacing: 2px;
            text-transform: uppercase;
        }

        /* CONTENT */
        .content {
            padding: 40px 50px;
        }

        /* PRODUCT HERO */
        .product-hero {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            margin-bottom: 40px;
        }

        .product-info {
            flex: 1;
            padding-right: 30px;
        }

        .product-info h3 {
            font-size: 32px;
            font-weight: 800;
            color: #E60000;
            margin: 0 0 8px 0;
            line-height: 1.1;
            letter-spacing: -0.5px;
        }

        .product-info h4 {
            font-size: 18px;
            font-weight: 500;
            color: #666;
            margin: 0 0 20px 0;
        }

        .image-container {
            width: 280px;
            height: 280px;
            background: linear-gradient(145deg, #f0f0f0, #ffffff);
            border-radius: 16px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.06);
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 20px;
            border: 1px solid #eee;
        }

        .image-container img {
            max-width: 100%;
            max-height: 100%;
            object-fit: contain;
            filter: drop-shadow(0 15px 15px rgba(0,0,0,0.1));
        }

        /* SPECIFICATIONS */
        .specs-section {
            display: flex;
            gap: 40px;
        }

        .spec-column {
            flex: 1;
        }

        .section-title {
            font-size: 16px;
            font-weight: 700;
            color: #111;
            letter-spacing: 1px;
            margin-bottom: 20px;
            padding-bottom: 10px;
            border-bottom: 2px solid #E60000;
            display: inline-block;
        }

        .spec-table {
            width: 100%;
            border-collapse: separate;
            border-spacing: 0;
        }

        .spec-table tr:nth-child(even) td {
            background-color: #f9f9f9;
        }

        .spec-table td {
            padding: 12px 15px;
            font-size: 13px;
            line-height: 1.4;
            border-bottom: 1px solid #f0f0f0;
        }

        .spec-table td.label {
            font-weight: 600;
            color: #444;
            width: 45%;
        }

        .spec-table td.value {
            font-weight: 400;
            color: #111;
        }

        /* FOOTER */
        .footer {
            position: absolute;
            bottom: 0;
            left: -2px;
            right: -2px;
            background-color: #111;
            color: #888;
            padding: 20px 52px;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 11px;
        }

        .footer a {
            color: #fff;
            text-decoration: none;
            font-weight: 500;
            margin-left: 5px;
            margin-right: 15px;
        }

        .footer img {
            height: 20px;
            margin-left: 15px;
            vertical-align: middle;
        }
    </style>
</head>
<body>
    <div class="header">
        <div class="logo-container">
            <img src="${brandLogo}" alt="Brand Logo" />
        </div>
        <div class="header-text">
            <h1>ÜRÜN BİLGİ FORMU</h1>
            <h2>Product Information Sheet</h2>
        </div>
    </div>

    <div class="content">
        <div class="product-hero">
            <div class="product-info">
                <h3>KES119 RENKLİ<br>LED AMPUL</h3>
                <h4>KES119 COLORED LED BULB</h4>
            </div>
            <div class="image-container">
                <img src="${productImagePath}" alt="KES119" />
            </div>
        </div>

        <div class="specs-section">
            <div class="spec-column">
                <div class="section-title">TEKNİK ÖZELLİKLER / TECH SPECS</div>
                <table class="spec-table">
                    <tr><td class="label">Watt</td><td class="value">5W</td></tr>
                    <tr><td class="label">Lümen / Lumen</td><td class="value">420</td></tr>
                    <tr><td class="label">Duy / Socket</td><td class="value">E27</td></tr>
                    <tr><td class="label">Gerilim / Voltage</td><td class="value">220-240V</td></tr>
                    <tr><td class="label">Çalışma Ömrü / Life Span</td><td class="value">20000 Saat / Hours</td></tr>
                    <tr><td class="label">Ölçüler / Dimensions</td><td class="value">11.2 cm x 6 cm</td></tr>
                    <tr><td class="label">Koli Adedi / Package Qty</td><td class="value">100</td></tr>
                    <tr><td class="label">Özellik / Feature</td><td class="value">IC Driver / Alüminyum Isı Transfer Modülü / Yerli Üretim</td></tr>
                </table>
            </div>
            
            <div class="spec-column">
                <div class="section-title">VARYANT ÖZELLİKLERİ / VARIANTS</div>
                <table class="spec-table">
                    <tr><td class="label">Renk Seçenekleri / Colors</td><td class="value">Sarı, Kırmızı, Yeşil, Mavi, Beyaz</td></tr>
                    <tr><td class="label">Kategori / Category</td><td class="value">LED Ampuller / LED Bulbs</td></tr>
                    <tr><td class="label">Marka / Brand</td><td class="value">K2</td></tr>
                </table>
            </div>
        </div>
    </div>

    <div class="footer">
        Daha fazla bilgi için / For more information: <a href="https://www.kendalelektrik.com.tr">www.kendalelektrik.com.tr</a>
        | <img src="${kendalLogo}" alt="Kendal Elektrik Logo" />
    </div>
</body>
</html>
`;

(async () => {
    try {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        
        await page.setContent(htmlContent, { waitUntil: 'networkidle0' });
        
        const pdfPath = path.join('C:', 'Users', 'umutcan.celik', 'Desktop', 'KES119 Ürün Bilgi Formu.pdf');
        
        await page.pdf({
            path: pdfPath,
            format: 'A4',
            printBackground: true,
            margin: { top: '0', right: '0', bottom: '0', left: '0' }
        });
        
        await browser.close();
        console.log('PDF generated at:', pdfPath);
    } catch (e) {
        console.error('Error generating PDF:', e);
    }
})();

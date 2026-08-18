---
name: kendal-product-data
description: Use when fixing, enriching, or auditing product data in kendalwebpage's products.json or slug-map.json — filling missing attributes/categories, parsing HTML-embedded spec tables (e.g. EU Energy Labels), cleaning HTML from OpenCart-sourced fields, or reconciling data pulled from the kendalel_site MySQL database (oc_product, oc_product_description, oc_product_to_category, oc_category_description, oc_category_path, oc_seo_url, oc_product_attribute, oc_attribute_description).
---

# Kendal Elektrik — Ürün Veri Düzeltme Skill'i

## Ne zaman kullanılır
- `products.json` içinde eksik/boş attribute, kategori veya isim alanları düzeltilirken
- OpenCart MySQL (`kendalel_site`) tablolarından yeni veri çekip `products.json`/`slug-map.json`'a işlerken
- Ürün açıklamasındaki HTML içeriği temizlerken (örn. EU Energy Label tabloları)
- Bir ürünün slug'ının `slug-map.json` ile tutarlı olduğunu doğrularken

## Bilinen tuzaklar (önceden yaşanmış sorunlar)
1. **MySQL REGEXP_REPLACE büyük HTML input'ta sessizce NULL döner.** SQL içinde regex ile HTML temizleme yapma — önce ham veriyi çek, temizliği Python + BeautifulSoup ile yap.
2. **Kategori verisi tek tabloda değil.** Doğru kategori adı/yolu için `oc_product_to_category` → `oc_category_description` → `oc_category_path` join zinciri gerekiyor, tek tablo yeterli değil.
3. **EU Energy Label gibi spec tabloları açıklama HTML'i içine gömülü** (örn. KES007G4SARI, KES006G4SARI gibi ürünlerde ~28 attribute). Bunları attribute listesine çıkarırken tabloyu parse et, düz metne indirgeme.
4. **SEO URL / slug** `oc_seo_url` tablosundan gelir; `slug-map.json`'daki değerle eşleşmediğinde QR kod linkleri kırılır — her düzenlemeden sonra slug eşleşmesini kontrol et.

## Standart İş Akışı 1: Yeni Ürün Ekleme (Manuel JSON)
Kullanıcı chat'e ham JSON ve "fotoğrafları yükledim" dediğinde uygulanacak adımlar:
1. **JSON Temizliği:** JSON'da `Özellik 1`, `Özellik 2`, `Garanti` vb. dağınık etiketler varsa, bunları aralarına " / " koyarak tek bir `Özellik` (veya `Feature`) satırında birleştir.
2. **Bağımsız Model ID'si:** Kullanıcı aynı ürünün farklı boyutlarını (örn. `KDL4140_30x30`, `KDL4140_60x60`) tek model altında ("KDL4140") atsa bile, bunların varyant olarak gruplanmasını ÖNLEMEK için herbirinin `model` değerini KESİNLİKLE kendi `id` değeriyle eşitle (Örn: `model: "KDL4140_60X60"`).
3. **Eski Link / Slug Taşıma:** Kullanıcı eski bir linkin çalışmasını istiyorsa veya `%C3%BC` gibi URL encoded link atarsa, o linkin hem raw halini hem de decode/encode edilmiş halini `slug-map.json`'da yeni ürüne bağla. Eski ID'si olan ürünler varsa onları `products.json`'dan SİL.
4. **Fotoğraf İşleme:** Kök dizindeki yeni `.jpg` fotoğrafları bul. Node.js `sharp` ile `width: 800, height: 800, fit: 'inside', withoutEnlargement: true` ve `quality: 80` ayarlarıyla `public/images/urunler/<isim>.webp` olarak kaydet ve eski JPG'yi sil.
5. **Temizlik:** Kullandığın gecici Node scriptlerini root'tan sil ve `.next` cache'ini temizle (`Remove-Item -Recurse -Force .next`).

## Standart İş Akışı 2: MySQL Veri Çekme
1. Önce hangi ürünlerin eksik olduğunu tespit et (örn. `attributes_bos_urunler.csv` tarzı bir rapor üret).
2. SQL join'leri phpMyAdmin'de çalıştır, ham sonucu dışa aktar. HTML temizliği için Python kullan.
3. Değişikliği küçük, test edilebilir parçalar halinde uygula (2-3 üründe onay al).
4. Değişiklik sonrası rapor ver.

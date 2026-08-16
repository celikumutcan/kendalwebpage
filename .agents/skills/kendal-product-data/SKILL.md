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

## Standart iş akışı
1. Önce hangi ürünlerin eksik olduğunu tespit et (örn. `attributes_bos_urunler.csv` tarzı bir rapor üret veya var olanı kullan).
2. Eksik veri MySQL'den geliyorsa: SQL join'leri phpMyAdmin'de çalıştır, ham sonucu CSV/JSON olarak dışa aktar.
3. HTML temizliği/parse gereken alanlar için Python (BeautifulSoup) kullan, SQL içinde regex'e güvenme.
4. `products.json`'a yazmadan önce: aynı ürün için TR/EN isim, attribute sayısı, kategori, slug alanlarının hepsinin dolu olduğunu doğrula.
5. Değişikliği küçük, test edilebilir parçalar halinde uygula — büyük toplu yazma yapmadan önce örnek 2-3 üründe sonucu göster ve onay al (Umutcan'ın tercih ettiği çalışma şekli budur).
6. Slug değişmişse `slug-map.json`'ı da güncelle ve eşleşmeyi doğrula.

## Çıktı beklentisi
- Değişiklik sonrası hangi ürünlerin güncellendiğini, kaç attribute eklendiğini kısa bir özet olarak raporla.
- Kalıcı, tekrar kullanılabilir bir düzeltme ise (yeni bir join deseni, yeni bir parse fonksiyonu) bunu kısa not olarak belirt ki sonraki oturumda tekrar keşfetmek gerekmesin.

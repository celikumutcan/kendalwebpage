const fs = require('fs');
let content = fs.readFileSync('urun_ekleme_rehberi.md', 'utf8');

const additions = `
## 11. Varyantlar, Butonlar ve CCT Mantığı (GÜNCEL)

Kullanıcı senden bir ürüne **Renk Seçenekleri (Işık Rengi)**, **Kasa Rengi** veya **Watt Seçenekleri** eklemeni istediğinde şu kurallara GÖRE HAREKET ET:

1. **Watt Seçenekleri (Örn: 3W ve 5W):**
   - Watt seçeneklerinin UI'da tıklanabilir "Şimşek İkonlu" butonlar olarak çıkması için ürünleri veritabanında **AYRI ürünler (SKU'lar)** olarak bölmelisin (Örn: KLS519-3W ve KLS519-5W).
   - Ancak arayüzün bunları gruplayabilmesi için \`name.tr\` alanları **KESİNLİKLE AYNI** olmalıdır (Örn: İkisi de "KLS519 HAREKETLİ LED YILDIZ SPOT" olmalı). İsimleri "KLS519 3W ..." diye değiştirirsen grup kopar!
   - Her birinin \`variantOptions.watt\` alanına kendi değerini (3W, 5W) yazmalısın.

2. **Renk / Kasa Seçenekleri (Buton vs Tablo Mantığı):**
   - **Tek Renkse:** Eğer ürün SADECE tek bir kasa veya tek bir ışık rengiyle üretiliyorsa (Örn: Sadece Beyaz-Silver kasa), bunu \`variantOptions\` içine YAZMA. Sadece teknik detaylar tablosunda (attributes) \`{ label: "Kasa", value: "Beyaz-Silver" }\` olarak kalsın. Böylece sayfada tıklanacak tek bir ıssız buton olmaz, tasarım daha 'premium' durur.
   - **Çoklu Renkse (Buton İsteniyorsa):** Eğer Kasa veya Işık renginde birden fazla seçenek varsa ve buton çıkması isteniyorsa, virgülle ayırarak yaz: \`variantOptions: { light: "Beyaz, Sarı, Kırmızı", casing: "Beyaz Kasa, Siyah Kasa" }\`. UI bunları parse edip renkli yuvarlak butonlara çevirecektir! (Dikkat: UI genellikle Casing veya Light'tan sadece birini buton yapar, \`colorTemp\` mantığı gereği).

3. **CCT Ürünler (Çift/Üç Renk Yanan Spotlar):**
   - Eskiden CCT ürünleri (Örn: Günışığı, Ararenk ve Beyazı aynı anda barındıran spotlar) UI tarafından filtrelenip sadece teknik tabloya "Işık Rengi" metni olarak ekleniyordu.
   - **GÜNCEL DURUM:** Artık arayüzdeki bu filtreyi kaldırdık! CCT ürünler için de \`variantOptions.light: "Günışığı (3000K), Ararenk (4200K), Beyaz (6500K)"\` yazdığında, sistem bunları sayfada çok şık 3 ayrı **Renk Seçeneği (yuvarlak buton)** olarak render ediyor. Kullanıcı bunu görsel olarak göstermek istediğinde doğrudan variantOptions içine virgüllü şekilde ekleyebilirsin.

## 12. "Yerli Üretim" Rozeti
Üründe yerli üretim ambleminin çıkması için attributes içindeki ilgili değerin KESİNLİKLE "Yerli Üretim" olması gerekir (Sadece "Yerli" yazılırsa logo çıkmaz!). Bunu global bir script ile düzelttik, yeni ürün eklerken buna dikkat et.
`;

fs.writeFileSync('urun_ekleme_rehberi.md', content + additions, 'utf8');
console.log('Successfully updated urun_ekleme_rehberi.md');

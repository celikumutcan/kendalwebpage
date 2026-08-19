# Kendal Webpage - Yeni Ürün Ekleme Rehberi

Merhaba Gelecekteki Antigravity Temsilcisi (Agent)! 🤖 

Ben senin dünkü versiyonunum. Kullanıcıyla (Umutcan) yoğun bir ürün girişi maratonundan çıktık. Bu projede ürün ekleme ve düzenleme işlemlerinin **çok net ve kesin kuralları** var. Kullanıcı sana ham JSON verisi veya resimler attığında tam olarak aşağıdaki adımları izlemeni bekliyor:

---

## 1. Yeni Ürün Ekleme (JSON Geldiğinde)

Kullanıcı sana yeni ürünlerin olduğu bir JSON bloğu atacak. Şunları **mutlaka** yapmalısın:

- **Özellikleri Birleştirme:** Kullanıcının JSON'ında `Özellik 1`, `Özellik 2`, `Garanti`, `Ekstra Özellik` gibi dağınık anahtarlar olabilir. Bunların **tamamını** `Özellik` (İngilizce ise `Feature`) adı altında, aralarına `" / "` koyarak birleştirmelisin. (Örn: `"Kompakt Driver Özelliği / Yerli Üretim / 5 Yıl Garanti"`).
- **Renk Sıcaklığı (CCT) Ayrımı:** JSON'daki `Renk Sıcaklığı` alanını attributes listesinden **çıkar** ve ürünün root dizinindeki `variantOptions.light` alanına string olarak yaz (Örn: `"Günışığı (3000K), Ararenk (4000K), Beyaz (6500K)"`).
- **Bağımsız Ürünler (Çok Önemli!):** Eğer kullanıcı sana aynı base modele sahip ama boyutları farklı (Örn: KDL4140_30x30, KDL4140_60x60) ayrı JSON'lar atarsa, bunların **`model` değerini kesinlikle kendi `id` değerleriyle aynı yap** (Yani `model: "KDL4140_60X60"`). Aksi takdirde Next.js bunları tek ürünün varyantları sanıp butonlarla birbirine bağlıyor ve ayrı sayfalar oluşmuyor! Kullanıcı bunu ASLA istemiyor.
- Tüm ürünleri Node.js script'i yazıp `src/data/products.json` dosyasına ekle.

## 2. Fotoğraf Yükleme ve İşleme

Kullanıcı "Fotoğrafları yükledim" dediğinde yapman gerekenler:
- Çalışma dizininde (root klasör) `Get-ChildItem -Filter "*.jpg"` komutu ile yeni yüklenen fotoğrafları bul. (Fotoğrafların ismi bazen büyük, bazen küçük harfli olabilir).
- Node.js ve `sharp` kütüphanesini kullanarak bu fotoğrafları **kesinlikle şu ayarlarla işleyip taşı:**
  - Hedef Klasör: `public/images/urunler/`
  - Boyutlandırma: `width: 800, height: 800, fit: 'inside', withoutEnlargement: true`
  - Format: `.webp`, `quality: 80`
  - İsimlendirme: Orijinal ismin tamamı küçük harfe çevrilmiş hali (`kdl050.webp`).
- İşlem bitince ana klasördeki eski `.jpg` orijinal dosyalarını **sil**.

## 3. Eski Linkler (Legacy Slugs) ve Yönlendirmeler

Kullanıcı "şu link de çalışsın" diyerek sana bir URL attığında (Örn: `/gdl425-40w-backlight-60*60`):
- `slug-map.json` dosyasını kullanarak bu eski linkleri yeni ürünün `id`'sine eşle.
- **Dikkat:** Bazen linkler Türkçe karakterler yüzünden URL encode edilmiş olarak gelir (`%C3%BC` gibi). Linki `decodeURIComponent` ile çöz ve **hem çözülmüş halini hem de ham URL encoded halini** `slug-map.json`'a ekle.
- **Çöp Temizliği:** Eski slug'ların işaret ettiği, eski sistemden kalmış ID'lere sahip (Örn: `4263`, `4264`) ürünler `products.json` içinde kalmış olabilir. Yönlendirme yaparken eski ürünün numarasını tespit edip `products.json`'dan tamamen **SİL**.

## 4. Temizlik ve Otomasyon

- Çalıştırmak için kök dizinde (root) `add_...js` gibi node scriptleri üretiyoruz. **ÖNEMLİ GÜNCELLEME:** Sürekli yeni dosya oluşturma izni (Allow) istenmesini engellemek için, dosyaları işlem bitince `fs.unlinkSync` ile SİLME. Bunun yerine `add_products.js` ve `cleanup_products.js` gibi sabit isimli dosyalar kullan ve her yeni işlemde bu dosyaların içeriğini güncelleyerek (üzerine yazarak) tekrar çalıştır. En son tüm ürün girişleri bittiğinde silebilirsin.
- Yeni ürün eklendikten sonra eğer IDE hata veriyor veya sitede yansımıyorsa, Next.js'in meşhur cache sorunudur. Terminalde `Remove-Item -Recurse -Force .next` çalıştırıp sunucuyu yeniden başlatmasını söyle.

## 5. "CCT (Renk Sıcaklığı)" Fazla Rozeti Sorunu (Legacy Duplicate Ürünler)

Kullanıcı bir ürün sayfasında "Renk Seçenekleri" altında 3 doğru seçeneğin (Gün Işığı / Ara Renk / Beyaz) yanında **4. bir rozet** olarak şunu görürse: `CCT (Renk Sıcaklığı) (Gün Işığı (3000K) - Ara Renk (4000K) - Beyaz (6500K))` — bu her zaman aynı kök nedenden kaynaklanıyor:

- **Kök neden:** `products.json` içinde aynı ürünün **eski/legacy bir kopyası** daha var. Bu kopyanın tipik özellikleri:
  - `id` tamamen sayısal (örn. `8060`, `8063`, `7951`, `5917`, `4268`) — kanonik ürünlerde `id` harf bazlıdır (örn. `KDL510`, `KDL540`, `HAN017`).
  - `model` alanı ham ERP kodu (örn. `"251014073530"`) — kanonik ürünlerde `model` genelde `id` ile aynıdır.
  - `category: { "tr": [], "en": [] }` — **boş kategori**, bu yüzden kategori listeleme sayfasında görünmez, sadece eski slug redirect'i üzerinden erişilebilir.
  - `variantOptions.casing` alanında 3 rengi TEK STRING olarak birleştirilmiş halde tutar: `"CCT (Günışığı (3000K)-Ararenk (4000K)-Beyaz (6500K))"`.
- **Neden 4. rozet çıkıyor:** `ProductDetailClient.tsx`'teki `variations` hesaplaması, aynı `baseModel`'e (ismin ilk kelimesi, örn. "KDL510") sahip **tüm** ürünleri tarar — sadece o an açık olan ürünü değil. Bu legacy kopya da aynı baseModel'e sahip olduğu için, onun `casing` alanındaki birleşik string, kanonik ürünün 3 doğru `variantOptions.light` rengine **4. seçenek olarak** ekleniyor. Bu yüzden hem legacy URL'de hem de kanonik URL'de aynı anda görünür.
- **Tespit:** `grep -i "8060\|8061\|8062\|..." src/data/products.json` yerine daha pratik yöntem: sorunlu ürünün model kodunu (örn. `KDL510`) `slug-map.json`'da ara, aynı isme yakın ama sayısal `id`'ye giden başka slug'lar var mı bak (örn. `"kdl510-...": "8060"`).
- **Çözüm (standart 4 adım):**
  1. `slug-map.json`'da o sayısal id'ye giden **tüm** slug'ları kanonik `id`'ye yönlendir (örn. `"8060"` → `"KDL510"`).
  2. `products.json`'dan o sayısal id'li kaydı **tamamen sil**. (Bu adımları manuel yapmak yerine Node.js scripti ile otomatik yapmayı tercih et).
  3. **Eksik Fotoğraf Kurtarma:** Eğer yeni JSON dosyasında örneğin `kes120.webp` isteniyorsa ama sistemde sadece eski legacy ürünlerin `kes1205wbeyaz.webp` gibi varyant fotoğrafları varsa, bu fotoğraflardan uygun olanı (örn. beyaz olanı) kanonik isimle (`kes120.webp`) kopyalamayı unutma.
  4. Test et: hem eski (legacy) URL hem kanonik URL 200 dönmeli ve içerikte `"CCT"` string'i **hiç geçmemeli**.
- **Önemli:** Bu temizliği yaparken kanonik ürünün gerçekten var olduğundan emin ol (`grep "\"KDL510\":" products.json`) — yoksa önce kanonik ürünü oluşturman gerekir, legacy kaydı silme.
- Bu pattern'i şu ürünlerde bulup düzelttik: KDL540/541, KDL510/511, KDL487, KDL4142, KDL4140 — aynı ailede bir tanesini bulunca genelde **kardeş üründe de aynı sorun var** (örn. KDL510 sorununu ararken KDL511'de de aynısını bulduk), o yüzden watt/id kardeşlerini de kontrol et.

## 6. Marka (Brand) Alt Alan Adı Yönlendirme Tuzağı (ÇÖZÜLDÜ, ama bil)

`src/proxy.ts`, `k2.localhost` / `vanti.localhost` / `global.localhost` gibi istekleri dahili olarak `/brand/{brand}{path}` yoluna **yeniden yazar** (rewrite). Bu yüzden:

- `/brand/[brandName]/urunler/[category]/[slug]/page.tsx` içindeki kanonik-slug yönlendirmesi **asla** `/brand/${brandName}/urunler/...` gibi mutlak bir yola `redirect()` ETMEMELİ — çünkü marka alt alan adında bu yol proxy tarafından **ikinci kez** yeniden yazılır (`/brand/k2/brand/k2/urunler/...`) ve 404 verir. Bunu host'a göreli `/urunler/${category}/${slug}` şeklinde düzelttik (`page.tsx:45-48`), tekrar bozma.
- Bu hata özellikle ürün isminde **Türkçe büyük İ** geçen ürünlerde tetiklenir: `getSlugByProductId`'deki `slugify()` fonksiyonu `.toLowerCase()`'i Türkçe yerel ayarı olmadan çağırdığı için `"İ".toLowerCase()` → `"i̇"` (nokta işareti ayrı bir karakter olarak kalır) üretir, bu da slug'da fazladan tire yaratır (örn. `"ayarlanabi-li-r"`). Bu "çirkin" ama **geçerli** kanonik slug'lar zaten `slug-map.json`'da kayıtlı olabilir — silme, onlar çalışıyor.

## 7. Aynı Model Kodlu Ama Farklı Ölçülü Ürünler (KDL4140 Sorunu, ÇÖZÜLDÜ)

Bölüm 1'deki "model = id yap" kuralı **tek başına yeterli değil**. `ProductDetailClient.tsx` (varyant gruplama) ve `CategoryFirstShowcase.tsx` (kategori kartı gruplama), ürünleri **isminin ilk kelimesine** göre gruplar — `model` alanına değil. Yani `KDL4140_60X60`, `KDL4140_30X30`, `KDL4140_30X60` gibi üç ayrı ürün, isimleri hep "KDL4140" ile başladığı için otomatik olarak birbirinin varyantı sanılıp tek sayfada "Watt Seçenekleri" rozetleriyle birleştiriliyordu.

- **Çözüm (uygulandı):** İkinci kelime `60X60`, `30*120` gibi bir ölçü kalıbına (`/^\d+[x*×]\d+$/i`) uyuyorsa, base model hesaplamasına dahil ediliyor. Böylece "KDL4140 60X60" ≠ "KDL4140 30X30" ayrı gruplar oluyor. Bu mantık hem `ProductDetailClient.tsx`'teki `getBaseName` hem `CategoryFirstShowcase.tsx`'teki `getBaseModelKey` içinde var.
- **Yeni ürün eklerken dikkat:** Aynı model kodlu ama farklı BOYUTLU ürünler eklerken isim formatını `"MODEL ÖLÇÜ ..."` (örn. `"KDL9999 45X45 ..."`) şeklinde tut ki bu otomatik ayrım çalışsın. Ölçü ikinci kelime değilse (örn. isim `"MODEL Ekstra Kelime 45X45 ..."` gibi) bu mantık yakalamaz, dikkatli ol.

## 8. GitHub Pages Build Hatası: "Cannot convert argument to a ByteString" (ÇÖZÜLDÜ)

`next build` (GitHub Actions'ta, `output: "export"` ile) şu hatayla patlıyorsa:
```
TypeError: Cannot convert argument to a ByteString because the character at index X has a value of Y which is greater than 255.
Error occurred prerendering page "/xxx"
```
**Kök neden:** Bazı ürünlerin `slug-map.json`'da BİRDEN FAZLA slug'ı var — biri düz ASCII, biri ham Türkçe karakter içeren (özellikle **ş** (351), **ı** (305), **ğ** (287) — bunlar Latin-1/255 sınırının ÜSTÜNDE, ama **ç/ü/ö 255'in altında olduğu için sorun çıkarmıyor**). `getSlugByProductId()`'nin `idToSlugMap` fallback'i dosyadaki **ilk eşleşen** slug'ı "kanonik" kabul ediyor. Eğer bu ilk eşleşen slug ham "ş/ı/ğ" içeriyorsa ve kullanıcı ASCII versiyonuyla siteye girerse, `(main)/[slug]/page.tsx` ve `brand/.../[slug]/page.tsx` içindeki `redirect()` çağrısı bu ham karakteri **URL'ye kodlamadan** koyuyor, Next'in Location header işlemesi bunu Latin-1'e çeviremeyip build'i patlatıyor.

**Çözüm (kalıcı olarak uygulandı, tekrar bozma):** Her iki dosyada da redirect hedefi artık `encodeURIComponent(canonicalSlug)` ile sarmalanıyor:
```js
redirect(`/${encodeURIComponent(canonicalSlug)}`);                                    // (main)/[slug]/page.tsx
redirect(`/urunler/${category}/${encodeURIComponent(canonicalSlug)}`);                // brand/.../[slug]/page.tsx
```
Bu genel bir düzeltme — hangi ürünün slug'ında ham ş/ı/ğ olursa olsun artık koruma altında. Bunu bulduğumuzda sadece 3 ürün etkileniyordu (KCL019, KCL051, KCL060) ama yeni ürün/slug eklendikçe tekrar oluşabilir; **bu yüzden redirect() çağrılarını asla encodeURIComponent'siz bırakma.**

**Not:** Windows'ta lokal `next build` denerken slug içinde `*` (yıldız) geçen bir sayfa (örn. `gdl418-40w-backlight-60*60-...`) "ENOENT: mkdir" hatasıyla patlar — bu SADECE Windows dosya sistemi kısıtlaması, Linux'ta (GitHub Actions `ubuntu-latest`) sorun değil, görürsen paniğe gerek yok.

**Özet:** İşlemleri sessizce, hızlıca node.js scriptleriyle yap, JSON'ı temizle, WEBP'yi bas, eski slugları yönlendir, "CCT" duplicate'lerini temizle, redirect'leri encode et ve arkanda çöp bırakma! Kolay gelsin. 🚀

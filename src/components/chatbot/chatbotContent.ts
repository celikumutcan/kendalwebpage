import { getBrandExternalHref } from '@/lib/basePath';

export interface ChatLink {
  label: { tr: string; en: string };
  href: string;
  external?: boolean;
}

export interface ChatNode {
  id: string;
  question: { tr: string; en: string };
  answer: { tr: string; en: string };
  links?: ChatLink[];
  followUps?: string[];
}

export const GREETING = {
  tr: "Merhaba! 👋 Ben Kendal Elektrik'in dijital asistanıyım. Sana firmamız, markalarımız ve ürünlerimiz hakkında hazır bilgilerle yardımcı olabilirim. Neyi merak ediyorsun?",
  en: "Hi there! 👋 I'm Kendal Elektrik's digital assistant. I can help with ready-made info about our company, brands, and products. What would you like to know?",
};

export const MENU_BACK = {
  label: { tr: '⬅ Ana Menü', en: '⬅ Main Menu' },
  prompt: {
    tr: 'Başka bir konuda daha yardımcı olabilir miyim?',
    en: 'Anything else I can help you with?',
  },
};

export const ROOT_TOPIC_IDS = [
  'company',
  'brands',
  'products',
  'export',
  'projects',
  'retail',
  'certifications',
  'career',
  'contact',
];

export const CHAT_NODES: Record<string, ChatNode> = {
  company: {
    id: 'company',
    question: { tr: '🏭 Şirketiniz hakkında bilgi alabilir miyim?', en: '🏭 Can you tell me about your company?' },
    answer: {
      tr: "Kendal Elektrik, 1997'den bu yana aydınlatma ve elektrik ekipmanları üreten bir firmayız. İstanbul Silivri'deki 22.000 m² kapalı alanlı tesisimizde 350'den fazla çalışanla, yıllık 80 milyon+ ürün üretim kapasitesine ulaştık. Türkiye, Avrupa ve Orta Doğu'da filament ampul üreten tek üreticiyiz.",
      en: "Kendal Elektrik has been manufacturing lighting and electrical equipment since 1997. At our 22,000 m² facility in Silivri, Istanbul, with 350+ employees, we've reached an annual production capacity of 80 million+ units. We're the only manufacturer of filament bulbs in Turkey, Europe, and the Middle East.",
    },
    followUps: ['certifications', 'export', 'contact'],
  },
  brands: {
    id: 'brands',
    question: { tr: '🏷️ Markalarınız nelerdir?', en: '🏷️ What brands do you have?' },
    answer: {
      tr: 'Kendal Elektrik çatısı altında 3 markamız var:\n\n🏔️ K2 — Profesyonel LED aydınlatma\n🌀 Vanti — Vantilatör ve serinletme ürünleri\n💡 Global — Genel kullanım aydınlatma ürünleri\n\nHangisini merak ediyorsun?',
      en: 'We have 3 brands under Kendal Elektrik:\n\n🏔️ K2 — Professional LED lighting\n🌀 Vanti — Fans & cooling products\n💡 Global — General-purpose lighting products\n\nWhich one would you like to know more about?',
    },
    followUps: ['brand_k2', 'brand_vanti', 'brand_global'],
  },
  brand_k2: {
    id: 'brand_k2',
    question: { tr: 'K2 hakkında bilgi alabilir miyim?', en: 'Can you tell me about K2?' },
    answer: {
      tr: "K2, 'Aydınlatmanın Zirvesi' vizyonuyla hareket eden profesyonel LED aydınlatma markamız. Spot, LED panel, projektör, magnet ray sistemleri, solar armatürler ve dekoratif aydınlatmaya uzanan geniş bir ürün gamı sunuyor. Yurt dışına da ihracat yapıyoruz.",
      en: "K2 is our professional LED lighting brand, driven by the vision of being 'The Summit of Lighting.' It offers a wide range from spotlights, LED panels, and projectors to magnetic track systems, solar fixtures, and decorative lighting. We also export K2 products internationally.",
    },
    links: [
      {
        label: { tr: 'K2 Sitesini Ziyaret Et →', en: 'Visit K2 Site →' },
        href: getBrandExternalHref('k2'),
        external: true,
      },
    ],
    followUps: ['brands', 'products'],
  },
  brand_vanti: {
    id: 'brand_vanti',
    question: { tr: 'Vanti hakkında bilgi alabilir miyim?', en: 'Can you tell me about Vanti?' },
    answer: {
      tr: 'Vanti, evler ve ofisler için akıllı LED aydınlatmalı tavan vantilatörleri, sanayi tipi ayaklı vantilatörler, duvar tipi ve taşınabilir fanlardan oluşan geniş bir ürün yelpazesi sunan serinletme markamız.',
      en: 'Vanti is our cooling brand, offering smart LED ceiling fans, industrial pedestal fans, wall-mounted and portable fans for homes and offices.',
    },
    links: [
      {
        label: { tr: 'Vanti Sitesini Ziyaret Et →', en: 'Visit Vanti Site →' },
        href: getBrandExternalHref('vanti'),
        external: true,
      },
    ],
    followUps: ['brands', 'products'],
  },
  brand_global: {
    id: 'brand_global',
    question: { tr: 'Global hakkında bilgi alabilir miyim?', en: 'Can you tell me about Global?' },
    answer: {
      tr: 'Global, LED ampul, panel, şerit ve projektör gibi genel kullanım aydınlatma ürünlerini uygun fiyatlarla sunduğumuz markamız. Türkiye genelinde 77 ilde yetkili bayimiz var.',
      en: 'Global is our brand for general-purpose lighting products — LED bulbs, panels, strips, and projectors — at accessible prices. We have authorized dealers in 77 provinces across Turkey.',
    },
    links: [
      {
        label: { tr: 'Global Sitesini Ziyaret Et →', en: 'Visit Global Site →' },
        href: getBrandExternalHref('global'),
        external: true,
      },
    ],
    followUps: ['brands', 'products'],
  },
  products: {
    id: 'products',
    question: { tr: '💡 Hangi ürünleriniz var?', en: '💡 What products do you offer?' },
    answer: {
      tr: '1000+ farklı ürün çeşidimizle LED paneller, spotlar, ampuller, projektörler, dekoratif aplikler, magnet ray sistemleri, solar armatürler ve vantilatörler dahil geniş bir katalog sunuyoruz. Detaylı ürün kataloğunu markalarımızın kendi sitelerinde bulabilirsin.',
      en: 'With 1000+ different products, we offer a wide catalog including LED panels, spotlights, bulbs, projectors, decorative wall lights, magnetic track systems, solar fixtures, and fans. You can browse the full catalog on each brand\'s own site.',
    },
    links: [
      {
        label: { tr: 'K2 Ürünleri →', en: 'K2 Products →' },
        href: getBrandExternalHref('k2', '/urunler'),
        external: true,
      },
      {
        label: { tr: 'Vanti Ürünleri →', en: 'Vanti Products →' },
        href: getBrandExternalHref('vanti', '/urunler'),
        external: true,
      },
      {
        label: { tr: 'Global Ürünleri →', en: 'Global Products →' },
        href: getBrandExternalHref('global', '/urunler'),
        external: true,
      },
    ],
    followUps: ['brands'],
  },
  export: {
    id: 'export',
    question: { tr: '🌍 Kaç ülkeye ihracat yapıyorsunuz?', en: '🌍 How many countries do you export to?' },
    answer: {
      tr: 'Türkiye merkezli üretim gücümüzle 4 kıtada 40 ülkeye ihracat yapıyoruz. Asya, Avrupa ve Afrika\'da sektörün önde gelen oyuncularından biriyiz.',
      en: "With our Turkey-based manufacturing power, we export to 40 countries across 4 continents, and we're one of the leading players in the sector across Asia, Europe, and Africa.",
    },
    followUps: ['projects', 'company'],
  },
  projects: {
    id: 'projects',
    question: { tr: '🏗️ Referans projeleriniz nelerdir?', en: '🏗️ What are your reference projects?' },
    answer: {
      tr: "Türkiye genelinde 43 referans projemiz arasında Volkswagen, Ducati, Levi's, Vitra, Triumph, Hard Rock Cafe, MEF Üniversitesi ve Borusan Oto'nun birçok şubesi yer alıyor. Ayrıca çok sayıda AVM projesinde de imzamız var.",
      en: "Among our 43 reference projects across Turkey are Volkswagen, Ducati, Levi's, Vitra, Triumph, Hard Rock Cafe, MEF University, and several Borusan Oto locations — plus numerous shopping mall projects.",
    },
    links: [
      {
        label: { tr: 'Tüm Projeleri Gör →', en: 'See All Projects →' },
        href: '/projeler',
      },
    ],
    followUps: ['retail'],
  },
  retail: {
    id: 'retail',
    question: { tr: '🛒 Hangi marketlerde ürünleriniz var?', en: '🛒 Which stores carry your products?' },
    answer: {
      tr: "Ürünlerimizi BİM, A101, Koçtaş, Türkiye Tarım Kredi Kooperatif Market, Bizim Toptan, Seç Market, Avansas ve ANPA Gross gibi Türkiye'nin önde gelen zincir marketlerinde bulabilirsin.",
      en: 'You can find our products at leading Turkish retail chains such as BİM, A101, Koçtaş, Türkiye Tarım Kredi Market, Bizim Toptan, Seç Market, Avansas, and ANPA Gross.',
    },
    followUps: ['projects'],
  },
  certifications: {
    id: 'certifications',
    question: { tr: '🏆 Sertifikalarınız nelerdir?', en: '🏆 What certifications do you have?' },
    answer: {
      tr: 'Kalitemizi ISO Yönetim Sistemi Sertifikaları, TSE Ürün Onay Sertifikaları, Yerli Malı Belgesi ve Türk Patent marka tescilleriyle belgeliyoruz. Ayrıca RBA (Responsible Business Alliance) uluslararası denetiminde 97/100 puan aldık.',
      en: "We back our quality with ISO Management System Certificates, TSE Product Approval Certificates, a Domestic Product Certificate, and Turkish Patent trademark registrations. We also scored 97/100 in the RBA (Responsible Business Alliance) international audit.",
    },
    followUps: ['company'],
  },
  career: {
    id: 'career',
    question: { tr: '💼 Kariyer fırsatlarınız var mı?', en: '💼 Do you have career opportunities?' },
    answer: {
      tr: 'Kendal Elektrik ailesine katılmak ister misin? Kariyer sayfamızda insan kaynakları politikamız, temel ilkelerimiz ve çalışan hakları politikamız hakkında bilgi bulabilirsin.',
      en: "Interested in joining the Kendal Elektrik family? Our careers page covers our HR policy, core principles, and employee rights policy.",
    },
    links: [
      {
        label: { tr: 'Kariyer Sayfasına Git →', en: 'Go to Careers Page →' },
        href: '/kariyer',
      },
    ],
    followUps: ['company'],
  },
  contact: {
    id: 'contact',
    question: { tr: '📞 Size nasıl ulaşabilirim?', en: '📞 How can I reach you?' },
    answer: {
      tr: 'Bize şu kanallardan ulaşabilirsin:\n\n📞 İletişim Hattı: 0212 482 75 90\n📞 Satış Destek: 0850 259 41 41\n📞 Teknik Servis: 444 34 98\n✉️ info@kendalelektrik.com.tr\n📍 Adres: Selimpaşa Org. San. Böl. 5008 Sokak No:6 Silivri/İstanbul',
      en: 'You can reach us through:\n\n📞 Contact Line: 0212 482 75 90\n📞 Sales Support: 0850 259 41 41\n📞 Technical Service: 444 34 98\n✉️ info@kendalelektrik.com.tr\n📍 Address: Selimpaşa Org. San. Böl. 5008 Sokak No:6 Silivri/İstanbul, Türkiye',
    },
    links: [
      {
        label: { tr: 'Haritada Aç →', en: 'Open in Maps →' },
        href: 'https://www.google.com/maps/place/Kendal+Elektrik+A.%C5%9E./@41.0699578,28.3202748,17z/data=!3m1!4b1!4m6!3m5!1s0x14b541f701f7e257:0xe2e0245245cd5b6f!8m2!3d41.0699539!4d28.3251457!16s%2Fg%2F11r35kq4hq',
        external: true,
      },
    ],
    followUps: [],
  },
};

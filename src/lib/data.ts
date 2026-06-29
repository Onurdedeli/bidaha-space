import type { Product, Experience, ProductCategory } from "./types";

export const PRODUCT_CATEGORIES: { value: ProductCategory; label: string; emoji: string }[] = [
  { value: "tshirt", label: "Tişört", emoji: "👕" },
  { value: "hoodie", label: "Sweat & Hoodie", emoji: "🧥" },
  { value: "vinyl", label: "Plak", emoji: "💿" },
  { value: "photocard", label: "Photocard", emoji: "🎴" },
  { value: "lightstick", label: "Lightstick", emoji: "🪄" },
  { value: "poster", label: "Poster & Baskı", emoji: "🖼️" },
  { value: "pin", label: "Rozet", emoji: "📌" },
  { value: "sapka", label: "Şapka", emoji: "🧢" },
  { value: "aksesuar", label: "Aksesuar", emoji: "🎒" },
];

const sizes = (stockMap: Record<string, number>) =>
  Object.entries(stockMap).map(([value, stock]) => ({ label: "Beden", value, stock }));

const colors = (list: [string, number][]) =>
  list.map(([value, stock]) => ({ label: "Renk", value, stock }));

const models = (list: [string, number][]) =>
  list.map(([value, stock]) => ({ label: "Model", value, stock }));

const TSHIRT_SIZES = { XS: 8, S: 18, M: 30, L: 26, XL: 14, XXL: 6 };

export const products: Product[] = [
  // ── Manifest (pembe) ─────────────────────────────────────────
  {
    id: "p-man-tee",
    slug: "manifest-manifestival-tour-tisort",
    type: "product",
    name: "Manifest — Manifestival Tour Tişört",
    category: "tshirt",
    artist: "Manifest",
    price: 749,
    compareAtPrice: 899,
    currency: "TRY",
    image: "👕",
    badge: "Yeni Drop",
    description:
      "Manifestival turuna özel, %100 organik pamuk oversize kalıp. Sırtta tur tarihleri, ön göğüste grup amblemi.",
    sizes: sizes(TSHIRT_SIZES),
    colors: colors([["Beyaz", 36], ["Pembe", 24], ["Siyah", 28]]),
    models: models([["Tur Afişi", 28], ["Grup Foto", 22], ["Logo", 30]]),
    rating: 4.9,
    reviewCount: 214,
    featured: true,
  },
  {
    id: "p-man-photocard",
    slug: "manifest-photocard-seti",
    type: "product",
    name: "Manifest — Photocard Seti (8'li)",
    category: "photocard",
    artist: "Manifest",
    price: 349,
    currency: "TRY",
    image: "🎴",
    badge: "Çok Satan",
    description: "Mat lamine, koleksiyonluk 8'li photocard seti. Holografik imza baskılı sınırlı kart dahil.",
    rating: 4.8,
    reviewCount: 176,
    featured: true,
  },
  {
    id: "p-man-lightstick",
    slug: "manifest-lightstick",
    type: "product",
    name: "Manifest — Resmî Lightstick",
    category: "lightstick",
    artist: "Manifest",
    price: 1290,
    currency: "TRY",
    image: "🪄",
    badge: "Resmî",
    description: "Konser senkronizasyonlu resmî lightstick. Bluetooth bağlanır, sahneyle aynı renge döner.",
    rating: 4.9,
    reviewCount: 92,
    featured: true,
  },
  // ── Ajda Pekkan (altın) ──────────────────────────────────────
  {
    id: "p-ajd-vinyl",
    slug: "ajda-pekkan-superstar-vinyl",
    type: "product",
    name: "Ajda Pekkan — Süperstar Vinyl Reissue",
    category: "vinyl",
    artist: "Ajda Pekkan",
    price: 899,
    compareAtPrice: 1099,
    currency: "TRY",
    image: "💿",
    badge: "Reissue",
    description: "Klasik Süperstar albümünün remastered 180g plak yeniden basımı. Gatefold kapak, dönem fotoğrafları.",
    rating: 5.0,
    reviewCount: 64,
    featured: true,
  },
  {
    id: "p-ajd-poster",
    slug: "ajda-pekkan-limited-poster",
    type: "product",
    name: "Ajda Pekkan — Numaralı Dönem Posteri",
    category: "poster",
    artist: "Ajda Pekkan",
    price: 459,
    currency: "TRY",
    image: "🖼️",
    badge: "Limited 500",
    description: "Numaralandırılmış, lisanslı serigrafi baskı poster. 50x70 cm, müze kalitesinde mat kağıt.",
    rating: 5.0,
    reviewCount: 41,
    featured: true,
  },
  {
    id: "p-ajd-hoodie",
    slug: "ajda-pekkan-diva-hoodie",
    type: "product",
    name: "Ajda Pekkan — Diva Hoodie",
    category: "hoodie",
    artist: "Ajda Pekkan",
    price: 1290,
    currency: "TRY",
    image: "🧥",
    description: "Ağır gramajlı kapüşonlu sweatshirt, dönem estetiğinde altın işleme.",
    sizes: sizes({ S: 10, M: 18, L: 15, XL: 7 }),
    colors: colors([["Siyah", 20], ["Krem", 16]]),
    rating: 4.7,
    reviewCount: 58,
    featured: true,
  },
  // ── Hayko Cepkin (kızıl) ─────────────────────────────────────
  {
    id: "p-hay-tee",
    slug: "hayko-cepkin-sahne-tisort",
    type: "product",
    name: "Hayko Cepkin — Sahne Yangını Tişört",
    category: "tshirt",
    artist: "Hayko Cepkin",
    price: 769,
    currency: "TRY",
    image: "👕",
    badge: "Çok Satan",
    description: "Ağır gramajlı pamuk, oversize kalıp. Teatral sahne temalı büyük ön baskı.",
    sizes: sizes(TSHIRT_SIZES),
    colors: colors([["Siyah", 42], ["Antrasit", 20]]),
    models: models([["Sahne Afişi", 26], ["Alev Logo", 30], ["Minimal İmza", 14]]),
    rating: 4.9,
    reviewCount: 134,
    featured: true,
  },
  {
    id: "p-hay-pin",
    slug: "hayko-cepkin-enamel-pin-seti",
    type: "product",
    name: "Hayko Cepkin — Alev Enamel Pin Seti",
    category: "pin",
    artist: "Hayko Cepkin",
    price: 299,
    currency: "TRY",
    image: "📌",
    badge: "Yeni",
    description: "Sert mineli (enamel) 4'lü rozet seti. Alev, gitar, logo ve sahne maskotu tasarımları.",
    rating: 4.7,
    reviewCount: 73,
    featured: true,
  },
  {
    id: "p-hay-hoodie",
    slug: "hayko-cepkin-teatral-hoodie",
    type: "product",
    name: "Hayko Cepkin — Teatral Hoodie",
    category: "hoodie",
    artist: "Hayko Cepkin",
    price: 1390,
    currency: "TRY",
    image: "🧥",
    description: "Fırçalı iç yüzey, ağır gramajlı kapüşonlu sweatshirt. Kol ucunda alev logo.",
    sizes: sizes({ S: 8, M: 16, L: 12, XL: 6 }),
    colors: colors([["Siyah", 22], ["Bordo", 14]]),
    rating: 4.8,
    reviewCount: 49,
  },
  // ── Fatma Turgut (teal) ──────────────────────────────────────
  {
    id: "p-fat-vinyl",
    slug: "fatma-turgut-imzali-vinyl",
    type: "product",
    name: "Fatma Turgut — İmzalı Plak",
    category: "vinyl",
    artist: "Fatma Turgut",
    price: 949,
    currency: "TRY",
    image: "💿",
    badge: "İmzalı",
    description: "Sanatçı tarafından imzalanmış sınırlı sayıda 180g plak. Numaralandırılmış sertifika dahil.",
    rating: 5.0,
    reviewCount: 38,
    featured: true,
  },
  {
    id: "p-fat-tee",
    slug: "fatma-turgut-akustik-tour-tisort",
    type: "product",
    name: "Fatma Turgut — Akustik Tur Tişörtü",
    category: "tshirt",
    artist: "Fatma Turgut",
    price: 699,
    currency: "TRY",
    image: "👕",
    description: "Yumuşak süprem kumaş, regular kalıp. Akustik tur temalı minimal ön baskı.",
    sizes: sizes(TSHIRT_SIZES),
    colors: colors([["Beyaz", 30], ["Petrol", 18], ["Siyah", 22]]),
    models: models([["Tur Logosu", 24], ["Minimal İmza", 26], ["Albüm Kapağı", 16]]),
    rating: 4.7,
    reviewCount: 81,
    featured: true,
  },
  {
    id: "p-fat-poster",
    slug: "fatma-turgut-konser-posteri",
    type: "product",
    name: "Fatma Turgut — Konser Posteri",
    category: "poster",
    artist: "Fatma Turgut",
    price: 399,
    currency: "TRY",
    image: "🖼️",
    description: "Numaralandırılmış serigrafi baskı konser posteri. 50x70 cm mat kağıt.",
    rating: 4.6,
    reviewCount: 27,
  },
];

/** Deneyim katalogu (kart verisi homepage'de `experiencesHome` ile gösterilir). */
export const experiences: Experience[] = [];

export const allItems = [...products, ...experiences];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getExperienceBySlug(slug: string): Experience | undefined {
  return experiences.find((e) => e.slug === slug);
}

export function findItem(slug: string) {
  return allItems.find((i) => i.slug === slug);
}

export function getProductsByArtist(artist: string): Product[] {
  return products.filter((p) => p.artist === artist);
}

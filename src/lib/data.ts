import type { Product, Experience, ProductCategory } from "./types";

export const PRODUCT_CATEGORIES: { value: ProductCategory; label: string; emoji: string }[] = [
  { value: "tshirt", label: "Tişört", emoji: "👕" },
  { value: "hoodie", label: "Sweat & Hoodie", emoji: "🧥" },
  { value: "sapka", label: "Şapka", emoji: "🧢" },
  { value: "aksesuar", label: "Aksesuar", emoji: "🎒" },
  { value: "poster", label: "Poster & Baskı", emoji: "🖼️" },
];

const sizes = (stockMap: Record<string, number>) =>
  Object.entries(stockMap).map(([value, stock]) => ({ label: "Beden", value, stock }));

const colors = (list: [string, number][]) =>
  list.map(([value, stock]) => ({ label: "Renk", value, stock }));

const models = (list: [string, number][]) =>
  list.map(([value, stock]) => ({ label: "Model", value, stock }));

/** Standart tişört bedenleri + canlı stok */
const TSHIRT_SIZES = { XS: 8, S: 18, M: 30, L: 26, XL: 14, XXL: 6 };

export const products: Product[] = [
  // ── Mor ve Ötesi ─────────────────────────────────────────────
  {
    id: "p-mvo-01",
    slug: "mor-ve-otesi-bir-derdim-var-tisort",
    type: "product",
    name: "Mor ve Ötesi — Bir Derdim Var Tişört",
    category: "tshirt",
    artist: "Mor ve Ötesi",
    price: 749,
    compareAtPrice: 899,
    currency: "TRY",
    image: "👕",
    badge: "Çok Satan",
    description:
      "%100 organik pamuk, oversize kalıp. Albüm temalı ön baskı, sırtta lirik dizesi. Konser gecesi terletmeyen kumaş.",
    sizes: sizes(TSHIRT_SIZES),
    colors: colors([["Siyah", 40], ["Antrasit", 22], ["Beyaz", 18]]),
    models: models([["Albüm Kapağı", 30], ["Tur Logosu", 24], ["Minimal İmza", 16]]),
    rating: 4.9,
    reviewCount: 218,
    featured: true,
  },
  {
    id: "p-mvo-02",
    slug: "mor-ve-otesi-outline-hoodie",
    type: "product",
    name: "Mor ve Ötesi — Outline Hoodie",
    category: "hoodie",
    artist: "Mor ve Ötesi",
    price: 1290,
    compareAtPrice: 1490,
    currency: "TRY",
    image: "🧥",
    description:
      "Fırçalı iç yüzey, ağır gramajlı kapüşonlu sweatshirt. Kol ucunda grup logosu, kapüşon içi desenli astar.",
    sizes: sizes({ S: 10, M: 18, L: 15, XL: 7 }),
    colors: colors([["Mor", 20], ["Siyah", 16]]),
    rating: 4.8,
    reviewCount: 156,
    featured: true,
  },
  // ── Manifest ─────────────────────────────────────────────────
  {
    id: "p-man-01",
    slug: "manifest-tour-tisort",
    type: "product",
    name: "Manifest — Sahne Tur Tişörtü",
    category: "tshirt",
    artist: "Manifest",
    price: 699,
    currency: "TRY",
    image: "👕",
    badge: "Yeni",
    description:
      "Regular kalıp, yumuşak süprem kumaş. Tur tarihleri sırt baskısı, ön göğüste grup amblemi.",
    sizes: sizes(TSHIRT_SIZES),
    colors: colors([["Beyaz", 36], ["Pembe", 24], ["Siyah", 28]]),
    models: models([["Tur Afişi", 28], ["Grup Foto", 22], ["Logo", 30]]),
    rating: 4.8,
    reviewCount: 142,
    featured: true,
  },
  {
    id: "p-man-02",
    slug: "manifest-snapback-sapka",
    type: "product",
    name: "Manifest — İşlemeli Snapback",
    category: "sapka",
    artist: "Manifest",
    price: 549,
    currency: "TRY",
    image: "🧢",
    description:
      "Ayarlanabilir snapback şapka, işlemeli logo. Su itici dış yüzey.",
    colors: colors([["Pembe", 26], ["Siyah", 30], ["Krem", 18]]),
    rating: 4.6,
    reviewCount: 88,
    featured: true,
  },
  // ── Yalın ────────────────────────────────────────────────────
  {
    id: "p-yal-01",
    slug: "yalin-anlat-guzelmi-tisort",
    type: "product",
    name: "Yalın — Anlat Güzel mi Tişört",
    category: "tshirt",
    artist: "Yalın",
    price: 679,
    currency: "TRY",
    image: "👕",
    description:
      "Yaz konserleri için hafif süprem kumaş, regular kalıp. Şarkı temalı minimal ön baskı.",
    sizes: sizes(TSHIRT_SIZES),
    colors: colors([["Beyaz", 38], ["Lacivert", 26], ["Mint", 14]]),
    models: models([["Şarkı Sözü", 26], ["Minimal İmza", 28], ["Albüm Kapağı", 18]]),
    rating: 4.7,
    reviewCount: 119,
    featured: true,
  },
  {
    id: "p-yal-02",
    slug: "yalin-tote-canta",
    type: "product",
    name: "Yalın — Konser Tote Çanta",
    category: "aksesuar",
    artist: "Yalın",
    price: 299,
    currency: "TRY",
    image: "🎒",
    description: "Kalın kanvas tote çanta, geniş hacim. İmza serigrafi baskı.",
    rating: 4.5,
    reviewCount: 64,
  },
  // ── Ajda Pekkan ──────────────────────────────────────────────
  {
    id: "p-ajd-01",
    slug: "ajda-pekkan-superstar-tisort",
    type: "product",
    name: "Ajda Pekkan — Süperstar Dönem Tişört",
    category: "tshirt",
    artist: "Ajda Pekkan",
    price: 799,
    compareAtPrice: 949,
    currency: "TRY",
    image: "👕",
    badge: "İkonik",
    description:
      "Retro dönem estetiğinde özel baskı, premium pamuk. Vintage yıkamalı görünüm.",
    sizes: sizes(TSHIRT_SIZES),
    colors: colors([["Siyah", 30], ["Altın Sarısı", 16], ["Beyaz", 22]]),
    models: models([["Dönem Afişi", 20], ["Diva Portre", 18], ["Minimal İmza", 24]]),
    rating: 5.0,
    reviewCount: 96,
    featured: true,
  },
  {
    id: "p-ajd-02",
    slug: "ajda-pekkan-limited-poster",
    type: "product",
    name: "Ajda Pekkan — Numaralı Dönem Posteri",
    category: "poster",
    artist: "Ajda Pekkan",
    price: 459,
    currency: "TRY",
    image: "🖼️",
    badge: "Limited 500",
    description:
      "Numaralandırılmış, lisanslı serigrafi baskı poster. 50x70 cm, müze kalitesinde mat kağıt.",
    rating: 5.0,
    reviewCount: 41,
    featured: true,
  },
  // ── Hayko Cepkin ─────────────────────────────────────────────
  {
    id: "p-hay-01",
    slug: "hayko-cepkin-sahne-tisort",
    type: "product",
    name: "Hayko Cepkin — Sahne Yangını Tişört",
    category: "tshirt",
    artist: "Hayko Cepkin",
    price: 769,
    currency: "TRY",
    image: "👕",
    badge: "Çok Satan",
    description:
      "Ağır gramajlı pamuk, oversize kalıp. Teatral sahne temalı büyük ön baskı.",
    sizes: sizes(TSHIRT_SIZES),
    colors: colors([["Siyah", 42], ["Antrasit", 20]]),
    models: models([["Sahne Afişi", 26], ["Alev Logo", 30], ["Minimal İmza", 14]]),
    rating: 4.9,
    reviewCount: 134,
    featured: true,
  },
  {
    id: "p-hay-02",
    slug: "hayko-cepkin-bere",
    type: "product",
    name: "Hayko Cepkin — Dokuma Logo Bere",
    category: "sapka",
    artist: "Hayko Cepkin",
    price: 379,
    currency: "TRY",
    image: "🧢",
    description: "Akrilik karışım, sıcak tutan örgü bere. Açık hava konserleri için ideal.",
    colors: colors([["Siyah", 24], ["Bordo", 18], ["Antrasit", 12]]),
    rating: 4.6,
    reviewCount: 53,
  },
];

/** Deneyim katmanı kaldırıldı — tip uyumluluğu için boş dizi korunuyor. */
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

/** Ana sayfa pazarlama bölümleri için statik veri. */

export interface HeroSlide {
  artistSlug: string;
  artist: string;
  collectionTitle: string;
  tag: string;
  accent: string;
}

export const heroSlides: HeroSlide[] = [
  {
    artistSlug: "manifest",
    artist: "Manifest",
    collectionTitle: "Manifest — Manifestival koleksiyonu",
    tag: "Yeni Drop",
    accent: "#ec5f9c",
  },
  {
    artistSlug: "ajda-pekkan",
    artist: "Ajda Pekkan",
    collectionTitle: "Ajda Pekkan — Süperstar arşivi",
    tag: "Reissue",
    accent: "#e9a52e",
  },
  {
    artistSlug: "hayko-cepkin",
    artist: "Hayko Cepkin",
    collectionTitle: "Hayko Cepkin — Sahne Yangını serisi",
    tag: "Yeni Drop",
    accent: "#c8413c",
  },
  {
    artistSlug: "fatma-turgut",
    artist: "Fatma Turgut",
    collectionTitle: "Fatma Turgut — Akustik koleksiyon",
    tag: "İmzalı",
    accent: "#2fa597",
  },
];

export interface PerkCardData {
  icon: string;
  title: string;
  description: string;
  /** ayrıcalığın açıldığı üyelik seviyesi */
  tag: string;
}

export const subscriptionPerks: PerkCardData[] = [
  {
    icon: "⚡",
    title: "Fast Track",
    description: "Konser girişinde öncelikli, hızlı geçiş hakkı — sırada beklemek yok.",
    tag: "Encore & Backstage",
  },
  {
    icon: "🍽️",
    title: "Yemeklerde %10 İndirim",
    description: "Anlaşmalı mekân ve etkinlik yemeklerinde üyelere özel %10 indirim.",
    tag: "Tüm üyeler",
  },
  {
    icon: "🎟️",
    title: "Biletlerde Önduyuru ve İndirim",
    description: "Konser biletleri herkese açılmadan sana duyurulur; üye indirimiyle al.",
    tag: "Encore & Backstage",
  },
  {
    icon: "⬆️",
    title: "Biletini Upgrade Etme Fırsatı",
    description: "Mevcut biletini uygun olduğunda daha iyi kategoriye yükseltme şansı.",
    tag: "Backstage",
  },
];

export interface MembershipTier {
  name: string;
  price: string;
  blurb: string;
  perks: string[];
  highlighted?: boolean;
  cta: string;
}

export const membershipTiers: MembershipTier[] = [
  {
    name: "Prelude",
    price: "Ücretsiz",
    blurb: "Topluluğa katıl, başla.",
    perks: ["Topluluğa katılım", "Drop bildirimleri", "Standart mağaza erişimi"],
    cta: "Ücretsiz başla",
  },
  {
    name: "Encore",
    price: "₺149/ay",
    blurb: "Hayranlar için sıcak koltuk.",
    perks: [
      "Prelude'deki her şey",
      "Drop'lara erken erişim",
      "Üyeye özel indirimler",
      "Kargo önceliği",
    ],
    highlighted: true,
    cta: "Encore'a geç",
  },
  {
    name: "Backstage",
    price: "₺399/ay",
    blurb: "Sahnenin en yakını.",
    perks: [
      "Encore'daki her şey",
      "Deneyimlerde öncelikli kontenjan",
      "Sınırlı koleksiyon ön erişimi",
      "Yıllık imzalı sürpriz ürün",
    ],
    cta: "Backstage ol",
  },
];

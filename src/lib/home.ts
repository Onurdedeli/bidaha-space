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

export interface ExperienceCardData {
  icon: string;
  title: string;
  description: string;
  tag: string;
  price: number;
}

export const experiencesHome: ExperienceCardData[] = [
  {
    icon: "🎤",
    title: "Backstage buluşma",
    description: "Konser öncesi sahne arkasında sanatçıyla tanış, fotoğraf çektir.",
    tag: "4 kontenjan",
    price: 4500,
  },
  {
    icon: "🎬",
    title: "Kişiye özel video mesaj",
    description: "İsmini söyleyerek sana özel kaydedilmiş kutlama videosu.",
    tag: "Sınırlı",
    price: 1850,
  },
  {
    icon: "🎚️",
    title: "Soundcheck pass",
    description: "Kapılar açılmadan soundcheck'i izle, prova anına tanık ol.",
    tag: "6 kontenjan",
    price: 2400,
  },
  {
    icon: "✍️",
    title: "İmzalı ürün",
    description: "Sanatçı tarafından elle imzalanmış, numaralandırılmış özel ürün.",
    tag: "Stokla sınırlı",
    price: 1200,
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

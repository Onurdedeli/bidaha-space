export interface Artist {
  slug: string;
  name: string;
  genre: string;
  emoji: string;
  followers: number;
  /** topluluk üye sayısı */
  members: number;
  tagline: string;
  bio: string;
  verified?: boolean;
  /**
   * Lisanslı sanatçı görseli. `public/artists/<slug>.jpg` koyulduğunda otomatik
   * kullanılır; yoksa slug'dan üretilen stilize avatar gösterilir.
   */
  image?: string;
  /** placeholder avatar için temel renk tonu (0-360) */
  hue: number;
}

export const artists: Artist[] = [
  {
    slug: "mor-ve-otesi",
    name: "Mor ve Ötesi",
    genre: "Alternatif Rock",
    emoji: "🎸",
    followers: 2_100_000,
    members: 44_800,
    tagline: "Türk alternatif rock'ının değişmeyen sesi.",
    bio: "Bir kuşağın marşı olmuş şarkılar, dolu salonlar. Topluluğa katıl; yeni drop'lar ve konser pencereleri açıldığında ilk sen haberdar ol.",
    verified: true,
    hue: 268,
  },
  {
    slug: "manifest",
    name: "Manifest",
    genre: "Pop",
    emoji: "✨",
    followers: 3_600_000,
    members: 88_400,
    tagline: "Sahneyi sallayan yeni nesil pop.",
    bio: "Performansı ve sahne enerjisiyle gündemi belirleyen grup. Sınırlı üretim merch ve sahne arkası anlarıyla topluluğunu hep yakın tutuyor.",
    verified: true,
    hue: 330,
  },
  {
    slug: "yalin",
    name: "Yalın",
    genre: "Pop",
    emoji: "🎤",
    followers: 2_800_000,
    members: 51_200,
    tagline: "Sözleri dilden düşmeyen pop.",
    bio: "Yaz akşamlarının vazgeçilmez şarkıları. Konser çıkışı bitmeyen sohbetlerin sahibi; özel koleksiyonlarıyla hayranlarına yaklaşıyor.",
    verified: true,
    hue: 200,
  },
  {
    slug: "ajda-pekkan",
    name: "Ajda Pekkan",
    genre: "Pop",
    emoji: "👑",
    followers: 1_900_000,
    members: 33_600,
    tagline: "Süperstar — Türk pop'unun divası.",
    bio: "Dönemleri aşan bir efsane. İkonik dönem koleksiyonları ve numaralandırılmış özel baskılarla zamansız bir miras.",
    verified: true,
    hue: 42,
  },
  {
    slug: "hayko-cepkin",
    name: "Hayko Cepkin",
    genre: "Rock / Metal",
    emoji: "🔥",
    followers: 1_400_000,
    members: 29_700,
    tagline: "Sahneyi yakan teatral rock.",
    bio: "Görsel şovu ve enerjisiyle eşsiz bir sahne deneyimi. Sınırlı tur merch'i ve backstage dropları dakikalar içinde tükeniyor.",
    verified: true,
    hue: 12,
  },
];

export function getArtist(slug: string) {
  return artists.find((a) => a.slug === slug);
}

export function getArtistByName(name: string) {
  return artists.find((a) => a.name === name);
}

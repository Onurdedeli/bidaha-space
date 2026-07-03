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
  /** sanatçı aksan rengi (hero banner, nokta, tonlu thumbnail) — hex */
  accent: string;
  /**
   * Lisanslı sanatçı görseli. `public/artists/<slug>.jpg` koyulduğunda otomatik
   * kullanılır; yoksa accent renginden üretilen stilize avatar gösterilir.
   */
  image?: string;
}

export const artists: Artist[] = [
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
    accent: "#ec5f9c",
    image: "/artists/manifest.jpg",
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
    accent: "#e9a52e",
    image: "/artists/ajda-pekkan.jpg",
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
    accent: "#c8413c",
    image: "/artists/hayko-cepkin.jpg",
  },
];

export function getArtist(slug: string) {
  return artists.find((a) => a.slug === slug);
}

export function getArtistByName(name: string) {
  return artists.find((a) => a.name === name);
}

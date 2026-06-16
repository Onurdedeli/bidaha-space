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
}

export const artists: Artist[] = [
  {
    slug: "duman",
    name: "Duman",
    genre: "Rock",
    emoji: "🎸",
    followers: 2_400_000,
    members: 48_200,
    tagline: "Türk rock'ının kuşak aşan sesi.",
    bio: "Stadyumları dolduran enerji, sahnede ve masada aynı içtenlik. Topluluğa katıl, tur penceresi açıldığında ilk sen haberdar ol.",
    verified: true,
  },
  {
    slug: "sila",
    name: "Sıla",
    genre: "Pop",
    emoji: "🎤",
    followers: 3_100_000,
    members: 61_500,
    tagline: "Sözleri kalbe dokunan pop.",
    bio: "Konser çıkışı bitmeyen sohbetlerin sahibi. Başbaşa yemek deneyimi ve özel mesajlarla hayranlarına yaklaşıyor.",
    verified: true,
  },
  {
    slug: "manga",
    name: "manga",
    genre: "Alternatif Rock",
    emoji: "🪐",
    followers: 1_800_000,
    members: 39_700,
    tagline: "Elektronik ve rock'ın kesişimi.",
    bio: "Sınırlı sayıda üretilen merch dropları ve backstage anlarıyla topluluğunu hep yakın tutuyor.",
    verified: true,
  },
  {
    slug: "mabel-matiz",
    name: "Mabel Matiz",
    genre: "Pop / Alternatif",
    emoji: "🌙",
    followers: 2_900_000,
    members: 70_100,
    tagline: "Şiirsel sözler, büyüleyici sahne.",
    bio: "Kişiye özel video mesajlarıyla tanınıyor; her mesaj küçük bir hediye gibi.",
    verified: true,
  },
  {
    slug: "manus-baba",
    name: "Manuş Baba",
    genre: "Pop / Folk",
    emoji: "🎺",
    followers: 1_500_000,
    members: 28_300,
    tagline: "Dön desem dönmezsin biliyorum.",
    bio: "Sahneden sürpriz anların ustası. Evlilik teklifi anonsları efsane.",
    verified: true,
  },
  {
    slug: "aleyna-tilki",
    name: "Aleyna Tilki",
    genre: "Pop",
    emoji: "✨",
    followers: 4_200_000,
    members: 55_900,
    tagline: "Yeni nesil pop yıldızı.",
    bio: "Görüntülü görüşme kontenjanları dakikalar içinde doluyor.",
    verified: true,
  },
];

export function getArtist(slug: string) {
  return artists.find((a) => a.slug === slug);
}

export function getArtistByName(name: string) {
  return artists.find((a) => a.name === name);
}

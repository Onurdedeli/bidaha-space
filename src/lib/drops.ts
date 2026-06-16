export interface Drop {
  id: string;
  title: string;
  artist: string;
  /** ne etrafında: konser / çıkış / özel gün */
  context: string;
  emoji: string;
  /** ISO bitiş zamanı — pencere kapanışı */
  endsAt: string;
  /** linklenecek item slug'ı */
  href: string;
  kind: "konser" | "cikis" | "ozel";
  /** toplam kontenjan ve kalan (sıcaklık hissi) */
  total: number;
  claimed: number;
}

/**
 * "An bazlı" pencereler. endsAt değerleri demo amaçlı, bugünden ileri tarihlidir.
 * Gerçek sistemde konser/çıkış takvimine bağlanır.
 */
export const drops: Drop[] = [
  {
    id: "d-001",
    title: "Duman Stadyum Turu — Tur Tişörtü Penceresi",
    artist: "Duman",
    context: "İstanbul konseri öncesi sınırlı drop",
    emoji: "🎸",
    endsAt: "2026-06-09T21:00:00+03:00",
    href: "/magaza/duman-tour-tisort-siyah",
    kind: "konser",
    total: 500,
    claimed: 437,
  },
  {
    id: "d-002",
    title: "Sıla ile Akşam Yemeği — Haziran Kontenjanı",
    artist: "Sıla",
    context: "Yalnızca 2 masa, ay sonunda kapanıyor",
    emoji: "🍽️",
    endsAt: "2026-06-08T23:59:00+03:00",
    href: "/deneyimler/sanatciyla-aksam-yemegi",
    kind: "ozel",
    total: 4,
    claimed: 2,
  },
  {
    id: "d-003",
    title: "manga — Outline Hoodie Yeniden Stokta",
    artist: "manga",
    context: "Yeni albüm çıkışına özel renk",
    emoji: "🪐",
    endsAt: "2026-06-11T20:00:00+03:00",
    href: "/magaza/manga-hoodie-mor",
    kind: "cikis",
    total: 300,
    claimed: 181,
  },
];

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
    title: "Mor ve Ötesi Stadyum Turu — Tur Tişörtü Penceresi",
    artist: "Mor ve Ötesi",
    context: "İstanbul konseri öncesi sınırlı drop",
    emoji: "🎸",
    endsAt: "2026-07-05T21:00:00+03:00",
    href: "/magaza/mor-ve-otesi-bir-derdim-var-tisort",
    kind: "konser",
    total: 500,
    claimed: 437,
  },
  {
    id: "d-002",
    title: "Manifest — İşlemeli Snapback Yeniden Stokta",
    artist: "Manifest",
    context: "Yeni sezon rengi, sınırlı adet",
    emoji: "🧢",
    endsAt: "2026-06-30T23:59:00+03:00",
    href: "/magaza/manifest-snapback-sapka",
    kind: "cikis",
    total: 300,
    claimed: 212,
  },
  {
    id: "d-003",
    title: "Ajda Pekkan — Numaralı Dönem Posteri",
    artist: "Ajda Pekkan",
    context: "500 adetle sınırlı, numaralandırılmış baskı",
    emoji: "🖼️",
    endsAt: "2026-07-12T20:00:00+03:00",
    href: "/magaza/ajda-pekkan-limited-poster",
    kind: "ozel",
    total: 500,
    claimed: 318,
  },
];

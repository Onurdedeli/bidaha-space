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
    title: "Manifest — Manifestival Tur Tişörtü Penceresi",
    artist: "Manifest",
    context: "İstanbul konseri öncesi sınırlı drop",
    emoji: "👕",
    endsAt: "2026-07-18T21:00:00+03:00",
    href: "/magaza/manifest-manifestival-tour-tisort",
    kind: "konser",
    total: 500,
    claimed: 437,
  },
  {
    id: "d-002",
    title: "Ajda Pekkan — Süperstar Plak Yeniden Basımı",
    artist: "Ajda Pekkan",
    context: "180g remastered reissue, sınırlı adet",
    emoji: "💿",
    endsAt: "2026-07-10T23:59:00+03:00",
    href: "/magaza/ajda-pekkan-superstar-vinyl",
    kind: "cikis",
    total: 300,
    claimed: 212,
  },
  {
    id: "d-003",
    title: "Hayko Cepkin — Alev Enamel Pin Seti",
    artist: "Hayko Cepkin",
    context: "Sınırlı üretim rozet seti, stokla sınırlı",
    emoji: "📌",
    endsAt: "2026-07-25T20:00:00+03:00",
    href: "/magaza/hayko-cepkin-enamel-pin-seti",
    kind: "ozel",
    total: 500,
    claimed: 318,
  },
];

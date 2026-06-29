import Link from "next/link";

function StarIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M12 2l2.2 6.6L21 9l-5.4 4.1L17.6 20 12 16.2 6.4 20l2-6.9L3 9l6.8-.4z" />
    </svg>
  );
}

export function Footer() {
  return (
    <footer className="mt-12 border-t border-border bg-bg">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <Link href="/" className="flex items-center gap-2">
            <StarIcon className="h-5 w-5 text-accent" />
            <span className="font-display text-lg font-bold tracking-tight">Superstar Lab</span>
          </Link>
          <p className="mt-3 max-w-xs text-sm text-muted">
            Sevdiğin sanatçının lisanslı merch&apos;i ve eşsiz fan deneyimleri — tek pazarda.
          </p>
          <div className="mt-4 flex gap-2">
            {["instagram", "x", "youtube", "tiktok"].map((s) => (
              <a
                key={s}
                href="#"
                aria-label={s}
                className="grid h-9 w-9 place-items-center rounded-full border border-border text-sm text-muted hover:text-foreground"
              >
                {s === "instagram" ? "◎" : s === "x" ? "✕" : s === "youtube" ? "▶" : "♪"}
              </a>
            ))}
          </div>
        </div>

        <FooterCol
          title="Mağaza"
          links={[
            ["Tüm ürünler", "/magaza"],
            ["Sanatçılar", "/sanatcilar"],
            ["Anlar & Droplar", "/anlar"],
            ["Deneyimler", "/#deneyimler"],
          ]}
        />
        <FooterCol
          title="Hakkında"
          links={[
            ["Nasıl çalışır?", "/#uyelik"],
            ["Üyelik", "/#uyelik"],
            ["Sanatçı Paneli", "/panel"],
          ]}
        />
        <FooterCol
          title="İletişim"
          links={[
            ["Bize ulaşın", "#"],
            ["Gizlilik", "#"],
            ["Kullanım Şartları", "#"],
          ]}
        />
      </div>
      <div className="border-t border-border px-4 py-5 sm:px-6">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 text-xs text-muted sm:flex-row">
          <span>© 2026 Superstar Lab. Tüm hakları saklıdır.</span>
          <span>Görseller temsilîdir.</span>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: [string, string][] }) {
  return (
    <div>
      <h4 className="mb-3 text-sm font-semibold">{title}</h4>
      <ul className="space-y-2 text-sm text-muted">
        {links.map(([label, href]) => (
          <li key={label}>
            <Link href={href} className="hover:text-foreground">
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

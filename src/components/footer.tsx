import Link from "next/link";
import { EmailCapture } from "./email-capture";

export function Footer() {
  return (
    <footer className="mt-10 border-t border-border bg-bg-soft">
      <div className="mx-auto max-w-7xl border-b border-border px-4 py-10 sm:px-6">
        <EmailCapture source="footer" />
      </div>
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-4">
        <div>
          <Link href="/" className="flex items-center gap-2 font-bold">
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-brand text-white">B</span>
            <span className="text-lg">
              bidaha<span className="text-accent">space</span>
            </span>
          </Link>
          <p className="mt-3 max-w-xs text-sm text-muted">
            Türk müziğinde sanatçı ve hayranı buluşturan pazar yeri. Merch, deneyim ve topluluk —
            an bazlı, gerçek bağ.
          </p>
        </div>
        <FooterCol
          title="Keşfet"
          links={[
            ["Mağaza", "/magaza"],
            ["Deneyimler", "/deneyimler"],
            ["Sanatçılar", "/sanatcilar"],
            ["Anlar & Droplar", "/anlar"],
          ]}
        />
        <FooterCol
          title="Topluluk"
          links={[
            ["Nasıl çalışır?", "/#nasil"],
            ["Sanatçı ol", "/sanatcilar"],
            ["Sepetim", "/sepet"],
          ]}
        />
        <FooterCol
          title="Kurumsal"
          links={[
            ["Gizlilik", "#"],
            ["Kullanım Şartları", "#"],
            ["İletişim", "#"],
          ]}
        />
      </div>
      <div className="border-t border-border px-4 py-5 text-center text-xs text-muted sm:px-6">
        © {2026} Bidahaspace. Tüm hakları saklıdır. Bu bir demo platformudur.
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

import Link from "next/link";
import { EmailCapture } from "./email-capture";
import { SITE_NAME } from "@/lib/site";

export function Footer() {
  return (
    <footer className="mt-10 border-t border-border bg-bg-soft">
      <div className="mx-auto max-w-7xl border-b border-border px-4 py-10 sm:px-6">
        <EmailCapture source="footer" />
      </div>
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-4">
        <div>
          <Link href="/" className="flex items-center gap-2 font-bold">
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-brand to-accent text-white">
              ★
            </span>
            <span className="text-lg">
              SuperStar<span className="text-brand"> Lab</span>
            </span>
          </Link>
          <p className="mt-3 max-w-xs text-sm text-muted">
            Sanatçı, hayran ve üretim arasındaki köprü. Sevdiğin sanatçının lisanslı merch&apos;ini
            seç, kişiselleştir, satın al.
          </p>
        </div>
        <FooterCol
          title="Keşfet"
          links={[
            ["Mağaza", "/magaza"],
            ["Sanatçılar", "/sanatcilar"],
            ["Anlar & Droplar", "/anlar"],
          ]}
        />
        <FooterCol
          title="Sanatçılar için"
          links={[
            ["Sanatçı Paneli", "/panel"],
            ["Nasıl çalışır?", "/#nasil"],
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
        © {2026} {SITE_NAME}. Tüm hakları saklıdır. Bu bir demo platformudur.
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

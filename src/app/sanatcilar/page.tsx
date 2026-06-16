import type { Metadata } from "next";
import Link from "next/link";
import { artists } from "@/lib/artists";
import { ItemImage } from "@/components/item-image";
import { Badge } from "@/components/ui";
import { formatCount } from "@/lib/format";

export const metadata: Metadata = {
  title: "Sanatçılar",
  description: "Türk müziğinin doğrulanmış sanatçıları. Topluluğa katıl, anları kaçırma.",
};

export default function SanatcilarPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14">
      <header className="mb-8">
        <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">Sanatçılar</h1>
        <p className="mt-2 max-w-2xl text-muted">
          Doğrulanmış sanatçılar ve toplulukları. Katılım ücretsiz — abonelik yok. Türkiye&apos;den,
          dünyanın her yerinden hayranlara açık.
        </p>
      </header>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {artists.map((a) => (
          <Link
            key={a.slug}
            href={`/sanatci/${a.slug}`}
            className="group overflow-hidden rounded-[var(--radius-card)] border border-border bg-surface transition-colors hover:border-brand/50"
          >
            <ItemImage seed={a.slug} emoji={a.emoji} size="lg" className="aspect-[16/9] w-full" />
            <div className="p-5">
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold group-hover:text-brand-soft">{a.name}</h3>
                {a.verified && <span title="Doğrulanmış" className="text-brand-soft">✔</span>}
              </div>
              <div className="mt-1 flex items-center gap-2">
                <Badge tone="muted">{a.genre}</Badge>
                <span className="text-xs text-muted">{formatCount(a.followers)} takipçi</span>
              </div>
              <p className="mt-3 text-sm text-muted">{a.tagline}</p>
              <div className="mt-4 flex items-center justify-between text-xs">
                <span className="text-muted">👥 {formatCount(a.members)} üye</span>
                <span className="font-semibold text-accent">Topluluğa katıl →</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

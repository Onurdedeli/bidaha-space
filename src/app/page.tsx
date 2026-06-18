import Link from "next/link";
import { products, getProductsByArtist } from "@/lib/data";
import { getActiveDrops } from "@/lib/drops-db";
import { artists } from "@/lib/artists";
import { ProductCard } from "@/components/cards";
import { ArtistAvatar } from "@/components/artist-avatar";
import { Section, Badge, ButtonLink } from "@/components/ui";
import { Countdown } from "@/components/countdown";
import { formatCount } from "@/lib/format";

export default async function Home() {
  const featuredProducts = products.filter((p) => p.featured).slice(0, 9);
  const drops = await getActiveDrops();
  const collectionArtist = artists[0];
  const collection = getProductsByArtist(collectionArtist.name);

  return (
    <>
      {/* HERO */}
      <section className="mesh-bg relative overflow-hidden border-b border-border">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20">
          <div className="max-w-3xl">
            <Badge tone="brand">★ Lisanslı sanatçı merch pazarı</Badge>
            <h1 className="mt-5 text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-6xl">
              Sevdiğin sanatçının
              <br />
              <span className="bg-gradient-to-r from-brand to-accent bg-clip-text text-transparent">
                merch&apos;ini sen tasarla.
              </span>
            </h1>
            <p className="mt-5 max-w-xl text-lg text-muted">
              Sanatçıyı seç, ürünü seç, beden–renk–modeli kendine göre ayarla. Hayran, sanatçı ve
              üretim tek bir köprüde — abonelik yok, yalnızca aldığın için ödersin.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href="/magaza" variant="accent" size="lg">
                Mağazayı keşfet
              </ButtonLink>
              <ButtonLink href="/sanatcilar" variant="outline" size="lg">
                Sanatçılar
              </ButtonLink>
            </div>
          </div>

          {/* sanatçı şeridi */}
          <div className="mt-12 flex flex-wrap gap-5">
            {artists.map((a) => (
              <Link key={a.slug} href={`/sanatci/${a.slug}`} className="group flex flex-col items-center gap-2">
                <ArtistAvatar artist={a} className="h-16 w-16 text-2xl transition-transform group-hover:scale-105" />
                <span className="text-xs font-medium text-muted group-hover:text-foreground">{a.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* TRENDING NOW + TOP ARTISTS */}
      <Section
        title="Trend ürünler"
        subtitle="Sanatçı onaylı, sınırlı üretim. Şu an en çok ilgi gören merch."
        action={
          <ButtonLink href="/magaza" variant="ghost" size="sm" className="hidden sm:inline-flex">
            Tümü →
          </ButtonLink>
        }
      >
        <div className="grid gap-8 lg:grid-cols-[1fr_240px]">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
            {featuredProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>

          <aside className="order-first lg:order-last">
            <div className="rounded-[var(--radius-card)] border border-border bg-surface p-5">
              <h3 className="mb-4 text-sm font-bold uppercase tracking-wide text-muted">Top Sanatçılar</h3>
              <ul className="space-y-3">
                {artists.map((a) => (
                  <li key={a.slug}>
                    <Link href={`/sanatci/${a.slug}`} className="group flex items-center gap-3">
                      <ArtistAvatar artist={a} className="h-11 w-11 text-lg" ring={false} />
                      <div className="min-w-0">
                        <div className="truncate text-sm font-semibold group-hover:text-brand">{a.name}</div>
                        <div className="text-xs text-muted">{formatCount(a.followers)} takipçi</div>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </Section>

      {/* ANLAR / DROPS */}
      <Section
        title="Anlar — açık pencereler"
        subtitle="Konser ve çıkışlar etrafında açılan sınırlı drop'lar. Pencere kapanınca fırsat da kapanır."
        action={
          <ButtonLink href="/anlar" variant="ghost" size="sm" className="hidden sm:inline-flex">
            Tümü →
          </ButtonLink>
        }
      >
        <div className="grid gap-4 md:grid-cols-3">
          {drops.map((d) => {
            const pct = Math.round((d.claimed / d.total) * 100);
            return (
              <Link
                key={d.id}
                href={d.href}
                className="group flex flex-col gap-3 rounded-[var(--radius-card)] border border-border bg-surface p-5 transition-all hover:-translate-y-0.5 hover:border-accent/40 hover:shadow-lg"
              >
                <div className="flex items-center justify-between">
                  <Badge tone={d.kind === "ozel" ? "brand" : "accent"}>
                    {d.emoji} {d.kind === "konser" ? "Konser" : d.kind === "cikis" ? "Çıkış" : "Özel"}
                  </Badge>
                  <Countdown endsAt={d.endsAt} compact />
                </div>
                <h3 className="font-semibold leading-snug group-hover:text-brand">{d.title}</h3>
                <p className="text-sm text-muted">{d.context}</p>
                <div className="mt-auto">
                  <div className="mb-1 flex justify-between text-xs text-muted">
                    <span>{d.claimed}/{d.total} alındı</span>
                    <span>%{pct}</span>
                  </div>
                  <div className="h-1.5 overflow-hidden rounded-full bg-surface-2">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-brand to-accent"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </Section>

      {/* KOLEKSİYON */}
      {collection.length > 0 && (
        <Section
          title={`${collectionArtist.name} koleksiyonu`}
          subtitle="Bir sanatçının tüm merch'i tek yerde."
          action={
            <ButtonLink href={`/sanatci/${collectionArtist.slug}`} variant="ghost" size="sm" className="hidden sm:inline-flex">
              Sanatçı sayfası →
            </ButtonLink>
          }
        >
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            {collection.slice(0, 4).map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </Section>
      )}

      {/* NASIL CALISIR */}
      <Section id="nasil" title="Nasıl çalışır?" subtitle="Hayran, sanatçı ve üretim arasındaki köprü.">
        <div className="grid gap-4 md:grid-cols-3">
          <HowStep n="1" title="Sanatçını seç" text="Sevdiğin sanatçının sayfasına git, koleksiyonunu ve açık anları keşfet." />
          <HowStep n="2" title="Ürünü kişiselleştir" text="Kategoriyi seç, ardından beden, renk ve baskı modelini sana göre ayarla." />
          <HowStep n="3" title="Sipariş ver, sanatçı kazansın" text="Üretim ve kargo bizden; sanatçı satışları panelden anlık takip eder." />
        </div>
      </Section>

      {/* SANATÇI CTA */}
      <Section>
        <div className="mesh-bg relative overflow-hidden rounded-[var(--radius-card)] border border-border p-8 sm:p-14">
          <div className="relative max-w-2xl">
            <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
              Sanatçı mısın? Satışlarını tek panelden yönet.
            </h2>
            <p className="mt-3 text-muted">
              Merch&apos;ini yayınla, drop pencerelerini aç, gelir ve sipariş verilerini gerçek zamanlı gör.
              Menajerin ve ekibin de aynı panele erişebilir.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <ButtonLink href="/panel" variant="accent" size="lg">
                Sanatçı paneline gir
              </ButtonLink>
              <ButtonLink href="/sanatcilar" variant="outline" size="lg">
                Sanatçıları gör
              </ButtonLink>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}

function HowStep({ n, title, text }: { n: string; title: string; text: string }) {
  return (
    <div className="rounded-[var(--radius-card)] border border-border bg-surface p-6">
      <div className="grid h-10 w-10 place-items-center rounded-full bg-brand/10 text-lg font-bold text-brand">
        {n}
      </div>
      <h3 className="mt-4 text-lg font-semibold">{title}</h3>
      <p className="mt-1.5 text-sm text-muted">{text}</p>
    </div>
  );
}

import Link from "next/link";
import { products, experiences } from "@/lib/data";
import { getActiveDrops } from "@/lib/drops-db";
import { artists } from "@/lib/artists";
import { ProductCard, ExperienceCard } from "@/components/cards";
import { Section, Badge, ButtonLink } from "@/components/ui";
import { Countdown } from "@/components/countdown";
import { formatCount } from "@/lib/format";

export default async function Home() {
  const featuredExp = experiences.filter((e) => e.featured);
  const featuredProducts = products.filter((p) => p.featured);
  const drops = await getActiveDrops();

  return (
    <>
      {/* HERO */}
      <section className="mesh-bg relative overflow-hidden border-b border-border">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28">
          <div className="max-w-3xl">
            <Badge tone="accent">🎵 Türk müziğinin merch & deneyim pazarı</Badge>
            <h1 className="mt-5 text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-6xl">
              Sevdiğin sanatçıyla
              <br />
              <span className="bg-gradient-to-r from-brand-soft to-accent bg-clip-text text-transparent">
                gerçek bir bağ kur.
              </span>
            </h1>
            <p className="mt-5 max-w-xl text-lg text-muted">
              Tişörtten şapkaya merch, sanatçıyla başbaşa yemekten sevdiğine özel doğum günü
              mesajına deneyimler. Konser ve çıkış anlarında açılan sınırlı pencerelerle — aidiyet,
              an ve anı bir arada.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href="/deneyimler" variant="accent" size="lg">
                Deneyimleri keşfet
              </ButtonLink>
              <ButtonLink href="/magaza" variant="outline" size="lg">
                Mağazaya göz at
              </ButtonLink>
            </div>
            <div className="mt-10 flex flex-wrap gap-x-8 gap-y-3 text-sm text-muted">
              <Stat value={`${artists.length}+`} label="doğrulanmış sanatçı" />
              <Stat value="300B+" label="topluluk üyesi" />
              <Stat value="An bazlı" label="konser & çıkış pencereleri" />
            </div>
          </div>
        </div>
      </section>

      {/* ARTIST MARQUEE */}
      <div className="overflow-hidden border-b border-border bg-bg-soft py-4">
        <div className="flex w-max animate-marquee gap-3">
          {[...artists, ...artists].map((a, i) => (
            <Link
              key={i}
              href={`/sanatci/${a.slug}`}
              className="flex items-center gap-2 whitespace-nowrap rounded-full border border-border bg-surface px-4 py-2 text-sm hover:border-brand/50"
            >
              <span>{a.emoji}</span>
              <span className="font-semibold">{a.name}</span>
              <span className="text-muted">· {formatCount(a.followers)}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* ANLAR / DROPS */}
      <Section
        title="Anlar — şu an açık pencereler"
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
                className="group flex flex-col gap-3 rounded-[var(--radius-card)] border border-border bg-surface p-5 transition-colors hover:border-accent/40"
              >
                <div className="flex items-center justify-between">
                  <Badge tone={d.kind === "ozel" ? "brand" : "accent"}>
                    {d.emoji} {d.kind === "konser" ? "Konser" : d.kind === "cikis" ? "Çıkış" : "Özel"}
                  </Badge>
                  <Countdown endsAt={d.endsAt} compact />
                </div>
                <h3 className="font-semibold leading-snug group-hover:text-accent">{d.title}</h3>
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

      {/* DENEYIMLER */}
      <Section
        title="Unutulmaz deneyimler"
        subtitle="Sahnenin değil, hayatın içinden anlar. Sanatçıyla yüz yüze ya da ekrandan ekrana."
        action={
          <ButtonLink href="/deneyimler" variant="ghost" size="sm" className="hidden sm:inline-flex">
            Tümü →
          </ButtonLink>
        }
      >
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {featuredExp.map((e) => (
            <ExperienceCard key={e.id} experience={e} />
          ))}
        </div>
      </Section>

      {/* NASIL CALISIR */}
      <Section id="nasil" title="Nasıl çalışır?" subtitle="Üç adımda sanatçına yaklaş.">
        <div className="grid gap-4 md:grid-cols-3">
          <HowStep
            n="1"
            title="Sanatçını seç"
            text="Topluluğuna katıl, açılan anlardan ve sınırlı drop'lardan ilk sen haberdar ol."
          />
          <HowStep
            n="2"
            title="Merch ya da deneyim al"
            text="Tişört ve şapkadan başbaşa yemeğe, kişiye özel mesajdan backstage'e — sana uygun olanı seç."
          />
          <HowStep
            n="3"
            title="Anı yaşa & sakla"
            text="Ürünün kapına gelsin, deneyimin planlansın. Geriye paylaşılacak bir anı kalsın."
          />
        </div>
      </Section>

      {/* MERCH */}
      <Section
        title="Öne çıkan merch"
        subtitle="Sınırlı üretim, sanatçı onaylı tasarımlar."
        action={
          <ButtonLink href="/magaza" variant="ghost" size="sm" className="hidden sm:inline-flex">
            Tümü →
          </ButtonLink>
        }
      >
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {featuredProducts.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </Section>

      {/* COMMUNITY CTA */}
      <Section>
        <div className="mesh-bg relative overflow-hidden rounded-[var(--radius-card)] border border-border p-8 sm:p-14">
          <div className="relative max-w-2xl">
            <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
              Sadece bir hayran değil, topluluğun bir parçası ol.
            </h2>
            <p className="mt-3 text-muted">
              Sanatçının topluluğuna katıl; yeni drop'lar, kontenjanlar ve özel anlar açıldığında
              öncelikli erişim senin olsun.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <ButtonLink href="/sanatcilar" variant="accent" size="lg">
                Sanatçıları gör
              </ButtonLink>
              <ButtonLink href="/anlar" variant="outline" size="lg">
                Açık anlara bak
              </ButtonLink>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <div className="text-lg font-bold text-foreground">{value}</div>
      <div className="text-xs">{label}</div>
    </div>
  );
}

function HowStep({ n, title, text }: { n: string; title: string; text: string }) {
  return (
    <div className="rounded-[var(--radius-card)] border border-border bg-surface p-6">
      <div className="grid h-10 w-10 place-items-center rounded-full bg-brand/15 text-lg font-bold text-brand-soft">
        {n}
      </div>
      <h3 className="mt-4 text-lg font-semibold">{title}</h3>
      <p className="mt-1.5 text-sm text-muted">{text}</p>
    </div>
  );
}

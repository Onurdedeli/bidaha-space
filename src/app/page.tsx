import Link from "next/link";
import { products, getProductsByArtist } from "@/lib/data";
import { artists } from "@/lib/artists";
import { heroSlides, subscriptionPerks, membershipTiers } from "@/lib/home";
import { ProductCard } from "@/components/cards";
import { ArtistAvatar } from "@/components/artist-avatar";
import { HeroCarousel } from "@/components/hero-carousel";
import { ItemImage } from "@/components/item-image";
import { formatTRY, formatCount } from "@/lib/format";

export default function Home() {
  const featured = products.filter((p) => p.featured).slice(0, 8);
  const collectionArtist = artists.find((a) => a.slug === "ajda-pekkan")!;
  const collection = getProductsByArtist(collectionArtist.name).slice(0, 6);

  return (
    <>
      {/* 2 · HERO CAROUSEL */}
      <section className="mx-auto max-w-7xl px-4 pb-4 pt-8 sm:px-6 sm:pt-10">
        <HeroCarousel slides={heroSlides} />
      </section>

      {/* 3 · ÖNE ÇIKANLAR */}
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14">
        <SectionHead title="Öne çıkanlar" href="/magaza" linkLabel="Tümünü gör" />
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {featured.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* 4 · FEATURED COLLECTION */}
      <section className="mx-auto max-w-7xl px-4 py-6 sm:px-6">
        <div className="grid gap-6 rounded-3xl border border-border bg-surface p-6 sm:p-8 lg:grid-cols-[0.9fr_1.4fr]">
          <div className="flex flex-col justify-center">
            <span
              className="text-[11px] font-bold uppercase tracking-wide"
              style={{ color: collectionArtist.accent }}
            >
              Koleksiyon
            </span>
            <h2 className="mt-2 text-3xl font-bold tracking-tight">
              {collectionArtist.name} — Süperstar arşivi
            </h2>
            <p className="mt-3 max-w-sm text-sm text-muted">
              Dönemleri aşan bir mirasın tüm parçaları tek yerde: remastered plaklar,
              numaralandırılmış baskılar ve ikonik koleksiyon ürünleri.
            </p>
            <Link
              href={`/sanatci/${collectionArtist.slug}`}
              className="mt-6 inline-flex w-fit rounded-full bg-foreground px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-soft"
            >
              Koleksiyonu gör
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {collection.map((p) => (
              <Link
                key={p.id}
                href={`/magaza/${p.slug}`}
                className="card-hover flex flex-col overflow-hidden rounded-2xl border border-border bg-surface"
              >
                <ItemImage emoji={p.image} accent={collectionArtist.accent} size="md" className="aspect-square w-full" />
                <div className="p-3">
                  <div className="line-clamp-1 text-xs font-semibold">{p.name}</div>
                  <div className="mt-1 text-sm font-bold">{formatTRY(p.price)}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 5 · ABONELİK FIRSATLARI */}
      <section id="firsatlar" className="mt-10 bg-bg-soft py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mb-6">
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">Abonelik Fırsatları</h2>
            <p className="mt-1 max-w-2xl text-sm text-muted">
              Üyeliğinle açılan ayrıcalıklar — hızlı geçişten bilet indirimlerine, sahnenin bir adım önünde ol.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {subscriptionPerks.map((e) => (
              <div key={e.title} className="flex flex-col rounded-2xl border border-border bg-surface p-5">
                <div className="grid h-11 w-11 place-items-center rounded-xl bg-accent/15 text-xl">
                  {e.icon}
                </div>
                <h3 className="mt-4 font-semibold">{e.title}</h3>
                <p className="mt-1.5 flex-1 text-sm text-muted">{e.description}</p>
                <div className="mt-4">
                  <span className="rounded-full bg-accent/15 px-2.5 py-0.5 text-[11px] font-semibold text-foreground">
                    {e.tag}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6 · SANATÇILAR */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16">
        <div className="mb-8 flex items-end justify-between">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">Sanatçılar</h2>
          <Link href="/sanatcilar" className="text-sm font-semibold text-foreground hover:text-muted">
            Tüm sanatçılar →
          </Link>
        </div>
        <div className="flex flex-wrap justify-center gap-8 sm:gap-12">
          {artists.map((a) => (
            <Link key={a.slug} href={`/sanatci/${a.slug}`} className="group flex flex-col items-center gap-3">
              <ArtistAvatar artist={a} className="h-24 w-24 text-3xl transition-transform group-hover:scale-105" />
              <div className="text-center">
                <div className="font-semibold group-hover:text-muted">{a.name}</div>
                <div className="text-xs text-muted">{a.genre}</div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 7 · ÜYELİK */}
      <section id="uyelik" className="mx-auto max-w-7xl px-4 py-6 pb-16 sm:px-6">
        <div className="mb-8 text-center">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">Üyelik</h2>
          <p className="mx-auto mt-1 max-w-xl text-sm text-muted">
            Sahneye ne kadar yakın olmak istersin? Seviyeni seç, ayrıcalıkların açılsın.
          </p>
        </div>
        <div className="grid gap-5 lg:grid-cols-3">
          {membershipTiers.map((t) => (
            <div
              key={t.name}
              className={`relative flex flex-col rounded-3xl border bg-surface p-7 ${
                t.highlighted ? "border-accent shadow-lg shadow-accent/10" : "border-border"
              }`}
            >
              {t.highlighted && (
                <span className="absolute -top-3 left-7 rounded-full bg-accent px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-foreground">
                  En popüler
                </span>
              )}
              <h3 className="text-lg font-bold">{t.name}</h3>
              <p className="mt-1 text-sm text-muted">{t.blurb}</p>
              <div className="mt-4 text-3xl font-extrabold tracking-tight">{t.price}</div>
              <ul className="mt-5 flex-1 space-y-2.5 text-sm">
                {t.perks.map((perk) => (
                  <li key={perk} className="flex items-start gap-2">
                    <span className="mt-0.5 text-accent">✓</span>
                    <span className="text-muted">{perk}</span>
                  </li>
                ))}
              </ul>
              <button
                className={`mt-6 rounded-full px-5 py-2.5 text-sm font-semibold ${
                  t.highlighted
                    ? "bg-foreground text-white hover:bg-brand-soft"
                    : "border border-border bg-surface text-foreground hover:bg-surface-2"
                }`}
              >
                {t.cta}
              </button>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

function SectionHead({ title, href, linkLabel }: { title: string; href: string; linkLabel: string }) {
  return (
    <div className="mb-6 flex items-end justify-between">
      <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">{title}</h2>
      <Link href={href} className="text-sm font-semibold text-foreground hover:text-muted">
        {linkLabel} →
      </Link>
    </div>
  );
}

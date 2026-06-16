import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { artists, getArtist } from "@/lib/artists";
import { products, experiences } from "@/lib/data";
import { drops } from "@/lib/drops";
import { ItemImage } from "@/components/item-image";
import { ProductCard, ExperienceCard } from "@/components/cards";
import { JoinCommunity } from "@/components/join-community";
import { Countdown } from "@/components/countdown";
import { Badge, Section } from "@/components/ui";
import { formatCount } from "@/lib/format";
import { getUserId } from "@/lib/auth";
import { isFollowing } from "@/lib/actions";

export function generateStaticParams() {
  return artists.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const a = getArtist(slug);
  if (!a) return { title: "Sanatçı bulunamadı" };
  return { title: a.name, description: a.bio };
}

export default async function ArtistPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const artist = getArtist(slug);
  if (!artist) notFound();

  const artistProducts = products.filter((p) => p.artist === artist.name);
  const artistExp = experiences.filter((e) => e.artist === artist.name);
  const artistDrops = drops.filter((d) => d.artist === artist.name);

  const userId = await getUserId();
  const following = userId ? await isFollowing(artist.slug) : false;

  return (
    <div>
      {/* HERO */}
      <div className="relative">
        <ItemImage seed={artist.slug} emoji={artist.emoji} className="h-56 w-full sm:h-72" />
        <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/50 to-transparent" />
      </div>

      <div className="mx-auto -mt-16 max-w-7xl px-4 sm:px-6">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="grid h-24 w-24 place-items-center rounded-2xl border border-border bg-surface text-5xl">
              {artist.emoji}
            </div>
            <div className="mt-3 flex items-center gap-2">
              <h1 className="text-3xl font-extrabold tracking-tight">{artist.name}</h1>
              {artist.verified && <span className="text-brand-soft" title="Doğrulanmış">✔</span>}
            </div>
            <div className="mt-2 flex flex-wrap items-center gap-2">
              <Badge tone="brand">{artist.genre}</Badge>
              <span className="text-sm text-muted">{formatCount(artist.followers)} takipçi</span>
              <span className="text-sm text-muted">· 👥 {formatCount(artist.members)} üye</span>
            </div>
          </div>
          <JoinCommunity
            slug={artist.slug}
            name={artist.name}
            signedIn={!!userId}
            initialFollowing={following}
          />
        </div>

        <p className="mt-5 max-w-2xl text-muted">{artist.bio}</p>
      </div>

      {artistDrops.length > 0 && (
        <Section title="Açık anlar">
          <div className="grid gap-4 md:grid-cols-3">
            {artistDrops.map((d) => (
              <Link
                key={d.id}
                href={d.href}
                className="flex flex-col gap-2 rounded-[var(--radius-card)] border border-border bg-surface p-5 hover:border-accent/40"
              >
                <div className="flex items-center justify-between">
                  <Badge tone="accent">{d.emoji} An</Badge>
                  <Countdown endsAt={d.endsAt} compact />
                </div>
                <h3 className="font-semibold">{d.title}</h3>
                <p className="text-sm text-muted">{d.context}</p>
              </Link>
            ))}
          </div>
        </Section>
      )}

      {artistExp.length > 0 && (
        <Section title={`${artist.name} deneyimleri`}>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {artistExp.map((e) => (
              <ExperienceCard key={e.id} experience={e} />
            ))}
          </div>
        </Section>
      )}

      {artistProducts.length > 0 && (
        <Section title={`${artist.name} merch`}>
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            {artistProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </Section>
      )}

      {artistProducts.length === 0 && artistExp.length === 0 && (
        <Section>
          <div className="rounded-[var(--radius-card)] border border-dashed border-border py-16 text-center text-muted">
            Bu sanatçı için yakında yeni drop&apos;lar açılacak. Topluluğa katıl, ilk sen haberdar ol.
          </div>
        </Section>
      )}
    </div>
  );
}

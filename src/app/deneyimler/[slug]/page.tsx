import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { experiences, getExperienceBySlug, EXPERIENCE_CATEGORIES } from "@/lib/data";
import { getArtistByName } from "@/lib/artists";
import { ItemImage } from "@/components/item-image";
import { ExperienceBooking } from "@/components/experience-booking";
import { ExperienceCard } from "@/components/cards";
import { Badge, Stars, Section } from "@/components/ui";

export function generateStaticParams() {
  return experiences.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const e = getExperienceBySlug(slug);
  if (!e) return { title: "Deneyim bulunamadı" };
  return { title: e.name, description: e.tagline };
}

export default async function ExperiencePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const exp = getExperienceBySlug(slug);
  if (!exp) notFound();

  const cat = EXPERIENCE_CATEGORIES.find((c) => c.value === exp.category);
  const artist = getArtistByName(exp.artist);
  const related = experiences.filter((e) => e.id !== exp.id).slice(0, 3);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <nav className="mb-6 flex items-center gap-2 text-sm text-muted">
        <Link href="/deneyimler" className="hover:text-foreground">Deneyimler</Link>
        <span>/</span>
        <span className="text-foreground">{cat?.label}</span>
      </nav>

      <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr]">
        <div>
          <ItemImage
            seed={exp.slug}
            emoji={exp.image}
            size="lg"
            className="aspect-[16/10] w-full rounded-[var(--radius-card)] border border-border"
          />

          <div className="mt-6 flex flex-wrap items-center gap-2">
            {exp.badge && <Badge tone="brand">{exp.badge}</Badge>}
            <Badge tone="muted">⏱ {exp.duration}</Badge>
            <Badge tone="muted">{cat?.emoji} {cat?.label}</Badge>
            {exp.location && <Badge tone="muted">📍 {exp.location}</Badge>}
          </div>

          <h1 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl">{exp.name}</h1>
          <div className="mt-2 flex items-center gap-3">
            {artist ? (
              <Link href={`/sanatci/${artist.slug}`} className="text-sm font-semibold text-accent hover:underline">
                {exp.artist}
              </Link>
            ) : (
              <span className="text-sm font-semibold text-accent">{exp.artist}</span>
            )}
            <Stars rating={exp.rating} count={exp.reviewCount} />
          </div>

          <p className="mt-5 text-lg text-muted">{exp.tagline}</p>
          <p className="mt-4 leading-relaxed text-foreground/90">{exp.description}</p>

          <div className="mt-7 rounded-[var(--radius-card)] border border-border bg-surface p-5">
            <h3 className="mb-3 font-semibold">Bu deneyime neler dahil?</h3>
            <ul className="grid gap-2 sm:grid-cols-2">
              {exp.includes.map((inc) => (
                <li key={inc} className="flex items-start gap-2 text-sm text-muted">
                  <span className="mt-0.5 text-success">✓</span>
                  {inc}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="lg:sticky lg:top-20 lg:self-start">
          <ExperienceBooking experience={exp} />
        </div>
      </div>

      {related.length > 0 && (
        <Section title="Diğer deneyimler">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((e) => (
              <ExperienceCard key={e.id} experience={e} />
            ))}
          </div>
        </Section>
      )}
    </div>
  );
}

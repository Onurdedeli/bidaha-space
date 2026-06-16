import type { Metadata } from "next";
import { experiences, EXPERIENCE_CATEGORIES } from "@/lib/data";
import { ExperienceFilterGrid } from "@/components/filter-grid";

export const metadata: Metadata = {
  title: "Deneyimler",
  description:
    "Sanatçıyla başbaşa yemek, kişiye özel video mesaj, backstage turu, birebir ders ve görüntülü görüşme.",
};

export default function DeneyimlerPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14">
      <header className="mb-8">
        <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">Deneyimler</h1>
        <p className="mt-2 max-w-2xl text-muted">
          Sahnenin ötesinde gerçek anlar. Sanatçıyla başbaşa yemekten sevdiğine özel mesaja,
          backstage&apos;den birebir derse. Abonelik yok — yalnızca yaşadığın an için ödersin.
        </p>
      </header>
      <ExperienceFilterGrid experiences={experiences} cats={EXPERIENCE_CATEGORIES} />
    </div>
  );
}

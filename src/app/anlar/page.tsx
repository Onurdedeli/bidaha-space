import type { Metadata } from "next";
import Link from "next/link";
import { getActiveDrops } from "@/lib/drops-db";
import { Countdown } from "@/components/countdown";
import { Badge } from "@/components/ui";
import { EmailCapture } from "@/components/email-capture";

export const metadata: Metadata = {
  title: "Anlar & Droplar",
  description: "Konser ve çıkış pencerelerinde açılan sınırlı drop'lar. An bazlı, kaçırınca kapanır.",
};

export default async function AnlarPage() {
  const drops = await getActiveDrops();
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14">
      <header className="mb-8">
        <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">Anlar</h1>
        <p className="mt-2 max-w-2xl text-muted">
          StarLab sıradan bir mağaza değil; konser ve çıkış anları etrafında açılan{" "}
          <span className="text-foreground">sınırlı pencereler</span> üzerine kurulu. Pencere
          kapanınca o an da kapanır.
        </p>
        <div className="mt-6 rounded-[var(--radius-card)] border border-border bg-surface p-5">
          <EmailCapture
            source="anlar"
            title="Yeni bir an açılınca ilk sen bil"
            subtitle="Konser ve çıkış pencereleri sınırlı. E-posta bırak, açılır açılmaz haber verelim."
          />
        </div>
      </header>

      <div className="grid gap-5 md:grid-cols-2">
        {drops.map((d) => {
          const pct = Math.round((d.claimed / d.total) * 100);
          return (
            <Link
              key={d.id}
              href={d.href}
              className="group flex flex-col gap-4 rounded-[var(--radius-card)] border border-border bg-surface p-6 transition-colors hover:border-accent/40"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="grid h-12 w-12 place-items-center rounded-xl bg-surface-2 text-2xl">
                    {d.emoji}
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-accent">{d.artist}</span>
                    <h3 className="font-semibold leading-snug group-hover:text-accent">{d.title}</h3>
                  </div>
                </div>
                <Badge tone={d.kind === "ozel" ? "brand" : "accent"}>
                  {d.kind === "konser" ? "Konser" : d.kind === "cikis" ? "Çıkış" : "Özel"}
                </Badge>
              </div>

              <p className="text-sm text-muted">{d.context}</p>

              <div className="flex items-center justify-between rounded-xl bg-surface-2 px-4 py-3">
                <span className="text-xs text-muted">Pencere kapanışına</span>
                <Countdown endsAt={d.endsAt} compact />
              </div>

              <div>
                <div className="mb-1 flex justify-between text-xs text-muted">
                  <span>{d.claimed}/{d.total} alındı</span>
                  <span>%{pct}</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-surface-2">
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
    </div>
  );
}

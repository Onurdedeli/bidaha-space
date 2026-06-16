"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { createDrop, updateDrop, deleteDrop, seedDrops, type DropInput } from "@/lib/actions";
import { Button } from "./ui";

export interface AdminDrop extends DropInput {
  id: string;
}

const KINDS = [
  { value: "konser", label: "Konser" },
  { value: "cikis", label: "Çıkış" },
  { value: "ozel", label: "Özel" },
];

function toLocalInput(iso: string): string {
  // ISO -> "YYYY-MM-DDTHH:mm" (yerel)
  const d = new Date(iso);
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

const empty: DropInput = {
  title: "",
  artist: "",
  context: "",
  emoji: "🎵",
  endsAt: "",
  href: "/anlar",
  kind: "ozel",
  total: 100,
  claimed: 0,
  published: true,
};

export function AdminDrops({ drops }: { drops: AdminDrop[] }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [draft, setDraft] = useState<DropInput>(empty);

  function refresh() {
    router.refresh();
  }

  function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    if (!draft.title || !draft.artist || !draft.endsAt) return;
    startTransition(async () => {
      await createDrop({ ...draft, endsAt: new Date(draft.endsAt).toISOString() });
      setDraft(empty);
      refresh();
    });
  }

  function handleSeed() {
    startTransition(async () => {
      await seedDrops();
      refresh();
    });
  }

  return (
    <div className="space-y-10">
      {/* Yeni drop */}
      <section className="rounded-[var(--radius-card)] border border-border bg-surface p-5">
        <h2 className="mb-4 text-lg font-bold">Yeni an / drop</h2>
        <form onSubmit={handleCreate} className="grid gap-3 sm:grid-cols-2">
          <Field label="Başlık" className="sm:col-span-2">
            <Input value={draft.title} onChange={(v) => setDraft({ ...draft, title: v })} />
          </Field>
          <Field label="Sanatçı">
            <Input value={draft.artist} onChange={(v) => setDraft({ ...draft, artist: v })} />
          </Field>
          <Field label="Emoji">
            <Input value={draft.emoji} onChange={(v) => setDraft({ ...draft, emoji: v })} />
          </Field>
          <Field label="Bağlam (kısa açıklama)" className="sm:col-span-2">
            <Input value={draft.context} onChange={(v) => setDraft({ ...draft, context: v })} />
          </Field>
          <Field label="Bitiş (pencere kapanışı)">
            <input
              type="datetime-local"
              value={draft.endsAt ? toLocalInput(draft.endsAt) : ""}
              onChange={(e) => setDraft({ ...draft, endsAt: e.target.value })}
              className="w-full rounded-xl border border-border bg-bg px-3 py-2 text-sm outline-none focus:border-brand"
            />
          </Field>
          <Field label="Tür">
            <select
              value={draft.kind}
              onChange={(e) => setDraft({ ...draft, kind: e.target.value })}
              className="w-full rounded-xl border border-border bg-bg px-3 py-2 text-sm outline-none focus:border-brand"
            >
              {KINDS.map((k) => (
                <option key={k.value} value={k.value}>{k.label}</option>
              ))}
            </select>
          </Field>
          <Field label="Link (href)" className="sm:col-span-2">
            <Input value={draft.href} onChange={(v) => setDraft({ ...draft, href: v })} />
          </Field>
          <Field label="Toplam kontenjan">
            <Input value={String(draft.total)} onChange={(v) => setDraft({ ...draft, total: Number(v) || 0 })} type="number" />
          </Field>
          <Field label="Alınan">
            <Input value={String(draft.claimed)} onChange={(v) => setDraft({ ...draft, claimed: Number(v) || 0 })} type="number" />
          </Field>
          <div className="sm:col-span-2 flex items-center justify-between">
            <label className="flex items-center gap-2 text-sm text-muted">
              <input
                type="checkbox"
                checked={draft.published}
                onChange={(e) => setDraft({ ...draft, published: e.target.checked })}
                className="accent-[var(--color-brand)]"
              />
              Yayında
            </label>
            <Button type="submit" variant="accent" disabled={pending}>
              {pending ? "..." : "Drop oluştur"}
            </Button>
          </div>
        </form>
      </section>

      {/* Mevcut drop'lar */}
      <section>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-bold">Mevcut drop&apos;lar ({drops.length})</h2>
          {drops.length === 0 && (
            <Button onClick={handleSeed} variant="outline" size="sm" disabled={pending}>
              Demo drop&apos;ları yükle
            </Button>
          )}
        </div>
        <div className="space-y-3">
          {drops.map((d) => (
            <DropRow key={d.id} drop={d} pending={pending} startTransition={startTransition} refresh={refresh} />
          ))}
          {drops.length === 0 && (
            <p className="rounded-[var(--radius-card)] border border-dashed border-border p-6 text-center text-sm text-muted">
              Henüz drop yok. Yukarıdan oluştur ya da demo verilerini yükle.
            </p>
          )}
        </div>
      </section>
    </div>
  );
}

function DropRow({
  drop,
  pending,
  startTransition,
  refresh,
}: {
  drop: AdminDrop;
  pending: boolean;
  startTransition: (cb: () => void) => void;
  refresh: () => void;
}) {
  const [claimed, setClaimed] = useState(drop.claimed);

  function save() {
    startTransition(async () => {
      await updateDrop(drop.id, { claimed });
      refresh();
    });
  }
  function togglePublish() {
    startTransition(async () => {
      await updateDrop(drop.id, { published: !drop.published });
      refresh();
    });
  }
  function remove() {
    startTransition(async () => {
      await deleteDrop(drop.id);
      refresh();
    });
  }

  const pct = drop.total ? Math.round((claimed / drop.total) * 100) : 0;

  return (
    <div className="flex flex-wrap items-center gap-3 rounded-[var(--radius-card)] border border-border bg-surface p-4">
      <span className="text-2xl">{drop.emoji}</span>
      <div className="min-w-48 flex-1">
        <div className="font-semibold">{drop.title}</div>
        <div className="text-xs text-muted">
          {drop.artist} · {drop.kind} · biter: {new Date(drop.endsAt).toLocaleString("tr-TR")}
        </div>
      </div>
      <div className="flex items-center gap-2 text-sm">
        <input
          type="number"
          value={claimed}
          onChange={(e) => setClaimed(Number(e.target.value) || 0)}
          className="w-20 rounded-lg border border-border bg-bg px-2 py-1 text-sm"
        />
        <span className="text-xs text-muted">/ {drop.total} (%{pct})</span>
        <Button onClick={save} size="sm" variant="outline" disabled={pending}>Kaydet</Button>
      </div>
      <button
        onClick={togglePublish}
        disabled={pending}
        className={`rounded-full px-3 py-1.5 text-xs font-semibold ${
          drop.published ? "bg-success/15 text-success" : "bg-surface-2 text-muted"
        }`}
      >
        {drop.published ? "Yayında" : "Taslak"}
      </button>
      <button onClick={remove} disabled={pending} className="text-sm text-muted hover:text-danger">
        Sil
      </button>
    </div>
  );
}

function Field({
  label,
  children,
  className = "",
}: {
  label: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <label className={`block ${className}`}>
      <span className="mb-1 block text-xs font-medium text-muted">{label}</span>
      {children}
    </label>
  );
}

function Input({
  value,
  onChange,
  type = "text",
}: {
  value: string;
  onChange: (v: string) => void;
  type?: string;
}) {
  return (
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full rounded-xl border border-border bg-bg px-3 py-2 text-sm outline-none focus:border-brand"
    />
  );
}

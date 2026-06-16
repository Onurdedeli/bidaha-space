"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Experience } from "@/lib/types";
import { useCart } from "./cart-provider";
import { Button } from "./ui";
import { formatTRY } from "@/lib/format";

export function ExperienceBooking({ experience }: { experience: Experience }) {
  const { add } = useCart();
  const router = useRouter();
  const [recipient, setRecipient] = useState("");
  const [note, setNote] = useState("");

  const personalized = experience.category === "mesaj";

  function handleBook() {
    const noteParts = [
      recipient && `Kime: ${recipient}`,
      note && `Not: ${note}`,
    ].filter(Boolean);
    add({
      itemId: experience.id,
      type: "experience",
      slug: experience.slug,
      name: experience.name,
      artist: experience.artist,
      image: experience.image,
      unitPrice: experience.price,
      quantity: 1,
      note: noteParts.length ? noteParts.join(" · ") : undefined,
    });
    router.push("/sepet");
  }

  return (
    <div className="space-y-4 rounded-[var(--radius-card)] border border-border bg-surface p-5">
      <div className="flex items-baseline justify-between">
        <span className="text-2xl font-bold">{formatTRY(experience.price)}</span>
        <span className="text-sm text-muted">{experience.delivery}</span>
      </div>

      {personalized && (
        <>
          <Field label="Kime özel? (isim)">
            <input
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              placeholder="Örn. Elif"
              className="w-full rounded-xl border border-border bg-bg px-3 py-2.5 text-sm outline-none focus:border-brand"
            />
          </Field>
          <Field label="Sanatçıya iletmek istediğin not">
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              rows={3}
              placeholder="Doğum günü, anınız, söylenmesini istediğin cümle..."
              className="w-full resize-none rounded-xl border border-border bg-bg px-3 py-2.5 text-sm outline-none focus:border-brand"
            />
          </Field>
        </>
      )}

      <div className="flex items-center justify-between rounded-xl bg-surface-2 px-3 py-2 text-sm">
        <span className="text-muted">Kalan kontenjan</span>
        <span className="font-semibold text-accent">{experience.slotsLeft}</span>
      </div>

      <Button onClick={handleBook} variant="accent" size="lg" className="w-full">
        Deneyimi ayırt
      </Button>
      <p className="text-center text-xs text-muted">
        Ödeme sonrası ekip seninle iletişime geçip detayları planlar.
      </p>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium">{label}</span>
      {children}
    </label>
  );
}

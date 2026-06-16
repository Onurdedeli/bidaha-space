"use client";

import { useState } from "react";
import { getAttribution } from "@/lib/attribution";
import { Button } from "./ui";

type Status = "idle" | "loading" | "ok" | "error";

export function EmailCapture({
  source = "footer",
  title = "Anları kaçırma",
  subtitle = "Yeni drop'lar ve kontenjanlar açıldığında ilk sen haberdar ol. Abonelik değil, sadece haber.",
  compact = false,
}: {
  source?: string;
  title?: string;
  subtitle?: string;
  compact?: boolean;
}) {
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<Status>("idle");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (status === "loading") return;
    if (!consent) {
      setStatus("error");
      return;
    }
    setStatus("loading");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source, consent, attribution: getAttribution() }),
      });
      setStatus(res.ok ? "ok" : "error");
      if (res.ok) setEmail("");
    } catch {
      setStatus("error");
    }
  }

  if (status === "ok") {
    return (
      <div className="rounded-xl border border-success/30 bg-success/10 px-4 py-3 text-sm text-success">
        ✓ Kaydın alındı. Bir an açılınca haber vereceğiz.
      </div>
    );
  }

  return (
    <form onSubmit={submit} className={compact ? "" : "max-w-md"}>
      {title && <h3 className="font-semibold">{title}</h3>}
      {subtitle && <p className="mt-1 text-sm text-muted">{subtitle}</p>}
      <div className="mt-3 flex flex-col gap-2 sm:flex-row">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="e-posta adresin"
          className="flex-1 rounded-full border border-border bg-bg px-4 py-2.5 text-sm outline-none focus:border-brand"
        />
        <Button type="submit" variant="accent" disabled={status === "loading"}>
          {status === "loading" ? "Gönderiliyor…" : "Haber ver"}
        </Button>
      </div>
      <label className="mt-2 flex items-start gap-2 text-xs text-muted">
        <input
          type="checkbox"
          checked={consent}
          onChange={(e) => setConsent(e.target.checked)}
          className="mt-0.5 accent-[var(--color-brand)]"
        />
        <span>
          Kampanya ve duyuru e-postaları almak istiyorum. Verilerim{" "}
          <a href="#" className="underline">aydınlatma metni</a> kapsamında işlenir. (KVKK)
        </span>
      </label>
      {status === "error" && (
        <p className="mt-2 text-xs text-danger">
          {consent ? "Bir hata oldu, tekrar dener misin?" : "Devam etmek için onay kutusunu işaretle."}
        </p>
      )}
    </form>
  );
}

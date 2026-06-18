"use client";

import { useEffect, useState } from "react";
import { Button } from "./ui";

const KEY = "superstar_consent_v1";

export function CookieConsent() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    try {
      if (!localStorage.getItem(KEY)) setShow(true);
    } catch {
      /* ignore */
    }
  }, []);

  function decide(value: "all" | "necessary") {
    try {
      localStorage.setItem(KEY, JSON.stringify({ value, at: new Date().toISOString() }));
    } catch {
      /* ignore */
    }
    setShow(false);
  }

  if (!show) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-[60] p-3 sm:p-4">
      <div className="mx-auto flex max-w-3xl flex-col gap-3 rounded-2xl border border-border bg-surface/95 p-4 shadow-xl backdrop-blur sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-muted">
          🍪 Deneyimini iyileştirmek ve kampanyaları ölçmek için çerez kullanıyoruz. Detaylar{" "}
          <a href="#" className="underline hover:text-foreground">çerez politikası</a>nda. (KVKK)
        </p>
        <div className="flex shrink-0 gap-2">
          <Button onClick={() => decide("necessary")} variant="ghost" size="sm">
            Yalnızca gerekli
          </Button>
          <Button onClick={() => decide("all")} variant="accent" size="sm">
            Tümünü kabul et
          </Button>
        </div>
      </div>
    </div>
  );
}

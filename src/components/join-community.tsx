"use client";

import { useEffect, useState, useTransition } from "react";
import { SignInButton } from "@clerk/nextjs";
import { authEnabled } from "@/lib/auth-config";
import { toggleFollow } from "@/lib/actions";
import { Button } from "./ui";

const LS_KEY = "superstar_following_v1";

export function JoinCommunity({
  slug,
  name,
  signedIn,
  initialFollowing,
}: {
  slug: string;
  name: string;
  signedIn: boolean;
  initialFollowing: boolean;
}) {
  const [following, setFollowing] = useState(initialFollowing);
  const [pending, startTransition] = useTransition();

  // Auth kapalıyken eski localStorage davranışı
  const [lsReady, setLsReady] = useState(false);
  useEffect(() => {
    if (authEnabled) return;
    try {
      const set = new Set<string>(JSON.parse(localStorage.getItem(LS_KEY) || "[]"));
      setFollowing(set.has(slug));
    } catch {
      /* ignore */
    }
    setLsReady(true);
  }, [slug]);

  function toggleLocal() {
    try {
      const set = new Set<string>(JSON.parse(localStorage.getItem(LS_KEY) || "[]"));
      if (set.has(slug)) set.delete(slug);
      else set.add(slug);
      localStorage.setItem(LS_KEY, JSON.stringify([...set]));
      setFollowing(set.has(slug));
    } catch {
      setFollowing((f) => !f);
    }
  }

  function toggleDb() {
    startTransition(async () => {
      const res = await toggleFollow(slug);
      if (!res.error) setFollowing(res.following);
    });
  }

  // Durum 2: auth açık ama giriş yok → giriş daveti
  if (authEnabled && !signedIn) {
    return (
      <div className="flex flex-col gap-2">
        <SignInButton mode="modal">
          <button className="inline-flex items-center justify-center rounded-full bg-accent px-6 py-3 text-base font-semibold text-white transition-colors hover:bg-accent-soft">
            {name} topluluğuna katıl
          </button>
        </SignInButton>
        <span className="text-xs text-muted">Ücretsiz · Katılmak için giriş yap · Anları kaçırma</span>
      </div>
    );
  }

  const onClick = authEnabled ? toggleDb : toggleLocal;
  const disabled = pending || (!authEnabled && !lsReady);

  return (
    <div className="flex flex-col gap-2">
      <Button onClick={onClick} variant={following ? "outline" : "accent"} size="lg" disabled={disabled}>
        {pending ? "..." : following ? "✓ Topluluktasın" : `${name} topluluğuna katıl`}
      </Button>
      <span className="text-xs text-muted">Ücretsiz · Abonelik yok · Anları kaçırma</span>
    </div>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { authEnabled } from "@/lib/auth-config";

export const metadata: Metadata = { title: "Hesabım" };

export default async function HesabimPage() {
  if (!authEnabled) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-24 text-center">
        <div className="text-5xl">🔐</div>
        <h1 className="mt-4 text-2xl font-bold">Giriş yakında</h1>
        <p className="mt-2 text-muted">
          Üyelik ve giriş özelliği için kimlik sağlayıcı (Clerk) anahtarları henüz bağlanmadı.
          Anahtarlar eklenince hesap, sipariş geçmişi ve takip ettiğin sanatçılar burada görünecek.
        </p>
        <Link
          href="/"
          className="mt-6 inline-flex rounded-full bg-brand px-5 py-2.5 text-sm font-semibold text-white"
        >
          Ana sayfa
        </Link>
      </div>
    );
  }

  // Auth açıkken çalışır (build sırasında bu dal env'e göre dışarıda kalır).
  const { currentUser } = await import("@clerk/nextjs/server");
  const { getMyFollows, getMyOrders } = await import("@/lib/actions");
  const { artists } = await import("@/lib/artists");
  const { formatTRY } = await import("@/lib/format");

  const user = await currentUser();
  const [followSlugs, myOrders] = await Promise.all([getMyFollows(), getMyOrders()]);
  const followed = artists.filter((a) => followSlugs.includes(a.slug));

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
      <h1 className="text-3xl font-extrabold tracking-tight">Hesabım</h1>
      <p className="mt-2 text-muted">
        Merhaba {user?.firstName || user?.emailAddresses[0]?.emailAddress || "👋"}.
      </p>

      {/* Takip edilen sanatçılar */}
      <section className="mt-10">
        <h2 className="text-xl font-bold">Takip ettiğin sanatçılar</h2>
        {followed.length === 0 ? (
          <p className="mt-2 text-sm text-muted">
            Henüz topluluğa katılmadın.{" "}
            <Link href="/sanatcilar" className="text-brand-soft underline">Sanatçıları keşfet →</Link>
          </p>
        ) : (
          <div className="mt-4 flex flex-wrap gap-3">
            {followed.map((a) => (
              <Link
                key={a.slug}
                href={`/sanatci/${a.slug}`}
                className="flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-2 text-sm hover:border-brand/50"
              >
                <span className="text-lg">{a.emoji}</span>
                <span className="font-semibold">{a.name}</span>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* Siparişler */}
      <section className="mt-10">
        <h2 className="text-xl font-bold">Siparişlerin</h2>
        {myOrders.length === 0 ? (
          <p className="mt-2 text-sm text-muted">
            Henüz siparişin yok.{" "}
            <Link href="/magaza" className="text-brand-soft underline">Mağazaya göz at →</Link>
          </p>
        ) : (
          <div className="mt-4 space-y-3">
            {myOrders.map((o) => (
              <div
                key={o.id}
                className="flex items-center justify-between rounded-[var(--radius-card)] border border-border bg-surface p-4"
              >
                <div>
                  <div className="font-mono text-xs text-muted">#{o.id.slice(0, 8)}</div>
                  <div className="mt-0.5 text-sm">
                    {new Date(o.createdAt).toLocaleDateString("tr-TR", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold">{formatTRY(o.total)}</div>
                  <div className="text-xs text-muted">{statusLabel(o.status)}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

function statusLabel(s: string) {
  return s === "paid" ? "✅ Ödendi" : s === "cancelled" ? "İptal" : "⏳ Beklemede";
}

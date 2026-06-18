import type { Metadata } from "next";
import Link from "next/link";
import { authEnabled } from "@/lib/auth-config";
import { getUserId, getUserEmail } from "@/lib/auth";
import { getSalesSummary } from "@/lib/sales";
import { PanelDashboard } from "@/components/panel-dashboard";

export const metadata: Metadata = {
  title: "Sanatçı Paneli",
  description: "Sanatçı ve menajer paneli — merch satışlarını, geliri ve siparişleri tek yerden takip et.",
};

export default async function PanelPage() {
  const summary = getSalesSummary();
  const signedIn = authEnabled ? !!(await getUserId()) : false;
  const email = signedIn ? await getUserEmail() : null;

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
      <header className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">Sanatçı Paneli</h1>
          <p className="mt-2 max-w-2xl text-muted">
            Sanatçı, menajer ve ekibin için satış kontrol merkezi. Merch satışlarını, geliri ve
            siparişleri gerçek zamanlı takip et.
          </p>
        </div>
        {signedIn ? (
          <span className="rounded-full border border-border bg-surface px-4 py-2 text-sm text-muted">
            👤 {email ?? "Giriş yapıldı"}
          </span>
        ) : null}
      </header>

      {/* erişim / veri durumu bandı */}
      {summary.source === "demo" && (
        <div className="mb-6 rounded-[var(--radius-card)] border border-brand/20 bg-brand/5 px-4 py-3 text-sm text-brand">
          ⓘ Şu an <strong>demo verisi</strong> gösteriliyor. Clerk (giriş) ve Neon (veritabanı)
          bağlandığında her sanatçı yalnızca kendi gerçek satışlarını görür; menajer ve ekip rolleri
          buradan yönetilir.
          {!authEnabled && (
            <Link href="/" className="ml-1 underline hover:no-underline">
              Nasıl bağlanır?
            </Link>
          )}
        </div>
      )}

      <PanelDashboard summary={summary} />
    </div>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { authEnabled } from "@/lib/auth-config";
import { isAdmin, adminRestricted, getUserId } from "@/lib/auth";
import { getAllDrops } from "@/lib/drops-db";
import { AdminDrops, type AdminDrop } from "@/components/admin-drops";

export const metadata: Metadata = { title: "Admin" };

export default async function AdminPage() {
  if (!authEnabled) {
    return (
      <Info
        title="Admin için giriş gerekli"
        text="Auth sağlayıcı (Clerk) anahtarları bağlandığında admin paneli açılır."
      />
    );
  }

  const ok = await isAdmin();
  if (!ok) {
    const uid = await getUserId();
    return (
      <Info
        title="Yetkin yok"
        text={
          uid
            ? "Bu hesap admin listesinde değil. Erişim için yöneticinden ADMIN_USER_IDS'e eklenmeni iste."
            : "Devam etmek için giriş yap."
        }
      />
    );
  }

  const rows = await getAllDrops();
  const drops: AdminDrop[] = rows.map((r) => ({
    id: r.id,
    title: r.title,
    artist: r.artist,
    context: r.context,
    emoji: r.emoji,
    endsAt: r.endsAt.toISOString(),
    href: r.href,
    kind: r.kind,
    total: r.total,
    claimed: r.claimed,
    published: r.published,
  }));

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight">Admin · Anlar</h1>
          <p className="mt-1 text-sm text-muted">
            Drop&apos;ları buradan anında yayınla. Değişiklikler home ve /anlar&apos;a hemen yansır.
          </p>
        </div>
        <Link href="/anlar" className="text-sm text-brand-soft hover:underline">/anlar →</Link>
      </div>

      {!adminRestricted && (
        <div className="mb-6 rounded-xl border border-accent/30 bg-accent/10 px-4 py-3 text-sm text-accent">
          ⚠️ Geliştirme modu: <code>ADMIN_USER_IDS</code> tanımlı değil, bu yüzden giriş yapan
          herkes admin. Yayına almadan önce kendi Clerk user id&apos;ni bu env&apos;e ekle.
        </div>
      )}

      <AdminDrops drops={drops} />
    </div>
  );
}

function Info({ title, text }: { title: string; text: string }) {
  return (
    <div className="mx-auto max-w-2xl px-4 py-24 text-center">
      <div className="text-5xl">🔐</div>
      <h1 className="mt-4 text-2xl font-bold">{title}</h1>
      <p className="mt-2 text-muted">{text}</p>
      <Link href="/" className="mt-6 inline-flex rounded-full bg-brand px-5 py-2.5 text-sm font-semibold text-white">
        Ana sayfa
      </Link>
    </div>
  );
}

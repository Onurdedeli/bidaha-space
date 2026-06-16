import { NextResponse } from "next/server";
import { sql } from "drizzle-orm";
import { db } from "@/lib/db";
import { subscribers } from "@/lib/db/schema";
import { getUserId } from "@/lib/auth";

export const runtime = "nodejs";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface Body {
  email?: string;
  source?: string;
  attribution?: unknown;
  consent?: boolean;
}

/**
 * E-posta / drop bildirim kaydı. Veri sahipliği ayağı.
 * DB (Neon) bağlıysa kalıcı upsert yapar; değilse güvenli log + 200.
 */
export async function POST(req: Request) {
  let body: Body;
  try {
    body = (await req.json()) as Body;
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  const email = (body.email || "").trim().toLowerCase();
  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ ok: false, error: "invalid_email" }, { status: 422 });
  }

  const userId = await getUserId();

  const record = {
    email,
    source: body.source || "unknown",
    consent: body.consent ?? false,
    attribution: (body.attribution ?? null) as object | null,
    userId,
  };

  if (db) {
    try {
      await db
        .insert(subscribers)
        .values(record)
        .onConflictDoUpdate({
          target: subscribers.email,
          set: {
            source: record.source,
            // onay bir kez verildiyse korunur
            consent: sql`(${subscribers.consent} OR excluded.consent)`,
            // yeni atıf varsa güncelle, yoksa mevcut (ilk-değme) atfı KORU
            attribution: sql`COALESCE(excluded.attribution, ${subscribers.attribution})`,
            // kullanıcıya bir kez bağlandıysa koru, yoksa gelen id'yi yaz
            userId: sql`COALESCE(${subscribers.userId}, excluded.user_id)`,
            lastSeenAt: sql`now()`,
            signupCount: sql`(${subscribers.signupCount}::int + 1)::text`,
          },
        });
      return NextResponse.json({ ok: true, persisted: true });
    } catch (err) {
      console.error("[subscribe] db error", err);
      return NextResponse.json({ ok: false, error: "db_error" }, { status: 500 });
    }
  }

  // DB henüz bağlı değil — kaybetmemek için yapılandırılmış log.
  console.log(
    "[subscribe]",
    JSON.stringify({ ...record, at: new Date().toISOString(), note: "no_db_fallback" }),
  );
  return NextResponse.json({ ok: true, persisted: false });
}

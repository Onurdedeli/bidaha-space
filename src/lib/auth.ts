import { authEnabled } from "./auth-config";

/** Giriş yapan kullanıcının Clerk id'si (yoksa null). Auth kapalıysa daima null. */
export async function getUserId(): Promise<string | null> {
  if (!authEnabled) return null;
  const { auth } = await import("@clerk/nextjs/server");
  const { userId } = await auth();
  return userId ?? null;
}

/** Giriş yapan kullanıcının e-postası (varsa). */
export async function getUserEmail(): Promise<string | null> {
  if (!authEnabled) return null;
  const { currentUser } = await import("@clerk/nextjs/server");
  const u = await currentUser();
  return u?.emailAddresses[0]?.emailAddress ?? null;
}

/**
 * Admin yetkisi. ADMIN_USER_IDS tanımlıysa yalnızca o id'ler admindir.
 * Boşsa (bootstrap/dev) giriş yapan herkes admin sayılır.
 */
export async function isAdmin(): Promise<boolean> {
  const uid = await getUserId();
  if (!uid) return false;
  const list = (process.env.ADMIN_USER_IDS || "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
  if (list.length === 0) return true;
  return list.includes(uid);
}

/** Admin listesinin env ile sınırlandırılıp sınırlandırılmadığı (uyarı göstermek için). */
export const adminRestricted = !!(process.env.ADMIN_USER_IDS || "").trim();

import Link from "next/link";
import { SignInButton, UserButton } from "@clerk/nextjs";
import { authEnabled } from "@/lib/auth-config";

/**
 * Navbar auth alanı — SERVER bileşeni. Navbar'a slot olarak geçilir.
 * Auth kapalıysa hiçbir şey render etmez (ve auth() çağrılmaz → sayfalar statik kalır).
 */
export async function AuthButtons() {
  if (!authEnabled) return null;

  const { auth } = await import("@clerk/nextjs/server");
  const { userId } = await auth();

  if (!userId) {
    return (
      <SignInButton mode="modal">
        <button className="rounded-full border border-border px-4 py-2 text-sm font-medium hover:bg-surface-2">
          Giriş
        </button>
      </SignInButton>
    );
  }

  return (
    <>
      <Link
        href="/hesabim"
        className="hidden rounded-full px-3 py-2 text-sm font-medium text-muted hover:text-foreground sm:inline-flex"
      >
        Hesabım
      </Link>
      <UserButton />
    </>
  );
}

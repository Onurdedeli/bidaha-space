import { ClerkProvider } from "@clerk/nextjs";
import { authEnabled } from "@/lib/auth-config";

/** Clerk anahtarları varsa ClerkProvider ile sarar; yoksa şeffaf geçer. */
export function AuthProvider({ children }: { children: React.ReactNode }) {
  if (!authEnabled) return <>{children}</>;
  return (
    <ClerkProvider
      localization={{ locale: "tr-TR" }}
      appearance={{ variables: { colorPrimary: "#7c3aed" } }}
    >
      {children}
    </ClerkProvider>
  );
}

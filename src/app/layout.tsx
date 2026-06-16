import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Suspense } from "react";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { CartProvider } from "@/components/cart-provider";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { AttributionTracker } from "@/components/attribution-tracker";
import { CookieConsent } from "@/components/cookie-consent";
import { AuthProvider } from "@/components/auth-provider";
import { AuthButtons } from "@/components/auth-buttons";
import { SITE_URL, SITE_NAME, SITE_DESCRIPTION } from "@/lib/site";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — Türk Müziği Merch & Deneyim Pazarı`,
    template: `%s · ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  keywords: [
    "Türk müziği", "merch", "konser", "sanatçı deneyimi", "kişiye özel video mesaj",
    "backstage", "meet and greet", "tişört", "şapka", "bidahaspace",
  ],
  openGraph: {
    type: "website",
    locale: "tr_TR",
    siteName: SITE_NAME,
    title: `${SITE_NAME} — Türk Müziği Merch & Deneyim Pazarı`,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} — Türk Müziği Merch & Deneyim Pazarı`,
    description: SITE_DESCRIPTION,
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="tr"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <AuthProvider>
          <CartProvider>
            <Suspense fallback={null}>
              <AttributionTracker />
            </Suspense>
            <Navbar authSlot={<AuthButtons />} />
            <main className="flex-1">{children}</main>
            <Footer />
            <CookieConsent />
          </CartProvider>
        </AuthProvider>
        <Analytics />
      </body>
    </html>
  );
}

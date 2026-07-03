import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import { Suspense } from "react";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { CartProvider } from "@/components/cart-provider";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { AttributionTracker } from "@/components/attribution-tracker";
import { CookieConsent } from "@/components/cookie-consent";
import { AuthProvider } from "@/components/auth-provider";
import { SITE_URL, SITE_NAME, SITE_DESCRIPTION } from "@/lib/site";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — Lisanslı Sanatçı Merch Pazarı`,
    template: `%s · ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  keywords: [
    "sanatçı merch", "lisanslı merch", "kişiselleştirilmiş tişört", "konser merch",
    "tişört", "şapka", "hoodie", "poster", "Türk müziği", "starlab",
  ],
  openGraph: {
    type: "website",
    locale: "tr_TR",
    siteName: SITE_NAME,
    title: `${SITE_NAME} — Lisanslı Sanatçı Merch Pazarı`,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} — Lisanslı Sanatçı Merch Pazarı`,
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
      className={`${inter.variable} ${spaceGrotesk.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <AuthProvider>
          <CartProvider>
            <Suspense fallback={null}>
              <AttributionTracker />
            </Suspense>
            <Navbar />
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

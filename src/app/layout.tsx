import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "./i18n/LanguageProvider";
import { SmoothScrollProvider } from "@/components/engine/SmoothScrollProvider";
import { GsapContext } from "@/components/engine/GsapContext";
import { LightTemperatureProvider } from "@/lib/LightTemperatureProvider";
import { Navbar } from "@/components/ui/Navbar";
import { Footer } from "@/components/ui/Footer";
import { CookieConsentBanner } from "@/components/ui/CookieConsentBanner";
import { ScrollToTop } from "@/components/ui/ScrollToTop";
import { CustomCursor } from "@/components/ui/CustomCursor";

import { OrganizationSchema } from "@/components/shared/OrganizationSchema";
import { getAssetPath } from "@/utils/basePath";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://www.kendalelektrik.com.tr"), // Update to real domain before deploy
  title: "Kendal Elektrik - Global Manufacturer Since 1997", // Default Turkish-aware structure limitation noted
  description: "Innovative lighting and electrical equipment.", // Note: App Router metadata is static and single-language by default for root layout.
  icons: {
    icon: getAssetPath("/kendal-icon.png"),
    apple: getAssetPath("/kendal-icon.png"),
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Kendal Elektrik - Global Manufacturer",
    description: "Innovative lighting and electrical equipment.",
    type: "website",
    url: "/",
    images: [{ url: getAssetPath("/images/og-cover.jpg"), width: 1200, height: 630 }],
    locale: "tr_TR",
    alternateLocale: ["en_US"],
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" suppressHydrationWarning>
      <body className={`${inter.className} antialiased transition-colors duration-200`} suppressHydrationWarning>
        <LanguageProvider>
          <SmoothScrollProvider>
            <LightTemperatureProvider>
              <GsapContext>
                <OrganizationSchema />
                <CustomCursor />
                <Navbar />
                <main>{children}</main>
                <Footer />
                <CookieConsentBanner />
                <ScrollToTop />
              </GsapContext>
            </LightTemperatureProvider>
          </SmoothScrollProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}

import { Navbar } from "@/components/ui/Navbar";
import { Footer } from "@/components/ui/Footer";
import { CookieConsentBanner } from "@/components/ui/CookieConsentBanner";
import { ScrollToTop } from "@/components/ui/ScrollToTop";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
      <CookieConsentBanner />
      <ScrollToTop />
    </>
  );
}

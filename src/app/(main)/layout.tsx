import { CookieConsentBanner } from '@/components/ui/CookieConsentBanner';
import { Footer } from '@/components/ui/Footer';
import { Navbar } from '@/components/ui/Navbar';
import { ScrollToTop } from '@/components/ui/ScrollToTop';

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

import { BrandNavbar } from "@/components/ui/BrandNavbar";
import { BrandFooter } from "@/components/ui/BrandFooter";
import { ScrollToTop } from "@/components/ui/ScrollToTop";
import { getAssetPath } from "@/utils/basePath";

export async function generateMetadata({ params }: { params: Promise<{ brandName: string }> }) {
  const resolvedParams = await params;
  const isK2 = resolvedParams.brandName === "k2";
  
  return {
    title: isK2 ? "K2 LED SYSTEMS" : "VANTİ",
    icons: {
      icon: getAssetPath(isK2 ? "/images/brands/k2-logo.svg" : "/images/brands/vanti-logo.svg"),
      apple: getAssetPath(isK2 ? "/images/brands/k2-logo.svg" : "/images/brands/vanti-logo.svg"),
    }
  };
}

export function generateStaticParams() {
  return [
    { brandName: "k2" },
    { brandName: "vanti" }
  ];
}

export default async function BrandLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ brandName: string }>;
}) {
  const resolvedParams = await params;
  const { brandName } = resolvedParams;
  const isK2 = brandName === "k2";

  const scrollColor = isK2 
    ? "bg-orange-500 hover:bg-orange-600 shadow-[0_0_15px_rgba(249,115,22,0.5)]" 
    : "bg-blue-600 hover:bg-blue-700 shadow-[0_0_15px_rgba(37,99,235,0.5)]";

  return (
    <div className="brand-layout-container min-h-screen flex flex-col bg-white">
      <BrandNavbar brandName={brandName} />

      <main className="flex-grow pt-20">
        {children}
      </main>

      <BrandFooter brandName={brandName} />
      <ScrollToTop colorClass={scrollColor} />
    </div>
  );
}

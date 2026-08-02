import React from "react";

export const metadata = {
  title: "Gizlilik ve Çerez Politikası | Kendal Elektrik",
  description: "Kendal Elektrik Gizlilik ve Çerez Politikası.",
};

export default function PrivacyCookiesPage() {
  return (
    <div className="min-h-screen bg-[#050505] text-white pt-32 pb-24 px-6">
      <div className="max-w-4xl mx-auto bg-white/5 p-8 md:p-12 rounded-2xl border border-white/10">
        <h1 className="text-3xl md:text-5xl font-bold mb-10 text-[var(--brand-red)]">
          Gizlilik ve Çerez Politikası
        </h1>

        <div className="space-y-8 text-gray-300 leading-relaxed">
          <section>
            <h2 className="text-xl font-semibold text-white mb-4">Toplanan Veriler</h2>
            {/* [PLACEHOLDER: Paste approved Privacy Policy clause text here] */}
            <p className="opacity-50 italic">[PLACEHOLDER: Toplanan Veriler metni buraya eklenecektir.]</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-4">Çerezlerin Kullanımı</h2>
            {/* [PLACEHOLDER: Paste approved Privacy Policy clause text here] */}
            <p className="opacity-50 italic">[PLACEHOLDER: Çerezlerin Kullanımı metni buraya eklenecektir.]</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-4">Veri Güvenliği</h2>
            {/* [PLACEHOLDER: Paste approved Privacy Policy clause text here] */}
            <p className="opacity-50 italic">[PLACEHOLDER: Veri Güvenliği politikası buraya eklenecektir.]</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-4">İletişim</h2>
            {/* [PLACEHOLDER: Paste approved Privacy Policy clause text here] */}
            <p className="opacity-50 italic">[PLACEHOLDER: İletişim bilgileri buraya eklenecektir.]</p>
          </section>
        </div>
      </div>
    </div>
  );
}

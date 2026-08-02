import React from "react";

export const metadata = {
  title: "KVKK Aydınlatma Metni | Kendal Elektrik",
  description: "Kendal Elektrik KVKK Aydınlatma Metni.",
};

export default function KVKKPage() {
  return (
    <div className="min-h-screen bg-[#050505] text-white pt-32 pb-24 px-6">
      <div className="max-w-4xl mx-auto bg-white/5 p-8 md:p-12 rounded-2xl border border-white/10">
        <h1 className="text-3xl md:text-5xl font-bold mb-10 text-[var(--brand-red)]">
          KVKK Aydınlatma Metni
        </h1>

        <div className="space-y-8 text-gray-300 leading-relaxed">
          <section>
            <h2 className="text-xl font-semibold text-white mb-4">1. Giriş</h2>
            {/* [PLACEHOLDER: Paste approved KVKK clause text here] */}
            <p className="opacity-50 italic">[PLACEHOLDER: Kendal Elektrik resmi KVKK "Giriş" metni buraya eklenecektir.]</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-4">2. Kişisel Veri Tanımı ve İşlenmesi</h2>
            {/* [PLACEHOLDER: Paste approved KVKK clause text here] */}
            <p className="opacity-50 italic">[PLACEHOLDER: Kişisel Veri Tanımı ve İşlenmesi metni buraya eklenecektir.]</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-4">3. Veri Sorumlusunun Kimliği</h2>
            {/* [PLACEHOLDER: Paste approved KVKK clause text here] */}
            <p className="opacity-50 italic">[PLACEHOLDER: Veri Sorumlusunun Kimliği metni buraya eklenecektir.]</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-4">4. Kişisel Verilerin Toplanması, İşlenmesi ve İşleme Amaçları</h2>
            {/* [PLACEHOLDER: Paste approved KVKK clause text here] */}
            <p className="opacity-50 italic">[PLACEHOLDER: Toplanma ve İşlenme amaçları metni buraya eklenecektir.]</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-4">5. Kişisel Verilerin Aktarılması</h2>
            {/* [PLACEHOLDER: Paste approved KVKK clause text here] */}
            <p className="opacity-50 italic">[PLACEHOLDER: Veri aktarım politikası metni buraya eklenecektir.]</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-4">6. Kişisel Veri Sahibinin Hakları (KVKK m.11)</h2>
            {/* [PLACEHOLDER: Paste approved KVKK clause text here] */}
            <p className="opacity-50 italic">[PLACEHOLDER: KVKK m.11 hakları metni buraya eklenecektir.]</p>
          </section>
        </div>
      </div>
    </div>
  );
}

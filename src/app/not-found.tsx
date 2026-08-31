import Link from 'next/link';

export default function NotFound() {
  const year = new Date().getFullYear();

  return (
    <div className="relative flex min-h-[80vh] flex-col items-center justify-center overflow-hidden bg-black px-6 py-24 text-white">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />

      <div className="relative z-10 flex flex-col items-center text-center">
        <svg
          className="notfound-bulb mb-6 h-16 w-16"
          viewBox="0 0 64 64"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M32 6C20.4 6 11 15.4 11 27c0 8 4.4 13.6 8.4 17.6 2 2 3.1 4.6 3.1 7.4v1h19v-1c0-2.8 1.1-5.4 3.1-7.4C48.6 40.6 53 35 53 27 53 15.4 43.6 6 32 6z"
            stroke="var(--brand-red)"
            strokeWidth="2.5"
          />
          <path
            d="M26 40h12M28 46h8"
            stroke="var(--brand-red)"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <path
            d="M26 20c-2.8 2-4.5 4.8-4.9 8.4M32 16v0"
            stroke="var(--brand-red)"
            strokeWidth="2"
            strokeLinecap="round"
            opacity="0.6"
          />
        </svg>

        <h1 className="notfound-glow text-[5rem] font-bold leading-none tracking-tight sm:text-[7rem]">
          404
        </h1>

        <h2 className="mt-4 text-xl font-semibold sm:text-2xl">
          Bu sayfanın ışıkları sönmüş
        </h2>
        <p className="mt-3 max-w-md text-sm leading-relaxed text-gray-400 sm:text-base">
          Aradığınız sayfa taşınmış, kaldırılmış ya da hiç var olmamış olabilir.
        </p>

        <Link
          href="/"
          className="mt-10 rounded-full bg-[var(--brand-red)] px-8 py-3 text-sm font-semibold transition-colors hover:bg-[var(--brand-red-deep)]"
        >
          Ana Sayfaya Dön
        </Link>
      </div>

      <p className="relative z-10 mt-16 text-xs text-gray-600">
        © {year} Kendal Elektrik
      </p>

      <style>{`
        .notfound-glow {
          color: #fff;
          text-shadow: 0 0 24px rgba(227, 0, 15, 0.55), 0 0 60px rgba(227, 0, 15, 0.25);
          animation: notfound-flicker 5s infinite;
        }
        .notfound-bulb {
          filter: drop-shadow(0 0 10px rgba(227, 0, 15, 0.45));
          animation: notfound-flicker 5s infinite;
        }
        @keyframes notfound-flicker {
          0%, 3%, 6%, 100% { opacity: 1; }
          4% { opacity: 0.4; }
          5% { opacity: 0.85; }
          52% { opacity: 1; }
          53% { opacity: 0.5; }
          54% { opacity: 1; }
        }
        @media (prefers-reduced-motion: reduce) {
          .notfound-glow, .notfound-bulb { animation: none; }
        }
      `}</style>
    </div>
  );
}

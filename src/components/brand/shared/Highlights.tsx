"use client";

interface Stat {
  value: string;
  label: string;
}

interface HighlightsProps {
  eyebrow: string;
  title: string;
  stats: Stat[];
  accent: string;
  theme?: "dark" | "light";
}

// Apple/Dyson-style "engineering numbers" band.
export function Highlights({ eyebrow, title, stats, accent, theme = "dark" }: HighlightsProps) {
  const isDark = theme === "dark";
  const dotColor = isDark ? "rgba(255,255,255,0.7)" : "rgba(0,0,0,0.35)";
  const numberColor = isDark ? "text-white" : "text-zinc-900";
  const labelColor = isDark ? "text-white/45" : "text-zinc-500";
  const borderColor = isDark ? "border-white/10" : "border-zinc-900/10";

  return (
    <section className="reveal-text relative z-10 w-full py-24 md:py-32 px-6 md:px-24 overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.12]"
        style={{
          backgroundImage: `radial-gradient(${dotColor} 1px, transparent 1px)`,
          backgroundSize: "26px 26px",
        }}
      />

      <div className="relative max-w-3xl mx-auto text-center">
        <h3 className="font-semibold tracking-widest mb-6 uppercase text-sm md:text-base" style={{ color: accent }}>
          {eyebrow}
        </h3>
        <h2 className="text-3xl md:text-5xl font-bold leading-tight mb-16 md:mb-20">{title}</h2>
      </div>

      <div className="relative grid grid-cols-2 md:grid-cols-4 gap-y-12 max-w-5xl mx-auto text-center">
        {stats.map((stat, i) => (
          <div key={i} className={`px-4 md:border-l ${borderColor} first:border-l-0`}>
            <div className={`text-4xl md:text-6xl font-bold ${numberColor} mb-2 md:mb-3 tracking-tight`}>
              {stat.value}
            </div>
            <div className={`text-[11px] md:text-sm ${labelColor} uppercase tracking-wide leading-snug`}>
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

"use client";

import { useMemo, useState, type CSSProperties } from "react";
import { feature } from "topojson-client";
import landTopology from "@/data/world-land-110m.json";
import { HQ, EXPORT_COUNTRIES, type ExportCountry } from "@/data/exportCountries";

type Ring = [number, number][];
type PolygonGeom = { type: "Polygon"; coordinates: Ring[] };
type MultiPolygonGeom = { type: "MultiPolygon"; coordinates: Ring[][] };

const WIDTH = 980;
const HEIGHT = 480;
const ZOOM = 3.2;

function project(lon: number, lat: number): [number, number] {
  const x = ((lon + 180) / 360) * WIDTH;
  const y = ((90 - lat) / 180) * HEIGHT;
  return [x, y];
}

function arcPath(x1: number, y1: number, x2: number, y2: number): string {
  const mx = (x1 + x2) / 2;
  const my = (y1 + y2) / 2;
  const dist = Math.hypot(x2 - x1, y2 - y1);
  const bow = my - dist * 0.14;
  return `M${x1.toFixed(1)},${y1.toFixed(1)} Q${mx.toFixed(1)},${bow.toFixed(1)} ${x2.toFixed(1)},${y2.toFixed(1)}`;
}

interface ExportMapInnerProps {
  language: string;
  accent: string;
  theme?: "dark" | "light";
}

export default function ExportMapInner({ language, accent, theme = "dark" }: ExportMapInnerProps) {
  const isDark = theme === "dark";
  // Solid-ish frosted panel (not a faint tint) — brand pages with a busy 3D
  // scene behind them (K2Scene, VantiScene) would otherwise show the map
  // barely at all, since a 3-5% tint reads as almost fully transparent.
  const containerClass = isDark
    ? "bg-black/55 backdrop-blur-xl border-white/10"
    : "bg-white/70 backdrop-blur-xl border-white/50";
  const landFill = isDark ? "rgba(255,255,255,0.09)" : "rgba(0,0,0,0.09)";
  const landStroke = isDark ? "rgba(255,255,255,0.16)" : "rgba(0,0,0,0.2)";
  const [activeId, setActiveId] = useState<string | null>(null);

  const landPath = useMemo(() => {
    const topology = landTopology as unknown as {
      type: "Topology";
      objects: { land: unknown };
      arcs: number[][][];
      transform?: { scale: [number, number]; translate: [number, number] };
    };
    const geo = feature(topology, topology.objects.land);
    const geometries =
      geo.type === "FeatureCollection"
        ? geo.features.map((f) => f.geometry as PolygonGeom | MultiPolygonGeom)
        : [geo.geometry as PolygonGeom | MultiPolygonGeom];

    const ringsToPath = (rings: Ring[]) =>
      rings
        .map((ring) =>
          ring
            .map(([lon, lat], i) => {
              const [x, y] = project(lon, lat);
              return `${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`;
            })
            .join(" ") + "Z"
        )
        .join(" ");

    return geometries
      .map((geom) =>
        geom.type === "Polygon"
          ? ringsToPath(geom.coordinates)
          : geom.coordinates.map((polygon) => ringsToPath(polygon)).join(" ")
      )
      .join(" ");
  }, []);

  const allPins: ExportCountry[] = useMemo(() => [HQ, ...EXPORT_COUNTRIES], []);
  const active = allPins.find((c) => c.id === activeId);
  const [originX, originY] = active ? project(active.lon, active.lat) : [WIDTH / 2, HEIGHT / 2];
  const transformOrigin = `${(originX / WIDTH) * 100}% ${(originY / HEIGHT) * 100}%`;
  const [hqX, hqY] = project(HQ.lon, HQ.lat);

  const toggle = (id: string) => setActiveId((cur) => (cur === id ? null : id));

  return (
    <div className="w-full" style={{ "--accent": accent } as CSSProperties}>
      <div className={`relative w-full overflow-hidden rounded-[2rem] border ${containerClass}`}>
        <div
          style={{
            transform: `scale(${active ? ZOOM : 1})`,
            transformOrigin,
            transition: "transform 700ms cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          <svg viewBox={`0 0 ${WIDTH} ${HEIGHT}`} className="w-full h-auto block" role="img" aria-label="Export reach map">
            <path d={landPath} fill={landFill} stroke={landStroke} strokeWidth={0.6} />

            {EXPORT_COUNTRIES.map((c) => {
              const [x, y] = project(c.lon, c.lat);
              return (
                <path
                  key={`arc-${c.id}`}
                  d={arcPath(hqX, hqY, x, y)}
                  fill="none"
                  stroke="var(--accent)"
                  strokeWidth={0.5}
                  strokeDasharray="1.5 2.5"
                  opacity={0.28}
                />
              );
            })}

            {allPins.map((c) => {
              const [x, y] = project(c.lon, c.lat);
              const isActive = activeId === c.id;
              const isHQ = c.id === HQ.id;
              return (
                <g
                  key={c.id}
                  onClick={() => toggle(c.id)}
                  className="cursor-pointer"
                  aria-label={language === "en" ? c.nameEn : c.nameTr}
                >
                  <circle cx={x} cy={y} r={9} fill="transparent" />
                  {!isHQ && <circle cx={x} cy={y} r={7} fill="none" stroke="var(--accent)" strokeWidth={0.75} opacity={0.3} />}
                  <circle
                    cx={x}
                    cy={y}
                    r={isHQ ? 5.5 : isActive ? 4.5 : 3.5}
                    fill={isActive || isHQ ? (isDark ? "#ffffff" : "#18181b") : "var(--accent)"}
                    stroke="var(--accent)"
                    strokeWidth={isActive || isHQ ? 2 : 0}
                  />
                </g>
              );
            })}
          </svg>
        </div>

        {active && (
          <div
            className="absolute z-10 px-4 py-2.5 rounded-xl bg-white text-zinc-900 shadow-2xl flex items-center gap-2 whitespace-nowrap animate-[k2-pop_.25s_ease-out_forwards]"
            style={{ left: `${(originX / WIDTH) * 100}%`, top: `${(originY / HEIGHT) * 100}%` }}
          >
            <span className="text-lg leading-none">{active.flag}</span>
            <span className="text-sm font-bold">{language === "en" ? active.nameEn : active.nameTr}</span>
            <button
              type="button"
              aria-label="close"
              onClick={(e) => {
                e.stopPropagation();
                setActiveId(null);
              }}
              className="ml-1 w-5 h-5 rounded-full bg-zinc-100 hover:bg-zinc-200 flex items-center justify-center text-zinc-500 text-xs cursor-pointer"
            >
              ×
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

"use client";

import { useMemo, useState, type CSSProperties } from "react";
import { feature } from "topojson-client";
import provincesTopology from "@/data/turkey-provinces.json";

type Ring = [number, number][];
type PolygonGeom = { type: "Polygon"; coordinates: Ring[] };
type MultiPolygonGeom = { type: "MultiPolygon"; coordinates: Ring[][] };

interface ProvinceShape {
  name: string;
  d: string;
  cx: number;
  cy: number;
}

const WIDTH = 900;
const NAME_OVERRIDES: Record<string, string> = {
  Afyon: "Afyonkarahisar",
};

interface DealerMapInnerProps {
  language: string;
  accent: string;
  theme?: "dark" | "light";
  dealerLabel: string;
}

export default function DealerMapInner({ language, accent, theme = "dark", dealerLabel }: DealerMapInnerProps) {
  const isDark = theme === "dark";
  const containerClass = isDark
    ? "bg-black/55 backdrop-blur-xl border-white/10"
    : "bg-white/70 backdrop-blur-xl border-white/50";
  const [activeName, setActiveName] = useState<string | null>(null);

  const { provinces, height } = useMemo(() => {
    const topology = provincesTopology as unknown as {
      type: "Topology";
      objects: Record<string, unknown>;
      arcs: number[][][];
      transform?: { scale: [number, number]; translate: [number, number] };
    };
    const objectKey = Object.keys(topology.objects)[0];
    const geo = feature(topology, topology.objects[objectKey] as never);
    const features = geo.type === "FeatureCollection" ? geo.features : [geo];

    let lonMin = Infinity;
    let lonMax = -Infinity;
    let latMin = Infinity;
    let latMax = -Infinity;
    for (const f of features) {
      const geom = f.geometry as PolygonGeom | MultiPolygonGeom;
      const polys = geom.type === "Polygon" ? [geom.coordinates] : geom.coordinates;
      for (const poly of polys) {
        for (const ring of poly) {
          for (const [lon, lat] of ring) {
            if (lon < lonMin) lonMin = lon;
            if (lon > lonMax) lonMax = lon;
            if (lat < latMin) latMin = lat;
            if (lat > latMax) latMax = lat;
          }
        }
      }
    }

    const cosLat = Math.cos(((latMin + latMax) / 2) * (Math.PI / 180));
    const geoWidth = (lonMax - lonMin) * cosLat;
    const geoHeight = latMax - latMin;
    const scale = WIDTH / geoWidth;
    const mapHeight = geoHeight * scale;

    const project = (lon: number, lat: number): [number, number] => [
      (lon - lonMin) * cosLat * scale,
      (latMax - lat) * scale,
    ];

    const ringPath = (ring: Ring) =>
      `${ring
        .map(([lon, lat], i) => {
          const [x, y] = project(lon, lat);
          return `${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`;
        })
        .join(" ")}Z`;

    const provinces: ProvinceShape[] = features.map((f) => {
      const geom = f.geometry as PolygonGeom | MultiPolygonGeom;
      const polys = geom.type === "Polygon" ? [geom.coordinates] : geom.coordinates;
      const d = polys.map((poly) => poly.map(ringPath).join(" ")).join(" ");

      let mainRing: Ring = polys[0][0];
      for (const poly of polys) {
        for (const ring of poly) {
          if (ring.length > mainRing.length) mainRing = ring;
        }
      }
      let sx = 0;
      let sy = 0;
      for (const [lon, lat] of mainRing) {
        const [x, y] = project(lon, lat);
        sx += x;
        sy += y;
      }

      const rawName = (f.properties as { name: string }).name;
      return { name: NAME_OVERRIDES[rawName] || rawName, d, cx: sx / mainRing.length, cy: sy / mainRing.length };
    });

    return { provinces, height: mapHeight };
  }, []);

  const active = provinces.find((p) => p.name === activeName);
  const clear = (name: string) => setActiveName((cur) => (cur === name ? null : cur));

  return (
    <div className="w-full" style={{ "--accent": accent } as CSSProperties}>
      <div className={`relative w-full overflow-hidden rounded-[2rem] border ${containerClass}`}>
        <svg
          viewBox={`0 0 ${WIDTH} ${height.toFixed(1)}`}
          className="w-full h-auto block"
          role="img"
          aria-label={language === "en" ? "Dealer coverage map of Turkey" : "Türkiye bayi kapsama haritası"}
        >
          {provinces.map((p) => {
            const isActive = activeName === p.name;
            return (
              <path
                key={p.name}
                d={p.d}
                fill="var(--accent)"
                fillOpacity={isActive ? 0.85 : 0.35}
                stroke={isDark ? "rgba(255,255,255,0.35)" : "rgba(255,255,255,0.9)"}
                strokeWidth={isActive ? 1.6 : 0.8}
                tabIndex={0}
                role="button"
                aria-label={p.name}
                className="cursor-pointer outline-none transition-[fill-opacity,stroke-width] duration-200"
                onMouseEnter={() => setActiveName(p.name)}
                onMouseLeave={() => clear(p.name)}
                onFocus={() => setActiveName(p.name)}
                onBlur={() => clear(p.name)}
              />
            );
          })}
        </svg>

        {active && (
          <div
            className="pointer-events-none absolute z-10 px-4 py-2.5 rounded-xl bg-white text-zinc-900 shadow-2xl flex items-center gap-2 whitespace-nowrap animate-[k2-pop_.2s_ease-out_forwards]"
            style={{ left: `${(active.cx / WIDTH) * 100}%`, top: `${(active.cy / height) * 100}%` }}
          >
            <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: accent }} />
            <span className="text-sm font-bold">{active.name}</span>
            <span className="text-xs text-zinc-400">{dealerLabel}</span>
          </div>
        )}
      </div>
    </div>
  );
}

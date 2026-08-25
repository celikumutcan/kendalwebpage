// @types/topojson-client depends on the unpublished "topojson-specification"
// package, so its types can't resolve. We only ever call `feature()` with a
// GeometryCollection and read back a GeoJSON FeatureCollection, so a minimal
// local declaration is enough — see K2ExportMapInner.tsx.
declare module "topojson-client" {
  interface MinimalTopology {
    type: "Topology";
    objects: Record<string, unknown>;
    arcs: number[][][];
    transform?: { scale: [number, number]; translate: [number, number] };
  }

  export function feature(
    topology: MinimalTopology,
    object: unknown
  ): GeoJSON.Feature | GeoJSON.FeatureCollection;
}

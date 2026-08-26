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

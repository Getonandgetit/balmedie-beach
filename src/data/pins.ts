export type LayerId = "landmarks" | "ww2" | "wildlife" | "geography";

export interface Pin {
  id: string;
  layer: LayerId;
  /** Position as a percentage of the illustrated map's width/height. */
  x: number;
  y: number;
  title: string;
  blurb: string;
  href: string;
  /** True for the numbered landmarks printed on the map artwork itself. */
  onArtwork?: boolean;
}

export interface MapRoute {
  slug: string;
  name: string;
  difficulty: "Easy" | "Moderate";
  distance: string;
  duration: string;
  /** Line colour as printed in the map legend. */
  color: string;
  dashed: boolean;
  blurb: string;
}

export interface Layer {
  id: LayerId;
  label: string;
  color: string;
  icon: "signpost" | "pillbox" | "tern" | "dune";
}

// The five waymarked park routes, as printed in the map legend.
export const routes: MapRoute[] = [
  {
    slug: "beach-walk",
    name: "Beach Walk — Access to All",
    difficulty: "Easy",
    distance: "600 m",
    duration: "15–20 min",
    color: "#1f6f6f",
    dashed: false,
    blurb:
      "Follow the solid teal line from the Sand Bothy straight to the sand — the fully accessible route to the beach, good for wheelchairs and buggies.",
  },
  {
    slug: "marram-grass",
    name: "Marram Grass Route",
    difficulty: "Easy",
    distance: "800 m",
    duration: "20–30 min",
    color: "#b23a4e",
    dashed: false,
    blurb:
      "Follow the crimson line through the marram-bound dunes behind the beach — a short loop with the best close-up of the mobile dune system.",
  },
  {
    slug: "ice-house-route",
    name: "Ice House Route",
    difficulty: "Easy",
    distance: "1.7 km",
    duration: "30–45 min",
    color: "#c98a3a",
    dashed: false,
    blurb:
      "Follow the gold line east across the park to the historic salmon-fishery ice house — the walk with the most heritage per step.",
  },
  {
    slug: "horse-route",
    name: "Horse Route",
    difficulty: "Easy",
    distance: "500 m",
    duration: "10–15 min",
    color: "#6b4a2b",
    dashed: false,
    blurb:
      "Follow the brown line on the short bridleway loop — shared with riders, so keep dogs close and give horses room.",
  },
  {
    slug: "thyme-walk",
    name: "Thyme Walk",
    difficulty: "Moderate",
    distance: "3.5 km",
    duration: "1–1.5 hrs",
    color: "#a83c28",
    dashed: true,
    blurb:
      "Follow the dashed brick-red line on the park's longest loop, sweeping east past the pill boxes and ice house before circling back through the heath.",
  },
];

// Pin positions are percentages of the map artwork (beach-map-v2.png, 1257 × 887).
// The numbered landmarks match the markers printed on the map; wildlife and
// geography hotspots are indicative placements within the right habitat zone.
export const pins: Pin[] = [
  // Park landmarks (printed on the map)
  {
    id: "sand-bothy",
    layer: "landmarks",
    x: 16.5,
    y: 55.7,
    title: "The Sand Bothy",
    blurb:
      "The park's information hub by the main car park — exhibition, toilets, refreshments, and the starting point for all five waymarked routes.",
    href: "/walking-routes",
    onArtwork: true,
  },
  {
    id: "ice-house",
    layer: "landmarks",
    x: 79.1,
    y: 49.0,
    title: "Ice House",
    blurb:
      "The surviving dune ice house where the salmon catch was packed to keep it fresh before the journey to market — a relic of the coast's fishing economy.",
    href: "/human-geography",
    onArtwork: true,
  },
  // WW2 History (printed on the map)
  {
    id: "bunker",
    layer: "ww2",
    x: 23.3,
    y: 41.3,
    title: "The Bunker",
    blurb:
      "A surviving wartime structure in the dunes near the beach access — part of the coastal defences that once lined this shore.",
    href: "/ww2-history",
    onArtwork: true,
  },
  {
    id: "pillboxes",
    layer: "ww2",
    x: 41.2,
    y: 44.9,
    title: "Pill Boxes",
    blurb:
      "The pillbox group, including the unusual seven-sided design with nine firing embrasures — still standing guard over the dunes.",
    href: "/ww2-history",
    onArtwork: true,
  },
  // Wildlife (indicative placements)
  {
    id: "tern-colony",
    layer: "wildlife",
    x: 55.7,
    y: 27.1,
    title: "Tern Colony",
    blurb: "Breeding terns nest on the upper foreshore in early summer — please keep to the paths.",
    href: "/wildlife",
  },
  {
    id: "eider-rafts",
    layer: "wildlife",
    x: 68.4,
    y: 16.9,
    title: "Eider Rafts",
    blurb: "Eider ducks gather offshore in loose rafts, often visible from the beach year-round.",
    href: "/wildlife",
  },
  {
    id: "dune-flora",
    layer: "wildlife",
    x: 35.4,
    y: 34.4,
    title: "Dune Flora Zone",
    blurb: "Marram grass, crowberry and cross-leaved heath stabilise the fixed dunes here.",
    href: "/wildlife",
  },
  {
    id: "water-vole-burn",
    layer: "wildlife",
    x: 79.6,
    y: 38.3,
    title: "Water Vole Burn",
    blurb: "The burn's wetland margin is home to a small water vole population.",
    href: "/wildlife",
  },
  // Physical Geography (indicative placements)
  {
    id: "mobile-dunes",
    layer: "geography",
    x: 23.9,
    y: 25.9,
    title: "Mobile Dune Viewpoint",
    blurb: "Watch active sand movement on the seaward face of the youngest, mobile dunes.",
    href: "/physical-geography",
  },
  {
    id: "fixed-dunes",
    layer: "geography",
    x: 70.0,
    y: 66.5,
    title: "Fixed Dune & Heath",
    blurb: "Older, stabilised dunes now support heath vegetation over 5,000+ years of formation.",
    href: "/physical-geography",
  },
  {
    id: "burn-mouth",
    layer: "geography",
    x: 66.7,
    y: 33.4,
    title: "The Burn",
    blurb: "Where the burn cuts through the dunes towards the sea — a good erosion case study.",
    href: "/physical-geography",
  },
];

export const layers: Layer[] = [
  { id: "landmarks", label: "Park Landmarks", color: "#1f4f4f", icon: "signpost" },
  { id: "ww2", label: "WW2 Sites", color: "#b23a2f", icon: "pillbox" },
  { id: "wildlife", label: "Wildlife Hotspots", color: "#3c8080", icon: "tern" },
  { id: "geography", label: "Geography Features", color: "#c98a3a", icon: "dune" },
];

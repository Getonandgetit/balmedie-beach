import Link from "next/link";
import Hero from "@/components/Hero";
import RouteCard from "@/components/RouteCard";
import RoutePicker from "@/components/quiz/RoutePicker";
import { palette } from "@/lib/palette";

export default function WalkingRoutesPage() {
  return (
    <main className="flex-1 px-4 py-8 sm:px-8">
      <div
        className="mx-auto max-w-3xl rounded-2xl p-4 shadow-lg sm:p-8"
        style={{ backgroundColor: palette.offWhite }}
      >
        <Hero
          src="/images/hero-walking-routes.png"
          alt="Illustrated poster of a hiker walking along the boardwalk through the dunes towards the sea"
          kicker="Five routes · One beach"
          title="Walking Routes"
          accent={palette.marramDark}
        />

        <Link
          href="/"
          className="mt-6 inline-flex items-center gap-1.5 rounded-full border px-3 py-1 font-heading text-xs uppercase tracking-widest"
          style={{ borderColor: palette.seaDark, color: palette.seaDark }}
        >
          ← Back to the map
        </Link>

        <p
          className="drop-cap mt-5 text-base leading-relaxed"
          style={{ color: palette.ink, "--drop-color": palette.marramDark } as React.CSSProperties}
        >
          Five colour-coded, waymarked routes all start at the Sand Bothy, the
          park&apos;s information hub by the main car park — where you&apos;ll
          also find toilets, an exhibition, refreshments, a play park and picnic
          areas. Each route is drawn in its own colour on the park map: pick
          your line and follow it. And of course, the open beach is always
          there if you want to keep walking north or south beyond the
          waymarked paths.
        </p>

        <div className="mt-6 space-y-4">
          <RouteCard
            name="Beach Walk — Access to All"
            mapSlug="beach-walk"
            difficulty="Easy"
            distance="600 m"
            duration="15–20 min"
            elevation="Flat"
            terrain="Fully accessible surfaced path and boardwalk"
            description="The dark purple line on the map, and the route everyone can use: a fully accessible path from the Sand Bothy straight to the beach, designed for wheelchairs, buggies and anyone who wants the sea with the least effort."
          />
          <RouteCard
            name="Marram Grass Route"
            mapSlug="marram-grass"
            difficulty="Easy"
            distance="800 m"
            duration="20–30 min"
            elevation="Gentle"
            terrain="Dune paths, some soft sand"
            description="The bright pink line: a short loop through the marram-bound dunes behind the beach — the best close-up look at the grasses that hold this whole coastline together."
          />
          <RouteCard
            name="Horse Route"
            mapSlug="horse-route"
            difficulty="Easy"
            distance="500 m"
            duration="10–15 min"
            elevation="Flat"
            terrain="Grassy bridleway, shared with riders"
            description="The brown line: the park's short bridleway loop. Shared with horses, so keep dogs close and give riders plenty of room as you pass."
          />
          <RouteCard
            name="Ice House Route"
            mapSlug="ice-house-route"
            difficulty="Easy"
            distance="1.7 km"
            duration="30–45 min"
            elevation="Gentle"
            terrain="Firm park paths"
            description="The golden-yellow line: east across the park to the historic ice house where the salmon catch was once packed for market. The walk with the most heritage per step — see the Human Geography page for the full story."
          />
          <RouteCard
            name="Thyme Walk"
            mapSlug="thyme-walk"
            difficulty="Moderate"
            distance="3.5 km"
            duration="1–1.5 hrs"
            elevation="Rolling"
            terrain="Dune heath paths, some soft sand"
            description="The dark red line: the park's longest waymarked loop, sweeping east past the pill boxes and the ice house before circling back through the dune heath. The best option if you want a proper walk that ties the whole park together."
          />
        </div>

        <div
          className="mt-8 border-2 p-4 text-sm leading-relaxed"
          style={{
            borderColor: palette.ink,
            borderLeft: `6px solid ${palette.marramDark}`,
            backgroundColor: "#00000008",
            color: palette.ink,
          }}
        >
          <strong>Before you go:</strong> even at high tide there&apos;s
          usually a strip of dry sand on the beach routes, but conditions
          change in stormy weather — check tide times if you&apos;re planning
          to walk any distance along the shore.
        </div>

        <div className="mt-8">
          <RoutePicker />
        </div>

        <p className="mt-4 text-xs italic" style={{ color: palette.ink, opacity: 0.6 }}>
          Coming soon: an interactive elevation profile for each route.
        </p>
      </div>
    </main>
  );
}

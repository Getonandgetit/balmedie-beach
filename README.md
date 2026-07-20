# Balmedie Beach — A Guided Coastal Walk

A visitor's guide to **Balmedie Country Park**, Aberdeenshire, Scotland — built
as a vintage travel poster you can click. Walking routes, WW2 history, wildlife,
and 5,000 years of shifting dunes, told as guided walks rather than dry reference.

## Features

- **Illustrated interactive map** — a hand-drawn park map with toggleable pin
  layers (landmarks, WW2 sites, wildlife, geography), route picker, and pop-up
  cards that link into the topic pages
- **Five topic walks** — Walking Routes, WW2 History, Wildlife, Physical
  Geography, and Human Geography, each written as a guided walk with its own quiz
- **Ranger Passport** — finish each topic's quiz to stamp a browser-local
  passport and climb the ranks to Balmedie Beach Ranger
- **Live tide times** — 7 days of tide extremes for the beach, refreshed daily
  by a GitHub Actions workflow from the Stormglass API (see below)
- **Sun & golden hour** — sunrise, sunset, twilight and golden-hour times
  computed in the browser with [suncalc](https://github.com/mourner/suncalc);
  no API needed

## Development

```bash
npm install
npm run dev    # http://localhost:3000
npm run build  # production build (fully static)
```

Built with Next.js (App Router), Tailwind CSS v4, and TypeScript.

## Tide data pipeline

`.github/workflows/update-tides.yml` runs daily at 03:17 UTC. It calls the
[Stormglass](https://stormglass.io) tide-extremes API once (free tier is
10 requests/day), writes `public/data/tides.json`, and commits it. The site
only ever reads that static file — no API calls from the browser.

Setup: add your Stormglass API key as a repository secret named
`STORMGLASS_API_KEY`. To generate placeholder data locally:

```bash
node scripts/fetch-tides.mjs --sample
```

## Notes

- Wildlife and geography map hotspots are indicative placements, not surveyed
  positions. Tide and sun data are for planning only — check conditions before
  walking the shore.
- Tide data via Stormglass.io. Map artwork and hero illustrations are original
  to this project.

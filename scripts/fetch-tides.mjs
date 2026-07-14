// Fetches 7 days of tide extremes for Balmedie Beach from Stormglass.io
// and writes them to public/data/tides.json for the site to read statically.
//
// Usage:
//   STORMGLASS_API_KEY=xxx node scripts/fetch-tides.mjs   # real data
//   node scripts/fetch-tides.mjs --sample                 # synthetic sample data
//
// Runs once daily from GitHub Actions (see .github/workflows/update-tides.yml),
// which keeps usage at 1 request/day — far under the free tier's 10/day.

import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const LAT = 57.2394;
const LNG = -2.0192;
const DAYS = 7;
const OUT_FILE = path.join(process.cwd(), "public", "data", "tides.json");

function isoDate(d) {
  return d.toISOString().slice(0, 10);
}

async function fetchReal() {
  const apiKey = process.env.STORMGLASS_API_KEY;
  if (!apiKey) {
    console.error("STORMGLASS_API_KEY is not set. Aborting.");
    process.exit(1);
  }

  const start = new Date();
  const end = new Date(start.getTime() + DAYS * 24 * 60 * 60 * 1000);
  const url =
    `https://api.stormglass.io/v2/tide/extremes/point` +
    `?lat=${LAT}&lng=${LNG}&start=${isoDate(start)}&end=${isoDate(end)}`;

  const res = await fetch(url, { headers: { Authorization: apiKey } });
  if (!res.ok) {
    console.error(`Stormglass request failed: ${res.status} ${res.statusText}`);
    console.error(await res.text());
    process.exit(1);
  }

  const body = await res.json();
  if (!Array.isArray(body.data) || body.data.length === 0) {
    console.error("Stormglass returned no extremes. Leaving existing file untouched.");
    process.exit(1);
  }

  return {
    updatedAt: new Date().toISOString(),
    source: "stormglass",
    lat: LAT,
    lng: LNG,
    extremes: body.data.map((e) => ({
      time: e.time,
      type: e.type, // "high" | "low"
      height: typeof e.height === "number" ? Math.round(e.height * 100) / 100 : null,
    })),
  };
}

// Synthetic-but-plausible extremes (~6h12m apart, drifting ~50 min/day),
// clearly flagged so the site can label it as sample data.
function buildSample() {
  const extremes = [];
  const PERIOD_MS = 6.2 * 60 * 60 * 1000;
  let t = new Date();
  t.setHours(3, 45, 0, 0);
  let type = "low";
  const until = Date.now() + DAYS * 24 * 60 * 60 * 1000;
  while (t.getTime() < until) {
    const height =
      type === "high" ? 3.5 + Math.random() * 0.7 : 0.5 + Math.random() * 0.4;
    extremes.push({
      time: t.toISOString(),
      type,
      height: Math.round(height * 100) / 100,
    });
    type = type === "high" ? "low" : "high";
    t = new Date(t.getTime() + PERIOD_MS);
  }
  return {
    updatedAt: new Date().toISOString(),
    source: "sample",
    sample: true,
    lat: LAT,
    lng: LNG,
    extremes,
  };
}

const data = process.argv.includes("--sample") ? buildSample() : await fetchReal();

await mkdir(path.dirname(OUT_FILE), { recursive: true });
await writeFile(OUT_FILE, JSON.stringify(data, null, 2) + "\n", "utf8");
console.log(`Wrote ${data.extremes.length} tide extremes to ${OUT_FILE}`);

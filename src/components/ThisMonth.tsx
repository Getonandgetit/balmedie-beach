"use client";

import { useEffect, useState } from "react";
import { palette } from "@/lib/palette";

// One entry per calendar month (0 = January).
const HIGHLIGHTS: { headline: string; notes: string[] }[] = [
  {
    headline: "Winter visitors on the heath",
    notes: [
      "Snow buntings flock on the fixed dunes, feeding on seed heads.",
      "Big eider rafts ride the swell offshore on calm days.",
      "Short-eared owls hunt the heath in late-afternoon light.",
    ],
  },
  {
    headline: "The quiet month — with owls",
    notes: [
      "Snow buntings linger on the heath before heading north.",
      "Listen for the first skylark song on still, bright days.",
      "Low winter sun makes the dune shadows at their most dramatic.",
    ],
  },
  {
    headline: "First songs of spring",
    notes: [
      "Skylarks rise singing over the marram from early March.",
      "Water voles emerge along the burns as the days warm.",
      "Stonechats pair up on the gorse and heath edges.",
    ],
  },
  {
    headline: "The breeding season begins",
    notes: [
      "Terns start arriving back from West Africa late in the month.",
      "Skylarks and meadow pipits nest low in the dunes — keep to the paths.",
      "Eiders court noisily offshore; the drakes' 'oo-OOH' carries for miles.",
    ],
  },
  {
    headline: "Nesting in full swing",
    notes: [
      "Sandwich and common terns fish the shallows in noisy plunges.",
      "Dune flowers begin — crowberry blooms almost unnoticed.",
      "Stick to the boardwalk: eggs on open sand are near-invisible.",
    ],
  },
  {
    headline: "Peak season on the foreshore",
    notes: [
      "Tern colonies at their busiest — please give roped areas a wide berth.",
      "Grey seals loaf beyond the breakers watching the walkers.",
      "The longest days: 18 hours of light for wildlife-watching.",
    ],
  },
  {
    headline: "Fledglings everywhere",
    notes: [
      "Young terns beg loudly at the tideline while parents fish.",
      "Skylark song continues over the heath through the long evenings.",
      "Butterflies — grayling and common blue — work the fixed dunes.",
    ],
  },
  {
    headline: "The changeover month",
    notes: [
      "Tern families begin drifting south; passage waders arrive.",
      "Crowberries ripen glossy black on the heath.",
      "Seals haul closer inshore on quiet early mornings.",
    ],
  },
  {
    headline: "Autumn passage",
    notes: [
      "Redshank, golden plover and lapwing gather at the burn mouths.",
      "Skeins of pink-footed geese pass over on their way to the estuary.",
      "The marram turns gold — the dunes' best photographic month.",
    ],
  },
  {
    headline: "Geese and gales",
    notes: [
      "Thousands of pink-footed geese commute overhead at dawn and dusk.",
      "Storm-watching season begins — the North Sea puts on a show.",
      "Eider numbers build again offshore.",
    ],
  },
  {
    headline: "First of the winter birds",
    notes: [
      "Snow buntings return to the dune heath from the Arctic.",
      "Waders pack the tideline between the short days' tides.",
      "Winter storms begin resculpting the foredunes.",
    ],
  },
  {
    headline: "Midwinter on the coast",
    notes: [
      "Snow buntings and twite feed along the strandline.",
      "Eider rafts and long-tailed ducks ride out the swell.",
      "Low golden light all day — bring a camera, and gloves.",
    ],
  },
];

const monthFmt = new Intl.DateTimeFormat("en-GB", { month: "long" });

export default function ThisMonth() {
  const [month, setMonth] = useState<number | null>(null);

  // Resolve after mount so server and client HTML always match.
  useEffect(() => {
    const t = setTimeout(() => setMonth(new Date().getMonth()), 0);
    return () => clearTimeout(t);
  }, []);

  if (month === null) return null;

  const entry = HIGHLIGHTS[month];
  const monthName = monthFmt.format(new Date());

  return (
    <div
      className="card-in mt-6 border-2 p-4 sm:p-5"
      style={{
        borderColor: palette.ink,
        borderTop: `6px solid ${palette.sea}`,
        backgroundColor: "#00000005",
      }}
    >
      <p className="font-heading text-[0.65rem] uppercase tracking-[0.3em]" style={{ color: palette.sea }}>
        In {monthName} at Balmedie
      </p>
      <h3 className="mt-0.5 font-heading text-lg uppercase tracking-wide" style={{ color: palette.ink }}>
        {entry.headline}
      </h3>
      <ul className="mt-2 space-y-1.5">
        {entry.notes.map((note) => (
          <li key={note} className="flex gap-2 text-sm leading-relaxed" style={{ color: palette.ink }}>
            <span aria-hidden="true" style={{ color: palette.sea }}>
              ›
            </span>
            {note}
          </li>
        ))}
      </ul>
    </div>
  );
}

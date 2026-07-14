"use client";

import { useState } from "react";
import { palette } from "@/lib/palette";
import { awardStamp } from "@/lib/passport";
import StampEarned from "@/components/StampEarned";

type Distance = "short" | "medium" | "open";
type Effort = "easy" | "moderate";

interface Recommendation {
  name: string;
  reason: string;
}

function recommend(distance: Distance, effort: Effort): Recommendation {
  if (effort === "moderate") {
    return {
      name: "Thyme Walk",
      reason: "The park's longest waymarked loop — 3.5 km on the dashed brick-red line, sweeping past the pill boxes and ice house before circling back through the dune heath.",
    };
  }
  if (distance === "short") {
    return {
      name: "Beach Walk — Access to All",
      reason: "The quickest way to the sea: 600 m on the teal line, fully accessible for wheelchairs and buggies, straight from the Sand Bothy to the sand.",
    };
  }
  if (distance === "medium") {
    return {
      name: "Ice House Route",
      reason: "A gentle 1.7 km on the gold line, east across the park to the historic salmon-fishery ice house and back.",
    };
  }
  return {
    name: "open beach",
    reason: "Walk any route to the shore, then just keep going — Balmedie sits on a near-continuous 23 km run of dune coastline. Check tide times and turn back whenever suits you.",
  };
}

export default function RoutePicker() {
  const [distance, setDistance] = useState<Distance | null>(null);
  const [effort, setEffort] = useState<Effort | null>(null);

  const result = distance && effort ? recommend(distance, effort) : null;

  function reset() {
    setDistance(null);
    setEffort(null);
  }

  return (
    <div
      className="border-2 p-4 sm:p-5"
      style={{
        borderColor: palette.ink,
        borderTop: `6px solid ${palette.marramDark}`,
        backgroundColor: "#00000005",
      }}
    >
      <p className="font-heading text-[0.65rem] uppercase tracking-[0.3em]" style={{ color: palette.marramDark }}>
        Route finder
      </p>
      <h3 className="mt-0.5 font-heading text-lg uppercase tracking-wide" style={{ color: palette.ink }}>
        Which route suits you?
      </h3>

      {!result && (
        <div className="mt-3 space-y-4">
          <div>
            <p className="text-sm font-medium" style={{ color: palette.ink }}>
              How far do you want to walk?
            </p>
            <div className="mt-2 flex flex-wrap gap-2">
              {(
                [
                  ["short", "Just a quick stretch of the legs"],
                  ["medium", "A proper walk, an hour or so"],
                  ["open", "As far as I feel like"],
                ] as [Distance, string][]
              ).map(([value, label]) => (
                <button
                  key={value}
                  onClick={() => {
                    setDistance(value);
                    if (effort) awardStamp("routes");
                  }}
                  className="rounded-full border px-3 py-1.5 text-sm"
                  style={{
                    borderColor: palette.marramDark,
                    backgroundColor: distance === value ? palette.marramDark : "transparent",
                    color: distance === value ? palette.offWhite : palette.ink,
                  }}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="text-sm font-medium" style={{ color: palette.ink }}>
              How much of a challenge?
            </p>
            <div className="mt-2 flex flex-wrap gap-2">
              {(
                [
                  ["easy", "Keep it easy"],
                  ["moderate", "I don't mind a climb"],
                ] as [Effort, string][]
              ).map(([value, label]) => (
                <button
                  key={value}
                  onClick={() => {
                    setEffort(value);
                    if (distance) awardStamp("routes");
                  }}
                  className="rounded-full border px-3 py-1.5 text-sm"
                  style={{
                    borderColor: palette.marramDark,
                    backgroundColor: effort === value ? palette.marramDark : "transparent",
                    color: effort === value ? palette.offWhite : palette.ink,
                  }}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {result && (
        <div className="mt-3">
          <p className="text-sm" style={{ color: palette.ink }}>
            Try the <strong>{result.name}</strong>.
          </p>
          <p className="mt-1 text-sm leading-relaxed" style={{ color: palette.ink, opacity: 0.8 }}>
            {result.reason}
          </p>
          <StampEarned />
          <button
            onClick={reset}
            className="mt-3 rounded-full px-5 py-1.5 font-heading text-sm uppercase tracking-wider"
            style={{ backgroundColor: palette.marramDark, color: palette.offWhite }}
          >
            Start over
          </button>
        </div>
      )}
    </div>
  );
}

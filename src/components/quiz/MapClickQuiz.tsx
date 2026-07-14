"use client";

import { useRef, useState } from "react";
import { palette } from "@/lib/palette";
import { awardStamp } from "@/lib/passport";
import StampEarned from "@/components/StampEarned";

// Each round's answer is a zone, not a point — and every prompt restates the
// location clue from the walk above, so the quiz tests recall, not guesswork.
interface Zone {
  x: number;
  y: number;
  w: number;
  h: number;
}

interface Target {
  id: string;
  label: string;
  prompt: string;
  zone: Zone;
}

const TARGETS: Target[] = [
  {
    id: "pillboxes",
    label: "Pillbox Group",
    prompt:
      "“Three pillboxes stand together in the dunes” — south along the dune line from the beach access. Click where you'd find them.",
    zone: { x: 316, y: 192, w: 86, h: 96 },
  },
  {
    id: "anti-tank",
    label: "Anti-Tank Blocks",
    prompt:
      "“At the foot of the dunes, rows of concrete anti-tank blocks were laid to stop armour landing straight off the beach.” Click where the dunes meet the beach.",
    zone: { x: 392, y: 200, w: 70, h: 116 },
  },
  {
    id: "bomb-cemetery",
    label: "The Bomb Cemetery",
    prompt:
      "“Balmedie's open, empty foreshore made it a practical place to make unexploded bombs safe.” Click the open beach where they were dealt with.",
    zone: { x: 460, y: 160, w: 54, h: 150 },
  },
  {
    id: "minefield",
    label: "Menie Minefield",
    prompt:
      "“Further north, beside the Mill of Menie, a beach minefield was laid in case of invasion.” Click the far northern stretch of the coast.",
    zone: { x: 318, y: 14, w: 194, h: 74 },
  },
];

function inZone(p: { x: number; y: number }, z: Zone): boolean {
  return p.x >= z.x && p.x <= z.x + z.w && p.y >= z.y && p.y <= z.y + z.h;
}

function ZoneGlyph({ target }: { target: Target }) {
  const cx = target.zone.x + target.zone.w / 2;
  const cy = target.zone.y + target.zone.h / 2;
  switch (target.id) {
    case "pillboxes":
      return (
        <g transform={`translate(${cx} ${cy})`}>
          <polygon points="-14,8 -10,-8 10,-8 14,8" fill={palette.rust} />
          <rect x="-7" y="-3" width="5" height="4" fill={palette.offWhite} />
          <rect x="2" y="-3" width="5" height="4" fill={palette.offWhite} />
        </g>
      );
    case "anti-tank":
      return (
        <g transform={`translate(${cx} ${cy})`} fill={palette.rust}>
          <rect x="-16" y="-4" width="9" height="9" />
          <rect x="-4" y="-4" width="9" height="9" />
          <rect x="8" y="-4" width="9" height="9" />
        </g>
      );
    case "bomb-cemetery":
      return (
        <g transform={`translate(${cx} ${cy})`}>
          <ellipse cx="0" cy="2" rx="6" ry="9" fill={palette.rust} />
          <polygon points="-5,-10 0,-4 5,-10 0,-7" fill={palette.rust} />
        </g>
      );
    case "minefield":
      return (
        <g transform={`translate(${cx} ${cy})`} fill={palette.rust}>
          {[-28, 0, 28].map((dx) => (
            <g key={dx} transform={`translate(${dx} 0)`}>
              <circle r="6" />
              <path d="M -9 0 H 9 M 0 -9 V 9 M -6.5 -6.5 L 6.5 6.5 M -6.5 6.5 L 6.5 -6.5" stroke={palette.rust} strokeWidth="2" />
            </g>
          ))}
        </g>
      );
    default:
      return null;
  }
}

export default function MapClickQuiz() {
  const svgRef = useRef<SVGSVGElement>(null);
  const [round, setRound] = useState(0);
  const [clickPoint, setClickPoint] = useState<{ x: number; y: number } | null>(null);
  const [hits, setHits] = useState(0);
  const [finished, setFinished] = useState(false);

  const target = TARGETS[round];

  function handleClick(e: React.MouseEvent<SVGSVGElement>) {
    if (clickPoint || !svgRef.current) return;
    const svg = svgRef.current;
    const pt = svg.createSVGPoint();
    pt.x = e.clientX;
    pt.y = e.clientY;
    const ctm = svg.getScreenCTM();
    if (!ctm) return;
    const loc = pt.matrixTransform(ctm.inverse());
    setClickPoint({ x: loc.x, y: loc.y });
    if (inZone({ x: loc.x, y: loc.y }, target.zone)) setHits((h) => h + 1);
  }

  function next() {
    if (round + 1 < TARGETS.length) {
      setRound((r) => r + 1);
      setClickPoint(null);
    } else {
      setFinished(true);
      awardStamp("ww2", hits, TARGETS.length);
    }
  }

  function restart() {
    setRound(0);
    setClickPoint(null);
    setHits(0);
    setFinished(false);
  }

  const wasHit = clickPoint ? inZone(clickPoint, target.zone) : false;

  return (
    <div
      className="border-2 p-4 sm:p-5"
      style={{
        borderColor: palette.ink,
        borderTop: `6px solid ${palette.rust}`,
        backgroundColor: "#00000005",
      }}
    >
      <p className="font-heading text-[0.65rem] uppercase tracking-[0.3em]" style={{ color: palette.rust }}>
        Test yourself
      </p>
      <h3 className="mt-0.5 font-heading text-lg uppercase tracking-wide" style={{ color: palette.ink }}>
        Walk the defensive line
      </h3>

      {finished ? (
        <div className="mt-4 text-center">
          <p className="font-poster text-4xl" style={{ color: palette.rust }}>
            {hits} / {TARGETS.length}
          </p>
          <p className="mt-2 text-sm" style={{ color: palette.ink }}>
            {hits === TARGETS.length
              ? "A perfect sweep of the defensive line."
              : "Re-read the walk above — every answer is in the story."}
          </p>
          <StampEarned />
          <div>
            <button
              onClick={restart}
              className="mt-3 rounded-full px-5 py-1.5 font-heading text-sm uppercase tracking-wider"
              style={{ backgroundColor: palette.rust, color: palette.offWhite }}
            >
              Try again
            </button>
          </div>
        </div>
      ) : (
        <>
          <p className="mt-2 text-sm leading-relaxed" style={{ color: palette.ink }}>
            {target.prompt}{" "}
            <span className="opacity-60">
              ({round + 1} of {TARGETS.length})
            </span>
          </p>

          <svg
            ref={svgRef}
            viewBox="0 0 600 340"
            onClick={handleClick}
            className="mt-3 w-full cursor-crosshair border-2"
            style={{ backgroundColor: palette.offWhite, borderColor: palette.ink }}
            role="img"
            aria-label="Sketch map of the coast: parkland on the left, then the dune belt, the beach, and the sea on the right; north is at the top"
          >
            {/* Parkland */}
            <rect x="0" y="0" width="600" height="340" fill={palette.marram} opacity="0.28" />
            {/* Dune belt */}
            <path
              d="M 316 0 L 424 0 L 400 40 L 428 90 L 396 140 L 426 190 L 398 240 L 428 290 L 404 340 L 316 340 Z"
              fill={palette.sand}
              opacity="0.9"
            />
            {/* Beach */}
            <path d="M 404 340 L 428 290 L 398 240 L 426 190 L 396 140 L 428 90 L 400 40 L 424 0 L 514 0 L 514 340 Z" fill={palette.offWhite} />
            {/* Sea */}
            <rect x="514" y="0" width="86" height="340" fill={palette.sea} opacity="0.9" />
            {[46, 118, 190, 262].map((y) => (
              <path
                key={y}
                d={`M 526 ${y} Q 545 ${y - 8}, 564 ${y} T 600 ${y}`}
                stroke={palette.offWhite}
                strokeOpacity="0.4"
                strokeWidth="2.5"
                fill="none"
              />
            ))}
            {/* Gull */}
            <path
              d="M 548 20 Q 552 15, 556 20 M 556 20 Q 560 15, 564 20"
              stroke={palette.offWhite}
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
              opacity="0.7"
            />

            {/* Reference anchor: car park + boardwalk to the beach */}
            <rect x="36" y="146" width="42" height="28" rx="4" fill={palette.ink} opacity="0.7" />
            <text x="57" y="165" textAnchor="middle" fontSize="13" fill={palette.offWhite} fontFamily="sans-serif">
              P
            </text>
            <path d="M 82 160 L 408 160" stroke={palette.sandDark} strokeWidth="4" strokeDasharray="7 5" strokeLinecap="round" />
            <text x="150" y="150" fontSize="12" fontStyle="italic" fill={palette.ink} fontFamily="sans-serif" opacity="0.75">
              Beach access
            </text>

            {/* Orientation labels */}
            <text x="556" y="308" textAnchor="middle" fontSize="12" fontStyle="italic" fill={palette.offWhite} fontFamily="sans-serif">
              ↑ Menie
            </text>
            <text x="556" y="326" textAnchor="middle" fontSize="12" fontStyle="italic" fill={palette.offWhite} fontFamily="sans-serif" opacity="0.8">
              ↓ Blackdog
            </text>
            <text x="20" y="26" fontSize="13" fontWeight="bold" fill={palette.ink} fontFamily="sans-serif" opacity="0.7">
              N ↑
            </text>

            {/* After a guess: reveal the true zone */}
            {clickPoint && (
              <>
                <rect
                  x={target.zone.x}
                  y={target.zone.y}
                  width={target.zone.w}
                  height={target.zone.h}
                  fill={palette.rust}
                  fillOpacity="0.12"
                  stroke={palette.rust}
                  strokeWidth="2.5"
                  strokeDasharray="8 5"
                />
                <ZoneGlyph target={target} />
                <circle cx={clickPoint.x} cy={clickPoint.y} r="7" fill={palette.ink} opacity="0.75" />
                <circle cx={clickPoint.x} cy={clickPoint.y} r="11" fill="none" stroke={palette.ink} strokeWidth="2" opacity="0.4" />
              </>
            )}
          </svg>

          {clickPoint && (
            <div className="mt-3">
              <p
                className="font-heading text-sm uppercase tracking-wide"
                style={{ color: wasHit ? palette.marramDark : palette.rust }}
              >
                {wasHit
                  ? `Right on it — that's the ${target.label.toLowerCase().replace(/^the /, "")}.`
                  : "Not quite — the outlined area shows where."}
              </p>
              <button
                onClick={next}
                className="mt-2 rounded-full px-5 py-1.5 font-heading text-sm uppercase tracking-wider"
                style={{ backgroundColor: palette.rust, color: palette.offWhite }}
              >
                {round + 1 < TARGETS.length ? "Next" : "See score"}
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

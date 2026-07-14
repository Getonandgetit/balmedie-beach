"use client";

import { useState } from "react";
import { palette } from "@/lib/palette";
import { awardStamp } from "@/lib/passport";
import StampEarned from "@/components/StampEarned";

interface Round {
  name: string;
  clue: string;
  options: string[];
  correctIndex: number;
  art: React.ReactNode;
}

// Field-guide plates: flat poster-style illustrations, 160×160.
const sky = "#f6f1e4";
const seaBand = "#3c8080";
const sand = "#d9a95c";
const ink = "#2b2620";
const white = "#f6f1e4";
const grassGreen = "#5b7f4f";
const darkGreen = "#3f5c37";
const rust = "#b23a2f";
const ochre = "#c98a3a";

const rounds: Round[] = [
  {
    name: "Eider Duck",
    clue: "Britain's heaviest duck — listen for the drake's comedy \"oo-OOH\" floating in from the swell.",
    options: ["Eider Duck", "Mallard", "Shelduck"],
    correctIndex: 0,
    art: (
      <svg viewBox="0 0 160 160" aria-hidden="true">
        <rect width="160" height="160" fill={sky} />
        <rect y="96" width="160" height="64" fill={seaBand} opacity="0.5" />
        <path d="M 8 104 Q 24 98 40 104 M 120 112 Q 136 106 152 112" stroke={white} strokeWidth="3" fill="none" opacity="0.7" />
        {/* body */}
        <path d="M 28 104 Q 32 84 62 81 L 104 81 Q 132 82 136 99 Q 118 116 78 116 Q 44 116 28 104 Z" fill={white} stroke={ink} strokeWidth="2.5" />
        {/* black flanks + tail */}
        <path d="M 92 81 L 104 81 Q 132 82 136 99 Q 118 116 78 116 L 78 98 Q 88 88 92 81 Z" fill={ink} />
        {/* head */}
        <circle cx="47" cy="60" r="17" fill={white} stroke={ink} strokeWidth="2.5" />
        {/* black crown */}
        <path d="M 31 55 Q 47 38 63 55 L 63 61 Q 47 50 31 61 Z" fill={ink} />
        {/* green nape */}
        <path d="M 60 64 Q 70 66 66 76 Q 60 72 58 68 Z" fill={grassGreen} />
        {/* wedge bill */}
        <polygon points="32,60 8,68 32,72" fill={ochre} stroke={ink} strokeWidth="1.5" />
        <circle cx="42" cy="58" r="2.2" fill={ink} />
      </svg>
    ),
  },
  {
    name: "Sandwich Tern",
    clue: "Black cap, shaggy crest, and a black bill dipped in yellow — dives noisily for sand eels offshore.",
    options: ["Herring Gull", "Sandwich Tern", "Arctic Skua"],
    correctIndex: 1,
    art: (
      <svg viewBox="0 0 160 160" aria-hidden="true">
        <rect width="160" height="160" fill={sky} />
        <rect y="128" width="160" height="32" fill={seaBand} opacity="0.45" />
        {/* far wing */}
        <path d="M 78 78 Q 108 38 146 34 Q 122 62 92 80 Z" fill={white} stroke={ink} strokeWidth="2.5" />
        {/* body */}
        <path d="M 26 84 Q 52 70 84 76 Q 108 80 118 92 Q 92 100 62 96 Q 40 93 26 84 Z" fill={white} stroke={ink} strokeWidth="2.5" />
        {/* near wing */}
        <path d="M 70 84 Q 88 108 122 120 Q 96 92 84 78 Z" fill={white} stroke={ink} strokeWidth="2.5" />
        {/* forked tail */}
        <path d="M 112 88 L 142 82 L 124 92 L 140 98 Z" fill={white} stroke={ink} strokeWidth="2" />
        {/* head */}
        <circle cx="38" cy="70" r="13" fill={white} stroke={ink} strokeWidth="2.5" />
        {/* black cap + shaggy crest */}
        <path d="M 26 66 Q 38 54 51 65 L 56 60 L 52 68 L 58 66 L 50 72 Q 38 62 26 71 Z" fill={ink} />
        {/* bill: black, yellow tip */}
        <polygon points="27,72 6,80 28,79" fill={ink} />
        <polygon points="10,78 6,80 11,80" fill={ochre} />
        <circle cx="34" cy="68" r="2" fill={sky} />
      </svg>
    ),
  },
  {
    name: "Oystercatcher",
    clue: "Pied plumage and a carrot-orange bill, piping shrilly as it works the tideline.",
    options: ["Oystercatcher", "Lapwing", "Ringed Plover"],
    correctIndex: 0,
    art: (
      <svg viewBox="0 0 160 160" aria-hidden="true">
        <rect width="160" height="160" fill={sky} />
        <rect y="118" width="160" height="42" fill={sand} opacity="0.6" />
        {/* body: black back, white belly */}
        <path d="M 40 76 Q 60 58 92 62 Q 120 66 124 84 Q 118 100 92 102 Q 60 104 44 92 Q 38 84 40 76 Z" fill={ink} />
        <path d="M 46 92 Q 62 102 92 101 Q 114 99 122 88 Q 112 102 88 106 Q 60 108 46 96 Z" fill={white} stroke={ink} strokeWidth="2" />
        <path d="M 52 90 Q 74 100 104 96 Q 84 106 62 102 Q 52 98 52 90 Z" fill={white} />
        {/* head */}
        <circle cx="46" cy="62" r="14" fill={ink} />
        <circle cx="41" cy="59" r="2.4" fill={white} />
        {/* long orange bill */}
        <polygon points="34,64 4,74 35,71" fill={rust} />
        {/* legs */}
        <path d="M 74 104 L 72 126 M 94 104 L 96 126" stroke={rust} strokeWidth="3.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    name: "Skylark",
    clue: "You'll hear it long before you see it — an unbroken song poured out from high over the dunes.",
    options: ["Meadow Pipit", "Skylark", "Corn Bunting"],
    correctIndex: 1,
    art: (
      <svg viewBox="0 0 160 160" aria-hidden="true">
        <rect width="160" height="160" fill={sky} />
        {/* song marks */}
        <path d="M 118 28 Q 122 24 126 28 M 126 40 Q 130 36 134 40 M 112 46 Q 116 42 120 46" stroke={ink} strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.5" />
        {/* grass tussock */}
        <path d="M 30 140 Q 44 108 56 138 M 44 142 Q 56 104 72 140 M 62 142 Q 72 112 84 140" stroke={grassGreen} strokeWidth="4" fill="none" strokeLinecap="round" />
        {/* body */}
        <path d="M 52 96 Q 68 78 92 82 Q 112 86 118 98 Q 108 112 84 112 Q 62 112 52 104 Z" fill={sand} stroke={ink} strokeWidth="2.5" />
        {/* streaks */}
        <path d="M 66 90 L 96 88 M 62 98 L 102 96 M 66 106 L 96 104" stroke={ink} strokeWidth="2" opacity="0.55" />
        {/* tail */}
        <polygon points="112,92 140,84 118,102" fill={sand} stroke={ink} strokeWidth="2" />
        {/* head with little crest */}
        <circle cx="58" cy="80" r="11" fill={sand} stroke={ink} strokeWidth="2.5" />
        <path d="M 54 70 L 50 60 L 58 68 L 58 58 L 62 68 Z" fill={sand} stroke={ink} strokeWidth="1.5" />
        <circle cx="54" cy="78" r="2" fill={ink} />
        <polygon points="48,82 38,85 48,87" fill={ochre} />
      </svg>
    ),
  },
  {
    name: "Grey Seal",
    clue: "A dog-like head bobbing beyond the breakers, usually watching you as curiously as you're watching it.",
    options: ["Harbour Porpoise", "Otter", "Grey Seal"],
    correctIndex: 2,
    art: (
      <svg viewBox="0 0 160 160" aria-hidden="true">
        <rect width="160" height="160" fill={sky} />
        <rect y="88" width="160" height="72" fill={seaBand} opacity="0.6" />
        <path d="M 6 100 Q 22 94 38 100 M 116 108 Q 132 102 148 108 M 20 124 Q 36 118 52 124" stroke={white} strokeWidth="3" fill="none" opacity="0.6" />
        {/* head: long roman-nose profile */}
        <path d="M 56 96 Q 54 62 80 56 Q 104 52 116 70 Q 124 80 120 90 Q 112 98 96 98 Q 72 100 56 96 Z" fill="#8a8f8a" stroke={ink} strokeWidth="2.5" />
        {/* muzzle */}
        <path d="M 108 70 Q 124 74 122 84 Q 116 90 104 88 Z" fill="#8a8f8a" stroke={ink} strokeWidth="1.5" />
        {/* mottling */}
        <circle cx="76" cy="74" r="3" fill={ink} opacity="0.25" />
        <circle cx="90" cy="66" r="2.5" fill={ink} opacity="0.25" />
        <circle cx="68" cy="86" r="2.5" fill={ink} opacity="0.25" />
        {/* eye + nostril + whiskers */}
        <circle cx="96" cy="70" r="3.5" fill={ink} />
        <circle cx="117" cy="78" r="1.8" fill={ink} />
        <path d="M 112 84 L 100 86 M 112 87 L 101 91 M 111 81 L 99 81" stroke={ink} strokeWidth="1.2" opacity="0.6" />
      </svg>
    ),
  },
  {
    name: "Marram Grass",
    clue: "The engineer of the dunes — its roots grow upward as fast as the wind can bury it in sand.",
    options: ["Lyme Grass", "Marram Grass", "Red Fescue"],
    correctIndex: 1,
    art: (
      <svg viewBox="0 0 160 160" aria-hidden="true">
        <rect width="160" height="160" fill={sky} />
        {/* dune mound */}
        <path d="M 0 132 Q 40 112 80 124 Q 120 134 160 122 L 160 160 L 0 160 Z" fill={sand} opacity="0.8" />
        <path d="M 34 138 L 42 136 M 96 142 L 104 140 M 64 148 L 72 146" stroke={ochre} strokeWidth="2" strokeLinecap="round" />
        {/* blades */}
        {[-44, -30, -16, -2, 12, 26, 40].map((dx, i) => (
          <path
            key={i}
            d={`M 80 130 Q ${80 + dx * 0.4} ${86 - (i % 3) * 6}, ${80 + dx} ${34 + (i % 3) * 10}`}
            stroke={i % 2 ? grassGreen : darkGreen}
            strokeWidth="4"
            fill="none"
            strokeLinecap="round"
          />
        ))}
        {/* seed head */}
        <path d="M 78 66 L 74 34" stroke={darkGreen} strokeWidth="3.5" strokeLinecap="round" />
        <ellipse cx="73" cy="28" rx="4" ry="10" fill={ochre} stroke={darkGreen} strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    name: "Crowberry",
    clue: "A low heath mat on the old fixed dunes — needle leaves and glossy black berries the grouse love.",
    options: ["Crowberry", "Bilberry", "Bell Heather"],
    correctIndex: 0,
    art: (
      <svg viewBox="0 0 160 160" aria-hidden="true">
        <rect width="160" height="160" fill={sky} />
        {/* heath mound */}
        <path d="M 8 118 Q 50 84 90 100 Q 130 112 152 104 L 152 150 L 8 150 Z" fill={darkGreen} />
        {/* needle leaves */}
        {[
          [34, 104, -30], [50, 94, 10], [66, 96, -15], [84, 98, 25],
          [102, 104, -20], [118, 106, 15], [42, 112, 40], [92, 110, -35],
        ].map(([x, y, r], i) => (
          <g key={i} transform={`translate(${x} ${y}) rotate(${r})`}>
            <path d="M -7 0 L 7 0 M 0 -7 L 0 7" stroke={grassGreen} strokeWidth="2.5" strokeLinecap="round" />
          </g>
        ))}
        {/* berries with glints */}
        {[
          [46, 106], [72, 100], [98, 108], [60, 116], [112, 114], [84, 118],
        ].map(([x, y], i) => (
          <g key={i}>
            <circle cx={x} cy={y} r="7" fill={ink} />
            <circle cx={x - 2.2} cy={y - 2.2} r="1.8" fill={white} opacity="0.8" />
          </g>
        ))}
      </svg>
    ),
  },
  {
    name: "Water Vole",
    clue: "Ratty from The Wind in the Willows — a blunt-nosed swimmer holed up along the burn's quiet margins.",
    options: ["Brown Rat", "Water Vole", "Water Shrew"],
    correctIndex: 1,
    art: (
      <svg viewBox="0 0 160 160" aria-hidden="true">
        <rect width="160" height="160" fill={sky} />
        {/* burn */}
        <rect y="116" width="160" height="44" fill={seaBand} opacity="0.55" />
        <path d="M 14 128 Q 30 122 46 128 M 108 136 Q 124 130 140 136" stroke={white} strokeWidth="3" fill="none" opacity="0.6" />
        {/* bank */}
        <path d="M 0 116 Q 40 100 90 108 Q 130 114 160 108 L 160 120 L 0 120 Z" fill={grassGreen} />
        {/* tail */}
        <path d="M 108 96 Q 130 92 140 100" stroke="#6b4a2b" strokeWidth="4" fill="none" strokeLinecap="round" />
        {/* round body */}
        <ellipse cx="80" cy="88" rx="34" ry="24" fill="#6b4a2b" stroke={ink} strokeWidth="2.5" />
        {/* blunt head */}
        <circle cx="46" cy="80" r="17" fill="#6b4a2b" stroke={ink} strokeWidth="2.5" />
        {/* small ear (barely visible — a vole giveaway) */}
        <circle cx="52" cy="66" r="5" fill="#6b4a2b" stroke={ink} strokeWidth="2" />
        {/* face */}
        <circle cx="39" cy="77" r="2.4" fill={ink} />
        <circle cx="30" cy="84" r="2.6" fill={ink} />
        <path d="M 33 88 L 24 92 M 33 90 L 25 96 M 32 86 L 23 87" stroke={ink} strokeWidth="1.2" opacity="0.6" />
        {/* nibbled grass stem */}
        <path d="M 30 104 Q 34 96 32 88" stroke={darkGreen} strokeWidth="2.5" fill="none" strokeLinecap="round" />
      </svg>
    ),
  },
];

export default function SpeciesIdQuiz() {
  const [round, setRound] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const current = rounds[round];

  function choose(i: number) {
    if (selected !== null) return;
    setSelected(i);
    if (i === current.correctIndex) setScore((s) => s + 1);
  }

  function next() {
    if (round + 1 < rounds.length) {
      setRound((r) => r + 1);
      setSelected(null);
    } else {
      setFinished(true);
      awardStamp("wildlife", score, rounds.length);
    }
  }

  function restart() {
    setRound(0);
    setSelected(null);
    setScore(0);
    setFinished(false);
  }

  return (
    <div
      className="border-2 p-4 sm:p-5"
      style={{
        borderColor: palette.ink,
        borderTop: `6px solid ${palette.seaDark}`,
        backgroundColor: "#00000005",
      }}
    >
      <p className="font-heading text-[0.65rem] uppercase tracking-[0.3em]" style={{ color: palette.seaDark }}>
        Test yourself
      </p>
      <h3 className="mt-0.5 font-heading text-lg uppercase tracking-wide" style={{ color: palette.ink }}>
        Spot the species
      </h3>

      {finished ? (
        <div className="mt-4 text-center">
          <p className="font-poster text-4xl" style={{ color: palette.seaDark }}>
            {score} / {rounds.length}
          </p>
          <p className="mt-2 text-sm" style={{ color: palette.ink }}>
            {score === rounds.length
              ? "A keen eye — the wardens would be proud."
              : score >= rounds.length / 2
                ? "A solid spot — bring binoculars and go one better."
                : "Bring binoculars next time and try again."}
          </p>
          <StampEarned />
          <div>
            <button
              onClick={restart}
              className="mt-3 rounded-full px-5 py-1.5 font-heading text-sm uppercase tracking-wider"
              style={{ backgroundColor: palette.seaDark, color: palette.offWhite }}
            >
              Try again
            </button>
          </div>
        </div>
      ) : (
        <>
          <p className="mt-1 font-heading text-xs uppercase tracking-widest opacity-60" style={{ color: palette.ink }}>
            {round + 1} of {rounds.length}
          </p>
          <div
            className="card-in poster-frame mx-auto mt-3 w-full max-w-[240px] overflow-hidden"
            key={round}
          >
            {current.art}
          </div>
          <p
            className="mx-auto mt-3 max-w-md text-center text-xs italic leading-relaxed"
            style={{ color: palette.ink, opacity: 0.75 }}
          >
            &ldquo;{current.clue}&rdquo;
          </p>
          <div className="mt-3 flex flex-col gap-2">
            {current.options.map((option, i) => {
              const isCorrect = i === current.correctIndex;
              const isChosen = i === selected;
              let bg: string = "transparent";
              let border: string = palette.sandDark;
              if (selected !== null) {
                if (isCorrect) {
                  bg = palette.marram;
                  border = palette.marramDark;
                } else if (isChosen) {
                  bg = palette.rust;
                  border = palette.rust;
                }
              }
              return (
                <button
                  key={option}
                  onClick={() => choose(i)}
                  disabled={selected !== null}
                  className="border-2 px-3 py-2 text-left text-sm transition-colors enabled:hover:translate-x-0.5"
                  style={{
                    borderColor: border,
                    backgroundColor: bg,
                    color: selected !== null && (isCorrect || isChosen) ? palette.offWhite : palette.ink,
                  }}
                >
                  {option}
                </button>
              );
            })}
          </div>
          {selected !== null && (
            <button
              onClick={next}
              className="mt-3 rounded-full px-5 py-1.5 font-heading text-sm uppercase tracking-wider"
              style={{ backgroundColor: palette.seaDark, color: palette.offWhite }}
            >
              {round + 1 < rounds.length ? "Next" : "See score"}
            </button>
          )}
        </>
      )}
    </div>
  );
}

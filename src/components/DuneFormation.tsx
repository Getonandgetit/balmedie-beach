"use client";

import { useEffect, useRef, useState } from "react";
import { palette } from "@/lib/palette";

const STAGES = [
  {
    label: "Strandline",
    caption:
      "Washed-up seaweed and debris on the strandline snag windblown sand — every dune on this coast started as a grain that didn't blow past.",
  },
  {
    label: "Foredune",
    caption:
      "Pioneer marram grass takes hold. Its roots grow upward as fast as the sand can bury it, binding loose grains into the first low ridge.",
  },
  {
    label: "Mobile dune",
    caption:
      "The ridge grows tall but stays restless — bare seaward faces can shift several metres in a single stormy winter.",
  },
  {
    label: "Fixed dune & heath",
    caption:
      "Centuries on, the inland dunes stop moving. Thin soil forms, and marram gives way to crowberry, cross-leaved heath and red fescue.",
  },
];

const STEP_MS = 1800;

// Groups grow out of the ground as their stage arrives.
function growStyle(visible: boolean): React.CSSProperties {
  return {
    opacity: visible ? 1 : 0,
    transform: visible ? "scaleY(1)" : "scaleY(0)",
    transformBox: "fill-box",
    transformOrigin: "center bottom",
    transition: "transform 0.9s cubic-bezier(0.2, 0.8, 0.3, 1), opacity 0.5s ease",
  };
}

export default function DuneFormation() {
  const [stage, setStage] = useState(0);
  const [playing, setPlaying] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (!playing) return;
    timerRef.current = setInterval(() => {
      setStage((s) => {
        if (s >= STAGES.length - 1) {
          setPlaying(false);
          return s;
        }
        return s + 1;
      });
    }, STEP_MS);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [playing]);

  function play() {
    setStage(0);
    setPlaying(true);
  }

  return (
    <div
      className="border-2 p-4 sm:p-5"
      style={{
        borderColor: palette.ink,
        borderTop: `6px solid ${palette.sandDark}`,
        backgroundColor: "#00000005",
      }}
    >
      <p className="font-heading text-[0.65rem] uppercase tracking-[0.3em]" style={{ color: palette.sandDark }}>
        Interactive diagram
      </p>
      <h3 className="mt-0.5 font-heading text-lg uppercase tracking-wide" style={{ color: palette.ink }}>
        How a dune forms
      </h3>

      {/* Stage stepper */}
      <div className="mt-3 flex flex-wrap items-center gap-2">
        <button
          onClick={play}
          className="rounded-full px-4 py-1.5 font-heading text-xs uppercase tracking-wider"
          style={{ backgroundColor: palette.sandDark, color: palette.offWhite }}
        >
          {playing ? "Playing…" : "▶ Play 5,000 years"}
        </button>
        {STAGES.map((s, i) => (
          <button
            key={s.label}
            onClick={() => {
              setPlaying(false);
              setStage(i);
            }}
            className="rounded-full border px-3 py-1 font-heading text-xs uppercase tracking-wider transition-colors"
            style={{
              borderColor: palette.sandDark,
              backgroundColor: stage === i ? palette.sandDark : "transparent",
              color: stage === i ? palette.offWhite : palette.ink,
            }}
            aria-pressed={stage === i}
          >
            {i + 1}. {s.label}
          </button>
        ))}
      </div>

      <svg
        viewBox="0 0 640 300"
        className="mt-4 w-full border-2"
        style={{ backgroundColor: palette.offWhite, borderColor: palette.ink }}
        role="img"
        aria-label={`Cross-section of the dune system at stage: ${STAGES[stage].label}`}
      >
        {/* Sky + sun */}
        <circle cx="60" cy="52" r="24" fill={palette.sand} opacity="0.9" />

        {/* Wind arrows */}
        <g stroke={palette.seaDark} strokeWidth="2.5" fill="none" strokeLinecap="round" opacity="0.5">
          <path d="M 40 110 Q 90 100 140 110 M 128 103 L 140 110 L 127 116" />
          <path d="M 60 150 Q 110 140 160 150 M 148 143 L 160 150 L 147 156" />
        </g>
        <text x="46" y="96" fontSize="11" fontStyle="italic" fill={palette.seaDark} opacity="0.7" fontFamily="sans-serif">
          onshore wind
        </text>

        {/* Beach base + sea */}
        <path d="M 0 250 L 640 250 L 640 300 L 0 300 Z" fill={palette.sand} opacity="0.55" />
        <path d="M 0 244 Q 40 238 80 246 L 80 300 L 0 300 Z" fill={palette.sea} opacity="0.85" />
        <path d="M 8 252 Q 24 246 40 252 M 20 268 Q 36 262 52 268" stroke={palette.offWhite} strokeWidth="2.5" fill="none" opacity="0.6" />

        {/* Strandline debris — always present */}
        <g fill={palette.ink} opacity="0.65">
          <ellipse cx="100" cy="246" rx="7" ry="2.5" />
          <ellipse cx="116" cy="248" rx="5" ry="2" />
          <ellipse cx="130" cy="245" rx="6" ry="2.2" />
        </g>
        {/* drifting sand grains */}
        <g fill={palette.sandDark} opacity="0.8">
          <circle cx="150" cy="230" r="2" />
          <circle cx="165" cy="222" r="1.6" />
          <circle cx="182" cy="228" r="2" />
        </g>

        {/* Stage 1: foredune */}
        <g style={growStyle(stage >= 1)}>
          <path d="M 160 250 Q 215 208 270 250 Z" fill={palette.sand} />
          <path d="M 160 250 Q 215 208 270 250" stroke={palette.sandDark} strokeWidth="2" fill="none" />
          {[200, 216, 232].map((x) => (
            <g key={x} stroke={palette.marram} strokeWidth="2.5" fill="none" strokeLinecap="round">
              <path d={`M ${x} 224 Q ${x - 6} 208 ${x - 9} 200 M ${x} 224 Q ${x} 204 ${x} 198 M ${x} 224 Q ${x + 6} 208 ${x + 9} 200`} />
            </g>
          ))}
          <text x="215" y="272" textAnchor="middle" fontSize="12" fill={palette.ink} fontFamily="sans-serif">
            foredune
          </text>
        </g>

        {/* Stage 2: mobile dune */}
        <g style={growStyle(stage >= 2)}>
          <path d="M 280 250 Q 360 160 440 250 Z" fill={palette.sand} />
          <path d="M 280 250 Q 360 160 440 250" stroke={palette.sandDark} strokeWidth="2" fill="none" />
          {[330, 352, 374, 396].map((x, i) => (
            <g key={x} stroke={palette.marram} strokeWidth="2.5" fill="none" strokeLinecap="round">
              <path
                d={`M ${x} ${196 - (i === 1 || i === 2 ? 14 : 0)} Q ${x - 6} ${176 - (i === 1 || i === 2 ? 14 : 0)} ${x - 9} ${168 - (i === 1 || i === 2 ? 14 : 0)} M ${x} ${196 - (i === 1 || i === 2 ? 14 : 0)} Q ${x + 6} ${176 - (i === 1 || i === 2 ? 14 : 0)} ${x + 9} ${168 - (i === 1 || i === 2 ? 14 : 0)}`}
              />
            </g>
          ))}
          <text x="360" y="272" textAnchor="middle" fontSize="12" fill={palette.ink} fontFamily="sans-serif">
            mobile dune
          </text>
        </g>

        {/* Stage 3: fixed dune & heath */}
        <g style={growStyle(stage >= 3)}>
          <path d="M 450 250 Q 545 178 640 244 L 640 250 Z" fill={palette.marram} />
          <path d="M 450 250 Q 545 178 640 244" stroke={palette.marramDark} strokeWidth="2" fill="none" />
          {[500, 540, 580, 615].map((x, i) => (
            <g key={x}>
              <circle cx={x} cy={216 - (i === 1 ? 10 : 0) + (i === 3 ? 12 : 0)} r="9" fill={palette.marramDark} />
              <circle cx={x + 10} cy={222 - (i === 1 ? 10 : 0) + (i === 3 ? 12 : 0)} r="6" fill={palette.marramDark} opacity="0.8" />
            </g>
          ))}
          {/* black crowberries */}
          <circle cx="536" cy="206" r="2.2" fill={palette.ink} />
          <circle cx="584" cy="214" r="2.2" fill={palette.ink} />
          <text x="545" y="272" textAnchor="middle" fontSize="12" fill={palette.ink} fontFamily="sans-serif">
            fixed dune &amp; heath
          </text>
        </g>

        {/* Time arrow */}
        <g opacity={stage >= 3 ? 1 : 0} style={{ transition: "opacity 0.6s ease 0.5s" }}>
          <path d="M 110 290 L 600 290 M 588 284 L 600 290 L 587 296" stroke={palette.ink} strokeWidth="2" fill="none" opacity="0.55" />
          <text x="355" y="285" textAnchor="middle" fontSize="11" fontStyle="italic" fill={palette.ink} opacity="0.7" fontFamily="sans-serif">
            ~5,000 years, sea to heath
          </text>
        </g>
      </svg>

      <p className="mt-3 min-h-[2.5rem] text-sm leading-relaxed" style={{ color: palette.ink }}>
        <span
          className="mr-2 rounded-full px-2 py-0.5 font-heading text-[0.65rem] uppercase tracking-widest"
          style={{ backgroundColor: palette.sandDark, color: palette.offWhite }}
        >
          {stage + 1} · {STAGES[stage].label}
        </span>
        {STAGES[stage].caption}
      </p>
    </div>
  );
}

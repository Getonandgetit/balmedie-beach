"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  STAMP_TOPICS,
  getStamps,
  clearPassport,
  rankFor,
  type StampId,
  type Stamps,
} from "@/lib/passport";
import { palette } from "@/lib/palette";

const dateFmt = new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "short" });

function StampGlyph({ id, color }: { id: StampId; color: string }) {
  // Small flat glyphs in the map-icon spirit, one per topic.
  switch (id) {
    case "routes": // signpost
      return (
        <svg viewBox="0 0 40 40" className="h-8 w-8" aria-hidden="true">
          <rect x="18.5" y="8" width="3" height="26" fill={color} />
          <polygon points="8,10 30,10 34,13 30,16 8,16" fill={color} />
          <polygon points="32,20 12,20 8,23 12,26 32,26" fill={color} opacity="0.75" />
        </svg>
      );
    case "ww2": // pillbox
      return (
        <svg viewBox="0 0 40 40" className="h-8 w-8" aria-hidden="true">
          <polygon points="6,30 10,14 30,14 34,30" fill={color} />
          <rect x="14" y="19" width="5" height="3.5" fill={palette.offWhite} />
          <rect x="22" y="19" width="5" height="3.5" fill={palette.offWhite} />
        </svg>
      );
    case "wildlife": // tern
      return (
        <svg viewBox="0 0 40 40" className="h-8 w-8" aria-hidden="true">
          <path d="M 4 22 Q 14 12 20 20 Q 26 12 36 22 Q 26 19 20 24 Q 14 19 4 22 Z" fill={color} />
          <circle cx="20" cy="26" r="3" fill={color} />
        </svg>
      );
    case "geography": // dune
      return (
        <svg viewBox="0 0 40 40" className="h-8 w-8" aria-hidden="true">
          <path d="M 3 30 Q 13 14 22 24 Q 29 30 37 26 L 37 32 L 3 32 Z" fill={color} />
          <path d="M 20 18 Q 23 14 26 18" stroke={color} strokeWidth="2" fill="none" />
        </svg>
      );
    case "human": // ice house / cottage
      return (
        <svg viewBox="0 0 40 40" className="h-8 w-8" aria-hidden="true">
          <polygon points="8,20 20,10 32,20" fill={color} />
          <rect x="11" y="20" width="18" height="12" fill={color} opacity="0.8" />
          <rect x="17.5" y="24" width="5" height="8" fill={palette.offWhite} />
        </svg>
      );
  }
}

export default function RangerPassport() {
  const [stamps, setStamps] = useState<Stamps | null>(null);

  useEffect(() => {
    const refresh = () => setStamps(getStamps());
    refresh();
    window.addEventListener("passport:updated", refresh);
    window.addEventListener("storage", refresh);
    return () => {
      window.removeEventListener("passport:updated", refresh);
      window.removeEventListener("storage", refresh);
    };
  }, []);

  const count = stamps ? STAMP_TOPICS.filter((t) => stamps[t.id]).length : 0;
  const complete = count === STAMP_TOPICS.length;

  return (
    <div
      className="border-2 p-5 sm:p-6"
      style={{
        borderColor: palette.ink,
        borderTop: `6px solid ${palette.rust}`,
        backgroundColor: "#00000005",
      }}
    >
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <p
          className="font-heading text-xs uppercase tracking-[0.3em]"
          style={{ color: palette.rust }}
        >
          Collect all five stamps
        </p>
        <p
          className="font-heading text-xs uppercase tracking-widest"
          style={{ color: palette.ink, opacity: 0.6 }}
        >
          {count} of {STAMP_TOPICS.length}
        </p>
      </div>

      <p className="mt-2 text-sm leading-relaxed" style={{ color: palette.ink }}>
        Finish the quiz on each topic page to stamp your passport. Your stamps are
        saved in this browser.
      </p>

      <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-5">
        {STAMP_TOPICS.map((topic) => {
          const stamp = stamps?.[topic.id];
          return (
            <Link
              key={topic.id}
              href={topic.href}
              className="group flex flex-col items-center gap-2 text-center"
              title={stamp ? `Earned ${dateFmt.format(new Date(stamp.earnedAt))}` : `Take the ${topic.label} quiz`}
            >
              <span
                className={`flex h-20 w-20 items-center justify-center rounded-full border-[3px] transition-transform group-hover:scale-105 ${
                  stamp ? "stamp-in border-solid" : "border-dashed"
                }`}
                style={{
                  borderColor: stamp ? topic.color : "#2b262040",
                  backgroundColor: stamp ? `${topic.color}14` : "transparent",
                  transform: stamp ? "rotate(-4deg)" : undefined,
                }}
              >
                {stamp ? (
                  <StampGlyph id={topic.id} color={topic.color} />
                ) : (
                  <span className="font-poster text-2xl" style={{ color: "#2b262035" }}>
                    ?
                  </span>
                )}
              </span>
              <span
                className="font-heading text-[0.6rem] uppercase leading-tight tracking-widest"
                style={{ color: palette.ink, opacity: stamp ? 0.9 : 0.5 }}
              >
                {topic.label}
              </span>
              {stamp?.score != null && stamp.total != null && (
                <span className="-mt-1 text-[0.6rem]" style={{ color: topic.color }}>
                  {stamp.score}/{stamp.total}
                </span>
              )}
            </Link>
          );
        })}
      </div>

      <div className="mt-5 border-t pt-4 text-center" style={{ borderColor: "#2b262020" }}>
        <p
          className="font-heading text-[0.65rem] uppercase tracking-[0.3em]"
          style={{ color: palette.ink, opacity: 0.55 }}
        >
          Current rank
        </p>
        <p
          className={`font-poster ${complete ? "text-3xl sm:text-4xl" : "text-2xl"}`}
          style={{ color: complete ? palette.rust : palette.seaDark }}
        >
          {stamps === null ? "…" : rankFor(count)}
        </p>
        {complete && (
          <p className="mt-1 text-sm" style={{ color: palette.ink }}>
            Every stamp collected — the dunes hold no secrets from you. Haste ye back!
          </p>
        )}
        {count > 0 && (
          <button
            onClick={() => clearPassport()}
            className="mt-3 text-xs underline underline-offset-2"
            style={{ color: palette.ink, opacity: 0.5 }}
          >
            Reset passport
          </button>
        )}
      </div>
    </div>
  );
}

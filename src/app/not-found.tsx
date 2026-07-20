import Link from "next/link";
import { palette } from "@/lib/palette";

export default function NotFound() {
  return (
    <main id="main-content" className="flex-1 px-4 py-8 sm:px-8">
      <div
        className="mx-auto max-w-2xl rounded-2xl p-8 text-center shadow-lg sm:p-12"
        style={{ backgroundColor: palette.offWhite }}
      >
        {/* Lost gull */}
        <svg width="140" height="60" viewBox="0 0 140 60" className="mx-auto" aria-hidden="true">
          <g stroke={palette.seaDark} strokeWidth="3" fill="none" strokeLinecap="round">
            <path d="M 50 34 Q 60 22, 70 34 M 70 34 Q 80 22, 90 34" />
          </g>
          <path
            d="M 10 52 Q 30 46 50 52 T 90 52 T 130 52"
            stroke={palette.sea}
            strokeWidth="3"
            fill="none"
            opacity="0.5"
          />
        </svg>

        <p
          className="mt-4 font-heading text-xs uppercase tracking-[0.35em]"
          style={{ color: palette.rust }}
        >
          Off the waymarked path
        </p>
        <h1 className="mt-2 font-poster text-6xl sm:text-7xl" style={{ color: palette.seaDark }}>
          404
        </h1>
        <p className="mx-auto mt-4 max-w-md text-base leading-relaxed" style={{ color: palette.ink }}>
          You&apos;ve wandered off the boardwalk — this stretch of dune doesn&apos;t
          exist. The marram grass thanks you for turning back.
        </p>
        <Link
          href="/"
          className="mt-6 inline-flex items-center gap-1.5 rounded-full px-5 py-2 font-heading text-sm uppercase tracking-widest"
          style={{ backgroundColor: palette.seaDark, color: palette.offWhite }}
        >
          ← Back to the map
        </Link>
      </div>
    </main>
  );
}

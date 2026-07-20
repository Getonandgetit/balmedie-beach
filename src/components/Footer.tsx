import Link from "next/link";
import { palette } from "@/lib/palette";

const topics = [
  { href: "/walking-routes", label: "Walking Routes" },
  { href: "/ww2-history", label: "WW2 History" },
  { href: "/wildlife", label: "Wildlife" },
  { href: "/physical-geography", label: "Physical Geography" },
  { href: "/human-geography", label: "Human Geography" },
];

export default function Footer() {
  return (
    <footer className="mt-16">
      {/* Wave divider into the footer band */}
      <svg
        viewBox="0 0 1440 56"
        className="block w-full"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          d="M0 56 L0 30 Q 120 10, 240 28 T 480 26 T 720 30 T 960 24 T 1200 30 T 1440 26 L 1440 56 Z"
          fill={palette.seaDark}
        />
        <path
          d="M0 40 Q 180 22, 360 36 T 720 34 T 1080 38 T 1440 32"
          stroke={palette.sea}
          strokeWidth="3"
          fill="none"
          opacity="0.6"
        />
      </svg>

      <div style={{ backgroundColor: palette.seaDark }} className="px-4 pb-10 pt-6 text-center">
        {/* Gulls */}
        <svg width="120" height="28" viewBox="0 0 120 28" className="mx-auto" aria-hidden="true">
          <g stroke={palette.offWhite} strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.8">
            <path d="M 12 16 Q 17 10, 22 16 M 22 16 Q 27 10, 32 16" />
            <path d="M 56 10 Q 60 5, 64 10 M 64 10 Q 68 5, 72 10" />
            <path d="M 92 18 Q 96 13, 100 18 M 100 18 Q 104 13, 108 18" />
          </g>
        </svg>

        <p
          className="mt-3 font-poster text-2xl tracking-wide sm:text-3xl"
          style={{ color: palette.sand }}
        >
          HASTE YE BACK
        </p>
        <p
          className="mt-2 font-heading text-xs uppercase tracking-[0.35em]"
          style={{ color: palette.offWhite, opacity: 0.85 }}
        >
          Dunes · History · Wildlife — Aberdeenshire, Scotland
        </p>

        <nav className="mt-6 flex flex-wrap justify-center gap-x-6 gap-y-2 font-heading text-xs uppercase tracking-widest">
          {topics.map((t) => (
            <Link
              key={t.href}
              href={t.href}
              className="nav-link py-1"
              style={{ color: palette.offWhite }}
            >
              {t.label}
            </Link>
          ))}
        </nav>
        <nav className="mt-2 flex flex-wrap justify-center gap-x-6 gap-y-2 font-heading text-xs uppercase tracking-widest">
          {[
            { href: "/#map", label: "Park Map" },
            { href: "/#tides", label: "Tide Times" },
            { href: "/#sun", label: "Sun & Golden Hour" },
            { href: "/#passport", label: "Ranger Passport" },
          ].map((t) => (
            <Link key={t.href} href={t.href} className="nav-link py-1" style={{ color: palette.sand }}>
              {t.label}
            </Link>
          ))}
        </nav>

        <p className="mt-6 text-xs" style={{ color: palette.offWhite, opacity: 0.55 }}>
          A guided-walk companion to Balmedie Country Park. Prototype site — check
          local signage and tide times before you set out.
        </p>
      </div>
    </footer>
  );
}

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { palette } from "@/lib/palette";

const topics = [
  { href: "/walking-routes", label: "Walking Routes" },
  { href: "/ww2-history", label: "WW2 History" },
  { href: "/wildlife", label: "Wildlife" },
  { href: "/physical-geography", label: "Physical Geography" },
  { href: "/human-geography", label: "Human Geography" },
];

function LogoMark() {
  return (
    <svg width="36" height="36" viewBox="0 0 36 36" aria-hidden="true">
      <circle cx="18" cy="18" r="17" fill={palette.offWhite} />
      <circle cx="18" cy="18" r="17" fill="none" stroke={palette.ink} strokeWidth="1.5" />
      {/* sun */}
      <circle cx="18" cy="13" r="6" fill={palette.sand} />
      {/* sea */}
      <path
        d="M 3 22 Q 8 19, 13 22 T 23 22 T 33 22 L 33 26 L 3 26 Z"
        fill={palette.sea}
      />
      {/* dune */}
      <path d="M 2 30 Q 12 22, 20 27 Q 27 31, 34 28 L 34 33 L 2 33 Z" fill={palette.sandDark} />
    </svg>
  );
}

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 shadow-lg" style={{ backgroundColor: palette.seaDark }}>
      <div className="h-1" style={{ backgroundColor: palette.rust }} />
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-x-6 gap-y-2 px-4 py-3 sm:px-8">
        <Link href="/" className="flex items-center gap-3">
          <LogoMark />
          <span
            className="font-poster text-lg tracking-wide sm:text-xl"
            style={{ color: palette.offWhite }}
          >
            BALMEDIE BEACH
          </span>
        </Link>
        <nav className="flex flex-wrap gap-x-5 gap-y-1 font-heading text-sm uppercase tracking-widest">
          {topics.map((t) => {
            const active = pathname === t.href;
            return (
              <Link
                key={t.href}
                href={t.href}
                className="nav-link py-1"
                data-active={active}
                aria-current={active ? "page" : undefined}
                style={{ color: active ? palette.sand : palette.offWhite }}
              >
                {t.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}

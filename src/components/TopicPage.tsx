import Link from "next/link";
import Hero from "@/components/Hero";
import { palette } from "@/lib/palette";

export default function TopicPage({
  title,
  accent,
  heroSrc,
  heroAlt,
  intro,
  points,
}: {
  title: string;
  accent: string;
  heroSrc: string;
  heroAlt: string;
  intro: string;
  points: string[];
}) {
  return (
    <main className="flex-1 px-4 py-8 sm:px-8">
      <div
        className="mx-auto max-w-3xl rounded-2xl p-4 shadow-lg sm:p-8"
        style={{ backgroundColor: palette.offWhite }}
      >
        <Hero src={heroSrc} alt={heroAlt} />

        <Link href="/" className="mt-6 inline-block text-sm underline" style={{ color: palette.seaDark }}>
          ← Back to the map
        </Link>
        <h1
          className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl"
          style={{ color: accent }}
        >
          {title}
        </h1>
        <p className="mt-4 text-base leading-relaxed" style={{ color: palette.ink }}>
          {intro}
        </p>
        <ul className="mt-6 space-y-3">
          {points.map((point) => (
            <li
              key={point}
              className="rounded-md border-l-4 pl-3 text-sm leading-relaxed"
              style={{ borderColor: accent, color: palette.ink }}
            >
              {point}
            </li>
          ))}
        </ul>
        <p className="mt-8 text-xs italic" style={{ color: palette.ink, opacity: 0.6 }}>
          Placeholder page — full narrative content, route cards, and the
          topic quiz are still to be drafted.
        </p>
      </div>
    </main>
  );
}

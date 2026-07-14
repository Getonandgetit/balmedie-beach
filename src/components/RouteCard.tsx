import Link from "next/link";
import { palette } from "@/lib/palette";

export default function RouteCard({
  name,
  difficulty,
  distance,
  duration,
  elevation,
  terrain,
  description,
  mapSlug,
}: {
  name: string;
  difficulty: "Easy" | "Moderate";
  distance: string;
  duration: string;
  elevation: string;
  terrain: string;
  description: string;
  mapSlug?: string;
}) {
  const difficultyColor = difficulty === "Easy" ? palette.marramDark : palette.sandDark;

  return (
    <div
      className="topic-card border-2 p-4"
      style={{
        borderColor: palette.ink,
        borderLeft: `6px solid ${difficultyColor}`,
        backgroundColor: "#00000005",
      }}
    >
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h3
          className="font-heading text-lg uppercase tracking-wide"
          style={{ color: palette.ink }}
        >
          {name}
        </h3>
        <span
          className="rounded-full px-2.5 py-0.5 font-heading text-xs uppercase tracking-wider"
          style={{ backgroundColor: difficultyColor, color: palette.offWhite }}
        >
          {difficulty}
        </span>
      </div>

      <dl className="mt-3 grid grid-cols-3 gap-2 text-xs" style={{ color: palette.ink }}>
        <div>
          <dt className="font-heading uppercase tracking-wider opacity-60">Distance</dt>
          <dd className="mt-0.5 font-medium">{distance}</dd>
        </div>
        <div>
          <dt className="font-heading uppercase tracking-wider opacity-60">Duration</dt>
          <dd className="mt-0.5 font-medium">{duration}</dd>
        </div>
        <div>
          <dt className="font-heading uppercase tracking-wider opacity-60">Elevation</dt>
          <dd className="mt-0.5 font-medium">{elevation}</dd>
        </div>
      </dl>

      <p className="mt-3 text-sm leading-relaxed" style={{ color: palette.ink, opacity: 0.85 }}>
        {description}
      </p>
      <p className="mt-2 text-xs italic" style={{ color: palette.ink, opacity: 0.55 }}>
        Terrain: {terrain}
      </p>
      {mapSlug && (
        <Link
          href={`/?route=${mapSlug}`}
          className="mt-3 inline-flex items-center gap-1.5 rounded-full px-3 py-1 font-heading text-xs uppercase tracking-widest"
          style={{ backgroundColor: palette.seaDark, color: palette.offWhite }}
        >
          View on map →
        </Link>
      )}
    </div>
  );
}

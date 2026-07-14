import Image from "next/image";
import { palette } from "@/lib/palette";

export default function Hero({
  src,
  alt,
  title,
  kicker,
  tagline,
  accent = palette.rust,
}: {
  src: string;
  alt: string;
  title?: string;
  kicker?: string;
  tagline?: string;
  accent?: string;
}) {
  return (
    <div className="poster-frame zoom-parent relative w-full overflow-hidden">
      <Image
        src={src}
        alt={alt}
        width={1408}
        height={768}
        priority
        className="img-zoom h-auto w-full object-cover"
        sizes="(max-width: 768px) 100vw, 768px"
      />
      {title && (
        <div
          className="absolute inset-x-0 bottom-0 z-10 px-5 pb-5 pt-20 sm:px-7 sm:pb-7"
          style={{
            background:
              "linear-gradient(to top, rgba(43,38,32,0.85), rgba(43,38,32,0.4) 55%, rgba(43,38,32,0))",
          }}
        >
          {kicker && (
            <p
              className="font-heading text-[0.7rem] uppercase tracking-[0.35em] sm:text-xs"
              style={{ color: palette.sand }}
            >
              {kicker}
            </p>
          )}
          <h1
            className="mt-1 font-poster text-3xl uppercase leading-tight sm:text-5xl"
            style={{
              color: palette.offWhite,
              textShadow: "2px 2px 0 rgba(43,38,32,0.6)",
            }}
          >
            {title}
          </h1>
          {tagline && (
            <p
              className="mt-1.5 font-heading text-xs uppercase tracking-[0.25em] sm:text-sm"
              style={{ color: palette.offWhite, opacity: 0.9 }}
            >
              {tagline}
            </p>
          )}
          <div className="mt-3 h-1 w-16" style={{ backgroundColor: accent }} />
        </div>
      )}
    </div>
  );
}

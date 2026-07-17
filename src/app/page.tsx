import Image from "next/image";
import Link from "next/link";
import ParkMap from "@/components/ParkMap";
import RangerPassport from "@/components/RangerPassport";
import SunTimes from "@/components/SunTimes";
import TideTimes from "@/components/TideTimes";
import Hero from "@/components/Hero";
import StatBand from "@/components/StatBand";
import { palette } from "@/lib/palette";

const topicCards = [
  {
    href: "/walking-routes",
    src: "/images/hero-walking-routes.png",
    alt: "Poster of a hiker on the boardwalk through the dunes",
    title: "Walking Routes",
    line: "Five ways onto the sand, from buggy-friendly boardwalk to a 23 km dune coast.",
    color: palette.marramDark,
  },
  {
    href: "/ww2-history",
    src: "/images/hero-ww2-history.png",
    alt: "Poster of a WW2 pillbox half-buried in the dunes at dusk",
    title: "WW2 History",
    line: "Pillboxes, anti-tank blocks and the beach they called the bomb cemetery.",
    color: palette.rust,
  },
  {
    href: "/wildlife",
    src: "/images/hero-wildlife.png",
    alt: "Poster of eider ducks and terns over the dunes",
    title: "Wildlife",
    line: "Terns, eiders, skylarks and water voles — zone by zone, surf to heath.",
    color: palette.seaDark,
  },
  {
    href: "/physical-geography",
    src: "/images/hero-physical-geography.png",
    alt: "Poster cross-section of the dune system",
    title: "Physical Geography",
    line: "How 5,000 years of wind and marram grass built the ground underfoot.",
    color: palette.sandDark,
  },
  {
    href: "/human-geography",
    src: "/images/hero-human-geography.png",
    alt: "Poster blending the historic fishing coast with the modern village",
    title: "Human Geography",
    line: "Salmon nets, ice houses, oil money — and a very contested golf course.",
    color: palette.ink,
  },
];

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <div className="mt-12 flex items-center gap-4">
      <div className="h-px flex-1" style={{ backgroundColor: palette.sandDark }} />
      <h2
        className="font-heading text-lg uppercase tracking-[0.3em] sm:text-xl"
        style={{ color: palette.seaDark }}
      >
        {children}
      </h2>
      <div className="h-px flex-1" style={{ backgroundColor: palette.sandDark }} />
    </div>
  );
}

export default function Home() {
  return (
    <main className="flex-1 px-4 py-8 sm:px-8">
      <div
        className="mx-auto max-w-6xl rounded-2xl p-4 shadow-lg sm:p-8"
        style={{ backgroundColor: palette.offWhite }}
      >
        <div className="fade-up">
          <Hero
            src="/images/hero-home.png"
            alt="Illustrated poster of the boardwalk through the dunes at Balmedie Beach at golden hour"
            kicker="Aberdeenshire · Scotland"
            title="Balmedie Beach"
            tagline="A guided walk through dunes, history and wildlife"
            accent={palette.sand}
          />
        </div>

        <p
          className="drop-cap mx-auto mt-8 max-w-2xl text-center text-base leading-relaxed sm:text-lg"
          style={{ color: palette.ink, "--drop-color": palette.sea } as React.CSSProperties}
        >
          Fourteen miles north of Aberdeen, the dunes at Balmedie hide more than
          sand: wartime pillboxes, tern colonies, 5,000 years of shifting coast.
          Toggle the layers on the map below and click a pin to start exploring.
        </p>

        <div className="mt-8">
          <StatBand />
        </div>

        <section id="map">
          <SectionHeading>Explore the Park</SectionHeading>
          <div className="mt-6">
            <ParkMap />
          </div>
          <p className="mt-3 text-xs italic" style={{ color: palette.ink, opacity: 0.6 }}>
            Wildlife and geography hotspots are indicative placements within their
            habitat zone.
          </p>

          <div
            className="mt-6 flex flex-wrap items-center justify-center gap-x-2 gap-y-2 border-2 px-4 py-3"
            style={{ borderColor: palette.ink, backgroundColor: "#00000005" }}
          >
            <span
              className="mr-1 font-heading text-xs uppercase tracking-[0.25em]"
              style={{ color: palette.seaDark }}
            >
              At the Sand Bothy:
            </span>
            {["Parking", "Toilets", "Exhibition", "Refreshments", "Play Park", "Picnic Areas"].map(
              (facility, i, arr) => (
                <span key={facility} className="flex items-center gap-2 text-sm" style={{ color: palette.ink }}>
                  {facility}
                  {i < arr.length - 1 && (
                    <span aria-hidden="true" style={{ color: palette.sandDark }}>
                      ·
                    </span>
                  )}
                </span>
              )
            )}
          </div>
        </section>

        <section id="tides">
          <SectionHeading>Tide Times</SectionHeading>
          <div className="mt-6">
            <TideTimes />
          </div>
        </section>

        <section id="sun">
          <SectionHeading>Sun &amp; Golden Hour</SectionHeading>
          <div className="mt-6">
            <SunTimes />
          </div>
        </section>

        <SectionHeading>The Five Walks</SectionHeading>
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-6">
          {topicCards.map((card, i) => (
            <Link
              key={card.href}
              href={card.href}
              className={`topic-card poster-frame zoom-parent fade-up block overflow-hidden ${
                i < 3 ? "lg:col-span-2" : "lg:col-span-3"
              }`}
              style={{ animationDelay: `${i * 90}ms` }}
            >
              <div className="overflow-hidden">
                <Image
                  src={card.src}
                  alt={card.alt}
                  width={704}
                  height={384}
                  className="img-zoom h-40 w-full object-cover sm:h-44"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 384px"
                />
              </div>
              <div
                className="flex items-center justify-between gap-3 px-4 py-2.5"
                style={{ backgroundColor: card.color }}
              >
                <span
                  className="font-heading text-base uppercase tracking-widest"
                  style={{ color: palette.offWhite }}
                >
                  {card.title}
                </span>
                <span aria-hidden="true" style={{ color: palette.sand }}>
                  →
                </span>
              </div>
              <p className="px-4 py-3 text-sm leading-snug" style={{ color: palette.ink }}>
                {card.line}
              </p>
            </Link>
          ))}
        </div>

        <section id="passport">
          <SectionHeading>Ranger Passport</SectionHeading>
          <div className="mt-6">
            <RangerPassport />
          </div>
        </section>
      </div>
    </main>
  );
}

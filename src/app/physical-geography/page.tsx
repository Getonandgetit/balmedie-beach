import Link from "next/link";
import Hero from "@/components/Hero";
import SequencingQuiz from "@/components/quiz/SequencingQuiz";
import { palette } from "@/lib/palette";

const dunesScrambled = [
  { id: "fixed", label: "Fixed Dune & Heath" },
  { id: "foredune", label: "The Foredune" },
  { id: "mobile", label: "The Mobile Dune" },
];
const dunesCorrectOrder = ["foredune", "mobile", "fixed"];

function Stage({
  number,
  title,
  children,
}: {
  number: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-8 flex gap-4">
      <div
        className="flex h-9 w-9 flex-none items-center justify-center rounded-full font-poster text-sm"
        style={{ backgroundColor: palette.sandDark, color: palette.offWhite }}
      >
        {number}
      </div>
      <div>
        <h2 className="font-heading text-xl uppercase tracking-wide" style={{ color: palette.ink }}>
          {title}
        </h2>
        <div className="mt-2 space-y-3 text-sm leading-relaxed" style={{ color: palette.ink }}>
          {children}
        </div>
      </div>
    </section>
  );
}

export default function PhysicalGeographyPage() {
  return (
    <main className="flex-1 px-4 py-8 sm:px-8">
      <div
        className="mx-auto max-w-3xl rounded-2xl p-4 shadow-lg sm:p-8"
        style={{ backgroundColor: palette.offWhite }}
      >
        <Hero
          src="/images/hero-physical-geography.png"
          alt="Illustrated cross-section poster of the dune system from foredune to fixed dune heath"
          kicker="5,000 years in the making"
          title="Physical Geography"
          accent={palette.sandDark}
        />

        <Link
          href="/"
          className="mt-6 inline-flex items-center gap-1.5 rounded-full border px-3 py-1 font-heading text-xs uppercase tracking-widest"
          style={{ borderColor: palette.seaDark, color: palette.seaDark }}
        >
          ← Back to the map
        </Link>

        <p
          className="drop-cap mt-5 text-base leading-relaxed"
          style={{ color: palette.ink, "--drop-color": palette.sandDark } as React.CSSProperties}
        >
          Every dune here started as a grain of sand that didn&apos;t blow
          away. Walk from the tideline inland and you&apos;re walking
          through roughly 5,000 years of that process, one stage at a time —
          the same span over which the whole Sands of Forvie system,
          stretching from here to the Ythan Estuary, has slowly built up.
        </p>

        <Stage number="1" title="The Foredune">
          <p>
            It starts at the strandline, where washed-up seaweed and debris
            snag windblown sand. Pioneer plants take hold first, but it&apos;s
            marram grass that does the real work: its roots grow fast enough
            to keep pace with sand piling up around it, binding loose grains
            into the first proper ridge of dune.
          </p>
        </Stage>

        <Stage number="2" title="The Mobile Dune">
          <p>
            Behind the foredune, still-active dunes shift with the wind,
            their seaward faces steep and their sand loose underfoot. Marram
            grass still dominates, but the dunes here can move several
            metres in a single stormy winter — which is exactly why the park&apos;s
            boardwalks matter: every pair of feet that leaves the path
            weakens the marram cover holding the sand in place.
          </p>
        </Stage>

        <Stage number="3" title="The Fixed Dune & Heath">
          <p>
            Further inland, dunes that formed centuries ago have stopped
            moving. Enough organic matter has built up in the sand to
            support a thin soil, and marram gives way to crowberry,
            cross-leaved heath and red fescue. This is the oldest, most
            stable ground in the park — and the most fragile, since it took
            the longest to form and won&apos;t come back quickly if damaged.
          </p>
        </Stage>

        <Stage number="4" title="The Burns">
          <p>
            Two burns cut straight through the dune belt on their way to the
            sea, and they don&apos;t stay still either — each burn mouth
            shifts position gradually over the years as sand builds up on
            one side and washes away on the other. Where a burn crosses the
            beach, you can often see the dune profile in cross-section,
            layer by layer, in the eroded bank.
          </p>
        </Stage>

        <div
          className="mt-10 border-2 p-4 text-sm leading-relaxed"
          style={{
            borderColor: palette.ink,
            borderLeft: `6px solid ${palette.sandDark}`,
            backgroundColor: "#00000008",
            color: palette.ink,
          }}
        >
          <strong>Erosion and accretion:</strong> this coast is never
          static. Winter storms can strip metres of sand from the foredune
          in a single event, while calmer spells let it rebuild. Over the
          long run the system tends to balance out, but any one visit might
          catch it mid-retreat or mid-recovery — part of why the dunes look
          a little different every year.
        </div>

        <div className="mt-8">
          <SequencingQuiz
            title="Order the stages of dune formation"
            accent={palette.sandDark}
            items={dunesScrambled}
            correctOrder={dunesCorrectOrder}
            stampId="geography"
          />
        </div>

        <p className="mt-4 text-xs italic" style={{ color: palette.ink, opacity: 0.6 }}>
          Coming soon: an animated &ldquo;how a dune forms&rdquo; diagram.
        </p>
      </div>
    </main>
  );
}

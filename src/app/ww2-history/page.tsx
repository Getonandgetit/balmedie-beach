import Link from "next/link";
import Hero from "@/components/Hero";
import MapClickQuiz from "@/components/quiz/MapClickQuiz";
import TriviaQuiz, { type TriviaQuestion } from "@/components/quiz/TriviaQuiz";
import { palette } from "@/lib/palette";

const trivia: TriviaQuestion[] = [
  {
    question: "How many pillboxes remain on Balmedie Beach in total?",
    options: ["Two", "Three", "Four"],
    correctIndex: 2,
    explanation: "Three stand together as a group, and a fourth stands apart further along the dune line.",
  },
  {
    question: "What makes the largest pillbox in the group unusual?",
    options: ["It has seven sides", "It's built from timber", "It floats at high tide"],
    correctIndex: 0,
    explanation: "Most pillboxes are round or hexagonal — the seven-sided design here is unusual, with nine firing embrasures and an internal ricochet wall.",
  },
  {
    question: "What clue suggests the anti-tank blocks weren't poured on site?",
    options: [
      "They're made of wood",
      "Names and \"MONTROSE\" scratched into the wet concrete",
      "They're painted camouflage green",
    ],
    correctIndex: 1,
    explanation: "Steel lifting loops and place names cast into the concrete suggest the blocks were made elsewhere and delivered by lorry.",
  },
  {
    question: "Why was Balmedie Beach nicknamed the \"bomb cemetery\"?",
    options: [
      "Soldiers were buried there",
      "Unexploded WW2 ordnance from Aberdeen raids was brought there to be made safe",
      "It was the site of a shipwreck",
    ],
    correctIndex: 1,
    explanation: "Aberdeen was a regular Luftwaffe target, and the open foreshore was a practical place to defuse or detonate bombs that didn't go off.",
  },
];

function Stop({
  number,
  title,
  pinId,
  children,
}: {
  number: string;
  title: string;
  pinId?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-8 flex gap-4">
      <div
        className="flex h-9 w-9 flex-none items-center justify-center rounded-full font-poster text-sm"
        style={{ backgroundColor: palette.rust, color: palette.offWhite }}
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
        {pinId && (
          <Link
            href={`/?pin=${pinId}`}
            className="mt-3 inline-flex items-center gap-1.5 rounded-full border px-3 py-1 font-heading text-xs uppercase tracking-widest"
            style={{ borderColor: palette.rust, color: palette.rust }}
          >
            Find it on the map →
          </Link>
        )}
      </div>
    </section>
  );
}

export default function WW2HistoryPage() {
  return (
    <main className="flex-1 px-4 py-8 sm:px-8">
      <div
        className="mx-auto max-w-3xl rounded-2xl p-4 shadow-lg sm:p-8"
        style={{ backgroundColor: palette.offWhite }}
      >
        <Hero
          src="/images/hero-ww2-history.png"
          alt="Illustrated poster of a WW2 pillbox half-buried in the dunes at dusk"
          kicker="The coast at war · 1939–45"
          title="WW2 History"
          accent={palette.rust}
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
          style={{ color: palette.ink, "--drop-color": palette.rust } as React.CSSProperties}
        >
          Walk the dunes at Balmedie today and it&apos;s easy to miss them —
          squat grey shapes half-swallowed by marram grass, weathered soft at
          the edges. But eighty-odd years ago this stretch of coast was on
          the front line of Britain&apos;s invasion defences. This walk
          follows the old defensive line north to south, stopping at each
          surviving structure along the way.
        </p>

        <Stop number="1" title="The Pillbox Group" pinId="pillboxes">
          <p>
            Three pillboxes stand together in the dunes, a short walk south
            of the main beach access, built to protect a small wartime radar
            station of three masts that once stood nearby. The largest is an unusual seven-sided design: about 14
            feet long and 12 feet wide, with a single door behind a blast
            wall, nine firing embrasures, and an internal ricochet wall to
            stop bullets bouncing back at the defenders inside. The other two
            are simpler round pillboxes, built to cover the approaches the
            seven-sided one couldn&apos;t see.
          </p>
          <p>
            A fourth pillbox stands apart from the group, further along the
            dune line — worth the short detour if you want to compare
            designs.
          </p>
        </Stop>

        <Stop number="2" title="The Anti-Tank Line">
          <p>
            At the foot of the dunes, rows of concrete anti-tank blocks were
            laid to stop armour landing straight off the beach. Look closely
            at the concrete and you can still make out names scratched in
            while it was wet, along with the word &ldquo;MONTROSE&rdquo; — a
            clue that these blocks, and the steel loops cast into them for
            hauling, were made elsewhere and brought here by lorry rather
            than poured on site. Fragments of barbed wire entanglement
            survive a little further north.
          </p>
        </Stop>

        <Stop number="3" title="The Bomb Cemetery">
          <p>
            During the war, Aberdeen was a regular target for Luftwaffe
            raids, and not every bomb that fell went off. Balmedie&apos;s
            open, empty foreshore made it a practical place to bring
            unexploded and defused ordnance to be made safe or deliberately
            detonated — earning this stretch of beach its grim nickname, the
            &ldquo;bomb cemetery.&rdquo;
          </p>
        </Stop>

        <Stop number="4" title="The Menie Minefield">
          <p>
            Further north, beside the Mill of Menie, a beach minefield was
            laid in case of invasion from the sea. It was cleared after the
            war by the Royal Engineers&apos; 11th Bomb Disposal Company under
            Major W.M. Hewitt — though decades later, workers building the
            Menie golf course still turned up rusted, harmless mine
            fragments in the sand. The site now lies within the golf
            course grounds and isn&apos;t accessible on this walk, but it
            completes the story of a coastline that spent the 1940s braced
            for an invasion that never came.
          </p>
        </Stop>

        <div
          className="mt-10 border-2 p-4 text-sm leading-relaxed"
          style={{
            borderColor: palette.ink,
            borderLeft: `6px solid ${palette.rust}`,
            backgroundColor: "#00000008",
            color: palette.ink,
          }}
        >
          <strong>Visiting:</strong> all four pillboxes and the anti-tank
          blocks are on public dune paths and safe to view from the outside.
          Please don&apos;t climb on the structures — the concrete is
          decades old and the ground around it is fragile dune habitat.
        </div>

        <div className="mt-8 space-y-4">
          <MapClickQuiz />
          <TriviaQuiz title="WW2 trivia" accent={palette.rust} questions={trivia} stampId="ww2" />
        </div>
      </div>
    </main>
  );
}

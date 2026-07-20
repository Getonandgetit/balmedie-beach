import type { Metadata } from "next";
import Link from "next/link";
import Hero from "@/components/Hero";
import TriviaQuiz, { type TriviaQuestion } from "@/components/quiz/TriviaQuiz";
import { palette } from "@/lib/palette";

export const metadata: Metadata = {
  title: "Human Geography",
  description:
    "Salmon nets, ice houses, oil money and a contested golf course — the human story of Balmedie and Belhelvie parish.",
};

const trivia: TriviaQuestion[] = [
  {
    question: "How was fish traditionally kept fresh on this coast before refrigeration?",
    options: ["Salted in barrels", "Stored in a dune ice house", "Buried in wet sand"],
    correctIndex: 1,
    explanation: "One of the old ice houses used to store the salmon catch still stands in the dunes.",
  },
  {
    question: "What industry drove Balmedie's growth into a commuter village?",
    options: ["Fishing exports", "North Sea oil", "Textile manufacturing"],
    correctIndex: 1,
    explanation: "Aberdeen's rise as Europe's oil capital brought commuters to villages like Balmedie, helped later by the AWPR bypass.",
  },
  {
    question: "In what year did the Trump Organization buy the Menie Estate land?",
    options: ["2006", "2012", "1998"],
    correctIndex: 0,
    explanation: "The purchase was made in 2006; the first course opened in 2012 after a public inquiry.",
  },
  {
    question: "How was the golf course development ultimately approved after being rejected locally?",
    options: [
      "A private buyout of the council",
      "A Scottish Government public inquiry",
      "A national referendum",
    ],
    correctIndex: 1,
    explanation: "A local subcommittee rejected the plan first; the Scottish Government then called in a public inquiry, and it was approved in 2008.",
  },
];

function Chapter({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-8">
      <h2
        className="inline-block border-b-2 pb-1 font-heading text-xl uppercase tracking-wide"
        style={{ color: palette.ink, borderColor: palette.sand }}
      >
        {title}
      </h2>
      <div className="mt-2 space-y-3 text-sm leading-relaxed" style={{ color: palette.ink }}>
        {children}
      </div>
    </section>
  );
}

export default function HumanGeographyPage() {
  return (
    <main id="main-content" className="flex-1 px-4 py-8 sm:px-8">
      <div
        className="mx-auto max-w-3xl rounded-2xl p-4 shadow-lg sm:p-8"
        style={{ backgroundColor: palette.offWhite }}
      >
        <Hero
          src="/images/hero-human-geography.png"
          alt="Illustrated poster blending the historic fishing harbour and ice house with the modern golf course and village"
          kicker="Village · Parish · Coast"
          title="Human Geography"
          accent={palette.seaDark}
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
          style={{ color: palette.ink, "--drop-color": palette.seaDark } as React.CSSProperties}
        >
          Balmedie is a village of around 2,560 people in the parish of
          Belhelvie, and its story is really two stories: a slow rural one
          that ran for centuries, and a fast one that&apos;s unfolded in the
          last twenty years. Both are still visible on the ground.
        </p>

        <Chapter title="The Working Coast">
          <p>
            Before the oil industry reshaped Aberdeenshire, this parish
            lived off farming, fishing and quarrying. A salmon fishery
            worked the coast here using fixed stakenets, profitable enough
            in its day to be worth recording in detail — the catch was
            packed in an ice house dug into the dunes to keep it fresh
            before the journey to market. One of those ice houses still
            stands. Inland, a granite quarry opened at Belhelvie village in
            1919 and supplied stone for generations.
          </p>
          <Link
            href="/?pin=ice-house"
            className="inline-flex items-center gap-1.5 rounded-full border px-3 py-1 font-heading text-xs uppercase tracking-widest"
            style={{ borderColor: palette.seaDark, color: palette.seaDark }}
          >
            Find the ice house on the map →
          </Link>
        </Chapter>

        <Chapter title="A Commuter Village">
          <p>
            Balmedie&apos;s more recent growth traces directly back to North
            Sea oil. As Aberdeen became Europe&apos;s oil capital, villages
            within reach of the city filled with commuters, and Balmedie
            — helped by the AWPR bypass cutting the drive into Aberdeen to
            around fifteen minutes — became one of them. Barratt Homes and
            other developers have built new housing here to match, and the
            village today looks very different from the farming and fishing
            settlement it was a century ago.
          </p>
        </Chapter>

        <Chapter title="The Menie Development">
          <p>
            In 2006, Donald Trump&apos;s organisation bought roughly 1,400
            acres of the Menie Estate just along the coast, with plans for a
            golf resort promoted at the time as a £1 billion investment
            including &ldquo;the world&apos;s greatest golf course,&rdquo; a
            450-room hotel, hundreds of holiday apartments and homes, and up
            to 6,000 jobs. A local council subcommittee initially rejected
            the plan; it was approved in 2008 after the Scottish Government
            called in a public inquiry, at which Trump testified in person.
            The first course opened in 2012.
          </p>
          <p>
            What was built differs from what was proposed. The hotel was
            scaled back to 19 rooms, and most of the housing and villas
            haven&apos;t been built. Early estimates of thousands of jobs
            gave way to around 200 in the first years of operation, and
            filings show the resort has continued to operate at a loss.
          </p>
          <p>
            The development was also contested from the start. In 2009, the
            organisation asked the council to use compulsory purchase powers
            over land including four family-owned properties near the site,
            prompting local residents to form the &ldquo;Tripping Up
            Trump&rdquo; campaign and, later, the documentary{" "}
            <em>You&apos;ve Been Trumped</em>. On the environmental side, the
            dunes at Menie are part of a Site of Special Scientific
            Interest, and in 2018 Scottish Natural Heritage confirmed that
            construction had partially damaged the protected dune system.
          </p>
          <p>
            Supporters point to the investment, the golf tourism it has
            brought to the area, and the jobs that do exist. Critics point
            to the promises that weren&apos;t kept, the residents who were
            threatened with losing their homes, and the environmental
            damage to a protected site. Both are part of the record — this
            walk isn&apos;t the place to settle which matters more.
          </p>
        </Chapter>

        <div className="mt-8">
          <TriviaQuiz title="Test what you've learned" accent={palette.ink} questions={trivia} stampId="human" />
        </div>
      </div>
    </main>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import Hero from "@/components/Hero";
import SpeciesIdQuiz from "@/components/quiz/SpeciesIdQuiz";
import { palette } from "@/lib/palette";

export const metadata: Metadata = {
  title: "Wildlife",
  description:
    "Terns, eiders, skylarks and water voles — Balmedie's wildlife, habitat zone by habitat zone from surf to heath.",
};

function Zone({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-8">
      <h2
        className="inline-block rounded-full px-3.5 py-1 font-heading text-sm uppercase tracking-widest"
        style={{ backgroundColor: palette.seaDark, color: palette.offWhite }}
      >
        {title}
      </h2>
      <div className="mt-3 space-y-3 text-sm leading-relaxed" style={{ color: palette.ink }}>
        {children}
      </div>
    </section>
  );
}

export default function WildlifePage() {
  return (
    <main id="main-content" className="flex-1 px-4 py-8 sm:px-8">
      <div
        className="mx-auto max-w-3xl rounded-2xl p-4 shadow-lg sm:p-8"
        style={{ backgroundColor: palette.offWhite }}
      >
        <Hero
          src="/images/hero-wildlife.png"
          alt="Illustrated poster of eider ducks and terns flying over the dunes at Balmedie"
          kicker="Four habitats · 225+ species"
          title="Wildlife"
          accent={palette.sea}
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
          style={{ color: palette.ink, "--drop-color": palette.sea } as React.CSSProperties}
        >
          Balmedie sits at the southern end of the Sands of Forvie — a
          protected dune system running north to the Ythan Estuary that
          ranks among the five largest in the UK. Over 225 bird species have
          been recorded along it. You don&apos;t need to walk far to see why:
          four habitat zones, each with its own residents, sit stacked
          between the car park and the waterline.
        </p>

        <Zone title="Foreshore">
          <p>
            Sandwich and common terns work the shallows for sand eels,
            diving in tight, noisy folds. Offshore, look for loose rafts of
            eider ducks bobbing on the swell — the wider Ythan Estuary and
            Forvie system holds one of the UK&apos;s largest eider colonies,
            and birds range south along this coast to feed. Oystercatchers
            pick along the tideline behind them.
          </p>
        </Zone>

        <Zone title="Mobile Dune">
          <p>
            The youngest, seaward dunes are held together almost entirely by
            marram grass, its roots binding loose sand that would otherwise
            blow away. Skylarks nest low in the grass here and rise
            suddenly, singing, if you get too close — a good reason to stick
            to the marked paths in the April–July breeding season.
          </p>
        </Zone>

        <Zone title="Fixed Dune & Heath">
          <p>
            Further from the sea, older dunes have stabilised enough to
            support crowberry, cross-leaved heath and red fescue alongside
            the marram. Stonechats perch on the taller stems, and in winter
            snow buntings arrive to feed on the seed heads. Watch the sky
            too: kestrels, short-eared owls and sparrowhawks all hunt this
            zone, drawn by the small mammals — foxes, badgers, stoats and
            water voles — that shelter in the heath.
          </p>
        </Zone>

        <Zone title="Burn Wetland">
          <p>
            Where the two burns cut through the dunes to the sea, marsh
            pennywort grows in the damp margins and water voles burrow into
            the banks. The wetland draws wading birds — redshank, lapwing
            and golden plover among them — feeding at the burn mouths
            alongside the more familiar oystercatchers.
          </p>
        </Zone>

        <div
          className="mt-8 rounded-lg border-l-4 p-4 text-sm leading-relaxed"
          style={{ borderColor: palette.seaDark, backgroundColor: "#00000008", color: palette.ink }}
        >
          <strong>Visiting:</strong> terns and skylarks nest on the open
          ground in the mobile dunes through the summer. Keeping to the
          boardwalk and marked paths through this zone — especially
          April–July — makes a real difference to their breeding success.
        </div>

        <div className="mt-8">
          <SpeciesIdQuiz />
        </div>
      </div>
    </main>
  );
}

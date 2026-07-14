"use client";

import { useEffect, useState } from "react";
import { palette } from "@/lib/palette";

interface TideExtreme {
  time: string;
  type: "high" | "low";
  height: number | null;
}

interface TideData {
  updatedAt: string;
  sample?: boolean;
  extremes: TideExtreme[];
}

// Consider the feed stale if the daily workflow hasn't run for 2+ days.
const STALE_MS = 48 * 60 * 60 * 1000;

const timeFmt = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Europe/London",
  hour: "2-digit",
  minute: "2-digit",
});
const dayKeyFmt = new Intl.DateTimeFormat("en-CA", {
  timeZone: "Europe/London",
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
});
const dayLabelFmt = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Europe/London",
  weekday: "short",
  day: "numeric",
  month: "short",
});

function TideChip({ extreme }: { extreme: TideExtreme }) {
  const isHigh = extreme.type === "high";
  return (
    <span
      className="inline-flex items-baseline gap-1.5 rounded-full px-2.5 py-1"
      style={{
        backgroundColor: isHigh ? palette.seaDark : palette.sandDark,
        color: palette.offWhite,
      }}
    >
      <span className="font-heading text-[0.6rem] uppercase tracking-widest opacity-85">
        {isHigh ? "High" : "Low"}
      </span>
      <span className="text-sm font-semibold tabular-nums">
        {timeFmt.format(new Date(extreme.time))}
      </span>
      {extreme.height != null && (
        <span className="text-[0.65rem] opacity-75">{extreme.height.toFixed(1)} m</span>
      )}
    </span>
  );
}

function Unavailable() {
  return (
    <div
      className="border-2 p-4 text-sm leading-relaxed"
      style={{
        borderColor: palette.ink,
        borderLeft: `6px solid ${palette.sandDark}`,
        backgroundColor: "#00000008",
        color: palette.ink,
      }}
    >
      <strong>Tide data temporarily unavailable.</strong> Check back soon — and if
      you&apos;re heading out along the shore, please check tide times from another
      source before you go.
    </div>
  );
}

export default function TideTimes() {
  const [data, setData] = useState<TideData | null>(null);
  const [status, setStatus] = useState<"loading" | "ready" | "unavailable">("loading");

  useEffect(() => {
    let cancelled = false;
    fetch("/data/tides.json", { cache: "no-store" })
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json() as Promise<TideData>;
      })
      .then((json) => {
        if (cancelled) return;
        const fresh =
          json.sample === true ||
          Date.now() - new Date(json.updatedAt).getTime() < STALE_MS;
        if (!fresh || !Array.isArray(json.extremes) || json.extremes.length === 0) {
          setStatus("unavailable");
        } else {
          setData(json);
          setStatus("ready");
        }
      })
      .catch(() => {
        if (!cancelled) setStatus("unavailable");
      });
    return () => {
      cancelled = true;
    };
  }, []);

  if (status === "loading") {
    return (
      <p
        className="font-heading text-sm uppercase tracking-widest"
        style={{ color: palette.seaDark, opacity: 0.7 }}
      >
        Loading tide times…
      </p>
    );
  }

  if (status === "unavailable" || !data) {
    return <Unavailable />;
  }

  // Group extremes by their calendar day in UK time.
  const byDay = new Map<string, TideExtreme[]>();
  for (const extreme of data.extremes) {
    const key = dayKeyFmt.format(new Date(extreme.time));
    const list = byDay.get(key) ?? [];
    list.push(extreme);
    byDay.set(key, list);
  }
  const todayKey = dayKeyFmt.format(new Date());
  const today = byDay.get(todayKey) ?? [];
  const upcoming = [...byDay.entries()]
    .filter(([key]) => key > todayKey)
    .sort(([a], [b]) => (a < b ? -1 : 1));

  return (
    <div>
      {data.sample && (
        <p
          className="mb-3 border-l-4 pl-3 text-xs leading-relaxed"
          style={{ borderColor: palette.sandDark, color: palette.ink, opacity: 0.75 }}
        >
          Showing sample data — connect the Stormglass workflow (see
          .github/workflows/update-tides.yml) for live tide times.
        </p>
      )}

      {/* Today */}
      {today.length > 0 && (
        <div
          className="border-2 p-4"
          style={{
            borderColor: palette.ink,
            borderTop: `6px solid ${palette.seaDark}`,
            backgroundColor: "#00000005",
          }}
        >
          <p
            className="font-heading text-[0.65rem] uppercase tracking-[0.3em]"
            style={{ color: palette.seaDark }}
          >
            Today · {dayLabelFmt.format(new Date())}
          </p>
          <div className="mt-2.5 flex flex-wrap gap-2">
            {today.map((extreme) => (
              <TideChip key={extreme.time} extreme={extreme} />
            ))}
          </div>
        </div>
      )}

      {/* Next days */}
      <div className="mt-3 grid gap-2 sm:grid-cols-2">
        {upcoming.map(([key, extremes]) => (
          <div
            key={key}
            className="border px-3 py-2.5"
            style={{ borderColor: palette.sandDark, backgroundColor: "#00000004" }}
          >
            <p
              className="font-heading text-xs uppercase tracking-widest"
              style={{ color: palette.ink, opacity: 0.65 }}
            >
              {dayLabelFmt.format(new Date(`${key}T12:00:00Z`))}
            </p>
            <div className="mt-1.5 flex flex-wrap gap-1.5">
              {extremes.map((extreme) => (
                <TideChip key={extreme.time} extreme={extreme} />
              ))}
            </div>
          </div>
        ))}
      </div>

      <p className="mt-3 text-xs" style={{ color: palette.ink, opacity: 0.6 }}>
        All times UK local. Tide data via{" "}
        <a
          href="https://stormglass.io"
          target="_blank"
          rel="noopener noreferrer"
          className="underline underline-offset-2"
        >
          Stormglass.io
        </a>
        . For planning only — always check conditions before walking the shore.
      </p>
    </div>
  );
}

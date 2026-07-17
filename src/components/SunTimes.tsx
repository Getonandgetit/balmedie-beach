"use client";

import { useEffect, useState } from "react";
import * as SunCalc from "suncalc";
import { palette } from "@/lib/palette";

// Same spot as the tide data — the beach at Balmedie Country Park.
const LAT = 57.2394;
const LNG = -2.0192;

const timeFmt = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Europe/London",
  hour: "2-digit",
  minute: "2-digit",
});
const dayLabelFmt = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Europe/London",
  weekday: "short",
  day: "numeric",
  month: "short",
});

const NIGHT = "#16302e";
const TWILIGHT = palette.sea;
const GOLDEN = palette.sand;
const DAYLIGHT = "#f0e4c8";

type SunTimesResult = ReturnType<typeof SunCalc.getTimes>;

function valid(d: Date | null | undefined): d is Date {
  return d instanceof Date && !Number.isNaN(d.getTime());
}

function fmt(d: Date | null | undefined): string {
  return valid(d) ? timeFmt.format(d) : "—";
}

function dayLength(times: SunTimesResult): string {
  if (!valid(times.sunrise) || !valid(times.sunset)) return "—";
  const mins = Math.round((times.sunset.getTime() - times.sunrise.getTime()) / 60000);
  return `${Math.floor(mins / 60)} h ${String(mins % 60).padStart(2, "0")} m`;
}

interface Segment {
  from: number;
  to: number;
  color: string;
}

// Percent through the calendar day (0–100) for a given moment.
function dayPct(d: Date, dayStart: Date): number {
  return Math.min(100, Math.max(0, ((d.getTime() - dayStart.getTime()) / 86_400_000) * 100));
}

export default function SunTimes() {
  const [now, setNow] = useState<Date | null>(null);

  // Set after mount (and tick each minute) so server and client HTML match.
  useEffect(() => {
    const tick = () => setNow(new Date());
    const initial = setTimeout(tick, 0);
    const timer = setInterval(tick, 60_000);
    return () => {
      clearTimeout(initial);
      clearInterval(timer);
    };
  }, []);

  if (!now) {
    return (
      <p
        className="font-heading text-sm uppercase tracking-widest"
        style={{ color: palette.seaDark, opacity: 0.7 }}
      >
        Reading the sky…
      </p>
    );
  }

  const times = SunCalc.getTimes(now, LAT, LNG);
  const dayStart = new Date(now);
  dayStart.setHours(0, 0, 0, 0);

  // Build the light-bar segments for today. Later segments paint over
  // earlier ones, so start with night across the whole day.
  const segments: Segment[] = [{ from: 0, to: 100, color: NIGHT }];
  if (valid(times.dawn) && valid(times.dusk)) {
    segments.push({ from: dayPct(times.dawn, dayStart), to: dayPct(times.dusk, dayStart), color: TWILIGHT });
  }
  if (valid(times.sunrise) && valid(times.sunset)) {
    segments.push({ from: dayPct(times.sunrise, dayStart), to: dayPct(times.sunset, dayStart), color: GOLDEN });
  }
  if (valid(times.goldenHourEnd) && valid(times.goldenHour)) {
    segments.push({
      from: dayPct(times.goldenHourEnd, dayStart),
      to: dayPct(times.goldenHour, dayStart),
      color: DAYLIGHT,
    });
  }
  const nowPct = dayPct(now, dayStart);

  const todayTiles: { label: string; value: string }[] = [
    { label: "Dawn", value: fmt(times.dawn) },
    { label: "Sunrise", value: fmt(times.sunrise) },
    { label: "Solar noon", value: fmt(times.solarNoon) },
    { label: "Sunset", value: fmt(times.sunset) },
    { label: "Dusk", value: fmt(times.dusk) },
    { label: "Day length", value: dayLength(times) },
  ];

  const week = Array.from({ length: 6 }, (_, i) => {
    const d = new Date(dayStart.getTime() + (i + 1) * 86_400_000 + 12 * 3_600_000);
    return { date: d, times: SunCalc.getTimes(d, LAT, LNG) };
  });

  const legend = [
    { label: "Night", color: NIGHT },
    { label: "Twilight", color: TWILIGHT },
    { label: "Golden hour", color: GOLDEN },
    { label: "Daylight", color: DAYLIGHT },
  ];

  return (
    <div>
      <p className="text-sm leading-relaxed" style={{ color: palette.ink }}>
        Balmedie faces east, so the sun comes up straight out of the North Sea —
        the golden hour after dawn is the one the photographers chase. Times
        below are calculated for the beach itself, in UK local time.
      </p>

      {/* Today's light bar */}
      <div
        className="mt-5 border-2 p-4"
        style={{
          borderColor: palette.ink,
          borderTop: `6px solid ${palette.sandDark}`,
          backgroundColor: "#00000005",
        }}
      >
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <p
            className="font-heading text-[0.65rem] uppercase tracking-[0.3em]"
            style={{ color: palette.sandDark }}
          >
            Today&apos;s light · {dayLabelFmt.format(now)}
          </p>
          <p className="font-heading text-xs uppercase tracking-widest" style={{ color: palette.ink, opacity: 0.6 }}>
            Now · {timeFmt.format(now)}
          </p>
        </div>

        <div className="relative mt-3 h-7 overflow-hidden border-2" style={{ borderColor: palette.ink }}>
          {segments.map((seg, i) => (
            <div
              key={i}
              className="absolute inset-y-0"
              style={{ left: `${seg.from}%`, width: `${seg.to - seg.from}%`, backgroundColor: seg.color }}
            />
          ))}
          {/* Now marker */}
          <div
            className="absolute inset-y-0 w-[3px]"
            style={{ left: `${nowPct}%`, backgroundColor: palette.rust }}
            aria-hidden="true"
          />
        </div>
        <div
          className="mt-1 flex justify-between font-heading text-[0.6rem] uppercase tracking-wider"
          style={{ color: palette.ink, opacity: 0.5 }}
        >
          <span>00:00</span>
          <span>06:00</span>
          <span>12:00</span>
          <span>18:00</span>
          <span>24:00</span>
        </div>

        <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1.5">
          {legend.map((l) => (
            <span key={l.label} className="flex items-center gap-1.5 text-xs" style={{ color: palette.ink }}>
              <span
                className="inline-block h-3 w-3 border"
                style={{ backgroundColor: l.color, borderColor: palette.ink }}
              />
              {l.label}
            </span>
          ))}
        </div>

        {/* Key times */}
        <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-6">
          {todayTiles.map((tile) => (
            <div key={tile.label} className="border px-2 py-2 text-center" style={{ borderColor: palette.sandDark }}>
              <p
                className="font-heading text-[0.6rem] uppercase tracking-widest"
                style={{ color: palette.ink, opacity: 0.6 }}
              >
                {tile.label}
              </p>
              <p className="mt-0.5 text-sm font-semibold tabular-nums" style={{ color: palette.seaDark }}>
                {tile.value}
              </p>
            </div>
          ))}
        </div>

        {valid(times.goldenHourEnd) && valid(times.goldenHour) && (
          <p className="mt-3 text-sm" style={{ color: palette.ink }}>
            <span
              className="mr-2 rounded-full px-2.5 py-0.5 font-heading text-[0.65rem] uppercase tracking-widest"
              style={{ backgroundColor: palette.sand, color: palette.ink }}
            >
              Golden hours
            </span>
            {fmt(times.sunrise)}–{fmt(times.goldenHourEnd)} and {fmt(times.goldenHour)}–{fmt(times.sunset)}
          </p>
        )}
      </div>

      {/* Week ahead */}
      <div className="mt-3 grid gap-2 sm:grid-cols-2">
        {week.map(({ date, times: t }) => (
          <div
            key={date.toISOString()}
            className="flex flex-wrap items-center justify-between gap-2 border px-3 py-2.5"
            style={{ borderColor: palette.sandDark, backgroundColor: "#00000004" }}
          >
            <p className="font-heading text-xs uppercase tracking-widest" style={{ color: palette.ink, opacity: 0.65 }}>
              {dayLabelFmt.format(date)}
            </p>
            <p className="text-sm tabular-nums" style={{ color: palette.ink }}>
              <span style={{ color: palette.sandDark }}>↑</span> {fmt(t.sunrise)}
              <span className="mx-2 opacity-40">·</span>
              <span style={{ color: palette.seaDark }}>↓</span> {fmt(t.sunset)}
              <span className="ml-2 text-xs opacity-60">({dayLength(t)})</span>
            </p>
          </div>
        ))}
      </div>

      <p className="mt-3 text-xs" style={{ color: palette.ink, opacity: 0.6 }}>
        Sun times computed locally for {LAT}°N, {Math.abs(LNG)}°W — no data
        connection needed. Golden hour shown is the classic photographer&apos;s
        window either side of sunrise and sunset.
      </p>
    </div>
  );
}

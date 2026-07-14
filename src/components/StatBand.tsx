"use client";

import { useEffect, useRef, useState } from "react";
import { palette } from "@/lib/palette";

const stats = [
  { value: 23, suffix: " km", label: "of unbroken dune coastline", color: palette.sea },
  { value: 225, suffix: "+", label: "bird species recorded", color: palette.marramDark },
  { value: 5000, suffix: "", label: "years in the making", color: palette.sandDark },
  { value: 4, suffix: "", label: "WW2 pillboxes still standing", color: palette.rust },
];

const DURATION_MS = 1400;

export default function StatBand() {
  const ref = useRef<HTMLDivElement>(null);
  const [started, setStarted] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const check = () => {
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      if (r.top < window.innerHeight * 0.9 && r.bottom > 0) {
        setStarted(true);
        window.removeEventListener("scroll", check);
        window.removeEventListener("resize", check);
      }
    };
    check();
    window.addEventListener("scroll", check, { passive: true });
    window.addEventListener("resize", check);
    return () => {
      window.removeEventListener("scroll", check);
      window.removeEventListener("resize", check);
    };
  }, []);

  useEffect(() => {
    if (!started) return;
    const t0 = performance.now();
    const timer = setInterval(() => {
      const t = Math.min((performance.now() - t0) / DURATION_MS, 1);
      // ease-out cubic
      setProgress(1 - Math.pow(1 - t, 3));
      if (t >= 1) clearInterval(timer);
    }, 33);
    return () => clearInterval(timer);
  }, [started]);

  return (
    <div ref={ref} className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
      {stats.map((s) => (
        <div
          key={s.label}
          className="border-2 px-3 py-4 text-center"
          style={{ borderColor: palette.ink, backgroundColor: "#00000005" }}
        >
          <p className="font-poster text-3xl sm:text-4xl" style={{ color: s.color }}>
            {Math.round(s.value * progress).toLocaleString("en-GB")}
            {s.suffix}
          </p>
          <p
            className="mt-1 font-heading text-[0.65rem] uppercase tracking-widest sm:text-xs"
            style={{ color: palette.ink, opacity: 0.75 }}
          >
            {s.label}
          </p>
        </div>
      ))}
    </div>
  );
}

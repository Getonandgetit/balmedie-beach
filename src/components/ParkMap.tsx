"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { pins, routes, layers, type LayerId, type Pin, type MapRoute } from "@/data/pins";
import { palette } from "@/lib/palette";
import IconSprite from "@/components/IconSprite";

function PinMarker({
  pin,
  color,
  selected,
  index,
  onSelect,
}: {
  pin: Pin;
  color: string;
  selected: boolean;
  index: number;
  onSelect: () => void;
}) {
  return (
    <button
      onClick={onSelect}
      className="img-pin absolute"
      style={{
        left: `${pin.x}%`,
        top: `${pin.y}%`,
        animationDelay: `${index * 45}ms`,
        zIndex: selected ? 20 : 10,
      }}
      aria-label={pin.title}
      title={pin.title}
    >
      {selected && (
        <span
          className="img-pulse-ring absolute left-1/2 top-4 h-7 w-7 rounded-full border-[3px]"
          style={{ borderColor: color }}
          aria-hidden="true"
        />
      )}
      <svg
        width="28"
        height="37"
        viewBox="-14 -35 28 37"
        className="img-pin-glyph block"
        aria-hidden="true"
      >
        <path
          d="M 0 0 C -2.8 -7.4 -12 -11 -12 -19.5 A 12 12 0 1 1 12 -19.5 C 12 -11 2.8 -7.4 0 0 Z"
          fill={color}
          stroke={palette.offWhite}
          strokeWidth="2"
        />
        <circle cx="0" cy="-19" r="4.2" fill={palette.offWhite} />
      </svg>
    </button>
  );
}

function PinInfoCard({ pin, onClose }: { pin: Pin; onClose: () => void }) {
  return (
    <div
      className="card-in pointer-events-auto relative border-2 p-4 shadow-xl"
      style={{ backgroundColor: palette.offWhite, borderColor: palette.ink }}
    >
      <div
        className="absolute inset-x-0 top-0 h-1.5"
        style={{
          backgroundColor: layers.find((l) => l.id === pin.layer)?.color ?? palette.ink,
        }}
      />
      <button
        onClick={onClose}
        className="absolute right-2 top-2 text-sm"
        style={{ color: palette.ink }}
        aria-label="Close"
      >
        ✕
      </button>
      <h3
        className="pr-6 font-heading text-base uppercase tracking-wide"
        style={{ color: palette.ink }}
      >
        {pin.title}
      </h3>
      <p className="mt-1 text-sm" style={{ color: palette.ink }}>
        {pin.blurb}
      </p>
      <Link
        href={pin.href}
        className="mt-3 inline-block font-heading text-sm uppercase tracking-wider underline underline-offset-4"
        style={{ color: palette.rust }}
      >
        Read more →
      </Link>
    </div>
  );
}

// Readable text colour for a chip of the given background colour.
function textOn(hex: string): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return 0.299 * r + 0.587 * g + 0.114 * b > 150 ? palette.ink : palette.offWhite;
}

function RouteSwatch({ route }: { route: MapRoute }) {
  return (
    <svg width="46" height="8" viewBox="0 0 46 8" aria-hidden="true" className="flex-none">
      <line
        x1="2"
        y1="4"
        x2="44"
        y2="4"
        stroke={route.color}
        strokeWidth="5"
        strokeLinecap="round"
        strokeDasharray={route.dashed ? "7 6" : undefined}
      />
    </svg>
  );
}

export default function ParkMap() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeLayers, setActiveLayers] = useState<Set<LayerId>>(
    new Set(layers.map((l) => l.id))
  );
  const [selectedPin, setSelectedPin] = useState<Pin | null>(null);
  const [selectedRoute, setSelectedRoute] = useState<MapRoute | null>(null);

  // Deep links: /?route=<slug> opens a route card, /?pin=<id> opens a landmark.
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const routeParam = params.get("route");
    const pinParam = params.get("pin");
    const route = routes.find((r) => r.slug === routeParam);
    const pin = pins.find((p) => p.id === pinParam);
    if (!route && !pin) return;
    // Defer past hydration and Next's post-navigation scroll restoration;
    // scroll instantly so it works even when animation frames are throttled.
    const timer = setTimeout(() => {
      if (route) setSelectedRoute(route);
      if (pin) setSelectedPin(pin);
      sectionRef.current
        ?.closest("section")
        ?.scrollIntoView({ behavior: "auto", block: "start" });
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  function toggleLayer(id: LayerId) {
    setActiveLayers((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
    setSelectedPin((current) => (current && current.layer === id ? null : current));
  }

  const visiblePins = pins.filter((p) => activeLayers.has(p.layer));

  return (
    <div className="w-full" ref={sectionRef}>
      {/* Layer toggles */}
      <div className="mb-3 flex flex-wrap gap-2">
        {layers.map((layer) => {
          const active = activeLayers.has(layer.id);
          return (
            <button
              key={layer.id}
              onClick={() => toggleLayer(layer.id)}
              className="flex items-center gap-2 rounded-full border-2 px-3 py-1.5 font-heading text-xs uppercase tracking-wider transition-all sm:text-sm"
              style={{
                borderColor: layer.color,
                backgroundColor: active ? layer.color : "transparent",
                color: active ? palette.offWhite : layer.color,
                boxShadow: active ? "0 4px 12px -4px rgba(43,38,32,.4)" : "none",
                opacity: active ? 1 : 0.75,
              }}
              aria-pressed={active}
            >
              <span
                className="flex items-center justify-center rounded-full p-0.5"
                style={{ backgroundColor: palette.offWhite }}
              >
                <IconSprite name={layer.icon} size={16} />
              </span>
              {layer.label}
            </button>
          );
        })}
      </div>

      {/* Route quick-picks */}
      <div className="mb-4 flex flex-wrap items-center gap-2">
        <span
          className="font-heading text-xs uppercase tracking-widest"
          style={{ color: palette.ink, opacity: 0.6 }}
        >
          Pick a route:
        </span>
        {routes.map((route) => {
          const selected = selectedRoute?.slug === route.slug;
          return (
            <button
              key={route.slug}
              onClick={() => setSelectedRoute(selected ? null : route)}
              className="flex items-center gap-1.5 rounded-full border px-2.5 py-1 font-heading text-xs uppercase tracking-wider transition-colors"
              style={{
                borderColor: route.color,
                backgroundColor: selected ? route.color : "transparent",
                color: selected ? textOn(route.color) : route.color,
              }}
              aria-pressed={selected}
            >
              {route.name.replace(" — Access to All", "")}
            </button>
          );
        })}
      </div>

      <div className="poster-frame relative overflow-hidden">
        <div className="relative">
          <Image
            src="/images/beach-map-v2.png"
            alt="Illustrated visitor map of Balmedie Country Park showing the five waymarked routes, facilities, and numbered landmarks"
            width={1257}
            height={887}
            className="block h-auto w-full"
            sizes="(max-width: 1152px) 100vw, 1088px"
          />

          {/* Pin overlay */}
          {visiblePins.map((pin, i) => {
            const color = layers.find((l) => l.id === pin.layer)?.color ?? palette.ink;
            return (
              <PinMarker
                key={pin.id}
                pin={pin}
                color={color}
                index={i}
                selected={selectedPin?.id === pin.id}
                onSelect={() => setSelectedPin(pin)}
              />
            );
          })}
        </div>

        {/* Pin info card — anchored beside the pin (larger screens only) */}
        {selectedPin && (
          <div
            className="pointer-events-none absolute z-30 hidden w-64 sm:block"
            style={{
              // Flip to whichever side of the pin has more room, so the card
              // never hangs off the map or covers the printed legend.
              ...(selectedPin.x > 55
                ? { right: `calc(${100 - selectedPin.x}% + 24px)` }
                : { left: `calc(${selectedPin.x}% + 24px)` }),
              top: `${selectedPin.y}%`,
              transform:
                selectedPin.y < 22
                  ? "translateY(-10%)"
                  : selectedPin.y > 62
                    ? "translateY(-90%)"
                    : "translateY(-50%)",
            }}
          >
            <PinInfoCard pin={selectedPin} onClose={() => setSelectedPin(null)} />
          </div>
        )}

        {/* Route info card */}
        {selectedRoute && !selectedPin && (
          <div
            className="card-in absolute right-4 top-4 z-30 max-w-sm border-2 p-4 shadow-xl max-sm:left-4"
            style={{ backgroundColor: palette.offWhite, borderColor: palette.ink }}
          >
            <div
              className="absolute inset-x-0 top-0 h-1.5"
              style={{ backgroundColor: selectedRoute.color }}
            />
            <button
              onClick={() => setSelectedRoute(null)}
              className="absolute right-2 top-2 text-sm"
              style={{ color: palette.ink }}
              aria-label="Close"
            >
              ✕
            </button>
            <div className="flex items-center gap-2 pr-6">
              <RouteSwatch route={selectedRoute} />
              <h3
                className="font-heading text-base uppercase tracking-wide"
                style={{ color: palette.ink }}
              >
                {selectedRoute.name}
              </h3>
            </div>
            <p
              className="mt-1 font-heading text-xs uppercase tracking-wider"
              style={{ color: palette.ink, opacity: 0.65 }}
            >
              {selectedRoute.difficulty} · {selectedRoute.distance} · {selectedRoute.duration}
            </p>
            <p className="mt-2 text-sm leading-relaxed" style={{ color: palette.ink }}>
              {selectedRoute.blurb}
            </p>
            <Link
              href="/walking-routes"
              className="mt-3 inline-block font-heading text-sm uppercase tracking-wider underline underline-offset-4"
              style={{ color: palette.rust }}
            >
              Route details →
            </Link>
          </div>
        )}
      </div>

      {/* On small screens the map is too tight to anchor a card beside the
          pin, so show it below the map instead — covering nothing. */}
      {selectedPin && (
        <div className="mt-3 sm:hidden">
          <PinInfoCard pin={selectedPin} onClose={() => setSelectedPin(null)} />
        </div>
      )}
    </div>
  );
}

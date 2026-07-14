"use client";

import { useState } from "react";
import { palette } from "@/lib/palette";
import { awardStamp, type StampId } from "@/lib/passport";
import StampEarned from "@/components/StampEarned";

export interface SequenceItem {
  id: string;
  label: string;
}

// items should be passed already shuffled; correctOrder lists ids in the right sequence.
export default function SequencingQuiz({
  title,
  accent,
  items,
  correctOrder,
  stampId,
}: {
  title: string;
  accent: string;
  items: SequenceItem[];
  correctOrder: string[];
  stampId?: StampId;
}) {
  const [picked, setPicked] = useState<string[]>([]);
  const [checked, setChecked] = useState(false);

  const remaining = items.filter((item) => !picked.includes(item.id));
  const isCorrect = checked && picked.every((id, i) => id === correctOrder[i]);

  function pick(id: string) {
    if (checked) return;
    setPicked((p) => [...p, id]);
  }

  function reset() {
    setPicked([]);
    setChecked(false);
  }

  return (
    <div
      className="border-2 p-4 sm:p-5"
      style={{
        borderColor: palette.ink,
        borderTop: `6px solid ${accent}`,
        backgroundColor: "#00000005",
      }}
    >
      <p className="font-heading text-[0.65rem] uppercase tracking-[0.3em]" style={{ color: accent }}>
        Test yourself
      </p>
      <h3 className="mt-0.5 font-heading text-lg uppercase tracking-wide" style={{ color: palette.ink }}>
        {title}
      </h3>
      <p className="mt-1 text-xs" style={{ color: palette.ink, opacity: 0.7 }}>
        Click the stages in order, from the sea inland.
      </p>

      <ol className="mt-3 space-y-2">
        {picked.map((id, i) => {
          const item = items.find((it) => it.id === id)!;
          const wrong = checked && correctOrder[i] !== id;
          return (
            <li
              key={id}
              className="card-in flex items-center gap-2.5 border-2 px-3 py-2 text-sm"
              style={{
                borderColor: checked ? (wrong ? palette.rust : palette.marramDark) : palette.sandDark,
                backgroundColor: checked ? (wrong ? "#b23a2f22" : "#5b7f4f22") : "transparent",
                color: palette.ink,
              }}
            >
              <span
                className="flex h-6 w-6 flex-none items-center justify-center rounded-full font-poster text-xs"
                style={{ backgroundColor: accent, color: palette.offWhite }}
              >
                {i + 1}
              </span>
              {item.label}
              {checked && (
                <span className="ml-auto text-xs" aria-hidden="true">
                  {wrong ? "✗" : "✓"}
                </span>
              )}
            </li>
          );
        })}
      </ol>

      {remaining.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-2">
          {remaining.map((item) => (
            <button
              key={item.id}
              onClick={() => pick(item.id)}
              className="rounded-full border-2 px-3 py-1.5 text-sm transition-transform hover:-translate-y-0.5"
              style={{ borderColor: palette.sandDark, color: palette.ink }}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}

      {remaining.length === 0 && !checked && (
        <button
          onClick={() => {
            setChecked(true);
            if (stampId) {
              const correct = picked.filter((id, i) => id === correctOrder[i]).length;
              awardStamp(stampId, correct, correctOrder.length);
            }
          }}
          className="mt-3 rounded-full px-5 py-1.5 font-heading text-sm uppercase tracking-wider"
          style={{ backgroundColor: accent, color: palette.offWhite }}
        >
          Check order
        </button>
      )}

      {checked && (
        <div className="mt-3">
          <p
            className="font-heading text-sm uppercase tracking-wide"
            style={{ color: isCorrect ? palette.marramDark : palette.rust }}
          >
            {isCorrect ? "Correct — that's the right order!" : "Not quite the right order."}
          </p>
          {stampId && <StampEarned />}
          <button
            onClick={reset}
            className="mt-2 rounded-full px-5 py-1.5 font-heading text-sm uppercase tracking-wider"
            style={{ backgroundColor: accent, color: palette.offWhite }}
          >
            Try again
          </button>
        </div>
      )}
    </div>
  );
}

"use client";

import { useState } from "react";
import { palette } from "@/lib/palette";
import { awardStamp, type StampId } from "@/lib/passport";
import StampEarned from "@/components/StampEarned";

export interface TriviaQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  explanation?: string;
}

function scoreLine(score: number, total: number): string {
  if (score === total) return "Full marks — you know this coast!";
  if (score >= total * 0.6) return "Not bad at all — a solid walk's worth of knowledge.";
  return "Room to explore — take the walk and try again.";
}

export default function TriviaQuiz({
  title,
  accent,
  questions,
  stampId,
}: {
  title: string;
  accent: string;
  questions: TriviaQuestion[];
  stampId?: StampId;
}) {
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const current = questions[index];

  function choose(optionIndex: number) {
    if (selected !== null) return;
    setSelected(optionIndex);
    if (optionIndex === current.correctIndex) {
      setScore((s) => s + 1);
    }
  }

  function next() {
    if (index + 1 < questions.length) {
      setIndex((i) => i + 1);
      setSelected(null);
    } else {
      setFinished(true);
      if (stampId) awardStamp(stampId, score, questions.length);
    }
  }

  function restart() {
    setIndex(0);
    setSelected(null);
    setScore(0);
    setFinished(false);
  }

  const progress = ((index + (selected !== null ? 1 : 0)) / questions.length) * 100;

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

      {finished ? (
        <div className="mt-4 text-center">
          <p className="font-poster text-4xl" style={{ color: accent }}>
            {score} / {questions.length}
          </p>
          <p className="mt-2 text-sm" style={{ color: palette.ink }}>
            {scoreLine(score, questions.length)}
          </p>
          {stampId && <StampEarned />}
          <button
            onClick={restart}
            className="mt-4 rounded-full px-5 py-1.5 font-heading text-sm uppercase tracking-wider"
            style={{ backgroundColor: accent, color: palette.offWhite }}
          >
            Try again
          </button>
        </div>
      ) : (
        <div className="mt-3">
          <div className="flex items-center gap-3">
            <p
              className="font-heading text-xs uppercase tracking-widest"
              style={{ color: palette.ink, opacity: 0.6 }}
            >
              {index + 1} of {questions.length}
            </p>
            <div className="h-1 flex-1 overflow-hidden rounded-full" style={{ backgroundColor: "#00000015" }}>
              <div
                className="h-full transition-all duration-300"
                style={{ width: `${progress}%`, backgroundColor: accent }}
              />
            </div>
          </div>
          <p className="mt-2 text-sm font-medium" style={{ color: palette.ink }}>
            {current.question}
          </p>
          <div className="mt-3 flex flex-col gap-2">
            {current.options.map((option, i) => {
              const isCorrect = i === current.correctIndex;
              const isChosen = i === selected;
              let bg: string = "transparent";
              let border: string = palette.sandDark;
              if (selected !== null) {
                if (isCorrect) {
                  bg = palette.marram;
                  border = palette.marramDark;
                } else if (isChosen) {
                  bg = palette.rust;
                  border = palette.rust;
                }
              }
              return (
                <button
                  key={option}
                  onClick={() => choose(i)}
                  disabled={selected !== null}
                  className="border-2 px-3 py-2 text-left text-sm transition-colors enabled:hover:translate-x-0.5"
                  style={{
                    borderColor: border,
                    backgroundColor: bg,
                    color: selected !== null && (isCorrect || isChosen) ? palette.offWhite : palette.ink,
                  }}
                >
                  {option}
                </button>
              );
            })}
          </div>

          {selected !== null && (
            <div className="mt-3">
              {current.explanation && (
                <p
                  className="border-l-4 pl-3 text-xs leading-relaxed"
                  style={{ borderColor: accent, color: palette.ink, opacity: 0.85 }}
                >
                  {current.explanation}
                </p>
              )}
              <button
                onClick={next}
                className="mt-3 rounded-full px-5 py-1.5 font-heading text-sm uppercase tracking-wider"
                style={{ backgroundColor: accent, color: palette.offWhite }}
              >
                {index + 1 < questions.length ? "Next question" : "See score"}
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

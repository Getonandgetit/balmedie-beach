// Ranger Passport — browser-local record of which topic quizzes the visitor
// has completed. Stored in localStorage; no accounts, no server.

export type StampId = "routes" | "ww2" | "wildlife" | "geography" | "human";

export interface Stamp {
  earnedAt: string;
  score?: number;
  total?: number;
}

export type Stamps = Partial<Record<StampId, Stamp>>;

export const STAMP_TOPICS: {
  id: StampId;
  label: string;
  href: string;
  color: string;
}[] = [
  { id: "routes", label: "Walking Routes", href: "/walking-routes", color: "#3f5c37" },
  { id: "ww2", label: "WW2 History", href: "/ww2-history", color: "#b23a2f" },
  { id: "wildlife", label: "Wildlife", href: "/wildlife", color: "#1f4f4f" },
  { id: "geography", label: "Physical Geography", href: "/physical-geography", color: "#c98a3a" },
  { id: "human", label: "Human Geography", href: "/human-geography", color: "#2b2620" },
];

export function rankFor(count: number): string {
  if (count >= 5) return "Balmedie Beach Ranger";
  if (count >= 3) return "Dune Wanderer";
  if (count >= 1) return "Day Tripper";
  return "New Recruit";
}

const KEY = "balmedie-ranger-passport-v1";

export function getStamps(): Stamps {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as Stamps) : {};
  } catch {
    return {};
  }
}

export function awardStamp(id: StampId, score?: number, total?: number): void {
  if (typeof window === "undefined") return;
  try {
    const stamps = getStamps();
    const existing = stamps[id];
    // Keep the best score; the first earnedAt date is the one that counts.
    const best =
      existing?.score != null && score != null && existing.score >= score
        ? existing.score
        : score;
    stamps[id] = {
      earnedAt: existing?.earnedAt ?? new Date().toISOString(),
      score: best,
      total: total ?? existing?.total,
    };
    window.localStorage.setItem(KEY, JSON.stringify(stamps));
    window.dispatchEvent(new CustomEvent("passport:updated"));
  } catch {
    // localStorage unavailable (private mode etc.) — quizzes still work.
  }
}

export function clearPassport(): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.removeItem(KEY);
    window.dispatchEvent(new CustomEvent("passport:updated"));
  } catch {
    // ignore
  }
}

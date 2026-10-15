import { account, recs, type Rec, type RecId, type RecStatus } from "./data";

export interface Scored {
  rec: Rec;
  eligible: boolean;
  suppressed: boolean;
  score: number;
}

// Deterministic: score = priority weight x evidence strength (0..1). No model calls.
export function rank(statuses: Record<RecId, RecStatus>): Scored[] {
  return recs
    .map((rec) => {
      const signals = rec.signals(account);
      const eligible = signals.every((s) => s.met);
      const evidence = Math.min(1, Number(account[rec.evidenceKey]) / rec.evidenceCap);
      const status = statuses[rec.id];
      const suppressed = status !== "new";
      return { rec, eligible, suppressed, score: Math.round(rec.weight * evidence * 100) / 100 };
    })
    .sort((a, b) => b.score - a.score);
}

// Show at most ONE recommendation at a time.
export function pickNext(statuses: Record<RecId, RecStatus>): Scored | null {
  return rank(statuses).find((s) => s.eligible && !s.suppressed) ?? null;
}

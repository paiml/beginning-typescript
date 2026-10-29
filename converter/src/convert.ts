// Converts a value from one unit to another, rounded to two decimals.
import type { Unit } from "./units.js";

const rules: Record<string, (value: number) => number> = {
  "km->mi": (km) => km * 0.621371,
  "mi->km": (mi) => mi / 0.621371,
  "C->F": (c) => (c * 9) / 5 + 32,
  "F->C": (f) => ((f - 32) * 5) / 9,
  "kg->lb": (kg) => kg * 2.20462,
  "lb->kg": (lb) => lb / 2.20462,
};

export function convert(value: number, from: Unit, to: Unit): number {
  const rule = rules[`${from}->${to}`];
  if (rule === undefined) {
    throw new Error(`no rule to convert ${from} to ${to}`);
  }
  return Math.round(rule(value) * 100) / 100;
}

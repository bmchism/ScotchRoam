import type { Bottle } from "../types";

// Content-based "you might also like": score every other bottle by how much it
// shares with the seed (same distillery, bourbon style, mash bill, flavor notes), with a light
// nudge from popularity. Pure + deterministic; runs against the in-memory store.
export function similarBottles(
  seed: Bottle,
  all: Bottle[],
  pop?: Map<string, number>,
  n = 4
): Bottle[] {
  const seedFlavors = new Set((seed.flavors ?? []).map((f) => f.toLowerCase()));
  const seedMashBill = (seed?.mashBill ?? "").toLowerCase();
  const scored = all
    .filter((b) => b.id !== seed.id)
    .map((b) => {
      let s = 0;
      if (b.distilleryId === seed.distilleryId) s += 3; // same distillery
      if ((b.style ?? b.expression) === (seed.style ?? seed.expression)) s += 2; // same bourbon style
      if (b.region === seed.region) s += 1.5; // same region
      // shared mash bill
      if (seedMashBill && b.mashBill && b.mashBill.toLowerCase() === seedMashBill) s += 1;
      // shared flavors
      for (const f of b.flavors ?? []) if (seedFlavors.has(f.toLowerCase())) s += 0.5;
      // small popularity tiebreaker (favorite count, capped)
      if (pop) s += Math.min(1, (pop.get(b.id) ?? 0) * 0.1);
      return { b, s };
    })
    .filter((x) => x.s > 0)
    .sort((a, b) => b.s - a.s || a.b.name.localeCompare(b.b.name));
  return scored.slice(0, n).map((x) => x.b);
}

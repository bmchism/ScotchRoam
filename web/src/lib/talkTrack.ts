import type { Bottle } from "../types";

// Generates a host talk-track + a step-by-step sensory ritual from a bottle, so
// the host has something fun to say and the room has a guided ritual to follow.

export function hostScript(b: Bottle, pour: number, total: number): string[] {
  const lines: string[] = [];
  const typeLabel = (b.style ?? b.expression).toLowerCase();
  const ageStr = b.age ? ` (${b.age})` : "";
  lines.push(
    `Pour ${pour} of ${total} — this is ${b.name}${ageStr}, a ${typeLabel} bourbon from ${b.region}, at ${b.abv}% (${b.proof} proof).`
  );
  if (b.story) lines.push(b.story);
  if (b.mashBill) {
    lines.push(`Mash bill: ${b.mashBill}${b.aging ? `, ${b.aging.toLowerCase()}` : ""}.`);
  }
  const nose = b.aromas.slice(0, 3).join(", ");
  const palate = b.flavors.slice(0, 3).join(", ");
  if (nose) lines.push(`On the nose, hunt for ${nose}. On the palate, look for ${palate}.`);
  lines.push(`Pour about an ounce each, neat. Don't rush it — let's taste together.`);
  return lines;
}

export interface RitualStep {
  key: string;
  emoji: string;
  title: string;
  say: string;
  hunt?: string[];
}

export function ritualSteps(b: Bottle): RitualStep[] {
  return [
    { key: "look", emoji: "👁️", title: "Appearance", say: "Hold the glass to the light. Note the color — pale gold to deep mahogany hints at age and barrel interaction." },
    { key: "swirl", emoji: "🌀", title: "Legs", say: "Give it a gentle swirl and watch the legs slide down. Thicker, slower legs hint at body and proof." },
    { key: "smell", emoji: "👃", title: "Nose", say: "Hold the glass below your chin, mouth slightly open, then slowly raise it. Can you find these?", hunt: b.aromas.slice(0, 5) },
    { key: "sip", emoji: "👅", title: "Palate", say: "Take a small sip and let it coat your whole mouth — sweetness up front, spice on the sides, oak at the back.", hunt: b.flavors.slice(0, 5) },
    { key: "finish", emoji: "⏱️", title: "Finish", say: "Now wait. How long does the flavor linger — short and clean, or long and complex?" },
  ];
}

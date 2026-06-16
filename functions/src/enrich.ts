import type { Bottle, Expression } from "@agave/shared";
import { callTiered, extractJson, type Tier } from "./lib/anthropic.js";
import { putItem, getItem } from "./lib/ddb.js";
import { keys, cacheKeyFor } from "./lib/keys.js";

// bottle-enrich: turn a hint (brand/distillery, or a label photo) into a
// structured Bottle profile via tiered Claude, then persist + cache it.
// Invoked by the Step Functions pipeline (recognize) and the pre-warm batch.

export interface EnrichEvent {
  hint?: { brand: string; expression?: Expression; distillery?: string };
  imageBase64?: string;
  imageMediaType?: "image/jpeg" | "image/png" | "image/gif" | "image/webp";
  imageKey?: string;
}

const SYSTEM = `You are a Scotch whisky expert building structured catalog entries.
Given a Scotch distillery/expression hint, return ONLY a JSON object for the bottle.
Be accurate and conservative: if you are unsure of a field, omit it rather than guess.
JSON shape:
{
  "brand": string (brand name), "name": string (full bottle name),
  "distillery": string (producing distillery, e.g. "Buffalo Trace"),
  "expression": "Single Malt"|"Blended"|"Blended Malt"|"Single Grain"|"Cask Strength"|"Peated"|"Sherry Cask"|"Bourbon Cask",
  "abv": number, "region": string (e.g. "Kentucky"),
  "mashBill"?: string (e.g. "Wheated" or "75% corn, 13% rye, 12% malted barley"),
  "age"?: string (age statement, e.g. "10 Year" or "NAS"),
  "aging"?: string, "aromas": string[], "flavors": string[],
  "tastingNotes"?: string, "story"?: string,
  "confidence": number (0-1)
}`;

const ACCENTS: Record<string, string> = {
  Straight: "#8C4A2F",
  "Single Barrel": "#A66A33",
  "Small Batch": "#B5651D",
  "Bottled-in-Bond": "#7A3B1E",
  Wheated: "#C28A3D",
  "High Rye": "#9A5A2A",
  "Barrel Proof": "#6E2F1A",
  Rye: "#5E3A1E",
};

interface RawBottle extends Partial<Bottle> {
  confidence?: number;
}

export const handler = async (event: EnrichEvent): Promise<Bottle> => {
  const userText = buildUserText(event);

  // Confidence gate drives tier escalation: accept Haiku only if it returns
  // valid JSON with the required fields and confidence >= 0.7.
  const accept = (text: string) => {
    const j = extractJson<RawBottle>(text);
    return Boolean(j && j.brand && j.expression && (j.confidence ?? 0) >= 0.7);
  };

  // Photos are harder — start one tier up so we don't waste a Haiku pass.
  const ladder: Tier[] = event.imageBase64
    ? ["sonnet", "opus"]
    : ["haiku", "sonnet", "opus"];

  const { text, tier } = await callTiered(
    {
      system: SYSTEM,
      userText,
      imageBase64: event.imageBase64,
      imageMediaType: event.imageMediaType,
      maxTokens: 1200,
    },
    accept,
    ladder
  );

  const raw = extractJson<RawBottle>(text);
  if (!raw || !raw.brand || !raw.expression) {
    throw new Error(`enrich: could not parse a bottle (tier ${tier})`);
  }

  const distillery = raw.distillery ? raw.distillery.trim() : (raw.brand ?? "Unknown");
  const id = slug(`${raw.brand}-${raw.expression}-${raw.name ?? distillery}`);
  const now = new Date().toISOString();
  const bottle: Bottle = {
    id,
    brand: raw.brand,
    name: raw.name ?? `${raw.brand} ${raw.expression}`,
    distillery,
    expression: raw.expression,
    abv: raw.abv ?? 40,
    proof: Math.round((raw.abv ?? 40) * 2),
    region: raw.region ?? "Kentucky",
    mashBill: raw.mashBill,
    age: raw.age,
    waterSource: raw.waterSource,
    fermentation: raw.fermentation,
    stillType: raw.stillType,
    distillation: raw.distillation,
    charLevel: raw.charLevel,
    aging: raw.aging,
    aromas: raw.aromas ?? [],
    flavors: raw.flavors ?? [],
    tastingNotes: raw.tastingNotes,
    story: raw.story,
    accent: ACCENTS[raw.expression] ?? "#8C4A2F",
    verified: false, // generated — awaits admin review
    imageKeys: event.imageKey ? [event.imageKey] : undefined,
    createdAt: now,
    updatedAt: now,
  };

  // Persist the bottle and a permanent cache pointer so it never re-hits Claude.
  await putItem({
    ...keys.bottle(bottle.id),
    ...bottle,
    type: "Bottle",
    gsi1pk: "BOTTLE",
    gsi1sk: bottle.name,
    enrichTier: tier,
  });
  const ck = cacheKeyFor(bottle.distillery, bottle.brand);
  await putItem({ ...keys.cache(ck), bottleId: bottle.id, type: "CachePtr" });

  // When this enrich came from a label scan, drop a pointer keyed by the image
  // so the client can poll for the identified bottle (the pipeline is async).
  if (event.imageKey) {
    await putItem({ ...keys.scan(event.imageKey), bottleId: bottle.id, type: "ScanPtr" });
  }

  return bottle;
};

function buildUserText(e: EnrichEvent): string {
  if (e.hint) {
    const { brand, expression, distillery } = e.hint;
    return `Build the catalog entry for: ${brand}${expression ? " " + expression : ""}${
      distillery ? ` (distillery ${distillery})` : ""
    }. Return only JSON.`;
  }
  return "Identify the bourbon in this label photo and return only the JSON catalog entry.";
}

// Check the cache before enriching (used by recognize/prewarm to skip work).
// Keyed by distillery + brand so the same bottle never re-hits Claude.
export async function cachedBottle(distillery: string, brand: string): Promise<Bottle | null> {
  const ptr = await getItem<{ bottleId: string }>(keys.cache(cacheKeyFor(distillery, brand)));
  if (!ptr?.bottleId) return null;
  const b = await getItem<Bottle>(keys.bottle(ptr.bottleId));
  return b ?? null;
}

function slug(s: string): string {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "") // strip combining diacritics
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

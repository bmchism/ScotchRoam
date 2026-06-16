import type { SourceLink } from "@agave/shared";

// integrations: attach attributed deep-links to public bourbon references.
// CLEAN posture (BUILD_PLAN): official APIs where they exist, otherwise a
// linked, attributed search URL — never bulk-scraped content. Cached on the
// bottle so this runs once per bottle.

export interface IntegrationsEvent {
  brand: string;
  name: string;
  distillery?: string;
}

const SOURCES = [
  {
    label: "Bourbon Finder",
    // Wine-Searcher's find endpoint also covers spirits/whiskey.
    base: "https://www.wine-searcher.com/find/",
  },
  {
    label: "Whisky Advocate",
    base: "https://www.whiskyadvocate.com/?s=",
  },
];

export const handler = async (
  event: IntegrationsEvent
): Promise<{ sources: SourceLink[] }> => {
  const q = encodeURIComponent(event.name || event.brand);
  const sources: SourceLink[] = SOURCES.map((s) => ({
    label: s.label,
    url: `${s.base}${q}`,
  }));
  // NOTE: when an official API/key is configured, swap the linked search for a
  // direct attributed fact fetch here (respecting robots.txt / ToS).
  return { sources };
};

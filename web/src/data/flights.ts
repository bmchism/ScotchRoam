import type { Bottle } from "../types";
import { bottleById } from "./bottles";
export interface Flight { id: string; title: string; subtitle: string; bottleIds: string[]; curated: boolean; }
export const curatedFlights: Flight[] = [
  { id: "scotch-101", title: "Scotch 101", subtitle: "A guided intro from light Speyside to smoky Islay.", bottleIds: ["glenfiddich-12", "glenlivet-12", "highland-park-12", "laphroaig-10"], curated: true },
  { id: "islay-showdown", title: "Islay Showdown", subtitle: "The peat island's finest — smoke, salt, and iodine.", bottleIds: ["laphroaig-10", "lagavulin-16", "ardbeg-10"], curated: true },
  { id: "speyside-elegance", title: "Speyside Elegance", subtitle: "Fruit, sherry, and elegance from Scotland's heartland.", bottleIds: ["glenfiddich-12", "macallan-12-sherry", "balvenie-doublewood-12", "aberlour-12"], curated: true },
  { id: "sherry-cask-journey", title: "Sherry Cask Journey", subtitle: "Dried fruit, spice, and chocolate from European oak.", bottleIds: ["macallan-12-sherry", "aberlour-12", "dalmore-12", "highland-park-12"], curated: true },
  { id: "coastal-malts", title: "Coastal & Maritime", subtitle: "Salt, sea spray, and maritime character from Scotland's shores.", bottleIds: ["talisker-10", "oban-14", "springbank-10", "highland-park-12"], curated: true },
  { id: "under-50-all-stars", title: "Under £50 All-Stars", subtitle: "World-class malts that won't break the bank.", bottleIds: ["glenfiddich-12", "ardbeg-10", "monkey-shoulder", "glenmorangie-original"], curated: true },
];
export const bottlesForFlight = (f: Flight): Bottle[] => f.bottleIds.map((id) => bottleById(id)).filter((b): b is Bottle => Boolean(b));
const CURRENT = "scotch.customFlight";
export function saveCustomFlight(f: Flight) { localStorage.setItem(CURRENT, JSON.stringify(f)); }
export function loadCustomFlight(): Flight | null { try { const r = localStorage.getItem(CURRENT); return r ? JSON.parse(r) : null; } catch { return null; } }
const LIB = "scotch.flightLibrary";
export function loadLibrary(): Flight[] { try { return JSON.parse(localStorage.getItem(LIB) || "[]"); } catch { return []; } }
export function saveToLibrary(f: Flight) { const lib = loadLibrary().filter((x) => x.id !== f.id); lib.unshift(f); localStorage.setItem(LIB, JSON.stringify(lib)); }
export const flightById = (id: string): Flight | undefined => curatedFlights.find((f) => f.id === id) || loadLibrary().find((f) => f.id === id) || (id === "custom" ? loadCustomFlight() ?? undefined : undefined);

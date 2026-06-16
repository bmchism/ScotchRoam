// Canonical domain types for Scotch Roam (web).
// Mirrors shared/src/types.ts — the single source of truth.

export type BourbonStyle =
  | "Straight"
  | "Single Barrel"
  | "Small Batch"
  | "Bottled-in-Bond"
  | "Wheated"
  | "High Rye"
  | "Barrel Proof"
  | "Rye";

// Expression is the bourbon style category (alias kept for the tasting engine,
// which is spirit-agnostic and refers to a bottle's category as its "expression").
export type Expression = BourbonStyle;

export const EXPRESSIONS: BourbonStyle[] = [
  "Straight",
  "Single Barrel",
  "Small Batch",
  "Bottled-in-Bond",
  "Wheated",
  "High Rye",
  "Barrel Proof",
  "Rye",
];

export interface Distillery {
  id: string;
  name: string;
  region: string; // e.g. "Frankfort, Kentucky"
  country?: string;
  masterDistiller?: string;
  otherBrands?: string[];
  notes?: string;
  website?: string;
}

export interface SourceLink {
  label: string;
  url: string;
}

export interface Bottle {
  id: string;
  brand: string;
  nom: string;
  agaveRegion: string;
  additiveFree?: boolean;
  proof: number;
  name: string;
  distillery: string; // producing distillery, e.g. "Buffalo Trace"
  expression: Expression;
  wineType?: string;
  abv: number;
  region?: string; // e.g. "Kentucky"
  // Style / production
  producer?: string;
  distilleryId?: string;
  style?: BourbonStyle;
  age?: string; // age statement, e.g. "10 Year" or "NAS"
  mashBill?: string; // e.g. "Wheated" or "75% corn, 13% rye, 12% malted barley"
  country?: string;
  waterSource?: string;
  fermentation?: string;
  stillType?: string;
  distillation?: string;
  charLevel?: string; // barrel char level, e.g. "#4 (alligator char)"
  aging?: string; // maturation, e.g. "Aged 6 years in new charred oak"
  // Sensory
  aromas: string[];
  flavors: string[];
  tastingNotes?: string;
  story?: string;
  accent: string;
  verified?: boolean;
  imageUrl?: string;
  imageKeys?: string[];
  sources?: SourceLink[];
  createdAt?: string;
  updatedAt?: string;
}

export interface Review {
  bottleId: string;
  userId: string;
  displayName: string;
  body: string;
  score?: number;
  nose?: number;
  palate?: number;
  finish?: number;
  // Backward compat alias
  aroma?: number;
  published: boolean;
  moderation?: string;
  createdAt: string;
}

export interface TastingSession {
  sessionId: string;
  tastingId: string;
  hostId: string;
  joinCode: string;
  status: string;
  pacing: string;
  visibility: string;
  currentStep: number;
  createdAt: string;
}

export interface Participant {
  sessionId: string;
  participantId: string;
  displayName: string;
  accountId?: string;
  joinedAt: string;
}

export interface Rating {
  sessionId: string;
  participantId: string;
  bottleId: string;
  appearance?: number;
  nose?: number;
  palate?: number;
  finish?: number;
  overall?: number;
  note?: string;
  syncedAt: string;
  // Backward compat aliases
  color?: number;
  aroma?: number;
  flavor?: number;
}

export interface LearnArticle {
  slug: string;
  title: string;
  subtitle: string;
  kicker: string;
  sections: { heading: string; body: string }[];
}

// Session pacing + visibility options
export type Pacing = "host" | "self";
export type Visibility = "social" | "private";

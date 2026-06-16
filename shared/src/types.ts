// ============================================================================
// Bourbon Roam — shared domain model. Single source of truth for web + backend.
// Frontend (web/) and Lambdas (functions/) both import these from @agave/shared.
// ============================================================================

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

// ---------- Catalog ----------

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
  name: string;
  distillery: string; // producing distillery, e.g. "Buffalo Trace"
  expression: Expression;
  abv: number;
  proof: number;
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

// ---------- Learn ----------

export interface LearnSection {
  heading: string;
  body: string;
}

export interface LearnArticle {
  slug: string;
  title: string;
  subtitle: string;
  kicker: string;
  sections: LearnSection[];
}

export interface ProcessStep {
  step: number;
  title: string;
  detail: string;
}

// ---------- Tastings ----------

export type Pacing = "host" | "self";
export type Visibility = "social" | "private";

export interface Flight {
  id: string;
  title: string;
  subtitle: string;
  bottleIds: string[];
  curated: boolean;
}

export interface Tasting {
  id: string;
  ownerId: string;
  title: string;
  bottleIds: string[];
  talkTrack?: string;
  defaultPacing: Pacing;
  defaultVisibility: Visibility;
  quizId?: string;
  createdAt: string;
}

export type SessionStatus = "lobby" | "live" | "quiz" | "complete";

export interface TastingSession {
  sessionId: string;
  tastingId: string;
  hostId: string;
  joinCode: string;
  status: SessionStatus;
  pacing: Pacing;
  visibility: Visibility;
  currentStep: number;
  createdAt: string;
}

export interface Participant {
  sessionId: string;
  participantId: string;
  displayName: string;
  accountId?: string | null;
  joinedAt: string;
}

export interface Rating {
  sessionId: string;
  participantId: string;
  bottleId: string;
  color?: number;
  aroma?: number;
  flavor?: number;
  finish?: number;
  overall?: number;
  note?: string;
  syncedAt: string;
}

// ---------- Reviews & notes (account-scoped) ----------

export interface Review {
  bottleId: string;
  userId: string;
  displayName: string;
  body: string;
  score?: number;
  aroma?: number;
  palate?: number;
  finish?: number;
  published: boolean;
  moderation?: "approved" | "flagged" | "pending" | "blocked";
  createdAt: string;
}

export interface Note {
  userId: string;
  bottleId: string;
  body: string;
  updatedAt: string;
}

// ---------- Quiz ----------

export type QuizSource = "auto" | "host";

export interface QuizQuestion {
  quizId: string;
  questionId: string;
  text: string;
  options: string[];
  correctIndex: number;
  explanation?: string;
  source: QuizSource;
}

export interface Quiz {
  quizId: string;
  tastingId: string;
  questions: QuizQuestion[];
}

export interface QuizResponse {
  sessionId: string;
  participantId: string;
  questionId: string;
  choiceIndex: number;
  correct: boolean;
  ms: number;
}

export interface LeaderboardEntry {
  participantId: string;
  displayName: string;
  correct: number;
  total: number;
  avgMs: number;
}

// ---------- Bottle recognition / enrichment (backend) ----------

export interface EnrichmentResult {
  bottle: Bottle;
  confidence: number;
  modelUsed: "haiku" | "sonnet" | "opus";
  sources: SourceLink[];
}

import type { Bottle } from "../types";

export interface LocalQuizQuestion {
  id: string;
  text: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

// Deterministic pseudo-random so quizzes are stable per flight.
function pick<T>(arr: T[], seed: number): T {
  return arr[seed % arr.length];
}

// Generate a small MCQ set from the flight's bottles. Mirrors what the backend
// quiz-generate Lambda will do with Claude — here it's rule-based and offline.
export function buildQuiz(bottles: Bottle[]): LocalQuizQuestion[] {
  const qs: LocalQuizQuestion[] = [];
  if (bottles.length < 2) return qs;

  // Q1: which bourbon style is this bottle?
  const styleOf = (b: Bottle) => (b.style ?? b.expression) as string;
  const types = [...new Set(bottles.map(styleOf))];
  if (types.length > 1) {
    const target = pick(bottles, 0);
    qs.push({
      id: "q-style",
      text: `What style of bourbon is ${target.name}?`,
      options: dedupe([
        styleOf(target),
        "Straight", "Single Barrel", "Small Batch", "Bottled-in-Bond", "Wheated", "High Rye", "Barrel Proof",
      ].filter((s) => s !== styleOf(target))).slice(0, 3).concat(styleOf(target)),
      correctIndex: -1,
      explanation: `${target.name} is a ${styleOf(target)} bourbon.`,
    });
    fixIndex(qs[qs.length - 1], styleOf(target));
  }

  // Q2: Region match for a specific bottle
  const regionBottle = pick(bottles, 1);
  qs.push({
    id: "q-region",
    text: `Which region is ${regionBottle.name} from?`,
    options: dedupe([
      regionBottle.region ?? "",
      ...bottles.filter((b) => b.region !== regionBottle.region).map((b) => b.region ?? ""),
      "Frankfort, Kentucky",
      "Louisville, Kentucky",
      "Bardstown, Kentucky",
    ].filter(Boolean)).slice(0, 4),
    correctIndex: -1,
    explanation: `${regionBottle.name} comes from ${regionBottle.region}.`,
  });
  fixIndex(qs[qs.length - 1], regionBottle.region ?? "");

  // Q3: mash bill / dominant grain
  const mashBottle = bottles.find((b) => b.mashBill && b.mashBill.length > 0) ?? pick(bottles, 2);
  if (mashBottle?.mashBill) {
    const mash = mashBottle.mashBill;
    qs.push({
      id: "q-mashbill",
      text: `What best describes the mash bill of ${mashBottle.name}?`,
      options: dedupe([
        mash,
        "Wheated (corn + wheat)", "High rye (corn + extra rye)", "Traditional (corn + rye + barley)", "Four-grain",
      ].filter((g) => g !== mash)).slice(0, 3).concat(mash),
      correctIndex: -1,
      explanation: `${mashBottle.name} has a mash bill of ${mash}.`,
    });
    fixIndex(qs[qs.length - 1], mash);
  }

  // Q4: Bottled-in-Bond spotting
  const bonded = bottles.find((b) => styleOf(b) === "Bottled-in-Bond");
  if (bonded) {
    qs.push({
      id: "q-bonded",
      text: `Which of these pours is Bottled-in-Bond (100 proof, single distillery, single season, 4+ years)?`,
      options: shuffle(bottles.map((b) => b.name), 5),
      correctIndex: -1,
      explanation: `${bonded.name} is Bottled-in-Bond.`,
    });
    fixIndex(qs[qs.length - 1], bonded.name);
  }

  // Q5: ABV of the flight's strongest
  const strongest = [...bottles].sort((a, b) => b.abv - a.abv)[0];
  qs.push({
    id: "q-abv",
    text: `Which pour has the highest alcohol (${strongest.abv}%)?`,
    options: shuffle(bottles.map((b) => b.name), 2),
    correctIndex: -1,
    explanation: `${strongest.name} is ${strongest.abv}% ABV.`,
  });
  fixIndex(qs[qs.length - 1], strongest.name);

  return qs.slice(0, 5);
}

function shuffle(arr: string[], seed: number): string[] {
  const a = dedupe(arr).slice(0, 4);
  const rot = seed % a.length;
  return [...a.slice(rot), ...a.slice(0, rot)];
}
function dedupe(arr: string[]): string[] {
  return Array.from(new Set(arr));
}
function fixIndex(q: LocalQuizQuestion, answer: string) {
  const i = q.options.indexOf(answer);
  q.correctIndex = i === -1 ? 0 : i;
  if (i === -1) q.options[0] = answer;
}

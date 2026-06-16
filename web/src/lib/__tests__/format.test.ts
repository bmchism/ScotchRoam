import { describe, it, expect } from "vitest";
import { formatAge, cleanRegion } from "../format";

describe("formatAge", () => {
  it("returns the age statement when present", () => {
    expect(formatAge("10 Year")).toBe("10 Year");
  });

  it("returns NAS when absent", () => {
    expect(formatAge()).toBe("NAS");
  });

  it("trims surrounding whitespace", () => {
    expect(formatAge("  6 Year ")).toBe("6 Year");
  });
});

describe("cleanRegion", () => {
  it("trims surrounding whitespace", () => {
    expect(cleanRegion("  Kentucky ")).toBe("Kentucky");
  });
});

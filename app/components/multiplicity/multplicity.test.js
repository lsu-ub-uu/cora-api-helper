import { describe, expect, it } from "vitest";
import multiplicity from "./multiplicity.js";

describe("multiplicity", () => {
  it("should create a multiplicity span with correct text content", () => {
    const repeatMin = 1;
    const repeatMax = 5;

    const result = multiplicity({ repeatMin, repeatMax });

    expect(result.tagName).toBe("SPAN");
    expect(result.className).toBe("multiplicity");
    expect(result.textContent).toBe("(1 - 5)");
  });
});

import { describe, expect, it } from "vitest";
import { normalize } from "./normalise";

describe("normalize", () => {
  it("trims whitespace from each line", () => {
    expect(normalize("  hello  \n  world  ")).toBe("hello\nworld");
  });

  it("removes empty lines", () => {
    expect(normalize("hello\n\n\nworld")).toBe("hello\nworld");
  });

  it("removes lines that are only whitespace", () => {
    expect(normalize("hello\n   \nworld")).toBe("hello\nworld");
  });

  it("handles a single line", () => {
    expect(normalize("  hello  ")).toBe("hello");
  });

  it("returns empty string for empty input", () => {
    expect(normalize("")).toBe("");
  });

  it("returns empty string for whitespace-only input", () => {
    expect(normalize("   \n   \n   ")).toBe("");
  });
});

import { describe, expect, it } from "vitest";
import { normalize } from "./normalize";

describe("normalize", () => {
  it("collapses all whitespace into single spaces", () => {
    expect(normalize("  hello  \n  world  ")).toBe("hello world");
  });

  it("collapses multiple newlines", () => {
    expect(normalize("hello\n\n\nworld")).toBe("hello world");
  });

  it("collapses lines that are only whitespace", () => {
    expect(normalize("hello\n   \nworld")).toBe("hello world");
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

import { describe, expect, it } from "vitest";
import updateDocumentTitle from "./updateDocumentTitle";

describe("updateDocumentTitle", () => {
  it("should add a sub-title if not present", () => {
    document.title = "Original Title";
    updateDocumentTitle("New Title");
    expect(document.title).toBe("New Title | Original Title");
  });

  it("should replace an existing sub-title", () => {
    document.title = "Old Title | Original Title";
    updateDocumentTitle("New Title");
    expect(document.title).toBe("New Title | Original Title");
  });

  it("should remove the sub-title if no sub-title is provided", () => {
    document.title = "Old Title | Original Title";
    updateDocumentTitle();
    expect(document.title).toBe("Original Title");
  });

  it("should preserve the original title if an empty string is provided", () => {
    document.title = "Original Title";
    updateDocumentTitle("");
    expect(document.title).toBe("Original Title");
  });
});

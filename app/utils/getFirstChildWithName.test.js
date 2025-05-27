import { describe, expect, it } from "vitest";
import getFirstChildWithName from "./getFirstChildWithName";

describe("getFirstChildWithName", () => {
  it("returns undefined if record has no children", () => {
    const record = {};
    const result = getFirstChildWithName(record, "testName");
    expect(result).toBeUndefined();
  });

  it("returns undefined if no child with the specified name exists", () => {
    const record = { children: [{ name: "otherName" }] };
    const result = getFirstChildWithName(record, "testName");
    expect(result).toBeUndefined();
  });

  it("returns the first child with the specified name", () => {
    const record = {
      children: [
        { name: "otherName" },
        { name: "testName", value: "testValue" },
        { name: "testName", value: "anotherValue" },
      ],
    };
    const result = getFirstChildWithName(record, "testName");
    expect(result).toEqual({ name: "testName", value: "testValue" });
  });
});

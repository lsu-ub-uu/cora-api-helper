import { describe, expect, it } from "vitest";
import getAllChildrenWithName from "./getAllChildrenWithName";

describe("getAllChildrenWithName", () => {
  it("returns an empty array if no child with the specified name exists", () => {
    const record = { children: [{ name: "otherName" }] };
    const result = getAllChildrenWithName(record, "testName");
    expect(result).toEqual([]);
  });

  it("returns all children with the specified name", () => {
    const record = {
      children: [
        { name: "otherName" },
        { name: "testName", value: "testValue" },
        { name: "testName", value: "anotherValue" },
      ],
    };
    const result = getAllChildrenWithName(record, "testName");
    expect(result).toEqual([
      { name: "testName", value: "testValue" },
      { name: "testName", value: "anotherValue" },
    ]);
  });
});

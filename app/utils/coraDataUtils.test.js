import { describe, expect, it } from "vitest";
import {
  getAllChildrenWithName,
  getAllChildrenWithNameAndAttributes,
  getFirstChildWithName,
  getFirstChildWithNameAndAttributes,
} from "./coraDataUtils.js";

describe("getFirstChildWithName", () => {
  it("returns undefined if record has no children", () => {
    expect(getFirstChildWithName({}, "testName")).toBeUndefined();
  });

  it("returns undefined if no child with the specified name exists", () => {
    const record = { children: [{ name: "otherName" }] };
    expect(getFirstChildWithName(record, "testName")).toBeUndefined();
  });

  it("returns the first child with the specified name", () => {
    const record = {
      children: [
        { name: "otherName" },
        { name: "testName", value: "testValue" },
        { name: "testName", value: "anotherValue" },
      ],
    };

    expect(getFirstChildWithName(record, "testName")).toEqual({
      name: "testName",
      value: "testValue",
    });
  });
});

describe("getAllChildrenWithName", () => {
  it("returns an empty array if no child with the specified name exists", () => {
    const record = { children: [{ name: "otherName" }] };
    expect(getAllChildrenWithName(record, "testName")).toEqual([]);
  });

  it("returns all children with the specified name", () => {
    const record = {
      children: [
        { name: "otherName" },
        { name: "testName", value: "testValue" },
        { name: "testName", value: "anotherValue" },
      ],
    };

    expect(getAllChildrenWithName(record, "testName")).toEqual([
      { name: "testName", value: "testValue" },
      { name: "testName", value: "anotherValue" },
    ]);
  });
});

describe("getFirstChildWithNameAndAttributes", () => {
  it("returns the first child with the specified name and attributes", () => {
    const record = {
      children: [
        { name: "testName", attributes: { attr1: "value1" } },
        { name: "testName", attributes: { attr1: "value2" } },
      ],
    };

    expect(
      getFirstChildWithNameAndAttributes(record, "testName", {
        attr1: "value2",
      }),
    ).toEqual({
      name: "testName",
      attributes: { attr1: "value2" },
    });
  });

  it("does not return a child if only some attributes match", () => {
    const record = {
      children: [
        { name: "testName", attributes: { attr1: "value1", attr2: "value2" } },
        { name: "testName", attributes: { attr1: "value1", attr2: "value3" } },
      ],
    };

    expect(
      getFirstChildWithNameAndAttributes(record, "testName", {
        attr1: "value1",
        attr2: "value4",
      }),
    ).toBeUndefined();
  });

  it("does return a child that has additional attributes beyond the queried ones", () => {
    const record = {
      children: [
        { name: "testName", attributes: { attr1: "value1", attr2: "value2" } },
        { name: "testName", attributes: { attr1: "value1", attr2: "value3" } },
      ],
    };

    expect(
      getFirstChildWithNameAndAttributes(record, "testName", {
        attr1: "value1",
      }),
    ).toEqual({
      name: "testName",
      attributes: { attr1: "value1", attr2: "value2" },
    });
  });

  it("returns undefined if no child with the specified name and attributes exists", () => {
    const record = {
      children: [
        { name: "testName", attributes: { attr1: "value1" } },
        { name: "testName", attributes: { attr1: "value2" } },
      ],
    };

    expect(
      getFirstChildWithNameAndAttributes(record, "testName", {
        attr1: "value3",
      }),
    ).toBeUndefined();
  });

  it("returns undefined if record has no children", () => {
    expect(
      getFirstChildWithNameAndAttributes({}, "testName", { attr1: "value1" }),
    ).toBeUndefined();
  });
});

describe("getAllChildrenWithNameAndAttributes", () => {
  it("returns all children with the specified name and attributes", () => {
    const record = {
      children: [
        { name: "otherName", attributes: { type: "matching" } },
        {
          name: "testName",
          attributes: { type: "matching", extra: "first" },
        },
        { name: "testName", attributes: { type: "different" } },
        {
          name: "testName",
          attributes: { type: "matching", extra: "second" },
        },
      ],
    };

    expect(
      getAllChildrenWithNameAndAttributes(record, "testName", {
        type: "matching",
      }),
    ).toEqual([
      {
        name: "testName",
        attributes: { type: "matching", extra: "first" },
      },
      {
        name: "testName",
        attributes: { type: "matching", extra: "second" },
      },
    ]);
  });

  it("does not return children if only some attributes match", () => {
    const record = {
      children: [
        {
          name: "testName",
          attributes: { type: "matching", role: "different" },
        },
        { name: "testName", attributes: { type: "matching" } },
        { name: "testName" },
      ],
    };

    expect(
      getAllChildrenWithNameAndAttributes(record, "testName", {
        type: "matching",
        role: "required",
      }),
    ).toEqual([]);
  });

  it("returns an empty array if no matching child exists", () => {
    const record = {
      children: [{ name: "testName", attributes: { type: "different" } }],
    };

    expect(
      getAllChildrenWithNameAndAttributes(record, "testName", {
        type: "matching",
      }),
    ).toEqual([]);
  });

  it("returns an empty array if record has no children", () => {
    expect(
      getAllChildrenWithNameAndAttributes({}, "testName", {
        type: "matching",
      }),
    ).toEqual([]);
  });
});

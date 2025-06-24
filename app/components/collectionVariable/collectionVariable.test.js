import { describe, expect, it, vi } from "vitest";
import collectionVariable from "./collectionVariable.js";

describe("collectionVariable", () => {
  it("should render an XML collection variable", () => {
    const metadataPool = {
      collectionRef1: {
        children: [{ name: "linkedRecordId", value: "itemCollection1" }],
      },
      itemCollection1: {
        children: [
          {
            name: "collectionItemReferences",
            children: [
              { children: [{ name: "linkedRecordId", value: "item1" }] },
              { children: [{ name: "linkedRecordId", value: "item2" }] },
            ],
          },
        ],
      },
      item1: {
        type: "item",
        children: [{ name: "nameInData", value: "item1" }],
      },
      item2: {
        type: "item",
        children: [{ name: "nameInData", value: "item2" }],
      },
    };

    const metadata = {
      children: [
        { name: "nameInData", value: "collectionVar1" },
        { name: "repeatMin", value: "1" },
        { name: "repeatMax", value: "5" },
        {
          name: "refCollection",
          children: [{ name: "linkedRecordId", value: "itemCollection1" }],
        },
      ],
    };

    const result = collectionVariable({
      metadataPool,
      metadata,
      repeatMin: 1,
      repeatMax: 5,
      lastChild: true,
    });

    expect(result.textContent).toBe(
      "-<collectionVar1>(1 - 5)item1 | item2</collectionVar1>"
    );
  });

  it("should render a JSON collection variable", () => {
    const metadataPool = {
      collectionRef1: {
        children: [{ name: "linkedRecordId", value: "itemCollection1" }],
      },
      itemCollection1: {
        children: [
          {
            name: "collectionItemReferences",
            children: [
              { children: [{ name: "linkedRecordId", value: "item1" }] },
              { children: [{ name: "linkedRecordId", value: "item2" }] },
            ],
          },
        ],
      },
      item1: {
        type: "item",
        children: [{ name: "nameInData", value: "item1" }],
      },
      item2: {
        type: "item",
        children: [{ name: "nameInData", value: "item2" }],
      },
    };

    const metadata = {
      children: [
        { name: "nameInData", value: "collectionVar1" },
        { name: "repeatMin", value: "1" },
        { name: "repeatMax", value: "5" },
        {
          name: "refCollection",
          children: [{ name: "linkedRecordId", value: "itemCollection1" }],
        },
      ],
    };
    vi.stubGlobal("location", {
      search: "?format=json",
    });
    const result = collectionVariable({
      metadataPool,
      metadata,
      repeatMin: 1,
      repeatMax: 5,
      lastChild: true,
    });

    expect(result.textContent).toBe(
      '-{"name": "collectionVar1",(1 - 5)"repeatId": "/.+/","value": "item1 | item2"}'
    );
  });
});

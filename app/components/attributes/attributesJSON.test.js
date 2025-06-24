import { screen } from "@testing-library/dom";
import { describe, expect, it, vi } from "vitest";
import attributesJSON from "./attributesJSON.js";
import getFirstChildWithName from "../../utils/getFirstChildWithName.js";

vi.mock("../itemCollection/itemCollection.js", () => ({
  default: vi.fn(({ collectionReference }) =>
    getFirstChildWithName(collectionReference, "linkedRecordId").value ===
    "colorCollection"
      ? document.createTextNode("red | blue")
      : document.createTextNode("small | large")
  ),
}));

describe("attributesJSON", () => {
  it("renders attributes in JSON format", () => {
    const metadataPool = {
      color: {
        type: "collectionVariable",
        children: [
          { name: "nameInData", value: "color" },
          {
            name: "refCollection",
            children: [{ name: "linkedRecordId", value: "colorCollection" }],
          },
        ],
      },
      size: {
        type: "collectionVariable",
        children: [
          { name: "nameInData", value: "size" },
          {
            name: "refCollection",
            children: [{ name: "linkedRecordId", value: "sizeCollection" }],
          },
        ],
      },
    };
    const metadata = {
      children: [
        {
          name: "attributeReferences",
          children: [
            {
              name: "ref",
              children: [{ name: "linkedRecordId", value: "color" }],
            },
            {
              name: "ref",
              children: [{ name: "linkedRecordId", value: "size" }],
            },
          ],
        },
      ],
    };

    document.body.appendChild(attributesJSON({ metadataPool, metadata }));
    expect(document.body.textContent).toEqual(
      '"attributes": {"color": "red | blue","size": "small | large"},'
    );
  });

  it("renders final value attribute", () => {
    const metadataPool = {
      color: {
        type: "collectionVariable",
        children: [
          { name: "nameInData", value: "color" },
          {
            name: "refCollection",
            children: [{ name: "linkedRecordId", value: "colorCollection" }],
          },
          { name: "finalValue", value: "red" },
        ],
      },
    };
    const metadata = {
      children: [
        {
          name: "attributeReferences",
          children: [
            {
              name: "ref",
              children: [{ name: "linkedRecordId", value: "color" }],
            },
          ],
        },
      ],
    };

    document.body.appendChild(attributesJSON({ metadataPool, metadata }));

    expect(document.body.textContent).toEqual(
      '"attributes": {"color": "red"},'
    );
  });
});

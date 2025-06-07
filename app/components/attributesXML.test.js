import { describe, expect, it, vi } from "vitest";
import getFirstChildWithName from "../utils/getFirstChildWithName";
import childReference from "./childReference";
import attributes from "./attributesXML";
import { screen } from "@testing-library/dom";

vi.mock("./itemCollection.js", () => ({
  default: vi.fn(({ collectionReference }) =>
    getFirstChildWithName(collectionReference, "linkedRecordId").value ===
    "colorCollection"
      ? document.createTextNode("red | blue")
      : document.createTextNode("small | large")
  ),
}));

describe("attributes XML", () => {
  it("renders selectable attributes", () => {
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

    document.body.appendChild(attributes({ metadataPool, metadata }));
    expect(screen.getByText("color")).toBeInTheDocument();
    expect(
      screen.getByText((_, element) => element.textContent === '"red | blue"')
    ).toBeInTheDocument();
  });
});

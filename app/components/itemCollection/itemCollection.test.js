import { describe, expect, it } from "vitest";
import itemCollection from "./itemCollection.js";
import { screen } from "@testing-library/dom";
describe("itemCollection", () => {
  it("renders item collection", () => {
    const metadataPool = {
      colorCollection: {
        name: "colorCollection",
        children: [
          {
            name: "collectionItemReferences",
            children: [
              { children: [{ name: "linkedRecordId", value: "blueItem" }] },
              { children: [{ name: "linkedRecordId", value: "redItem" }] },
              { children: [{ name: "linkedRecordId", value: "greenItem" }] },
            ],
          },
        ],
      },
      blueItem: {
        name: "blueItem",
        children: [{ name: "nameInData", value: "blue" }],
      },
      redItem: {
        name: "redItem",
        children: [{ name: "nameInData", value: "red" }],
      },
      greenItem: {
        name: "greenItem",
        children: [{ name: "nameInData", value: "green" }],
      },
    };

    const collectionReference = {
      children: [{ name: "linkedRecordId", value: "colorCollection" }],
    };

    document.body.appendChild(
      itemCollection({ metadataPool, collectionReference })
    );

    expect(document.body.textContent).toEqual("blue | red | green");
  });

  it("renders an expandable collection if more than 12 items", () => {
    const metadataPool = {
      largeCollection: {
        name: "largeCollection",
        children: [
          {
            name: "collectionItemReferences",
            children: Array.from({ length: 15 }, (_, i) => ({
              children: [{ name: "linkedRecordId", value: `item${i}` }],
            })),
          },
        ],
      },
      ...Array.from({ length: 15 }, (_, i) => ({
        [`item${i}`]: {
          name: `item${i}`,
          children: [{ name: "nameInData", value: `Item ${i}` }],
        },
      })).reduce((acc, cur) => ({ ...acc, ...cur }), {}),
    };

    const collectionReference = {
      children: [{ name: "linkedRecordId", value: "largeCollection" }],
    };

    document.body.appendChild(
      itemCollection({ metadataPool, collectionReference })
    );

    expect(document.body.textContent).toEqual(
      "Item 0 | Item 1 | Item 2 | Item 3 | Item 4 | Item 5 | Item 6 | Item 7 | Item 8 | Item 9 | Item 10 | Item 11..."
    );

    screen
      .getByRole("button", {
        name: "Expand collection items",
      })
      .click();

    expect(document.body.textContent).toEqual(
      "Item 0 | Item 1 | Item 2 | Item 3 | Item 4 | Item 5 | Item 6 | Item 7 | Item 8 | Item 9 | Item 10 | Item 11 | Item 12 | Item 13 | Item 14—"
    );

    screen
      .getByRole("button", {
        name: "Collapse collection items",
      })
      .click();

    expect(document.body.textContent).toEqual(
      "Item 0 | Item 1 | Item 2 | Item 3 | Item 4 | Item 5 | Item 6 | Item 7 | Item 8 | Item 9 | Item 10 | Item 11..."
    );
  });
});

import { describe, expect, it, vi } from "vitest";
import getFirstChildWithName from "../../utils/getFirstChildWithName.js";
import childReference from "./childReference.js";

vi.mock("../group/group.js", () => ({
  default: vi.fn(
    ({ groupId: refRecordId, repeatMin, repeatMax, depth, lastChild }) => {
      const mockGroup = document.createElement("div");
      mockGroup.textContent = `Group: ${refRecordId}, Min: ${repeatMin}, Max: ${repeatMax}, Depth: ${depth}, Last Child: ${lastChild}`;
      return mockGroup;
    }
  ),
}));

vi.mock("../textVariable/textVariable.js", () => ({
  default: vi.fn(({ metadata, repeatMin, repeatMax, lastChild }) => {
    const mockTextVariable = document.createElement("div");
    mockTextVariable.textContent = `Text Variable: ${
      getFirstChildWithName(metadata, "nameInData").value
    }, Min: ${repeatMin}, Max: ${repeatMax}, Last Child: ${lastChild}`;
    return mockTextVariable;
  }),
}));

vi.mock("../collectionVariable/collectionVariable.js", () => ({
  default: vi.fn(({ metadata, repeatMin, repeatMax, lastChild }) => {
    const mockCollectionVariable = document.createElement("div");
    mockCollectionVariable.textContent = `Collection Variable: ${
      getFirstChildWithName(metadata, "nameInData").value
    }, Min: ${repeatMin}, Max: ${repeatMax}, Last Child: ${lastChild}`;
    return mockCollectionVariable;
  }),
}));

vi.mock("../numberVariable/numberVariable.js", () => ({
  default: vi.fn(({ metadata, repeatMin, repeatMax, lastChild }) => {
    const mockNumberVariable = document.createElement("div");
    mockNumberVariable.textContent = `Number Variable: ${
      getFirstChildWithName(metadata, "nameInData").value
    }, Min: ${repeatMin}, Max: ${repeatMax}, Last Child: ${lastChild}`;
    return mockNumberVariable;
  }),
}));

vi.mock("../recordLink/recordLink.js", () => ({
  default: vi.fn(({ metadata, repeatMin, repeatMax, lastChild }) => {
    const mockRecordLink = document.createElement("div");
    mockRecordLink.textContent = `Record Link: ${
      getFirstChildWithName(metadata, "nameInData").value
    }, Min: ${repeatMin}, Max: ${repeatMax}, Last Child: ${lastChild}`;
    return mockRecordLink;
  }),
}));

describe("childReference", () => {
  it('renders a group component for "group" type', () => {
    const metadataPool = {
      group1: {
        type: "group",
        attributes: { type: "group" },
        children: [{ name: "nameInData", value: "group1" }],
      },
    };

    const result = childReference({
      metadataPool,
      childReference: {
        children: [
          { name: "repeatMin", value: "1" },
          { name: "repeatMax", value: "5" },
          {
            name: "ref",
            children: [{ name: "linkedRecordId", value: "group1" }],
          },
        ],
      },
      depth: 0,
      lastChild: true,
    });

    expect(result.textContent).toBe(
      "Group: group1, Min: 1, Max: 5, Depth: 0, Last Child: true"
    );
  });

  it('renders a text variable component for "textVariable" type', () => {
    const metadataPool = {
      textVar1: {
        type: "textVariable",
        attributes: { type: "textVariable" },
        children: [{ name: "nameInData", value: "textVar1" }],
      },
    };

    const result = childReference({
      metadataPool,
      childReference: {
        children: [
          { name: "repeatMin", value: "1" },
          { name: "repeatMax", value: "5" },
          {
            name: "ref",
            children: [{ name: "linkedRecordId", value: "textVar1" }],
          },
        ],
      },
      depth: 0,
      lastChild: true,
    });

    expect(result.textContent).toBe(
      "Text Variable: textVar1, Min: 1, Max: 5, Last Child: true"
    );
  });

  it('renders a collection variable component for "collectionVariable" type', () => {
    const metadataPool = {
      collectionVar1: {
        type: "collectionVariable",
        attributes: { type: "collectionVariable" },
        children: [{ name: "nameInData", value: "collectionVar1" }],
      },
    };

    const result = childReference({
      metadataPool,
      childReference: {
        children: [
          { name: "repeatMin", value: "1" },
          { name: "repeatMax", value: "5" },
          {
            name: "ref",
            children: [{ name: "linkedRecordId", value: "collectionVar1" }],
          },
        ],
      },
      depth: 0,
      lastChild: true,
    });

    expect(result.textContent).toBe(
      "Collection Variable: collectionVar1, Min: 1, Max: 5, Last Child: true"
    );
  });
  it('renders a number variable component for "numberVariable" type', () => {
    const metadataPool = {
      numberVar1: {
        type: "numberVariable",
        attributes: { type: "numberVariable" },
        children: [{ name: "nameInData", value: "numberVar1" }],
      },
    };

    const result = childReference({
      metadataPool,
      childReference: {
        children: [
          { name: "repeatMin", value: "1" },
          { name: "repeatMax", value: "5" },
          {
            name: "ref",
            children: [{ name: "linkedRecordId", value: "numberVar1" }],
          },
        ],
      },
      depth: 0,
      lastChild: true,
    });

    expect(result.textContent).toBe(
      "Number Variable: numberVar1, Min: 1, Max: 5, Last Child: true"
    );
  });

  it('renders a record link component for "recordLink" type', () => {
    const metadataPool = {
      recordLink1: {
        type: "recordLink",
        attributes: { type: "recordLink" },
        children: [{ name: "nameInData", value: "recordLink1" }],
      },
    };

    const result = childReference({
      metadataPool,
      childReference: {
        children: [
          { name: "repeatMin", value: "1" },
          { name: "repeatMax", value: "5" },
          {
            name: "ref",
            children: [{ name: "linkedRecordId", value: "recordLink1" }],
          },
        ],
      },
      depth: 0,
      lastChild: true,
    });

    expect(result.textContent).toBe(
      "Record Link: recordLink1, Min: 1, Max: 5, Last Child: true"
    );
  });
});

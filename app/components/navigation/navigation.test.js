import { describe, expect, it, vi } from "vitest";
import navigation from "./navigation";
import { screen } from "@testing-library/dom";
import userEvent from "@testing-library/user-event";

const recordTypePool = {
  person: {
    children: [
      {
        name: "recordInfo",
        children: [{ name: "id", value: "person" }],
      },
      { name: "groupOfRecordType", value: "group1" },
    ],
  },
  organisation: {
    children: [
      {
        name: "recordInfo",
        children: [{ name: "id", value: "organisation" }],
      },
      { name: "groupOfRecordType", value: "group1" },
    ],
  },
  output: {
    children: [
      {
        name: "recordInfo",
        children: [{ name: "id", value: "output" }],
      },
      { name: "groupOfRecordType", value: "group2" },
    ],
  },
};

const metadataPool = {
  groupOfRecordTypeCollection: {
    children: [
      {
        name: "collectionItemReferences",
        children: [
          {
            children: [{ name: "linkedRecordId", value: "group1Item" }],
          },
          {
            children: [{ name: "linkedRecordId", value: "group2Item" }],
          },
        ],
      },
    ],
  },
  group1Item: {
    children: [{ name: "nameInData", value: "group1" }],
  },
  group2Item: {
    children: [{ name: "nameInData", value: "group2" }],
  },
};

describe("navigation", () => {
  it("renders navigation items for each record type, grouped by record type group", () => {
    document.body.appendChild(
      navigation({
        path: "/record/person/1",
        recordTypePool,
        metadataPool,
      })
    );

    expect(screen.getByRole("navigation")).toBeInTheDocument();

    expect(screen.getByRole("heading", { name: "group1" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /person/i })).toHaveAttribute(
      "href",
      "/record/person"
    );
    expect(screen.getByRole("link", { name: /organisation/i })).toHaveAttribute(
      "href",
      "/record/organisation"
    );

    expect(screen.getByRole("heading", { name: "group2" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /output/i })).toHaveAttribute(
      "href",
      "/record/output"
    );
  });

  it("marks current page", () => {
    document.body.appendChild(
      navigation({
        path: "/record/output/1",
        recordTypePool,
        metadataPool,
      })
    );

    expect(screen.getByRole("link", { name: /output/i })).toHaveAttribute(
      "aria-current",
      "page"
    );
  });

  it("navigates to the correct page on click", async () => {
    const navigateMock = vi.fn();
    document.body.appendChild(
      navigation({
        path: "/record/output/1",
        navigate: navigateMock,
        recordTypePool,
        metadataPool,
      })
    );

    await userEvent.click(screen.getByRole("link", { name: /person/i }));
    expect(navigateMock).toHaveBeenCalled();
    expect(window.location.pathname).toBe("/record/person");
  });
});

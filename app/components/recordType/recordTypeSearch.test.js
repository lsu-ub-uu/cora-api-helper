import { describe, expect, it, vi } from "vitest";
import { screen, waitFor } from "@testing-library/dom";
import { recordTypeSearch } from "./recordTypeSearch";
import dataFormat from "../dataFormat/dataFormat";
import dataWrapper from "../dataWrapper/dataWrapper";
import group from "../group/group";
import recordListWrapper from "../recordListWrapper/recordListWrapper";
import search from "../search/search";

vi.mock("../../utils/getTextFromLink.js", () => ({
  default: vi.fn((textId) => Promise.resolve(textId?.value ?? "text")),
}));

vi.mock("../dataFormat/dataFormat.js", () => ({
  default: vi.fn(() => {
    const element = document.createElement("div");
    element.textContent = "response body format";
    return element;
  }),
}));

vi.mock("../dataWrapper/dataWrapper.js", () => ({
  default: vi.fn(() => document.createElement("div")),
}));

vi.mock("../group/group.js", () => ({
  default: vi.fn(() => document.createElement("div")),
}));

vi.mock("../recordListWrapper/recordListWrapper.js", () => ({
  default: vi.fn(() => document.createElement("div")),
}));

vi.mock("../search/search.js", () => ({
  default: vi.fn(() => {
    const element = document.createElement("div");
    element.textContent = "search data format";
    return element;
  }),
}));

function createSearch(id, recordTypeId, text) {
  return {
    children: [
      {
        name: "recordInfo",
        children: [{ name: "id", value: id }],
      },
      {
        name: "recordTypeToSearchIn",
        children: [{ name: "linkedRecordId", value: recordTypeId }],
      },
      { name: "textId", value: text },
    ],
  };
}

describe("recordTypeSearch", () => {
  it("renders searches for the record type and selects the first by default", async () => {
    window.history.replaceState({}, "", "/");
    const firstSearch = createSearch("search-one", "person", "First search");
    const secondSearch = createSearch("search-two", "person", "Second search");
    const unrelatedSearch = createSearch(
      "other-search",
      "company",
      "Other search",
    );

    const root = recordTypeSearch({
      searchPool: { firstSearch, secondSearch, unrelatedSearch },
      recordTypePool: {
        person: {
          children: [
            {
              name: "metadataId",
              children: [{ name: "linkedRecordId", value: "personGroup" }],
            },
          ],
        },
      },
      recordTypeId: "person",
      metadataPool: {},
    });
    document.body.appendChild(root);

    const select = screen.getByRole("combobox");
    expect(select).toBeInTheDocument();
    expect(select.options).toHaveLength(2);
    expect(select.value).toBe("search-one");
    expect(screen.getByText("Request config")).toBeInTheDocument();
    expect(screen.getByText("Search data format")).toBeInTheDocument();
    expect(screen.getByText("Response body format")).toBeInTheDocument();
    expect(screen.getByText(/searchResult\/search-one/)).toBeInTheDocument();
    expect(search).toHaveBeenLastCalledWith({
      search: firstSearch,
      metadataPool: {},
    });
    expect(group).toHaveBeenCalledWith({
      metadataPool: {},
      groupId: "personGroup",
    });

    await waitFor(() => {
      expect(
        screen.getByRole("option", { name: "First search (search-one)" }),
      ).toBeInTheDocument();
    });
  });

  it("updates the request documentation when another search is selected", async () => {
    window.history.replaceState({}, "", "/");
    const firstSearch = createSearch("search-one", "person", "First search");
    const secondSearch = createSearch("search-two", "person", "Second search");

    const root = recordTypeSearch({
      searchPool: { firstSearch, secondSearch },
      recordTypePool: {
        person: {
          children: [
            {
              name: "metadataId",
              children: [{ name: "linkedRecordId", value: "personGroup" }],
            },
          ],
        },
      },
      recordTypeId: "person",
      metadataPool: {},
    });
    document.body.appendChild(root);

    const select = screen.getByRole("combobox");
    select.value = "search-two";
    select.dispatchEvent(new Event("change", { bubbles: true }));

    await waitFor(() => {
      expect(window.location.search).toBe("?searchId=search-two");
      expect(screen.getByText(/searchResult\/search-two/)).toBeInTheDocument();
    });
    expect(search).toHaveBeenLastCalledWith({
      search: secondSearch,
      metadataPool: {},
    });
  });
});

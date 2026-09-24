import { describe, expect, it, vi } from "vitest";
import fetchPools from "./fetchPools.js";
import { screen } from "@testing-library/dom";
import listRecordType from "./listRecordType.js";

vi.mock("./listRecordType.js", () => ({
  default: vi
    .fn()
    .mockImplementation((recordTypeId) => Promise.resolve(recordTypeId)),
}));

describe("fetchPools", () => {
  it("returns pools", async () => {
    const {
      recordTypePool,
      validationTypePool,
      metadataPool,
      searchPool,
      systemPool,
    } = await fetchPools();

    expect(vi.mocked(listRecordType)).toHaveBeenCalledTimes(5);

    expect(recordTypePool).toBe("recordType");
    expect(validationTypePool).toBe("validationType");
    expect(metadataPool).toBe("metadata");
    expect(searchPool).toBe("search");
    expect(systemPool).toBe("system");
  });

  it("shows loading text if it takes longer than 200ms", async () => {
    vi.useFakeTimers();
    document.body.innerHTML = '<div id="app"></div>';

    fetchPools();

    expect(
      screen.queryByText("Loading metadata, please wait..."),
    ).not.toBeInTheDocument();

    vi.advanceTimersByTime(200);

    expect(
      screen.getByText("Loading metadata, please wait..."),
    ).toBeInTheDocument();

    vi.useRealTimers();
  });
});

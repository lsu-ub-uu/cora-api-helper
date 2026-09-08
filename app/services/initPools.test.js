import { describe, expect, it, vi } from "vitest";
import initPools from "./initPools.js";
import { screen } from "@testing-library/dom";
import listRecordType from "./listRecordType.js";

vi.mock("./listRecordType.js", () => ({
  default: vi
    .fn()
    .mockImplementation((recordTypeId) => Promise.resolve(recordTypeId)),
}));

describe("initPools", () => {
  it("returns pools", async () => {
    const { recordTypePool, validationTypePool, metadataPool, searchPool } =
      await initPools();

    expect(vi.mocked(listRecordType)).toHaveBeenCalledTimes(4);

    expect(recordTypePool).toBe("recordType");
    expect(validationTypePool).toBe("validationType");
    expect(metadataPool).toBe("metadata");
    expect(searchPool).toBe("search");
  });

  it("shows loading text if it takes longer than 200ms", async () => {
    vi.useFakeTimers();
    document.body.innerHTML = '<div id="app"></div>';

    initPools();

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

import { describe, expect, it, vi } from "vitest";
import element from "./element";
import elementJSON from "./elementJSON.js";
import getFormat from "../../utils/searchParams.js";

vi.mock("./elementJSON.js", () => ({
  default: vi.fn(() => "jsonElement"),
}));

vi.mock("../../utils/searchParams.js", () => ({
  getFormat: vi.fn(() => "json"),
}));

describe("element", () => {
  it("renders elementJSON when format is json", () => {
    const result = element({
      metadataPool: {},
      metadata: {},
      repeatMin: 0,
      repeatMax: 1,
      children: [],
      lastChild: true,
    });
    expect(result).toBe("jsonElement");
  });
});

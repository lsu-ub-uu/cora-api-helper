import { describe, expect, it, vi } from "vitest";
import element from "./element";
import { getFormat } from "../../utils/searchParams";

vi.mock("./elementJSON.js", () => ({
  default: vi.fn(() => "jsonElement"),
}));

vi.mock("./elementXML.js", () => ({
  default: vi.fn(() => "xmlElement"),
}));

vi.mock("../../utils/searchParams.js");

describe("element", () => {
  it("renders elementJSON when format is json", () => {
    getFormat.mockReturnValue("json");
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

  it("renders elementXML when format is xml", () => {
    getFormat.mockReturnValue("xml");
    const result = element({
      metadataPool: {},
      metadata: {},
      repeatMin: 0,
      repeatMax: 1,
      children: [],
      lastChild: true,
    });
    expect(result).toBe("xmlElement");
  });
});

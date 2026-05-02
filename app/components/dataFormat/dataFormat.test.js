import { describe, expect, it, vi } from "vitest";
import dataFormat from "./dataFormat";

vi.mock("../../utils/searchParams.js", () => ({
  getFormat: vi.fn(() => "xml"),
}));

vi.mock("../group/group.js", () => ({
  default: vi.fn(() => {
    const div = document.createElement("div");
    div.textContent = "mock-group";
    return div;
  }),
}));

vi.mock("../legend/legend.js", () => ({
  default: vi.fn(() => {
    const div = document.createElement("div");
    div.textContent = "mock-legend";
    return div;
  }),
}));

vi.mock("../expandButton/expandButton.js", () => ({
  default: vi.fn(() => {
    const btn = document.createElement("button");
    btn.textContent = "toggle";
    return btn;
  }),
}));

describe("dataFormat", () => {
  it("renders with code-block class", () => {
    const result = dataFormat({
      metadataPool: {},
      rootGroupId: "someGroup",
    });

    expect(result.className).toBe("code-block data-format");
  });

  it("renders group and legend", () => {
    const result = dataFormat({
      metadataPool: {},
      rootGroupId: "someGroup",
    });

    expect(result.textContent).toContain("mock-group");
    expect(result.textContent).toContain("mock-legend");
  });

  it("renders without data wrapper by default", () => {
    const result = dataFormat({
      metadataPool: {},
      rootGroupId: "someGroup",
    });

    expect(result.textContent).not.toContain("<record>");
  });

  it("renders XML data wrapper when dataWrapper is true", () => {
    const result = dataFormat({
      metadataPool: {},
      rootGroupId: "someGroup",
      dataWrapper: true,
    });

    expect(result.textContent).toContain("<record>");
    expect(result.textContent).toContain("<data>");
    expect(result.textContent).toContain("</data>");
    expect(result.textContent).toContain("</record>");
  });

  it("renders JSON data wrapper when format is json", async () => {
    const { getFormat } = await import("../../utils/searchParams.js");
    vi.mocked(getFormat).mockReturnValue("json");

    const result = dataFormat({
      metadataPool: {},
      rootGroupId: "someGroup",
      dataWrapper: true,
    });

    expect(result.textContent).toContain('"record"');
    expect(result.textContent).toContain('"data"');
  });
});

import { describe, expect, it, vi } from "vitest";
import dataFormat from "./dataFormat";

vi.mock("../../utils/searchParams.js", () => ({
  getFormat: vi.fn(() => "xml"),
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
  function createChildren() {
    const children = document.createElement("div");
    children.textContent = "mock-group";
    return children;
  }

  it("renders with code-block class", () => {
    const result = dataFormat({
      children: createChildren(),
    });

    expect(result.className).toBe("code-block data-format");
  });

  it("renders group and legend", () => {
    const result = dataFormat({
      children: createChildren(),
    });

    expect(result.textContent).toContain("mock-group");
    expect(result.textContent).toContain("mock-legend");
  });

  it("renders the XML declaration", () => {
    const result = dataFormat({
      children: createChildren(),
    });

    expect(result.textContent).toContain(
      '<?xml version="1.0" encoding="UTF-8"?>',
    );
  });

  it("renders provided XML data without adding a wrapper", () => {
    const result = dataFormat({
      children: createChildren(),
    });

    expect(result.textContent).toContain("mock-group");
    expect(result.textContent).not.toContain("<record>");
  });

  it("renders provided JSON data", async () => {
    const { getFormat } = await import("../../utils/searchParams.js");
    vi.mocked(getFormat).mockReturnValue("json");

    const result = dataFormat({
      children: createChildren(),
    });

    expect(result.textContent).toContain("mock-group");
    expect(result.textContent).not.toContain("<?xml");
  });
});

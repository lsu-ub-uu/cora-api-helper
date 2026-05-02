import { describe, expect, it, vi } from "vitest";
import elementXML from "./elementXML";

vi.mock("../expandButton/expandButton.js", () => ({
  default: vi.fn(() => {
    const btn = document.createElement("button");
    btn.textContent = "toggle";
    return btn;
  }),
}));

vi.mock("../dataName/dataName.js", () => ({
  default: vi.fn(({ metadata }) => {
    const span = document.createElement("span");
    span.textContent = metadata.children?.find(
      (c) => c.name === "nameInData",
    )?.value;
    return span;
  }),
}));

vi.mock("../multiplicity/multiplicity.js", () => ({
  default: vi.fn(() => {
    const span = document.createElement("span");
    span.textContent = "(mult)";
    return span;
  }),
}));

vi.mock("../attributes/attributesXML.js", () => ({
  default: vi.fn(() => {
    const span = document.createElement("span");
    return span;
  }),
}));

describe("elementXML", () => {
  it("renders an xml element with opening and closing tags", () => {
    const metadata = {
      children: [{ name: "nameInData", value: "title" }],
    };

    const children = document.createElement("span");
    children.textContent = "someContent";

    const result = elementXML({
      metadataPool: {},
      metadata,
      repeatMin: "1",
      repeatMax: "1",
      children,
    });

    expect(result.className).toBe("element");
    expect(result.textContent).toContain("<");
    expect(result.textContent).toContain("title");
    expect(result.textContent).toContain(">");
    expect(result.textContent).toContain("</title>");
    expect(result.textContent).toContain("someContent");
  });

  it("renders multiplicity", () => {
    const metadata = {
      children: [{ name: "nameInData", value: "item" }],
    };

    const children = document.createElement("span");

    const result = elementXML({
      metadataPool: {},
      metadata,
      repeatMin: "0",
      repeatMax: "X",
      children,
    });

    expect(result.textContent).toContain("(mult)");
  });

  it("renders array children", () => {
    const metadata = {
      children: [{ name: "nameInData", value: "group" }],
    };

    const child1 = document.createElement("div");
    child1.textContent = "child1";
    const child2 = document.createElement("div");
    child2.textContent = "child2";

    const result = elementXML({
      metadataPool: {},
      metadata,
      repeatMin: "1",
      repeatMax: "1",
      children: [child1, child2],
    });

    expect(result.textContent).toContain("child1");
    expect(result.textContent).toContain("child2");
  });

  it("renders expand button", () => {
    const metadata = {
      children: [{ name: "nameInData", value: "test" }],
    };

    const children = document.createElement("span");

    const result = elementXML({
      metadataPool: {},
      metadata,
      repeatMin: "1",
      repeatMax: "1",
      children,
    });

    expect(result.querySelector("button")).toBeTruthy();
  });
});

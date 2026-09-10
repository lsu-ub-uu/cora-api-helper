import { describe, expect, it, vi } from "vitest";
import elementJSON from "./elementJSON";

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

vi.mock("../attributes/attributesJSON.js", () => ({
  default: vi.fn(() => document.createDocumentFragment()),
}));

describe("elementJSON", () => {
  it("renders a json element with name", () => {
    const children = document.createElement("span");
    children.textContent = "someValue";

    const result = elementJSON({
      name: "title",
      repeatMin: "1",
      repeatMax: "1",
      children,
    });

    expect(result.className).toBe("json-element");
    expect(result.textContent).toContain('"name"');
    expect(result.textContent).toContain("title");
    expect(result.textContent).toContain('"value"');
    expect(result.textContent).toContain("someValue");
  });

  it("renders repeatId when repeating", () => {
    const children = document.createElement("span");
    children.textContent = "val";

    const result = elementJSON({
      name: "item",
      repeatMin: "0",
      repeatMax: "X",
      children,
    });

    expect(result.textContent).toContain('"repeatId"');
    expect(result.textContent).toContain("/.+/");
  });

  it("does not render repeatId when repeatMax is 1", () => {
    const children = document.createElement("span");

    const result = elementJSON({
      name: "item",
      repeatMin: "1",
      repeatMax: "1",
      children,
    });

    expect(result.textContent).not.toContain('"repeatId"');
  });

  it("renders children array as children property", () => {
    const child1 = document.createElement("div");
    child1.textContent = "child1";
    const child2 = document.createElement("div");
    child2.textContent = "child2";

    const result = elementJSON({
      name: "group",
      repeatMin: "1",
      repeatMax: "1",
      children: [child1, child2],
    });

    expect(result.textContent).toContain('"children"');
    expect(result.textContent).toContain("child1");
    expect(result.textContent).toContain("child2");
  });

  it("renders closing bracket with comma when not lastChild", () => {
    const children = document.createElement("span");

    const result = elementJSON({
      name: "item",
      repeatMin: "1",
      repeatMax: "1",
      children,
      lastChild: false,
    });

    expect(result.textContent).toContain("},");
  });

  it("renders closing bracket without comma when lastChild", () => {
    const children = document.createElement("span");

    const result = elementJSON({
      name: "item",
      repeatMin: "1",
      repeatMax: "1",
      children,
      lastChild: true,
    });

    expect(result.textContent).toMatch(/}(?!,)\s*$/);
  });

  it("renders recordLink children directly", () => {
    const linkChildren = document.createElement("div");
    linkChildren.textContent = "linkContent";

    const result = elementJSON({
      name: "link",
      repeatMin: "1",
      repeatMax: "1",
      children: linkChildren,
      isRecordLink: true,
    });

    expect(result.textContent).toContain("linkContent");
    expect(result.textContent).not.toContain('"children"');
    expect(result.textContent).not.toContain('"value"');
  });
});

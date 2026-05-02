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
    const metadata = {
      children: [{ name: "nameInData", value: "title" }],
    };

    const children = document.createElement("span");
    children.textContent = "someValue";

    const result = elementJSON({
      metadataPool: {},
      metadata,
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
    const metadata = {
      children: [{ name: "nameInData", value: "item" }],
    };

    const children = document.createElement("span");
    children.textContent = "val";

    const result = elementJSON({
      metadataPool: {},
      metadata,
      repeatMin: "0",
      repeatMax: "X",
      children,
    });

    expect(result.textContent).toContain('"repeatId"');
    expect(result.textContent).toContain("/.+/");
  });

  it("does not render repeatId when repeatMax is 1", () => {
    const metadata = {
      children: [{ name: "nameInData", value: "item" }],
    };

    const children = document.createElement("span");

    const result = elementJSON({
      metadataPool: {},
      metadata,
      repeatMin: "1",
      repeatMax: "1",
      children,
    });

    expect(result.textContent).not.toContain('"repeatId"');
  });

  it("renders children array as children property", () => {
    const metadata = {
      children: [{ name: "nameInData", value: "group" }],
    };

    const child1 = document.createElement("div");
    child1.textContent = "child1";
    const child2 = document.createElement("div");
    child2.textContent = "child2";

    const result = elementJSON({
      metadataPool: {},
      metadata,
      repeatMin: "1",
      repeatMax: "1",
      children: [child1, child2],
    });

    expect(result.textContent).toContain('"children"');
    expect(result.textContent).toContain("child1");
    expect(result.textContent).toContain("child2");
  });

  it("renders closing bracket with comma when not lastChild", () => {
    const metadata = {
      children: [{ name: "nameInData", value: "item" }],
    };
    const children = document.createElement("span");

    const result = elementJSON({
      metadataPool: {},
      metadata,
      repeatMin: "1",
      repeatMax: "1",
      children,
      lastChild: false,
    });

    expect(result.textContent).toContain("},");
  });

  it("renders closing bracket without comma when lastChild", () => {
    const metadata = {
      children: [{ name: "nameInData", value: "item" }],
    };
    const children = document.createElement("span");

    const result = elementJSON({
      metadataPool: {},
      metadata,
      repeatMin: "1",
      repeatMax: "1",
      children,
      lastChild: true,
    });

    expect(result.textContent).toMatch(/}(?!,)\s*$/);
  });

  it("renders recordLink children directly", () => {
    const metadata = {
      children: [{ name: "nameInData", value: "link" }],
      attributes: { type: "recordLink" },
    };

    const linkChildren = document.createElement("div");
    linkChildren.textContent = "linkContent";

    const result = elementJSON({
      metadataPool: {},
      metadata,
      repeatMin: "1",
      repeatMax: "1",
      children: linkChildren,
    });

    expect(result.textContent).toContain("linkContent");
    expect(result.textContent).not.toContain('"children"');
    expect(result.textContent).not.toContain('"value"');
  });
});

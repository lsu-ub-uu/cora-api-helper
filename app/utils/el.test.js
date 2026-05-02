import { describe, expect, it, vi } from "vitest";
import { el } from "./el";

describe("el", () => {
  it("creates an element with the given tag", () => {
    const element = el("div");
    expect(element.tagName).toBe("DIV");
  });

  it("sets properties on the element", () => {
    const element = el("div", { className: "foo", id: "bar" });
    expect(element.className).toBe("foo");
    expect(element.id).toBe("bar");
  });

  it("sets textContent on the element", () => {
    const element = el("span", { textContent: "hello" });
    expect(element.textContent).toBe("hello");
  });

  it("appends children to the element", () => {
    const element = el("div", {
      children: [el("span"), el("button")],
    });
    expect(element.children.length).toBe(2);
    expect(element.children[0].tagName).toBe("SPAN");
    expect(element.children[1].tagName).toBe("BUTTON");
  });

  it("supports nested hierarchies", () => {
    const element = el("div", {
      children: [
        el("ul", {
          children: [
            el("li", { textContent: "one" }),
            el("li", { textContent: "two" }),
          ],
        }),
      ],
    });
    const items = element.querySelectorAll("li");
    expect(items.length).toBe(2);
    expect(items[0].textContent).toBe("one");
    expect(items[1].textContent).toBe("two");
  });

  it("adds event listeners for properties starting with on", () => {
    const handler = vi.fn();
    const element = el("button", { onClick: handler });

    element.click();

    expect(handler).toHaveBeenCalledOnce();
  });

  it("adds multiple event listeners", () => {
    const clickHandler = vi.fn();
    const mouseOverHandler = vi.fn();
    const element = el("button", {
      onClick: clickHandler,
      onMouseover: mouseOverHandler,
    });

    element.click();
    element.dispatchEvent(new Event("mouseover"));

    expect(clickHandler).toHaveBeenCalledOnce();
    expect(mouseOverHandler).toHaveBeenCalledOnce();
  });

  it("sets attributes, children, and event listeners together", () => {
    const handler = vi.fn();
    const element = el("div", {
      className: "container",
      children: [
        el("span", { textContent: "Bar" }),
        el("button", { textContent: "click me", onClick: handler }),
      ],
    });

    expect(element.className).toBe("container");
    expect(element.children.length).toBe(2);
    expect(element.querySelector("span").textContent).toBe("Bar");

    const button = element.querySelector("button");
    button.click();
    expect(handler).toHaveBeenCalledOnce();
  });

  it("returns an element with no properties when none are given", () => {
    const element = el("section");
    expect(element.tagName).toBe("SECTION");
    expect(element.children.length).toBe(0);
  });

  it("handles string children", () => {
    const element = el("p", {
      children: ["hello"],
    });
    expect(element.textContent).toBe("hello");
  });

  it("sets data attributes using setAttribute", () => {
    const element = el("div", { "data-id": "123", "data-active": "true" });
    expect(element.getAttribute("data-id")).toBe("123");
    expect(element.getAttribute("data-active")).toBe("true");
  });

  it("sets aria attributes using setAttribute", () => {
    const element = el("button", {
      "aria-label": "Close",
      "aria-hidden": "false",
    });
    expect(element.getAttribute("aria-label")).toBe("Close");
    expect(element.getAttribute("aria-hidden")).toBe("false");
  });

  it("filters out false children", () => {
    const element = el("div", {
      children: [el("span"), false, el("button")],
    });
    expect(element.children.length).toBe(2);
  });

  it("filters out null and undefined children", () => {
    const element = el("div", {
      children: [null, el("span"), undefined],
    });
    expect(element.children.length).toBe(1);
    expect(element.children[0].tagName).toBe("SPAN");
  });

  it("supports conditional children pattern", () => {
    const showExtra = false;
    const element = el("div", {
      children: [
        el("span", { textContent: "always" }),
        showExtra && el("span", { textContent: "conditional" }),
      ],
    });
    expect(element.children.length).toBe(1);
    expect(element.textContent).toBe("always");
  });

  it("accepts a single child without wrapping in array", () => {
    const element = el("div", {
      children: el("span", { textContent: "only child" }),
    });
    expect(element.children.length).toBe(1);
    expect(element.children[0].textContent).toBe("only child");
  });

  it("accepts a single string child without wrapping in array", () => {
    const element = el("p", { children: "hello" });
    expect(element.textContent).toBe("hello");
  });
});

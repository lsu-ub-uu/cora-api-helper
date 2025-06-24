import { screen } from "@testing-library/dom";
import { describe, expect, it, vi } from "vitest";
import dataName from "./dataName";
import * as getTextFromLinkModule from "../../utils/getTextFromLink.js";

describe("dataName", () => {
  it("renders a button", async () => {
    const metadata = {
      children: [{ name: "nameInData", value: "testName" }],
    };

    const dataNameComponent = dataName({ metadata });
    document.body.appendChild(dataNameComponent);
    expect(
      screen.getByRole("button", { name: /testName/i })
    ).toBeInTheDocument();
  });

  it("should be associated with a popover", () => {
    const metadata = {
      children: [{ name: "nameInData", value: "testName" }],
    };

    const dataNameComponent = dataName({ metadata });
    document.body.appendChild(dataNameComponent);
    const button = screen.getByRole("button", { name: /testName/i });
    expect(button.popoverTargetElement).toBeDefined();
    expect(button.popoverTargetAction).toBe("toggle");
  });

  it("loads popover content on beforetoggle event", async () => {
    vi.spyOn(getTextFromLinkModule, "default")
      .mockResolvedValueOnce("Test Heading")
      .mockResolvedValueOnce("Test Definition");

    const metadata = {
      children: [
        { name: "nameInData", value: "testName" },
        { name: "textId", value: "headingId" },
        { name: "defTextId", value: "defId" },
      ],
    };

    const dataNameComponent = dataName({ metadata });
    document.body.appendChild(dataNameComponent);

    const button = screen.getByRole("button", { name: /testName/i });
    const popover = button.popoverTargetElement;

    const event = new Event("beforetoggle");
    event.newState = "open";
    Object.defineProperty(event, "target", {
      value: popover,
    });
    await popover.dispatchEvent(event);

    await Promise.resolve();

    expect(popover.querySelector("h3").textContent).toBe("Test Heading");
    expect(popover.querySelector("p").textContent).toBe("Test Definition");
  });
});

import { describe, expect, it } from "vitest";
import { screen } from "@testing-library/dom";

import showPopover from "./popover";
import userEvent from "@testing-library/user-event";

describe("popover", () => {
  it("shows popover on trigger click", async () => {
    const trigger = document.createElement("button");
    trigger.textContent = "Click me";
    document.body.appendChild(trigger);

    showPopover({
      trigger,
      children: [document.createTextNode("Popover content")],
    });

    expect(screen.getByText("Popover content")).toBeInTheDocument();
  });

  it("closes popover on outside click", async () => {
    const trigger = document.createElement("button");
    trigger.textContent = "Click me";
    document.body.appendChild(trigger);

    showPopover({
      trigger,
      children: [document.createTextNode("Popover content")],
    });
    expect(screen.getByText("Popover content")).toBeInTheDocument();

    await userEvent.click(document.body);

    expect(screen.queryByText("Popover content")).not.toBeInTheDocument();
  });

  it("closes popover on Escape key press", async () => {
    const trigger = document.createElement("button");
    trigger.textContent = "Click me";
    document.body.appendChild(trigger);

    showPopover({
      trigger,
      children: [document.createTextNode("Popover content")],
    });
    expect(screen.getByText("Popover content")).toBeInTheDocument();

    await userEvent.keyboard("{Escape}");

    expect(screen.queryByText("Popover content")).not.toBeInTheDocument();
  });

  it("does not close popover on click inside popover", async () => {
    const trigger = document.createElement("button");
    trigger.textContent = "Click me";
    document.body.appendChild(trigger);

    showPopover({
      trigger,
      children: [document.createTextNode("Popover content")],
    });
    expect(screen.getByText("Popover content")).toBeInTheDocument();

    await userEvent.click(screen.getByText("Popover content"));

    expect(screen.getByText("Popover content")).toBeInTheDocument();
  });
});

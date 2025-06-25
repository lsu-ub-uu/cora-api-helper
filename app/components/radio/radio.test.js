import { screen } from "@testing-library/dom";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import radio from "./radio.js";

describe("radio", () => {
  it("should render radio component", () => {
    document.body.appendChild(
      radio({
        name: "testRadio",
        value: "option1",
        label: "Option 1",
        checked: true,
        onChange: vi.fn(),
      })
    );

    const radioElement = screen.getByRole("radio", { name: "Option 1" });
    expect(radioElement).toBeChecked();
    expect(radioElement).toHaveAttribute("name", "testRadio");
    expect(radioElement).toHaveAttribute("value", "option1");
  });

  it("should handle change event", async () => {
    const onChangeSpy = vi.fn();
    document.body.appendChild(
      radio({
        name: "testRadio",
        value: "option1",
        label: "Option 1",
        checked: false,
        onChange: onChangeSpy,
      })
    );

    const radioElement = screen.getByRole("radio", { name: "Option 1" });
    await userEvent.click(radioElement);

    expect(onChangeSpy).toHaveBeenCalledTimes(1);
    expect(radioElement).toBeChecked();
  });
});

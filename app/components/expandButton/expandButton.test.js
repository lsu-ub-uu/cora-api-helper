import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import expandButton from "./expandButton.js";
import { screen } from "@testing-library/dom";

describe("expandButton", () => {
  it("toggles on click", async () => {
    const onClickSpy = vi.fn();
    document.body.appendChild(expandButton({ onClick: onClickSpy }));
    await userEvent.click(
      screen.getByRole("button", { name: "Collapse element" })
    );
    expect(onClickSpy).toHaveBeenCalled();
    expect(
      screen.getByRole("button", { name: "Expand element" })
    ).toHaveTextContent("+");

    await userEvent.click(
      screen.getByRole("button", { name: "Expand element" })
    );
    expect(onClickSpy).toHaveBeenCalledTimes(2);
    expect(
      screen.getByRole("button", { name: "Collapse element" })
    ).toHaveTextContent("-");
  });
});

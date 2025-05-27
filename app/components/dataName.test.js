import { describe, expect, it, vi } from "vitest";
import dataName from "./dataName";
import { screen } from "@testing-library/dom";
import userEvent from "@testing-library/user-event";

vi.mock("../utils/getTextFromLink.js", () => ({
  default: vi.fn((textId) =>
    Promise.resolve(`Mocked Text for ${textId.value}`)
  ),
}));

describe("dataName", () => {
  it("renders a button and shows the texts on click", async () => {
    const metadata = {
      children: [
        { name: "nameInData", value: "Test Name" },
        { name: "textId", value: "text-id" },
        { name: "defTextId", value: "def-text-id" },
      ],
    };

    const dataNameComponent = dataName({ metadata });
    document.body.appendChild(dataNameComponent);
    expect(
      screen.getByRole("button", { name: /Show text for Test Name/i })
    ).toBeInTheDocument();

    await userEvent.click(
      screen.getByRole("button", { name: /Show text for Test Name/i })
    );

    expect(screen.getByText("Mocked Text for text-id")).toBeInTheDocument();
    expect(screen.getByText("Mocked Text for def-text-id")).toBeInTheDocument();
  });

  it("handles keyboard interaction", async () => {
    const metadata = {
      children: [
        { name: "nameInData", value: "Test Name" },
        { name: "textId", value: "text-id" },
        { name: "defTextId", value: "def-text-id" },
      ],
    };

    const dataNameComponent = dataName({ metadata });
    document.body.appendChild(dataNameComponent);
    const button = screen.getByRole("button", {
      name: /Show text for Test Name/i,
    });

    await userEvent.tab();
    expect(button).toHaveFocus();

    await userEvent.keyboard("{Enter}");
    expect(screen.getByText("Mocked Text for text-id")).toBeInTheDocument();
  });
});

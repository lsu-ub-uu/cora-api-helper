import { describe, expect, it } from "vitest";
import { screen } from "@testing-library/dom";
import userEvent from "@testing-library/user-event";
import collapsibleSection from "./collapsibleSection.js";

describe("collapsibleSection", () => {
  it("renders an open details element with an h3 summary", () => {
    const content = document.createElement("div");
    content.textContent = "Section content";

    document.body.appendChild(
      collapsibleSection({ title: "Request config", children: content }),
    );

    const heading = screen.getByRole("heading", { name: "Request config" });
    const details = heading.closest("details");
    expect(heading.parentElement.tagName).toBe("SUMMARY");
    expect(details).toHaveAttribute("open");
    expect(screen.getByText("Section content")).toBeVisible();
  });

  it("collapses and expands its content", async () => {
    const content = document.createElement("div");
    content.textContent = "Section content";
    document.body.appendChild(
      collapsibleSection({ title: "Request config", children: content }),
    );

    const summary = screen
      .getByRole("heading", { name: "Request config" })
      .closest("summary");
    const details = summary.closest("details");
    await userEvent.click(summary);

    expect(details).not.toHaveAttribute("open");
    expect(screen.getByText("Section content")).not.toBeVisible();

    await userEvent.click(summary);
    expect(details).toHaveAttribute("open");
    expect(screen.getByText("Section content")).toBeVisible();
  });
});

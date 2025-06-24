import { describe, expect, it, vi } from "vitest";
import navigation from "./navigation";
import { screen } from "@testing-library/dom";
import userEvent from "@testing-library/user-event";

describe("navigation", () => {
  it("renders navigation items for each record type", () => {
    document.body.appendChild(
      navigation({
        path: "/record/person/1",
        recordTypePool: {
          person: {
            children: [
              {
                name: "recordInfo",
                children: [{ name: "id", value: "person" }],
              },
            ],
          },
          output: {
            children: [
              {
                name: "recordInfo",
                children: [{ name: "id", value: "output" }],
              },
            ],
          },
        },
      })
    );

    expect(screen.getByRole("navigation")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /person/i })).toHaveAttribute(
      "href",
      "/record/person"
    );
    expect(screen.getByRole("link", { name: /output/i })).toHaveAttribute(
      "href",
      "/record/output"
    );
  });

  it("marks current page", () => {
    document.body.appendChild(
      navigation({
        path: "/record/output/1",
        recordTypePool: {
          person: {
            children: [
              {
                name: "recordInfo",
                children: [{ name: "id", value: "person" }],
              },
            ],
          },
          output: {
            children: [
              {
                name: "recordInfo",
                children: [{ name: "id", value: "output" }],
              },
            ],
          },
        },
      })
    );

    expect(screen.getByRole("link", { name: /output/i })).toHaveAttribute(
      "aria-current",
      "page"
    );
  });

  it("navigates to the correct page on click", async () => {
    const navigateMock = vi.fn();
    document.body.appendChild(
      navigation({
        path: "/record/output/1",
        navigate: navigateMock,
        recordTypePool: {
          person: {
            children: [
              {
                name: "recordInfo",
                children: [{ name: "id", value: "person" }],
              },
            ],
          },
          output: {
            children: [
              {
                name: "recordInfo",
                children: [{ name: "id", value: "output" }],
              },
            ],
          },
        },
      })
    );

    await userEvent.click(screen.getByRole("link", { name: /person/i }));
    expect(navigateMock).toHaveBeenCalled();
    expect(window.location.pathname).toBe("/record/person");
  });
});

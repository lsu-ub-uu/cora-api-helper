import { describe, expect, it, vi } from "vitest";
import textVariable from "./textVariable";
import { screen } from "@testing-library/dom";

describe("textVariable", () => {
  it("renders regex text", () => {
    const metadata = {
      children: [
        { name: "nameInData", value: "test" },
        { name: "regEx", value: "^[a-zA-Z0-9]+$" },
      ],
    };

    document.body.appendChild(
      textVariable({ metadata, repeatMin: "1", repeatMax: "1" })
    );

    expect(screen.getByText("test")).toBeInTheDocument();
    expect(screen.getByText("/^[a-zA-Z0-9]+$/")).toBeInTheDocument();
  });
});

import { screen } from "@testing-library/dom";
import { describe, expect, it } from "vitest";
import dataName from "./dataName";

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
});

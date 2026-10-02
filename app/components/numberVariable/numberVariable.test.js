import { describe, expect, it } from "vitest";
import numberVariable from "./numberVariable";
import { screen } from "@testing-library/dom";

describe("numberVariable", () => {
  it("renders min and max as integers when numberOfDecimals is 0", () => {
    const metadata = {
      children: [
        { name: "nameInData", value: "count" },
        { name: "min", value: "0" },
        { name: "max", value: "100" },
        { name: "numberOfDecimals", value: "0" },
      ],
    };

    document.body.appendChild(
      numberVariable({ metadata, repeatMin: "1", repeatMax: "1" }),
    );

    expect(screen.getByText("0 - 100")).toHaveClass("number-variable");
  });

  it("renders min and max with decimals", () => {
    const metadata = {
      children: [
        { name: "nameInData", value: "price" },
        { name: "min", value: "0" },
        { name: "max", value: "999" },
        { name: "numberOfDecimals", value: "2" },
      ],
    };

    document.body.appendChild(
      numberVariable({ metadata, repeatMin: "1", repeatMax: "1" }),
    );

    expect(screen.getByText("0.00 - 999.00")).toHaveClass("number-variable");
  });

  it("defaults numberOfDecimals to 0 when not present", () => {
    const metadata = {
      children: [
        { name: "nameInData", value: "age" },
        { name: "min", value: "1" },
        { name: "max", value: "200" },
      ],
    };

    document.body.appendChild(
      numberVariable({ metadata, repeatMin: "0", repeatMax: "1" }),
    );

    expect(screen.getByText("1 - 200")).toHaveClass("number-variable");
  });

  it("wraps content in an element with nameInData", () => {
    const metadata = {
      children: [
        { name: "nameInData", value: "score" },
        { name: "min", value: "0" },
        { name: "max", value: "10" },
        { name: "numberOfDecimals", value: "1" },
      ],
    };

    document.body.appendChild(
      numberVariable({ metadata, repeatMin: "1", repeatMax: "1" }),
    );

    expect(screen.getByText("score")).toBeInTheDocument();
  });

  it("renders finalValue", () => {
    const metadata = {
      children: [
        { name: "nameInData", value: "test" },
        { name: "finalValue", value: "42" },
      ],
    };

    document.body.appendChild(
      numberVariable({ metadata, repeatMin: "1", repeatMax: "1" }),
    );

    expect(screen.getByText("42")).toHaveClass("final-value");
  });
});

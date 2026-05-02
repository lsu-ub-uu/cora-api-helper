import { describe, expect, it } from "vitest";
import numberVariable from "./numberVariable";

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

    expect(document.body.textContent).toContain("0 - 100");
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

    expect(document.body.textContent).toContain("0.00 - 999.00");
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

    expect(document.body.textContent).toContain("1 - 200");
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

    expect(document.body.textContent).toContain("score");
    expect(document.body.textContent).toContain("0.0 - 10.0");
  });
});

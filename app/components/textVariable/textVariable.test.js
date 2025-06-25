import { describe, expect, it } from "vitest";
import textVariable from "./textVariable";

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

    expect(document.body.textContent).toEqual(
      "-<test>(1 - 1)/^[a-zA-Z0-9]+$/</test>"
    );
  });
});

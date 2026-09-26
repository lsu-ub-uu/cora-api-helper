import { describe, expect, it } from "vitest";
import legend from "./legend.js";
import { normalize } from "../../utils/normalize.js";

describe("legend", () => {
  it("should render legend", () => {
    const result = legend();

    const expectedContent = `
      Legend
      (0 - 1)   Repeat (min - max)
      value     Final value
      /.+/      value (RegEx)
      0 - 100   Number value (min - max)
      sv | en   Collection value
      {id}      Record ID
      🔒        Permission controlled
      The field is permission controlled. Only certain users may read and/or write this field
      Permission controlled
    `;
    expect(normalize(result.textContent)).toBe(normalize(expectedContent));
  });
});

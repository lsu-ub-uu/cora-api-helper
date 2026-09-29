import { describe, expect, it } from "vitest";
import legend from "./legend.js";
import { normalize } from "../../utils/normalize.js";

describe("legend", () => {
  it("should render legend", () => {
    const result = legend();

    const expectedContent = `
      Legend
      (0 - 1)
      Repeat (min - max)
      Repeat (min - max)
      Specifies the min and max times this element can be repeated. X means unlimited.
      value
      Final value
      Final value
      Value must be set to the final value
      /.+/
      Text value (RegEx)
      Text value (RegEx)
      Value must match regular expression
      0 - 100
      Number value (min - max)
      Number value (min - max)
      Value must be a number within range
      sv | en
      Collection value
      Collection value
      Value must be one of the listed values
      {id}
      Dynamic value
      Dynamic value
      Some dynamic value, such as a record ID
      ✍️
      Write restriction
      Write restriction
      The field can only be written to by users with the appropriate permission
      👁️
      Read and write restriction
      Read and write restriction
      The field can only be read and written to by users with the appropriate permission
    `;
    expect(normalize(result.textContent)).toBe(normalize(expectedContent));
  });
});

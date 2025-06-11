import { describe, expect, it } from "vitest";
import legend from "./legend.js";

describe("legend", () => {
  it("should render legend", () => {
    const result = legend();
    expect(result.tagName).toBe("DIV");
    expect(result.className).toBe("legend");

    const expectedHTML = `
            <h3>Legend</h3>
            <dl>
              <dt class="multiplicity">(0 - 1)</dt>
              <dd title="States how many times this element can be repeated">Repeat (min - max)</dd>
              <dt class="final-value">value</dt>
              <dd title="Value must be set to the final value">Final value</dd>
              <dt class="regex">/.+/</dt>
              <dd title="Value must match regular expression">Text value (RegEx)</dd>
              <dt  class="number-variable">0 - 100</dt>
              <dd title="Value must be a number within range">Number value (min - max)</dd>
              <dt class="collection-value">sv | en</dt>
              <dd title="Value must be one of the listed values">Enum value</dd>
              <dt class="id">{id}</dt>
              <dd title="Set to the ID of linked record">Record ID</dd>
            </dl>
          `;
    expect(normalizeHTML(result.innerHTML)).toBe(normalizeHTML(expectedHTML));
  });
});

function normalizeHTML(html) {
  return html.replace(/\s+/g, " ").trim();
}

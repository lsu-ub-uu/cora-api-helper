import { describe, expect, it } from "vitest";
import { normalize } from "./normalize";

describe("normalize", () => {
  it("removes all whitespace", () => {
    expect(normalize("  hello  \n  world  ")).toBe("helloworld");
  });

  it("removes multiple newlines", () => {
    expect(normalize("hello\n\n\nworld")).toBe("helloworld");
  });

  it("removes lines that are only whitespace", () => {
    expect(normalize("hello\n   \nworld")).toBe("helloworld");
  });

  it("ignores formatting whitespace around XML-like text", () => {
    expect(
      normalize(`
        -<record>(1 - 1)
          -<data>(1 - 1)
            hello world
          </data>
          -<actionLinks>(1 - 1)
          </actionLinks>
        </record>
      `),
    ).toBe(
      "-<record>(1-1)-<data>(1-1)helloworld</data>-<actionLinks>(1-1)</actionLinks></record>",
    );
  });

  it("ignores formatting whitespace around JSON-like text", () => {
    expect(
      normalize(`
        -{
          "record": {
            "data": {
              child
            }
          }
        }
      `),
    ).toBe('-{"record":{"data":{child}}}');
  });

  it("handles a single line", () => {
    expect(normalize("  hello  ")).toBe("hello");
  });

  it("returns empty string for empty input", () => {
    expect(normalize("")).toBe("");
  });

  it("returns empty string for whitespace-only input", () => {
    expect(normalize("   \n   \n   ")).toBe("");
  });
});

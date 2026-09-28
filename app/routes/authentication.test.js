import { describe, expect, it } from "vitest";

import authentication from "./authentication.js";

describe("authentication", () => {
  it("renders the authentication message", () => {
    const result = authentication();
    expect(result).toMatchSnapshot();
  });
});

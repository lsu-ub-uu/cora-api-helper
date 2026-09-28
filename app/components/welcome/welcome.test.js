import { describe, expect, it } from "vitest";
import welcomeMessage from "./welcome.js";

describe("welcomeMessage", () => {
  it("renders the welcome message", () => {
    const result = welcomeMessage();

    expect(result).toMatchSnapshot();
  });
});

import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/dom";
import { afterEach } from "vitest";

afterEach(() => {
  document.body.innerHTML = "";
});

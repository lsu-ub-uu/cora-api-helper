import "@testing-library/jest-dom/vitest";
import { afterEach, vi } from "vitest";

Element.prototype.scrollIntoView = () => {};

afterEach(() => {
  document.body.innerHTML = "";
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
});

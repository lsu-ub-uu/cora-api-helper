import { describe, expect, it, vi } from "vitest";
import { el } from "./utils/el.js";
import renderDeploymentInfo from "./utils/renderDeploymentInfo.js";
import initSettings from "./utils/initSettings";
import initPools from "./services/initPools";
import { screen } from "@testing-library/dom";
import currentPage from "./components/currentPage/currentPage.js";
import navigation from "./components/navigation/navigation.js";

vi.mock("./services/initPools.js", () => ({
  default: vi.fn(() =>
    Promise.resolve({
      recordTypePool: "recordType",
      validationTypePool: "validationType",
      metadataPool: "metadata",
      searchPool: "search",
    }),
  ),
}));
vi.mock("./utils/initSettings.js");
vi.mock("./utils/renderDeploymentInfo.js");
vi.mock("./components/navigation/navigation.js", () => ({
  default: vi.fn(() => {
    return el("nav", { textContent: "Mock navigation" });
  }),
}));
vi.mock("./components/currentPage/currentPage.js", () => ({
  default: vi.fn(() => {
    return el("main", { textContent: "Mock current page" });
  }),
}));

describe("main", () => {
  it("initializes the application", async () => {
    document.body.innerHTML = '<div id="app"></div>';

    vi.resetModules();
    await import("./main.js");

    expect(renderDeploymentInfo).toHaveBeenCalledOnce();
    expect(initSettings).toHaveBeenCalledOnce();
    expect(initPools).toHaveBeenCalledOnce();
    expect(navigation).toHaveBeenCalledOnce();
    expect(currentPage).toHaveBeenCalledOnce();

    expect(screen.getByText("Mock navigation")).toBeInTheDocument();
    expect(screen.getByText("Mock current page")).toBeInTheDocument();
  });
});

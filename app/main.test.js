import { beforeEach, describe, expect, it, vi } from "vitest";
import { el } from "./utils/el.js";
import renderDeploymentInfo from "./utils/renderDeploymentInfo.js";
import initSettings from "./utils/initSettings";
import initPools from "./services/initPools";
import { screen } from "@testing-library/dom";
import currentPage from "./components/currentPage/currentPage.js";
import navigation from "./components/navigation/navigation.js";

vi.mock("./services/initPools.js");
vi.mock("./utils/initSettings.js");
vi.mock("./utils/renderDeploymentInfo.js");
vi.mock("./components/navigation/navigation.js");
vi.mock("./components/currentPage/currentPage.js");

describe("main", () => {
  beforeEach(() => {
    vi.resetModules();
    vi.resetAllMocks();
  });

  it("initializes the application", async () => {
    initPools.mockResolvedValue({
      recordTypePool: "recordType",
      validationTypePool: "validationType",
      metadataPool: "metadata",
      searchPool: "search",
    });
    navigation.mockReturnValue(el("nav", { textContent: "Mock navigation" }));
    currentPage.mockReturnValue(
      el("main", { textContent: "Mock current page" }),
    );
    document.body.innerHTML = '<div id="app"></div>';

    vi.resetModules();
    await import("./main.js");

    expect(renderDeploymentInfo).toHaveBeenCalledOnce();
    expect(initSettings).toHaveBeenCalledOnce();
    expect(initPools).toHaveBeenCalledOnce();
    expect(navigation).toHaveBeenCalledExactlyOnceWith({
      path: "/",
      recordTypePool: "recordType",
      metadataPool: "metadata",
      navigate: expect.any(Function),
    });
    expect(currentPage).toHaveBeenCalledExactlyOnceWith({
      recordTypePool: "recordType",
      validationTypePool: "validationType",
      metadataPool: "metadata",
      searchPool: "search",
    });

    expect(screen.getByText("Mock navigation")).toBeInTheDocument();
    expect(screen.getByText("Mock current page")).toBeInTheDocument();
  });

  it("re-renders on browser navigation", async () => {
    initPools.mockResolvedValue({
      recordTypePool: "recordType",
      validationTypePool: "validationType",
      metadataPool: "metadata",
      searchPool: "search",
    });
    navigation
      .mockReturnValueOnce(el("nav", { textContent: "Mock navigation" }))
      .mockReturnValue(
        el("nav", { textContent: "Mock navigation Re-rendered" }),
      );
    currentPage
      .mockReturnValueOnce(el("main", { textContent: "Mock current page" }))
      .mockReturnValue(
        el("main", { textContent: "Mock current page Re-rendered" }),
      );
    document.body.innerHTML = '<div id="app"></div>';

    vi.resetModules();

    await import("./main.js");

    expect(screen.getByText("Mock navigation")).toBeInTheDocument();
    expect(screen.getByText("Mock current page")).toBeInTheDocument();

    window.dispatchEvent(new PopStateEvent("popstate"));

    expect(screen.getByText("Mock navigation Re-rendered")).toBeInTheDocument();
    expect(
      screen.getByText("Mock current page Re-rendered"),
    ).toBeInTheDocument();
  });
});

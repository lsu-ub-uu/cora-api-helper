import { beforeEach, describe, expect, it, vi } from "vitest";
import { el } from "./utils/el.js";
import renderDeploymentInfo from "./utils/renderDeploymentInfo.js";
import initSettings from "./utils/initSettings";
import fetchPools from "./services/fetchPools";
import { screen } from "@testing-library/dom";
import userEvent from "@testing-library/user-event";
import currentPage from "./components/currentPage/currentPage.js";
import navigation from "./components/navigation/navigation.js";

vi.mock("./services/fetchPools.js");
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
    fetchPools.mockResolvedValue({
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
    expect(fetchPools).toHaveBeenCalledOnce();
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
    fetchPools.mockResolvedValue({
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

  it("hides and restores the navigation", async () => {
    fetchPools.mockResolvedValue({
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

    await import("./main.js");

    const toggle = screen.getByRole("button", { name: "Hide navigation" });
    await userEvent.click(toggle);

    expect(toggle).toHaveAttribute("aria-expanded", "false");
    expect(document.getElementById("app")).toHaveClass("navigation-hidden");

    await userEvent.click(toggle);

    expect(toggle).toHaveAttribute("aria-expanded", "true");
    expect(document.getElementById("app")).not.toHaveClass("navigation-hidden");
  });
});

import { describe, expect, it, vi } from "vitest";
import getDeploymentInfo from "../services/getDeploymentInfo.js";
import renderDeploymentInfo from "./renderDeploymentInfo.js";
import { getTextById } from "../services/getTextFromLink.js";

vi.mock("../services/getDeploymentInfo.js");
vi.mock("../services/getTextFromLink.js");

describe("renderDeploymentInfo", () => {
  it("renders deployment info", async () => {
    document.body.innerHTML = `<div id="deployment-info"></div>
      <div id="system-name"></div>
    `;

    const mockDeploymentInfo = {
      deploymentName: "Test Deployment",
      applicationVersion: "1.0.0",
      applicationName: "testApp",
    };

    vi.mocked(getDeploymentInfo).mockResolvedValue(mockDeploymentInfo);

    await renderDeploymentInfo();

    expect(document.getElementById("deployment-info").textContent).toBe(
      "Test Deployment (1.0.0)",
    );
    expect(document.getElementById("system-name").textContent).toBe("TestApp");
    expect(document.getElementById("application-stylesheet")).toBeNull();
  });

  it.each(["diva", "alvin", "systemone"])(
    "loads the %s application stylesheet",
    async (applicationName) => {
      document.body.innerHTML = `<div id="deployment-info"></div>
        <div id="system-name"></div>
      `;

      vi.mocked(getDeploymentInfo).mockResolvedValue({
        deploymentName: "Test Deployment",
        applicationVersion: "1.0.0",
        applicationName,
      });

      await renderDeploymentInfo();

      expect(document.getElementById("application-stylesheet")).toHaveAttribute(
        "href",
        `/styles/${applicationName}.css`,
      );
    },
  );

  it("sets page title to system name", async () => {
    getTextById.mockResolvedValue("TestAPP");
    document.body.innerHTML = `<div id="deployment-info"></div>
      <div id="system-name"></div>
    `;

    vi.mocked(getDeploymentInfo).mockResolvedValue({
      deploymentName: "Test Deployment",
      applicationVersion: "1.0.0",
      applicationName: "testApp",
    });

    await renderDeploymentInfo();

    expect(document.title).toBe("TestAPP API Helper");
  });

  it("falls back to capitalized application name if getTextById returns empty", async () => {
    getTextById.mockResolvedValue("");
    document.body.innerHTML = `<div id="deployment-info"></div>
      <div id="system-name"></div>
    `;

    vi.mocked(getDeploymentInfo).mockResolvedValue({
      deploymentName: "Test Deployment",
      applicationVersion: "1.0.0",
      applicationName: "testApp",
    });

    await renderDeploymentInfo();

    expect(document.getElementById("system-name").textContent).toBe("TestApp");
    expect(document.title).toBe("TestApp API Helper");
  });

  it("handles errors gracefully", async () => {
    document.body.innerHTML = `<div id="deployment-info"></div>
      <div id="system-name"></div>
    `;

    const error = new Error("Failed to fetch deployment info");
    vi.mocked(getDeploymentInfo).mockRejectedValue(error);

    const consoleErrorSpy = vi
      .spyOn(console, "error")
      .mockImplementation(() => {});

    await renderDeploymentInfo();

    expect(consoleErrorSpy).toHaveBeenCalledWith(
      "Failed to render deployment info:",
      error,
    );
  });
});

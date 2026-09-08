import { describe, expect, it, vi } from "vitest";
import getDeploymentInfo from "../services/getDeploymentInfo.js";
import renderDeploymentInfo from "./renderDeploymentInfo.js";

vi.mock("../services/getDeploymentInfo.js");

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

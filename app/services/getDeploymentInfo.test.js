import { describe, expect, it, vi } from "vitest";
import getDeploymentInfo from "./getDeploymentInfo.js";

describe("getDeploymentInfo", () => {
  it("should return deployment info", async () => {
    const mockResponse = {
      applicationName: "diva",
      deploymentName: "DiVA - preview 👀",
      coraVersion: "4.19.0",
      helmChartVersion: "0.221.0",
      applicationVersion: "2026.6-dev",
      urls: {
        REST: "https://preview.diva.cora.epc.ub.uu.se/rest/",
        appTokenLogin:
          "https://preview.diva.cora.epc.ub.uu.se/login/rest/apptoken",
        passwordLogin:
          "https://preview.diva.cora.epc.ub.uu.se/login/rest/password",
        record: "https://preview.diva.cora.epc.ub.uu.se/rest/record/",
        recordType:
          "https://preview.diva.cora.epc.ub.uu.se/rest/record/recordType",
        iiif: "https://preview.diva.cora.epc.ub.uu.se/iiif/",
      },
      exampleUsers: [
        {
          name: "Some user",
          text: "Apptoken, user:182924359788077",
          type: "appTokenLogin",
          loginId: "someUser@diva.cora.uu.se",
          appToken: "xxx",
        },
      ],
    };

    vi.stubGlobal(
      "fetch",
      vi.fn(() =>
        Promise.resolve({
          json: () => Promise.resolve(mockResponse),
        }),
      ),
    );

    const result = await getDeploymentInfo();
    
    expect(fetch).toHaveBeenCalledWith(`${window.location.origin}/rest/`, {
        headers: {
            Accept: "application/vnd.cora.deploymentInfo+json",
        },
    });

    expect(result).toEqual(mockResponse);
  });

});

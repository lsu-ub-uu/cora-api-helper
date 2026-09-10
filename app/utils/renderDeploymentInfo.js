import getDeploymentInfo from "../services/getDeploymentInfo.js";
import t from "./t.js";

export default async function renderDeploymentInfo() {
  try {
    const deploymentInfo = await getDeploymentInfo();
    console.log({ deploymentInfo });
    document.getElementById("deployment-info").textContent =
      `${deploymentInfo.deploymentName} (${deploymentInfo.applicationVersion})`;
    document.getElementById("system-name").textContent = t(
      "apiHelper_systemNameText",
    );
  } catch (error) {
    console.error("Failed to render deployment info:", error);
  }
}

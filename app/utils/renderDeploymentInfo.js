import getDeploymentInfo from "../services/getDeploymentInfo.js";

export default async function renderDeploymentInfo() {
  try {
    const deploymentInfo = await getDeploymentInfo();
    console.log({ deploymentInfo });
    document.getElementById("deployment-info").textContent =
      `${deploymentInfo.deploymentName} (${deploymentInfo.applicationVersion})`;
    document.getElementById("system-name").textContent =
      deploymentInfo.applicationName.slice(0, 1).toUpperCase() +
      deploymentInfo.applicationName.slice(1);
  } catch (error) {
    console.error("Failed to render deployment info:", error);
  }
}

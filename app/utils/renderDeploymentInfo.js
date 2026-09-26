import getDeploymentInfo from "../services/getDeploymentInfo.js";
import { getBasePath } from "./routing.js";

const applicationStylesheets = {
  diva: "diva.css",
  alvin: "alvin.css",
  systemone: "systemone.css",
};

export default async function renderDeploymentInfo() {
  try {
    const deploymentInfo = await getDeploymentInfo();
    loadApplicationStylesheet(deploymentInfo.applicationName);
    document.getElementById("deployment-info").textContent =
      `${deploymentInfo.deploymentName} (${deploymentInfo.applicationVersion})`;
    document.getElementById("system-name").textContent =
      deploymentInfo.applicationName.slice(0, 1).toUpperCase() +
      deploymentInfo.applicationName.slice(1);
  } catch (error) {
    console.error("Failed to render deployment info:", error);
  }
}

function loadApplicationStylesheet(applicationName) {
  const stylesheet = document.getElementById("application-stylesheet");
  const stylesheetName = applicationStylesheets[applicationName.toLowerCase()];

  if (!stylesheetName) {
    stylesheet?.remove();
    return;
  }

  const link =
    stylesheet ??
    document.head.appendChild(
      Object.assign(document.createElement("link"), {
        id: "application-stylesheet",
        rel: "stylesheet",
      }),
    );

  link.href = `${getBasePath()}/styles/${stylesheetName}`;
}

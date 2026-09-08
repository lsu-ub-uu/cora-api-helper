import authentication from "./components/authentication/authentication.js";
import navigation from "./components/navigation/navigation.js";
import recordType from "./components/recordType/recordType.js";
import getDeploymentInfo from "./services/getDeploymentInfo.js";
import listRecordType from "./services/listRecordType.js";
import { el } from "./utils/el.js";
import { getCurrentRoute, getRecordTypeId } from "./utils/routing.js";

const root = document.getElementById("app");

const { recordTypePool, validationTypePool, metadataPool, searchPool } =
  await initPools();

window.addEventListener("popstate", () => {
  render();
});

render();

async function initPools() {
  const loadingTextTimeout = setTimeout(() => {
    root.innerHTML = `Loading metadata, please wait...`;
  }, 200);

  console.log("Loading metadata pools...");
  const [recordTypePool, validationTypePool, metadataPool] = await Promise.all([
    listRecordType("recordType"),
    listRecordType("validationType"),
    listRecordType("metadata"),
  ]);

  renderDeploymentInfo();

  clearTimeout(loadingTextTimeout);

  console.log("Pools loaded!", {
    recordTypePool,
    validationTypePool,
    metadataPool,
    searchPool,
  });

  return {
    recordTypePool,
    validationTypePool,
    metadataPool,
    searchPool,
  };
}

function render() {
  const path = window.location.pathname;

  root.replaceChildren(
    navigation({
      path,
      recordTypePool,
      metadataPool,
      navigate: () => render(),
    }),
    currentPage(),
  );
}

function currentPage() {
  const recordTypeId = getRecordTypeId();
  const currentRoute = getCurrentRoute();

  if (currentRoute === "recordType" && recordTypeId) {
    return recordType({
      recordTypeId,
      recordTypePool,
      validationTypePool,
      metadataPool,
      searchPool,
    });
  } else if (currentRoute === "authentication") {
    return authentication();
  } else {
    return welcomeMessage();
  }
}

function welcomeMessage() {
  return el("div", {
    children: [
      el("h2", { textContent: "Welcome to the API helper!" }),
      el("p", {
        textContent: "This tool helps you explore the Cora REST API.",
      }),
      el("p", {
        textContent:
          "Select a record type from the navigation to the left to begin. ⬅️",
      }),
      el("p", {
        textContent:
          "You can set your preferred data format, language and API URL in the settings at the top right. ↗️",
      }),
    ],
  });
}

async function renderDeploymentInfo() {
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

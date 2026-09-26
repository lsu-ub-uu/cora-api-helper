import currentPage from "./components/currentPage/currentPage.js";
import navigation from "./components/navigation/navigation.js";
import fetchPools from "./services/fetchPools.js";
import { el } from "./utils/el.js";
import initSettings from "./utils/initSettings.js";
import renderDeploymentInfo from "./utils/renderDeploymentInfo.js";
import t from "./utils/t.js";
import { applicationErrorBoundary } from "./components/errorBoundary/errorBoundary.js";

let navigationVisible = true;

let pools;

try {
  renderDeploymentInfo();
  initSettings();
  pools = await fetchPools();
} catch (error) {
  console.error("Failed to initialize application:", error);
  document
    .getElementById("app")
    .replaceChildren(applicationErrorBoundary(error));
}

if (pools) {
  window.addEventListener("popstate", renderSafely);
  renderSafely();
}

function render() {
  const root = document.getElementById("app");
  const path = window.location.pathname;
  const {
    recordTypePool,
    validationTypePool,
    metadataPool,
    searchPool,
    systemPool,
  } = pools;
  const navigationElement = navigation({
    path,
    recordTypePool,
    metadataPool,
    systemPool,
    navigate: render,
  });
  navigationElement.id = "main-navigation";

  root.classList.toggle("navigation-hidden", !navigationVisible);

  root.replaceChildren(
    el("div", {
      className: "navigation-panel",
      children: [navigationToggle(root), navigationElement],
    }),
    currentPage({
      recordTypePool,
      validationTypePool,
      metadataPool,
      searchPool,
    }),
  );
}

function renderSafely() {
  try {
    render();
  } catch (error) {
    console.error("Failed to render application:", error);
    document
      .getElementById("app")
      .replaceChildren(applicationErrorBoundary(error));
  }
}

function navigationToggle(root) {
  const toggle = el("button", {
    className: "navigation-toggle",
    type: "button",
    "aria-controls": "main-navigation",
  });

  function render() {
    toggle.textContent = navigationVisible ? `❮❮ ${t("navigation")}` : "❯❯";
    toggle.setAttribute("aria-expanded", navigationVisible);
    toggle.setAttribute(
      "aria-label",
      navigationVisible ? t("collapseNavigation") : t("expandNavigation"),
    );
  }

  toggle.addEventListener("click", () => {
    navigationVisible = !navigationVisible;
    root.classList.toggle("navigation-hidden", !navigationVisible);
    render();
  });
  render();

  return toggle;
}

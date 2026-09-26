import currentPage from "./components/currentPage/currentPage.js";
import navigation from "./components/navigation/navigation.js";
import fetchPools from "./services/fetchPools.js";
import { el } from "./utils/el.js";
import initSettings from "./utils/initSettings.js";
import renderDeploymentInfo from "./utils/renderDeploymentInfo.js";
import t from "./utils/t.js";

let navigationVisible = true;

renderDeploymentInfo();
initSettings();
const {
  recordTypePool,
  validationTypePool,
  metadataPool,
  searchPool,
  systemPool,
} = await fetchPools();

window.addEventListener("popstate", render);
render();

function render() {
  const root = document.getElementById("app");
  const path = window.location.pathname;
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

function navigationToggle(root) {
  const toggle = el("button", {
    className: "navigation-toggle",
    type: "button",
    "aria-controls": "main-navigation",
  });

  function render() {
    toggle.textContent = navigationVisible ? `❮❮ ${t("navigation")}` : "❯❯";
    toggle.setAttribute("aria-expanded", navigationVisible);
  }

  toggle.addEventListener("click", () => {
    navigationVisible = !navigationVisible;
    root.classList.toggle("navigation-hidden", !navigationVisible);
    render();
  });
  render();

  return toggle;
}

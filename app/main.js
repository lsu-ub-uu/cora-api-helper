import currentPage from "./components/currentPage/currentPage.js";
import navigation from "./components/navigation/navigation.js";
import initPools from "./services/initPools.js";
import initSettings from "./utils/initSettings.js";
import renderDeploymentInfo from "./utils/renderDeploymentInfo.js";

renderDeploymentInfo();
initSettings();
const { recordTypePool, validationTypePool, metadataPool, searchPool } =
  await initPools();

window.addEventListener("popstate", render);
render();

function render() {
  const root = document.getElementById("app");
  const path = window.location.pathname;

  root.replaceChildren(
    navigation({
      path,
      recordTypePool,
      metadataPool,
      navigate: render,
    }),
    currentPage({
      recordTypePool,
      validationTypePool,
      metadataPool,
      searchPool,
    }),
  );
}

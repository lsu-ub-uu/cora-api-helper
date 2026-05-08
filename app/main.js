import navigation from "./components/navigation/navigation.js";
import recordType from "./components/recordType/recordType.js";
import listRecordType from "./services/listRecordType.js";
import { el } from "./utils/el.js";
import { getRecordTypeId } from "./utils/routing.js";

const root = document.getElementById("app");

const { recordTypePool, validationTypePool, metadataPool } = await initPools();

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
  clearTimeout(loadingTextTimeout);

  console.log("Pools loaded!", {
    recordTypePool,
    validationTypePool,
    metadataPool,
  });

  return {
    recordTypePool,
    validationTypePool,
    metadataPool,
  };
}

function render() {
  const path = window.location.pathname;
  const recordTypeId = getRecordTypeId();

  root.innerHTML = "";
  root.appendChild(
    navigation({
      path,
      recordTypePool,
      metadataPool,
      navigate: () => render(),
    }),
  );

  if (recordTypeId) {
    root.appendChild(
      recordType({
        recordTypeId,
        recordTypePool,
        validationTypePool,
        metadataPool,
      }),
    );
  } else {
    const welcomeMessage = el("div", {
      children: [
        el("h2", { textContent: "Welcome to the Cora API helper!" }),
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

    root.appendChild(welcomeMessage);
  }
}

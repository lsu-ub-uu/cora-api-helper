import navigation from "./components/navigation/navigation.js";
import recordType from "./components/recordType/recordType.js";
import listRecordType from "./services/listRecordType.js";

const { recordTypePool, validationTypePool, metadataPool } = await initPools();

const root = document.getElementById("app");

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
  const recordTypeId = path.split("/").pop();

  root.innerHTML = "";
  root.appendChild(
    navigation({
      path,
      recordTypePool,
      metadataPool,
      navigate: () => render(),
    })
  );

  if (recordTypeId) {
    root.appendChild(
      recordType({
        recordTypeId,
        recordTypePool,
        validationTypePool,
        metadataPool,
      })
    );
  } else {
    const welcomeMessage = document.createElement("div");
    welcomeMessage.innerHTML = `
    <h2>Welcome to the Cora API helper!</h2>
    <p>This tool helps you explore the Cora REST API.</p>
    <p>Select a record type from the navigation to the left to begin. ⬅️</p>
    <p>You can set your preferred data format, language and API URL in the settings at the top right. ↗️</p>
    `;

    root.appendChild(welcomeMessage);
  }
}

import navigation from "./components/navigation/navigation.js";
import recordType from "./components/recordType/recordType.js";
import listRecordType from "./services/listRecordType.js";

const pools = await loadPools();

window.addEventListener("popstate", () => {
  render(pools);
});

render(pools);

async function loadPools() {
  const loadingTextTimeout = setTimeout(() => {
    document.getElementById(
      "app"
    ).innerHTML = `Loading metadata, please wait...`;
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

function render({ recordTypePool, validationTypePool, metadataPool }) {
  const path = window.location.pathname;
  const root = document.getElementById("app");
  const recordTypeId = path.split("/").pop();

  root.innerHTML = "";
  root.appendChild(
    navigation({
      path,
      recordTypePool,
      metadataPool,
      navigate: () => render(pools),
    })
  );
  root.appendChild(
    recordType({
      recordTypeId,
      recordTypePool,
      validationTypePool,
      metadataPool,
    })
  );
}

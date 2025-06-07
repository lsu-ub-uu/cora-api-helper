import navigation from "./components/navigation.js";
import validationType from "./components/validationType.js";
import listRecordType from "./services/listRecordType.js";

const pools = await loadPools();

window.addEventListener("popstate", () => {
  navigate(pools);
});

navigate(pools);

async function loadPools() {
  const loadingTextTimeout = setTimeout(() => {
    document.getElementById(
      "root"
    ).innerHTML = `Loading metadata, please wait...`;
  }, 200);

  console.log("Loading metadata pools...");
  const [recordTypePool, validationTypePool, metadataPool, textPool] =
    await Promise.all([
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

function navigate({ recordTypePool, validationTypePool, metadataPool }) {
  const path = window.location.pathname;
  const root = document.getElementById("app");
  root.innerHTML = "";
  root.appendChild(
    navigation({
      path,
      recordTypePool,
      navigate: () => navigate(pools),
    })
  );
  root.appendChild(
    validationType({ path, recordTypePool, validationTypePool, metadataPool })
  );
}

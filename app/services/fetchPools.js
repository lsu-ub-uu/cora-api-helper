import listRecordType from "./listRecordType.js";
import t from "../utils/t.js";

export default async function fetchPools() {
  const loadingTextTimeout = setTimeout(() => {
    document.getElementById("app").innerHTML = t("loadingMetadata");
  }, 200);

  const [
    recordTypePool,
    validationTypePool,
    metadataPool,
    searchPool,
    systemPool,
  ] = await Promise.all([
    listRecordType("recordType"),
    listRecordType("validationType"),
    listRecordType("metadata"),
    listRecordType("search"),
    listRecordType("system"),
  ]);

  clearTimeout(loadingTextTimeout);

  return {
    recordTypePool,
    validationTypePool,
    metadataPool,
    searchPool,
    systemPool,
  };
}

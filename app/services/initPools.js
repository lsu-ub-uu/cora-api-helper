import listRecordType from "./listRecordType.js";

export default async function initPools() {
  const loadingTextTimeout = setTimeout(() => {
    document.getElementById("app").innerHTML =
      `Loading metadata, please wait...`;
  }, 200);

  const [recordTypePool, validationTypePool, metadataPool, searchPool] =
    await Promise.all([
      listRecordType("recordType"),
      listRecordType("validationType"),
      listRecordType("metadata"),
      listRecordType("search"),
    ]);

  clearTimeout(loadingTextTimeout);

  return {
    recordTypePool,
    validationTypePool,
    metadataPool,
    searchPool,
  };
}

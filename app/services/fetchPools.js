import listRecordType from "./listRecordType.js";
import t from "../utils/t.js";
import { getFirstChildWithName } from "../utils/coraDataUtils.js";
import getTextFromLink from "./getTextFromLink.js";

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

  await warmRecordTypeTextCache(recordTypePool);

  clearTimeout(loadingTextTimeout);

  return {
    recordTypePool,
    validationTypePool,
    metadataPool,
    searchPool,
    systemPool,
  };
}

/** Pre-load record type texts so that they are available in the cache */
async function warmRecordTypeTextCache(recordTypePool) {
  await Promise.all(
    Object.values(recordTypePool).map(async (recordType) => {
      const recordTypeTextId = getFirstChildWithName(recordType, "textId");
      const recordTypeDefTextId = getFirstChildWithName(
        recordType,
        "defTextId",
      );
      await Promise.all([
        getTextFromLink(recordTypeTextId),
        getTextFromLink(recordTypeDefTextId),
      ]);
    }),
  );
}

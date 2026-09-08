import { getRecordTypeId, getCurrentRoute } from "../../utils/routing.js";
import recordType from "../../routes/recordType.js";
import authentication from "../../routes/authentication.js";
import welcomeMessage from "../../routes/welcome.js";

export default function currentPage({
  recordTypePool,
  validationTypePool,
  metadataPool,
  searchPool,
}) {
  const recordTypeId = getRecordTypeId();
  const currentRoute = getCurrentRoute();

  if (currentRoute === "recordType" && recordTypeId) {
    return recordType({
      recordTypeId,
      recordTypePool,
      validationTypePool,
      metadataPool,
      searchPool,
    });
  }

  if (currentRoute === "authentication") {
    return authentication();
  }

  return welcomeMessage();
}

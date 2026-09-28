import { getRecordTypeId, getCurrentRoute } from "../../utils/routing.js";
import recordType from "../recordType/recordType.js";
import authentication from "../../routes/authentication.js";
import welcomeMessage from "../welcome/welcome.js";
import errorBoundary from "../errorBoundary/errorBoundary.js";

export default function currentPage({
  recordTypePool,
  validationTypePool,
  metadataPool,
  searchPool,
}) {
  const recordTypeId = getRecordTypeId();
  const currentRoute = getCurrentRoute();

  if (currentRoute === "recordType" && recordTypeId) {
    try {
      return recordType({
        recordTypeId,
        recordTypePool,
        validationTypePool,
        metadataPool,
        searchPool,
      });
    } catch (error) {
      console.error("Failed to render record type:", error);
      return errorBoundary({
        error,
      });
    }
  }

  if (currentRoute === "authentication") {
    return authentication();
  }

  return welcomeMessage();
}

import getFirstChildWithName from "../../utils/getFirstChildWithName.js";
import dataFormat from "../dataFormat/dataFormat.js";
import requestConfigDoc from "./requestConfigDoc.js";

export default function recordTypeRead({
  recordTypePool,
  metadataPool,
  recordTypeId,
}) {
  const root = document.createDocumentFragment();
  const recordType = recordTypePool[recordTypeId];
  const metadataLink = getFirstChildWithName(recordType, "metadataId");
  const metadataId = getFirstChildWithName(
    metadataLink,
    "linkedRecordId"
  ).value;

  root.appendChild(requestConfigDoc({ recordTypeId, method: "read" }));

  const heading = document.createElement("h3");
  heading.textContent = "Response body format";
  root.appendChild(heading);

  root.appendChild(
    dataFormat({
      metadataPool,
      rootGroupId: metadataId,
      dataWrapper: true,
    })
  );
  return root;
}

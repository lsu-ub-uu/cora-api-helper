import { el } from "../../utils/el.js";
import getFirstChildWithName from "../../utils/getFirstChildWithName.js";
import t from "../../utils/t.js";
import dataFormat from "../dataFormat/dataFormat.js";
import dataWrapper from "../dataWrapper/dataWrapper.js";
import group from "../group/group.js";
import requestConfigDoc from "./requestConfigDoc.js";

export default function recordTypeRead({
  recordTypePool,
  metadataPool,
  recordTypeId,
}) {
  const recordType = recordTypePool[recordTypeId];
  const metadataLink = getFirstChildWithName(recordType, "metadataId");
  const metadataId = getFirstChildWithName(
    metadataLink,
    "linkedRecordId",
  ).value;

  return el("fragment", {
    children: [
      requestConfigDoc({ recordTypeId, method: "read" }),
      el("h3", { textContent: t("apiHelper_responseBodyFormatText") }),
      dataFormat({
        children: dataWrapper({
          children: group({
            metadataPool,
            groupId: metadataId,
          }),
        }),
      }),
    ],
  });
}

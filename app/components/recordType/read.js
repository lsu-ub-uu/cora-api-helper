import { el } from "../../utils/el.js";
import { getFirstChildWithName } from "../../utils/coraDataUtils.js";
import t from "../../utils/t.js";
import collapsibleSection from "../collapsibleSection/collapsibleSection.js";
import dataFormat from "../dataFormat/dataFormat.js";
import recordWrapper from "../recordWrapper/recordWrapper.js";
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
      collapsibleSection({
        title: t("apiHelper_responseBodyFormatText"),
        children: dataFormat({
          children: recordWrapper({
            recordType: recordTypeId,
            children: group({
              metadataPool,
              groupId: metadataId,
              mode: "read",
            }),
          }),
        }),
      }),
    ],
  });
}

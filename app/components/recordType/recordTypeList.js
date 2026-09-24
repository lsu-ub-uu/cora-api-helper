import { el } from "../../utils/el.js";
import { getFirstChildWithName } from "../../utils/coraDataUtils.js";
import { getApiUrl, getFormat } from "../../utils/searchParams.js";
import t from "../../utils/t.js";
import collapsibleSection from "../collapsibleSection/collapsibleSection.js";
import dataFormat from "../dataFormat/dataFormat.js";
import group from "../group/group.js";
import recordListWrapper from "../recordListWrapper/recordListWrapper.js";
import recordWrapper from "../recordWrapper/recordWrapper.js";

export default function recordTypeList({
  recordTypePool,
  recordTypeId,
  metadataPool,
}) {
  return el("fragment", {
    children: [
      collapsibleSection({
        title: t("apiHelper_requestConfigText"),
        children: listRequestConfigDoc({ recordTypeId }),
      }),
      collapsibleSection({
        title: t("apiHelper_responseBodyFormatText"),
        children: listResponseBody({
          recordTypePool,
          recordTypeId,
          metadataPool,
        }),
      }),
    ],
  });
}

function listRequestConfigDoc({ recordTypeId }) {
  const apiUrl = getApiUrl();
  const format = getFormat();

  return el("div", {
    className: "code-block",
    children: [
      el("strong", { textContent: t("apiHelper_getText") }),
      ` ${apiUrl}/record/${recordTypeId}`,
      el("br"),
      el("br"),
      el("div", {
        textContent: `Accept: application/vnd.cora.recordList+${format}`,
      }),
      el("div", { textContent: t("apiHelper_authTokenText") }),
    ],
  });
}

function listResponseBody({ recordTypePool, recordTypeId, metadataPool }) {
  const recordType = recordTypePool[recordTypeId];
  const metadataLink = getFirstChildWithName(recordType, "metadataId");
  const metadataId = getFirstChildWithName(
    metadataLink,
    "linkedRecordId",
  ).value;

  return dataFormat({
    children: recordListWrapper({
      children: recordWrapper({
        recordType: recordTypeId,
        repeating: true,
        children: group({
          metadataPool,
          groupId: metadataId,
          mode: "read",
        }),
      }),
    }),
  });
}

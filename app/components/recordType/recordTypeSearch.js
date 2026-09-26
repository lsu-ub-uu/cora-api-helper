import { el } from "../../utils/el.js";
import { getFirstChildWithName } from "../../utils/coraDataUtils.js";
import getTextFromLink from "../../services/getTextFromLink.js";
import {
  getApiUrl,
  getFormat,
  getSearchId,
  updateSearchParam,
} from "../../utils/searchParams.js";
import t from "../../utils/t.js";
import collapsibleSection from "../collapsibleSection/collapsibleSection.js";
import dataFormat from "../dataFormat/dataFormat.js";
import recordWrapper from "../recordWrapper/recordWrapper.js";
import group from "../group/group.js";
import recordListWrapper from "../recordListWrapper/recordListWrapper.js";
import search from "../search/search.js";

export function recordTypeSearch({
  searchPool,
  recordTypePool,
  recordTypeId,
  metadataPool,
}) {
  const searchesForRecordType = getSearchesForRecordType({
    searchPool,
    recordTypeId,
  });
  const searchRoot = el("div", { className: "record-type" });

  const root = el("fragment", {
    children: [
      searchSelect({
        searches: searchesForRecordType,
        onChange: (searchId) => {
          updateSearchParam("searchId", searchId);
          renderSearch();
        },
      }),
      searchRoot,
      collapsibleSection({
        title: t("responseBodyFormat"),
        children: searchResponseBody({
          recordTypePool,
          recordTypeId,
          metadataPool,
        }),
      }),
    ],
  });

  function renderSearch() {
    const searchIdFromUrl = getSearchId();
    const matchingSearch =
      searchesForRecordType.find(
        (search) =>
          getFirstChildWithName(
            getFirstChildWithName(search, "recordInfo"),
            "id",
          ).value === searchIdFromUrl,
      ) ?? searchesForRecordType[0];
    const searchId = getFirstChildWithName(
      getFirstChildWithName(matchingSearch, "recordInfo"),
      "id",
    ).value;

    searchRoot.replaceChildren(
      collapsibleSection({
        title: t("requestConfig"),
        children: searchRequestConfigDoc({ searchId }),
      }),
      collapsibleSection({
        title: t("searchDataFormat"),
        children: search({
          search: matchingSearch,
          metadataPool,
        }),
      }),
    );
  }

  renderSearch();

  return root;
}

function getSearchesForRecordType({ searchPool, recordTypeId }) {
  return Object.values(searchPool).filter((search) => {
    const recordTypeLink = getFirstChildWithName(
      search,
      "recordTypeToSearchIn",
    );
    const linkedRecordTypeId = getFirstChildWithName(
      recordTypeLink,
      "linkedRecordId",
    )?.value;
    return linkedRecordTypeId === recordTypeId;
  });
}

function searchSelect({ searches, onChange }) {
  return el("label", {
    textContent: t("selectSearch"),
    children: [
      el("select", {
        children: searches.map((search) => searchOption(search)),
        onChange: (event) => {
          onChange(event.target.value);
        },
      }),
    ],
  });
}

function searchOption(search) {
  const recordInfo = getFirstChildWithName(search, "recordInfo");
  const searchId = getFirstChildWithName(recordInfo, "id").value;
  const option = el("option", {
    textContent: searchId,
    value: searchId,
  });
  getTextFromLink(getFirstChildWithName(search, "textId")).then((text) => {
    option.textContent = `${text} (${searchId})`;
  });
  return option;
}

function searchResponseBody({ recordTypePool, recordTypeId, metadataPool }) {
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

function searchRequestConfigDoc({ searchId }) {
  const format = getFormat();
  const apiUrl = getApiUrl();

  return el("div", {
    className: "code-block",
    children: [
      el("strong", { textContent: t("get") }),
      ` ${apiUrl}/record/searchResult/${searchId}?searchData=`,
      el("span", {
        className: "highlight",
        textContent: `{${format} search data}`,
      }),
      el("br"),
      el("br"),
      el("div", {
        textContent: `Accept: application/vnd.cora.recordList+${format}`,
      }),
      el("div", {
        textContent: t("authToken"),
      }),
    ],
  });
}

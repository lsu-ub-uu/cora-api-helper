import { el } from "../../utils/el.js";
import getFirstChildWithName from "../../utils/getFirstChildWithName.js";
import getTextFromLink from "../../utils/getTextFromLink.js";
import { getSearchId, updateSearchParam } from "../../utils/searchParams.js";
import dataFormat from "../dataFormat/dataFormat.js";
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
  const searchRoot = el("div");
  const root = el("div", {
    children: [
      searchSelect({
        searches: searchesForRecordType,
        onChange: (searchId) => {
          updateSearchParam("searchId", searchId);
          renderSearch();
        },
      }),
      el("h3", { textContent: "Search data format" }),
      searchRoot,
      el("h3", { textContent: "Response body format" }),
      searchResponseBody({ recordTypePool, recordTypeId, metadataPool }),
    ],
  });

  function renderSearch() {
    const searchId = getSearchId();
    const matchingSearch = searchesForRecordType.find(
      (search) =>
        getFirstChildWithName(getFirstChildWithName(search, "recordInfo"), "id")
          .value === searchId,
    );

    searchRoot.replaceChildren(
      search({
        search: matchingSearch ?? searchesForRecordType[0],
        metadataPool,
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
    textContent: "Select search: ",
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
    metadataPool,
    rootGroupId: metadataId,
    recordList: true,
    dataWrapper: true,
  });
}

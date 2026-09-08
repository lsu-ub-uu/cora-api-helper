import { el } from "../../utils/el.js";
import getFirstChildWithName from "../../utils/getFirstChildWithName.js";
import getTextFromLink from "../../utils/getTextFromLink.js";

export function recordTypeSearch({ searchPool, recordTypeId }) {
  return el("div", { children: [searchSelect({ searchPool, recordTypeId })] });
}

function searchSelect({ searchPool, recordTypeId }) {
  const searches = Object.values(searchPool).filter((search) => {
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

  return el("label", {
    textContent: "Select search: ",
    children: [
      el("select", {
        children: searches.map((search) => searchOption(search)),
        onChange: (event) => {
          console.log("Selected search ID:", event.target.value);
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

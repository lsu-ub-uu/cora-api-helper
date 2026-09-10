import { el } from "../../utils/el.js";
import getFirstChildWithName from "../../utils/getFirstChildWithName.js";
import getTextFromLink from "../../utils/getTextFromLink.js";
import { getMethod, updateSearchParam } from "../../utils/searchParams.js";
import t from "../../utils/t.js";
import radio from "../radio/radio.js";
import createOrUpdateRecordType from "./createOrUpdate.js";
import recordTypeRead from "./read.js";
import requestConfigDoc from "./requestConfigDoc.js";
import { recordTypeSearch } from "./recordTypeSearch.js";

export default function recordType({
  recordTypeId,
  recordTypePool,
  validationTypePool,
  metadataPool,
  searchPool,
}) {
  let method = getMethod();

  const root = el("div", { className: "record-type" });

  function render() {
    root.replaceChildren(
      pageTitle({ recordTypePool, recordTypeId }),
      requestMethods({
        selectedMethod: method,
        onSelectMethod: (newMethod) => {
          method = newMethod;
          render();
        },
      }),
      requestDoc({
        method,
        validationTypePool,
        recordTypePool,
        metadataPool,
        recordTypeId,
        searchPool,
      }),
    );
  }

  render();

  return root;
}

function pageTitle({ recordTypePool, recordTypeId }) {
  const root = document.createElement("h2");
  root.textContent = recordTypeId;

  const recordType = recordTypePool[recordTypeId];
  const recordTypeTextId = getFirstChildWithName(recordType, "textId");
  getTextFromLink(recordTypeTextId).then((text) => {
    root.textContent = `${text} (${recordTypeId})`;
  });

  return root;
}

function requestMethods({ selectedMethod, onSelectMethod }) {
  const methods = ["read", "create", "update", "delete", "search"];
  const methodLabels = {
    read: t("apiHelper_readText"),
    create: t("apiHelper_createText"),
    update: t("apiHelper_updateText"),
    delete: t("apiHelper_deleteText"),
    search: t("apiHelper_searchText"),
  };

  return el("fieldset", {
    children: [
      el("legend", { textContent: t("apiHelper_selectRequestMethodText") }),
      ...methods.map((method) =>
        radio({
          name: "method",
          value: method,
          label: methodLabels[method],
          checked: selectedMethod === method,
          onChange: (value) => {
            updateSearchParam("method", value);
            onSelectMethod(value);
          },
        }),
      ),
    ],
  });
}

function requestDoc({
  method,
  validationTypePool,
  recordTypePool,
  metadataPool,
  searchPool,
  recordTypeId,
}) {
  if (method === "read") {
    return recordTypeRead({
      recordTypePool,
      metadataPool,
      recordTypeId,
    });
  } else if (method === "create" || method === "update") {
    return createOrUpdateRecordType({
      validationTypePool,
      metadataPool,
      recordTypeId,
      method,
    });
  } else if (method === "delete") {
    return requestConfigDoc({ recordTypeId, method });
  } else if (method === "search") {
    return recordTypeSearch({
      recordTypeId,
      recordTypePool,
      searchPool,
      metadataPool,
    });
  }
}

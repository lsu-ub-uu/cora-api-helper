import { el } from "../../utils/el.js";
import { getFirstChildWithName } from "../../utils/coraDataUtils.js";
import getTextFromLink from "../../services/getTextFromLink.js";
import { getMethod, updateSearchParam } from "../../utils/searchParams.js";
import t from "../../utils/t.js";
import radio from "../radio/radio.js";
import createOrUpdateRecordType from "./createOrUpdate.js";
import recordTypeRead from "./read.js";
import requestConfigDoc from "./requestConfigDoc.js";
import recordTypeList from "./recordTypeList.js";
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
  const root = el("h2", { textContent: recordTypeId });

  const recordType = recordTypePool[recordTypeId];
  const recordTypeTextId = getFirstChildWithName(recordType, "textId");
  getTextFromLink(recordTypeTextId).then((text) => {
    root.textContent = `${text} (${recordTypeId})`;
  });

  return root;
}

function requestMethods({ selectedMethod, onSelectMethod }) {
  const methods = ["read", "list", "search", "create", "update", "delete"];
  const methodLabels = {
    read: t("read"),
    list: t("list"),
    create: t("create"),
    update: t("update"),
    delete: t("delete"),
    search: t("search"),
  };

  return el("fieldset", {
    children: [
      el("legend", { textContent: t("selectRequestMethod") }),
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
  } else if (method === "list") {
    return recordTypeList({
      recordTypePool,
      recordTypeId,
      metadataPool,
    });
  } else if (method === "create" || method === "update") {
    return createOrUpdateRecordType({
      validationTypePool,
      recordTypePool,
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

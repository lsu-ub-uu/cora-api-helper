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
import errorBoundary from "../errorBoundary/errorBoundary.js";
import updateDocumentTitle from "../../utils/updateDocumentTitle.js";

export default function recordType({
  recordTypeId,
  recordTypePool,
  validationTypePool,
  metadataPool,
  searchPool,
}) {
  let method = getMethod();

  const root = el("div", { className: "record-type" });

  if (!recordTypePool[recordTypeId]) {
    const message = `${t("recordTypeNotFoundPrefix")} "${recordTypeId}" ${t("recordTypeNotFoundSuffix")}`;
    return errorBoundary({
      error: new Error(message),
    });
  }
  function render({ recordTypeText, recordTypeDefText }) {
    updateDocumentTitle(recordTypeText);
    root.replaceChildren(
      el("div", {
        children: [
          el("h2", { textContent: `${recordTypeText} (${recordTypeId})` }),
          el("p", { textContent: recordTypeDefText }),
        ],
      }),
      requestMethods({
        selectedMethod: method,
        onSelectMethod: (newMethod) => {
          method = newMethod;
          render({ recordTypeText, recordTypeDefText });
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

  getTexts(recordTypePool[recordTypeId]).then(
    ({ recordTypeText, recordTypeDefText }) => {
      render({ recordTypeText, recordTypeDefText });
    },
  );

  return root;
}

function getTexts(recordType) {
  const recordTypeTextId = getFirstChildWithName(recordType, "textId");
  const recordTypeDefTextId = getFirstChildWithName(recordType, "defTextId");

  return Promise.all([
    getTextFromLink(recordTypeTextId),
    getTextFromLink(recordTypeDefTextId),
  ]).then(([recordTypeText, recordTypeDefText]) => ({
    recordTypeText,
    recordTypeDefText,
  }));
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

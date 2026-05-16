import { el } from "../../utils/el.js";
import getFirstChildWithName from "../../utils/getFirstChildWithName.js";
import getTextFromLink from "../../utils/getTextFromLink.js";
import { getMethod } from "../../utils/searchParams.js";
import radio from "../radio/radio.js";
import createOrUpdateRecordType from "./createOrUpdate.js";
import recordTypeRead from "./read.js";
import requestConfigDoc from "./requestConfigDoc.js";

export default function recordType({
  recordTypeId,
  recordTypePool,
  validationTypePool,
  metadataPool,
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
  const methods = ["read", "create", "update", "delete"];

  return el("fieldset", {
    children: [
      el("legend", { textContent: "Select request method" }),
      ...methods.map((method) =>
        radio({
          name: "method",
          value: method,
          label: method.charAt(0).toUpperCase() + method.slice(1),
          checked: selectedMethod === method,
          onChange: (value) => {
            const url = new URL(window.location);
            url.searchParams.set("method", value);
            window.history.replaceState({}, "", url);
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
  }
}

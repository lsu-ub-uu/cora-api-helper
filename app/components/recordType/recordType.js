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

  const root = document.createElement("div");
  root.className = "record-type";

  function render() {
    root.innerHTML = "";
    root.appendChild(pageTitle({ recordTypePool, recordTypeId }));
    root.appendChild(
      requestMethods({
        selectedMethod: method,
        onSelectMethod: (newMethod) => {
          method = newMethod;
          render();
        },
      })
    );

    if (method === "read") {
      root.appendChild(
        recordTypeRead({
          recordTypePool,
          metadataPool,
          recordTypeId,
        })
      );
    } else if (method === "create" || method === "update") {
      root.appendChild(
        createOrUpdateRecordType({
          validationTypePool,
          metadataPool,
          recordTypeId,
          method,
        })
      );
    } else if (method === "delete") {
      root.appendChild(requestConfigDoc({ recordTypeId, method }));
    }
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
  const root = document.createElement("fieldset");
  const legend = document.createElement("legend");
  legend.textContent = "Select request method";
  root.appendChild(legend);

  const methods = ["read", "create", "update", "delete"];

  methods.forEach((method) => {
    root.appendChild(
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
      })
    );
  });

  return root;
}

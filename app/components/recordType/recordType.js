import getFirstChildWithName from "../../utils/getFirstChildWithName.js";
import getTextFromLink from "../../utils/getTextFromLink.js";
import { getMethod, getValidationType } from "../../utils/searchParams.js";
import dataFormat from "../dataFormat/dataFormat.js";
import radio from "../radio/radio.js";
import requestConfigDoc from "../requestConfigDoc.js";
import validationTypeSelect from "../validationTypeSelect.js";

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
      const recordType = recordTypePool[recordTypeId];
      console.log("recordType", recordType);
      const metadataLink = getFirstChildWithName(recordType, "metadataId");
      const metadataId = getFirstChildWithName(
        metadataLink,
        "linkedRecordId"
      ).value;

      root.appendChild(requestConfigDoc({ recordTypeId, method }));

      const heading = document.createElement("h3");
      heading.textContent = "Response body format";
      root.appendChild(heading);

      root.appendChild(
        dataFormat({
          metadataPool,
          rootGroupId: metadataId,
          dataWrapper: true,
        })
      );
    } else if (method === "create" || method === "update") {
      const validationTypes = getValidationTypesForRecordType({
        validationTypePool,
        recordTypeId,
      });

      const selectedValidationType = getSelectedValidationType({
        validationTypes,
      });
      console.log("selectedValidationType", selectedValidationType);
      if (validationTypes.length > 1) {
        root.appendChild(
          validationTypeSelect({
            validationTypes,
            selectedValidationTypeId: getFirstChildWithName(
              getFirstChildWithName(selectedValidationType, "recordInfo"),
              "id"
            ).value,
            onChange: (selectedValidationTypeId) => {
              const url = new URL(window.location);
              url.searchParams.set(
                "validationTypeId",
                selectedValidationTypeId
              );
              window.history.replaceState({}, "", url);
              render();
            },
          })
        );
      }

      root.appendChild(requestConfigDoc({ recordTypeId, method }));

      const metadataLink = getFirstChildWithName(
        selectedValidationType,
        method === "create" ? "newMetadataId" : "metadataId"
      );
      const metadataId = getFirstChildWithName(
        metadataLink,
        "linkedRecordId"
      ).value;

      const heading = document.createElement("h3");
      heading.textContent = "Request body format";
      root.appendChild(heading);

      root.appendChild(
        dataFormat({
          metadataPool,
          rootGroupId: metadataId,
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

function getValidationTypesForRecordType({ validationTypePool, recordTypeId }) {
  return Object.values(validationTypePool).filter((validationType) => {
    const validatesRecordType = getFirstChildWithName(
      validationType,
      "validatesRecordType"
    );
    const validatesRecordTypeId = getFirstChildWithName(
      validatesRecordType,
      "linkedRecordId"
    ).value;
    return validatesRecordTypeId === recordTypeId;
  });
}

function getSelectedValidationType({ validationTypes }) {
  const searchParamValidationType = getValidationType();
  return (
    validationTypes.find((v) => {
      const recordInfo = getFirstChildWithName(v, "recordInfo");
      const id = getFirstChildWithName(recordInfo, "id").value;
      return searchParamValidationType === id;
    }) ?? validationTypes[0]
  );
}

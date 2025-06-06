import getFirstChildWithName from "../utils/getFirstChildWithName.js";
import getTextFromLink from "../utils/getTextFromLink.js";
import group from "./group.js";
import radio from "./radio.js";
import validationTypeSelect from "./validationTypeSelect.js";

export default function validationType({
  path,
  recordTypePool,
  validationTypePool,
  metadataPool,
}) {
  const search = new URLSearchParams(window.location.search);
  const selectedValidationTypeId = search.get("validationTypeId");
  const method = search.get("method") || "create";
  const recordTypeId = path.split("/").pop();

  if (!recordTypePool[recordTypeId]) {
    const root = document.createElement("h1");
    root.textContent = `Record type "${recordTypeId}" not found.`;
    return root;
  }

  const validationTypesForRecordType = getValidationTypesForRecordType({
    validationTypePool,
    recordTypeId,
  });

  const validationType =
    validationTypesForRecordType.find((v) => {
      const recordInfo = getFirstChildWithName(v, "recordInfo");
      const id = getFirstChildWithName(recordInfo, "id").value;
      return selectedValidationTypeId === id;
    }) ?? validationTypesForRecordType[0];

  const root = document.createElement("div");

  root.appendChild(pageTitle({ recordTypeId, recordTypePool }));

  if (validationTypesForRecordType.length > 1) {
    root.appendChild(
      validationTypeSelect({
        selectedValidationTypeId,
        validationTypesForRecordType,
        onChange: (selectedValidationTypeId) => {
          const url = new URL(window.location);
          url.searchParams.set("validationTypeId", selectedValidationTypeId);
          window.history.replaceState({}, "", url);
          renderValidationTypeDoc({
            validationType: validationTypePool[selectedValidationTypeId],
            metadataPool,
            codeBlockElement: codeBlock,
            method,
          });
        },
      })
    );
  }

  const methods = document.createElement("div");
  methods.appendChild(
    radio({
      name: "method",
      value: "create",
      label: "Create",
      checked: method === "create",
      onChange: (value) => {
        const url = new URL(window.location);
        url.searchParams.set("method", value);
        window.history.replaceState({}, "", url);
        renderValidationTypeDoc({
          validationType,
          metadataPool,
          codeBlockElement: codeBlock,
          method: value,
        });
      },
    })
  );
  methods.appendChild(
    radio({
      name: "method",
      value: "update",
      label: "Update / Read",
      checked: method === "update",
      onChange: (value) => {
        const url = new URL(window.location);
        url.searchParams.set("method", value);
        window.history.replaceState({}, "", url);
        renderValidationTypeDoc({
          validationType,
          metadataPool,
          codeBlockElement: codeBlock,
          method: value,
        });
      },
    })
  );

  root.appendChild(methods);

  const codeBlock = document.createElement("div");
  codeBlock.className = "code-block";

  renderValidationTypeDoc({
    validationType,
    metadataPool,
    codeBlockElement: codeBlock,
    method,
  });

  root.appendChild(codeBlock);
  return root;
}

function renderValidationTypeDoc({
  validationType,
  metadataPool,
  codeBlockElement,
  method,
}) {
  const metadataLink = getFirstChildWithName(
    validationType,
    method === "create" ? "newMetadataId" : "metadataId"
  );
  const metadataId = getFirstChildWithName(
    metadataLink,
    "linkedRecordId"
  ).value;

  codeBlockElement.innerHTML = "";

  codeBlockElement.appendChild(
    group({ metadataPool, groupId: metadataId, repeatMin: "1", repeatMax: "1" })
  );
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

function pageTitle({ recordTypePool, recordTypeId }) {
  const root = document.createElement("h2");
  root.textContent = recordTypeId;

  const recordType = recordTypePool[recordTypeId];
  console.log({ recordTypePool, recordTypeId });
  const recordTypeTextId = getFirstChildWithName(recordType, "textId");
  getTextFromLink(recordTypeTextId).then((text) => {
    root.textContent = text;
  });

  return root;
}

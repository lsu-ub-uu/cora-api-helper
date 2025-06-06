import getFirstChildWithName from "../utils/getFirstChildWithName.js";
import getTextFromLink from "../utils/getTextFromLink.js";
import group from "./group.js";
import validationTypeSelect from "./validationTypeSelect.js";

export default function validationType({
  path,
  recordTypePool,
  validationTypePool,
  metadataPool,
}) {
  const selectedValidationTypeId = new URLSearchParams(
    window.location.search
  ).get("validationTypeId");
  const recordTypeId = path.split("/").pop();

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
          });
        },
      })
    );
  }

  const codeBlock = document.createElement("div");
  codeBlock.className = "code-block";

  renderValidationTypeDoc({
    validationType,
    metadataPool,
    codeBlockElement: codeBlock,
  });

  root.appendChild(codeBlock);
  return root;
}

function renderValidationTypeDoc({
  validationType,
  metadataPool,
  codeBlockElement,
}) {
  const metadataLink = getFirstChildWithName(validationType, "metadataId");
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
  const root = document.createElement("h1");
  root.textContent = recordTypeId;

  const recordType = recordTypePool[recordTypeId];
  const recordTypeTextId = getFirstChildWithName(recordType, "textId");
  getTextFromLink(recordTypeTextId).then((text) => {
    root.textContent = text;
  });

  return root;
}

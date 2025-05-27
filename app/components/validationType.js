import getFirstChildWithName from "../utils/getFirstChildWithName.js";
import getTextFromLink from "../utils/getTextFromLink.js";
import group from "./group.js";

export default function validationType({
  path,
  validationTypePool,
  metadataPool,
}) {
  const selectedValidationTypeId = new URLSearchParams(
    window.location.search
  ).get("validationTypeId");
  const recordTypeId = path.split("/").pop();
  const validationTypesForRecordType = Object.values(validationTypePool).filter(
    (validationType) => {
      const validatesRecordType = getFirstChildWithName(
        validationType,
        "validatesRecordType"
      );
      const validatesRecordTypeId = getFirstChildWithName(
        validatesRecordType,
        "linkedRecordId"
      ).value;
      return validatesRecordTypeId === recordTypeId;
    }
  );

  const validationType =
    validationTypesForRecordType.find((v) => {
      const recordInfo = getFirstChildWithName(v, "recordInfo");
      const id = getFirstChildWithName(recordInfo, "id").value;
      return selectedValidationTypeId === id;
    }) ?? validationTypesForRecordType[0];

  const textId = getFirstChildWithName(validationType, "textId");

  const root = document.createElement("div");

  root.innerHTML = `
        <h1>${recordTypeId}</h1>
    `;

  getTextFromLink(textId).then((text) => {
    document.querySelector("h1").textContent = text;
  });

  if (validationTypesForRecordType.length > 1) {
    const validationTypeSelectLabel = document.createElement("label");
    validationTypeSelectLabel.innerHTML = "Validation Type: ";

    const validationTypeSelect = document.createElement("select");
    validationTypeSelectLabel.appendChild(validationTypeSelect);

    validationTypesForRecordType.forEach((validationType) => {
      const textId = getFirstChildWithName(validationType, "textId");

      const recordInfo = getFirstChildWithName(validationType, "recordInfo");
      const validationTypeId = getFirstChildWithName(recordInfo, "id").value;

      const option = document.createElement("option");
      option.value = validationTypeId;
      option.textContent = validationTypeId;
      getTextFromLink(textId).then((text) => {
        option.textContent = text;
      });

      validationTypeSelect.appendChild(option);
      if (selectedValidationTypeId) {
        validationTypeSelect.value = selectedValidationTypeId;
      }

      validationTypeSelect.addEventListener("change", (e) => {
        const selectedValidationTypeId = e.target.value;
        const url = new URL(window.location);
        url.searchParams.set("validationTypeId", selectedValidationTypeId);
        window.history.replaceState({}, "", url);
        renderValidationTypeDoc({
          validationType: validationTypePool[selectedValidationTypeId],
          metadataPool,
          codeBlockElement: codeBlock,
        });
      });
    });

    root.appendChild(validationTypeSelectLabel);
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

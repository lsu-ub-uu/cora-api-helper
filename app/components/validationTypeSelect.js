import getFirstChildWithName from "../utils/getFirstChildWithName.js";
import getTextFromLink from "../utils/getTextFromLink.js";

export default function validationTypeSelect({
  selectedValidationTypeId,
  validationTypesForRecordType,
  onChange,
}) {
  const root = document.createElement("label");
  root.innerHTML = "Validation Type: ";

  const validationTypeSelect = document.createElement("select");
  root.appendChild(validationTypeSelect);

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

    validationTypeSelect.addEventListener("change", (e) =>
      onChange(e.target.value)
    );
  });

  return root;
}

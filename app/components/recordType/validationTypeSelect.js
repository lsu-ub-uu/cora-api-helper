import getFirstChildWithName from "../../utils/getFirstChildWithName.js";
import getTextFromLink from "../../utils/getTextFromLink.js";

export default function validationTypeSelect({
  validationTypes,
  selectedValidationTypeId,
  onChange,
}) {
  const root = document.createElement("label");
  root.className = "validation-type-select";
  root.textContent = "Select validation type: ";

  const validationTypeSelect = document.createElement("select");
  const optionPromises = validationTypes.map((validationType) => {
    const textId = getFirstChildWithName(validationType, "textId");
    const recordInfo = getFirstChildWithName(validationType, "recordInfo");
    const validationTypeId = getFirstChildWithName(recordInfo, "id").value;

    const option = document.createElement("option");
    option.value = validationTypeId;
    option.textContent = validationTypeId;
    return getTextFromLink(textId).then((text) => {
      option.textContent = `${text} (${validationTypeId})`;
      return option;
    });
  });

  Promise.all(optionPromises).then((options) => {
    options
      .sort((a, b) => a.textContent.localeCompare(b.textContent))
      .forEach((option) => validationTypeSelect.appendChild(option));
    if (selectedValidationTypeId) {
      validationTypeSelect.value = selectedValidationTypeId;
    }
  });

  validationTypeSelect.addEventListener("change", (e) =>
    onChange(e.target.value)
  );

  root.appendChild(validationTypeSelect);
  return root;
}

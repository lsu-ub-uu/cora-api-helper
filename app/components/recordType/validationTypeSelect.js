import getFirstChildWithName from "../../utils/getFirstChildWithName.js";
import getTextFromLink from "../../utils/getTextFromLink.js";
import filterableSelect from "../filterableSelect/filterableSelect.js";

export default function validationTypeSelect({
  validationTypes,
  selectedValidationTypeId,
  onChange,
}) {
  const root = document.createElement("label");
  root.className = "validation-type-select";
  root.textContent = "Select validation type: ";

  const select = filterableSelect({
    selectedValue: selectedValidationTypeId,
    onChange,
  });

  const filteredValidationTypes = validationTypes.filter((validationType) => {
    const recordInfo = getFirstChildWithName(validationType, "recordInfo");
    const id = getFirstChildWithName(recordInfo, "id").value;
    return !id.startsWith("classic_");
  });

  const optionPromises = filteredValidationTypes.map((validationType) => {
    const textId = getFirstChildWithName(validationType, "textId");
    const recordInfo = getFirstChildWithName(validationType, "recordInfo");
    const validationTypeId = getFirstChildWithName(recordInfo, "id").value;

    return getTextFromLink(textId).then((text) => ({
      value: validationTypeId,
      label: `${text} (${validationTypeId})`,
    }));
  });

  Promise.all(optionPromises).then((options) => {
    options.sort((a, b) => a.label.localeCompare(b.label));
    select.setOptions(options);
  });

  root.appendChild(select);
  return root;
}

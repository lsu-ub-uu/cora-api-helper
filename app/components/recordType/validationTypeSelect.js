import { el } from "../../utils/el.js";
import getFirstChildWithName from "../../utils/getFirstChildWithName.js";
import getTextFromLink from "../../utils/getTextFromLink.js";
import t from "../../utils/t.js";
import filterableSelect from "../filterableSelect/filterableSelect.js";

export default function validationTypeSelect({
  validationTypes,
  selectedValidationTypeId,
  onChange,
}) {
  const root = el("label", {
    className: "validation-type-select",
    textContent: t("apiHelper_selectValidationTypeText"),
  });

  getOptions(validationTypes).then((options) => {
    options.sort((a, b) => a.label.localeCompare(b.label));
    root.appendChild(
      filterableSelect({
        options,
        selectedValue: selectedValidationTypeId,
        onChange,
      }),
    );
  });

  return root;
}

async function getOptions(validationTypes) {
  const filteredValidationTypes = validationTypes.filter((validationType) => {
    const recordInfo = getFirstChildWithName(validationType, "recordInfo");
    const id = getFirstChildWithName(recordInfo, "id").value;
    return !id.startsWith("classic_");
  });

  return Promise.all(
    filteredValidationTypes.map((validationType) => {
      const textId = getFirstChildWithName(validationType, "textId");
      const recordInfo = getFirstChildWithName(validationType, "recordInfo");
      const validationTypeId = getFirstChildWithName(recordInfo, "id").value;

      return getTextFromLink(textId).then((text) => ({
        value: validationTypeId,
        label: `${text} (${validationTypeId})`,
      }));
    }),
  );
}

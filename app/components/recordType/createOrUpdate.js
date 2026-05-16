import { el } from "../../utils/el.js";
import getFirstChildWithName from "../../utils/getFirstChildWithName.js";
import { getValidationType } from "../../utils/searchParams.js";
import dataFormat from "../dataFormat/dataFormat.js";
import requestConfigDoc from "./requestConfigDoc.js";
import validationTypeSelect from "./validationTypeSelect.js";

export default function createOrUpdateRecordType({
  validationTypePool,
  metadataPool,
  recordTypeId,
  method,
}) {
  const root = el("div", { className: "record-type" });

  function render() {
    const validationTypes = getValidationTypesForRecordType({
      validationTypePool,
      recordTypeId,
    });

    const selectedValidationType = getSelectedValidationType({
      validationTypes,
    });

    const metadataLink = getFirstChildWithName(
      selectedValidationType,
      method === "create" ? "newMetadataId" : "metadataId",
    );
    const metadataId = getFirstChildWithName(
      metadataLink,
      "linkedRecordId",
    ).value;

    root.replaceChildren(
      validationTypeSection({
        validationTypes,
        selectedValidationType,
        onChangeValidationType: render,
      }),
      requestConfigDoc({ recordTypeId, method }),
      el("h3", { textContent: "Request body format" }),
      dataFormat({
        metadataPool,
        rootGroupId: metadataId,
      }),
    );
  }

  render();
  return root;
}

function validationTypeSection({
  validationTypes,
  selectedValidationType,
  onChangeValidationType,
}) {
  if (validationTypes.length <= 1) {
    return document.createDocumentFragment();
  }

  return validationTypeSelect({
    validationTypes,
    selectedValidationTypeId: getFirstChildWithName(
      getFirstChildWithName(selectedValidationType, "recordInfo"),
      "id",
    ).value,
    onChange: (selectedValidationTypeId) => {
      const url = new URL(window.location);
      url.searchParams.set("validationTypeId", selectedValidationTypeId);
      window.history.replaceState({}, "", url);
      onChangeValidationType();
    },
  });
}

function getValidationTypesForRecordType({ validationTypePool, recordTypeId }) {
  return Object.values(validationTypePool).filter((validationType) => {
    const validatesRecordType = getFirstChildWithName(
      validationType,
      "validatesRecordType",
    );
    const validatesRecordTypeId = getFirstChildWithName(
      validatesRecordType,
      "linkedRecordId",
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

import { el } from "../../utils/el.js";
import getFirstChildWithName from "../../utils/getFirstChildWithName.js";
import {
  getValidationType,
  updateSearchParam,
} from "../../utils/searchParams.js";
import dataFormat from "../dataFormat/dataFormat.js";
import group from "../group/group.js";
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
        children: group({
          metadataPool,
          groupId: metadataId,
        }),
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

  const selectedValidationTypeId = getFirstChildWithName(
    getFirstChildWithName(selectedValidationType, "recordInfo"),
    "id",
  ).value;

  return validationTypeSelect({
    validationTypes,
    selectedValidationTypeId,
    onChange: (selectedValidationTypeId) => {
      updateSearchParam("validationTypeId", selectedValidationTypeId);
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

import { el } from "../../utils/el.js";
import getFirstChildWithName from "../../utils/getFirstChildWithName.js";
import {
  getValidationType,
  updateSearchParam,
} from "../../utils/searchParams.js";
import t from "../../utils/t.js";
import collapsibleSection from "../collapsibleSection/collapsibleSection.js";
import dataFormat from "../dataFormat/dataFormat.js";
import group from "../group/group.js";
import recordWrapper from "../recordWrapper/recordWrapper.js";
import requestConfigDoc from "./requestConfigDoc.js";
import validationTypeSelect from "./validationTypeSelect.js";

export default function createOrUpdateRecordType({
  validationTypePool,
  recordTypePool,
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
    const responseMetadataLink = getFirstChildWithName(
      recordTypePool[recordTypeId],
      "metadataId",
    );
    const responseMetadataId = getFirstChildWithName(
      responseMetadataLink,
      "linkedRecordId",
    ).value;

    root.replaceChildren(
      validationTypeSection({
        validationTypes,
        selectedValidationType,
        onChangeValidationType: render,
      }),
      requestConfigDoc({ recordTypeId, method }),
      collapsibleSection({
        title: t("apiHelper_requestBodyFormatText"),
        children: dataFormat({
          children: group({
            metadataPool,
            groupId: metadataId,
          }),
        }),
      }),
      collapsibleSection({
        title: t("apiHelper_responseBodyFormatText"),
        children: dataFormat({
          children: recordWrapper({
            recordType: recordTypeId,
            children: group({
              metadataPool,
              groupId: responseMetadataId,
            }),
          }),
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
    return el("fragment");
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

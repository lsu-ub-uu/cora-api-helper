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
  const root = document.createElement("div");

  function render() {
    root.innerHTML = "";

    const validationTypes = getValidationTypesForRecordType({
      validationTypePool,
      recordTypeId,
    });

    const selectedValidationType = getSelectedValidationType({
      validationTypes,
    });

    if (validationTypes.length > 1) {
      root.appendChild(
        validationTypeSelect({
          validationTypes,
          selectedValidationTypeId: getFirstChildWithName(
            getFirstChildWithName(selectedValidationType, "recordInfo"),
            "id"
          ).value,
          onChange: (selectedValidationTypeId) => {
            const url = new URL(window.location);
            url.searchParams.set("validationTypeId", selectedValidationTypeId);
            window.history.replaceState({}, "", url);
            render();
          },
        })
      );
    }

    root.appendChild(requestConfigDoc({ recordTypeId, method }));

    const metadataLink = getFirstChildWithName(
      selectedValidationType,
      method === "create" ? "newMetadataId" : "metadataId"
    );
    const metadataId = getFirstChildWithName(
      metadataLink,
      "linkedRecordId"
    ).value;

    const heading = document.createElement("h3");
    heading.textContent = "Request body format";
    root.appendChild(heading);

    root.appendChild(
      dataFormat({
        metadataPool,
        rootGroupId: metadataId,
      })
    );
  }

  render();
  return root;
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

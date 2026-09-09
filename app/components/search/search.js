import getFirstChildWithName from "../../utils/getFirstChildWithName.js";
import dataFormat from "../dataFormat/dataFormat.js";

export default function search({ search, metadataPool }) {
  const searchMetadataLink = getFirstChildWithName(search, "metadataId");
  const searchMetadataId = getFirstChildWithName(
    searchMetadataLink,
    "linkedRecordId",
  ).value;

  return dataFormat({
    metadataPool,
    rootGroupId: searchMetadataId,
  });
}

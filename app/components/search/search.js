import { getFirstChildWithName } from "../../utils/coraDataUtils.js";
import dataFormat from "../dataFormat/dataFormat.js";
import group from "../group/group.js";

export default function search({ search, metadataPool }) {
  const searchMetadataLink = getFirstChildWithName(search, "metadataId");
  const searchMetadataId = getFirstChildWithName(
    searchMetadataLink,
    "linkedRecordId",
  ).value;

  return dataFormat({
    children: group({
      metadataPool,
      groupId: searchMetadataId,
      mode: "search",
    }),
  });
}

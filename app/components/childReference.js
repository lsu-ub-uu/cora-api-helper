import getFirstChildWithName from "../utils/getFirstChildWithName.js";
import group from "./group.js";
import textVariable from "./textVariable.js";
import recordLink from "./recordLink.js";
import collectionVariable from "./collectionVariable.js";
import numberVariable from "./numberVariable.js";

export default function childReference({ metadataPool, childReference }) {
  const repeatMin = getFirstChildWithName(childReference, "repeatMin")?.value;
  const repeatMax = getFirstChildWithName(childReference, "repeatMax")?.value;
  const refLink = getFirstChildWithName(childReference, "ref");
  const refRecordId = getFirstChildWithName(refLink, "linkedRecordId")?.value;
  const childMetadata = metadataPool[refRecordId];

  const nameInData = getFirstChildWithName(childMetadata, "nameInData")?.value;
  const type = childMetadata.attributes.type;

  if (type === "group") {
    return group({
      metadataPool,
      groupId: refRecordId,
      repeatMin,
      repeatMax,
    });
  }

  if (type === "textVariable") {
    return textVariable({
      metadataPool,
      metadata: childMetadata,
      repeatMin,
      repeatMax,
    });
  }

  if (type === "collectionVariable") {
    return collectionVariable({
      metadataPool,
      metadata: childMetadata,
      repeatMin,
      repeatMax,
    });
  }

  if (type === "numberVariable") {
    return numberVariable({
      metadataPool,
      metadata: childMetadata,
      repeatMin,
      repeatMax,
    });
  }

  if (type === "recordLink") {
    return recordLink({
      metadataPool,
      metadata: childMetadata,
      repeatMin,
      repeatMax,
    });
  }

  const root = document.createElement("div");
  root.innerHTML = nameInData;
  return root;
}

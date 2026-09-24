import {
  getFirstChildWithName,
  getAllChildrenWithNameAndAttributes,
} from "../../utils/coraDataUtils.js";
import group from "../group/group.js";
import textVariable from "../textVariable/textVariable.js";
import recordLink from "../recordLink/recordLink.js";
import collectionVariable from "../collectionVariable/collectionVariable.js";
import numberVariable from "../numberVariable/numberVariable.js";
import { el } from "../../utils/el.js";

export default function childReference({
  metadataPool,
  childReference,
  mode,
  depth = 0,
  lastChild = true,
}) {
  const repeatMin = getFirstChildWithName(childReference, "repeatMin")?.value;
  const repeatMax = getFirstChildWithName(childReference, "repeatMax")?.value;
  const refLink = getFirstChildWithName(childReference, "ref");
  const refRecordId = getFirstChildWithName(refLink, "linkedRecordId")?.value;
  const childMetadata = metadataPool[refRecordId];
  const hasPermissions =
    getAllChildrenWithNameAndAttributes(childReference, "childRefCollectTerm", {
      type: "permission",
    }).length > 0;
  const nameInData = getFirstChildWithName(childMetadata, "nameInData")?.value;
  const type = childMetadata.attributes.type;

  if (type === "group") {
    return group({
      metadataPool,
      groupId: refRecordId,
      mode,
      hasPermissions,
      repeatMin,
      repeatMax,
      depth,
      lastChild,
    });
  }

  if (type === "textVariable") {
    return textVariable({
      metadataPool,
      metadata: childMetadata,
      hasPermissions,
      repeatMin,
      repeatMax,
      lastChild,
    });
  }

  if (type === "collectionVariable") {
    return collectionVariable({
      metadataPool,
      metadata: childMetadata,
      hasPermissions,
      repeatMin,
      repeatMax,
      lastChild,
    });
  }

  if (type === "numberVariable") {
    return numberVariable({
      metadataPool,
      metadata: childMetadata,
      hasPermissions,
      repeatMin,
      repeatMax,
      lastChild,
    });
  }

  if (type === "recordLink") {
    return recordLink({
      metadataPool,
      metadata: childMetadata,
      mode,
      hasPermissions,
      repeatMin,
      repeatMax,
      lastChild,
    });
  }

  return el("div", { textContent: nameInData });
}

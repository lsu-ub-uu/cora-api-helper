import getFirstChildWithName from "../utils/getFirstChildWithName.js";
import childReference from "./childReference.js";
import element from "./element.js";

export default function group({ metadataPool, groupId, repeatMin, repeatMax }) {
  const groupMetadata = metadataPool[groupId];
  const root = document.createElement("div");

  const childReferences = getFirstChildWithName(
    groupMetadata,
    "childReferences"
  )?.children;

  if (!childReferences) {
    return document.createDocumentFragment();
  }

  root.appendChild(
    element({
      metadataPool,
      metadata: groupMetadata,
      repeatMin,
      repeatMax,
      children: childReferences.map((childRef) =>
        childReference({ metadataPool, childReference: childRef })
      ),
    })
  );
  return root;
}

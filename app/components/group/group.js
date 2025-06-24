import getFirstChildWithName from "../../utils/getFirstChildWithName.js";
import childReference from "../childReference/childReference.js";
import element from "../element/element.js";

export default function group({
  metadataPool,
  groupId,
  repeatMin,
  repeatMax,
  depth = 0,
  lastChild = true,
}) {
  if (depth > 10) {
    console.warn("Maximum depth exceeded in group rendering");
    return document.createTextNode("<<MAX DEPTH EXCEEDED>>");
  }

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
      children: childReferences.map((childRef, index) =>
        childReference({
          metadataPool,
          childReference: childRef,
          depth: depth + 1,
          lastChild: index === childReferences.length - 1,
        })
      ),
      lastChild,
    })
  );
  return root;
}

import { el } from "../../utils/el.js";
import { getFirstChildWithName } from "../../utils/coraDataUtils.js";
import t from "../../utils/t.js";
import childReference from "../childReference/childReference.js";
import element from "../element/element.js";

export default function group({
  metadataPool,
  groupId,
  mode,
  hasPermissions = false,
  repeatMin = "1",
  repeatMax = "1",
  depth = 0,
  lastChild = true,
}) {
  if (depth > 10) {
    console.warn("Maximum depth exceeded in group rendering");
    return document.createTextNode(t("maxDepthExceeded"));
  }

  const groupMetadata = metadataPool[groupId];

  const childReferences = getFirstChildWithName(
    groupMetadata,
    "childReferences",
  )?.children;

  if (!childReferences) {
    return el("fragment");
  }

  return el("div", {
    children: element({
      metadataPool,
      metadata: groupMetadata,
      repeatMin,
      repeatMax,
      hasPermissions,
      children: childReferences.map((childRef, index) =>
        childReference({
          metadataPool,
          childReference: childRef,
          mode,
          depth: depth + 1,
          lastChild: index === childReferences.length - 1,
        }),
      ),
      lastChild,
    }),
  });
}

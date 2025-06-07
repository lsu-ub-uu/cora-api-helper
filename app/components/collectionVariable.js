import getFirstChildWithName from "../utils/getFirstChildWithName.js";
import element from "./element.js";
import itemCollection from "./itemCollection.js";

export default function collectionVariable({
  metadata,
  metadataPool,
  repeatMin,
  repeatMax,
  lastChild = true,
}) {
  const collectionItemsDiv = document.createElement("div");
  collectionItemsDiv.className = "collection-value";
  const collectionReference = getFirstChildWithName(metadata, "refCollection");

  collectionItemsDiv.appendChild(
    itemCollection({ metadataPool, collectionReference })
  );

  return element({
    metadataPool,
    metadata,
    repeatMin,
    repeatMax,
    children: collectionItemsDiv,
    lastChild,
  });
}

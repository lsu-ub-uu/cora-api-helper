import getFirstChildWithName from "../../utils/getFirstChildWithName.js";
import element from "../element/element.js";
import itemCollection from "../itemCollection/itemCollection.js";

export default function collectionVariable({
  metadata,
  metadataPool,
  repeatMin,
  repeatMax,
  lastChild = true,
}) {
  const collectionItemsDiv = document.createElement("div");
  collectionItemsDiv.className = "collection-value";

  const finalValue = getFirstChildWithName(metadata, "finalValue")?.value;
  if (finalValue) {
    collectionItemsDiv.innerHTML = `<span class="final-value">${finalValue}</span>`;
    return element({
      metadataPool,
      metadata,
      repeatMin,
      repeatMax,
      children: collectionItemsDiv,
      lastChild,
    });
  }

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

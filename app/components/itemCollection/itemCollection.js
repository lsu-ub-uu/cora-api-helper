import getFirstChildWithName from "../../utils/getFirstChildWithName.js";
import dataName from "../dataName/dataName.js";

const MAX = 12;

export default function itemCollection({ metadataPool, collectionReference }) {
  let expanded = false;
  const itemCollectionId = getFirstChildWithName(
    collectionReference,
    "linkedRecordId"
  )?.value;
  const itemCollectionMetadata = metadataPool[itemCollectionId];
  const collectionItemReferences = getFirstChildWithName(
    itemCollectionMetadata,
    "collectionItemReferences"
  )?.children;

  if (!collectionItemReferences) {
    return document.createDocumentFragment();
  }

  const collectionItems = collectionItemReferences.map((itemRef) => {
    const itemRefId = getFirstChildWithName(itemRef, "linkedRecordId")?.value;

    return metadataPool[itemRefId];
  });

  const collapsedCollectionItems = collectionItems.slice(0, MAX);

  const root = document.createElement("span");
  root.appendChild(renderCollectionItems(collapsedCollectionItems));

  if (collectionItems.length > MAX) {
    const expandButton = document.createElement("button");
    expandButton.className = "collection-variable-expand";
    updateExpandButton({ expandButton, expanded: false });

    expandButton.addEventListener("click", () => {
      root.innerHTML = "";
      if (expanded) {
        expanded = false;
        updateExpandButton({ expandButton, expanded });
        root.appendChild(renderCollectionItems(collapsedCollectionItems));
      } else {
        expanded = true;
        updateExpandButton({ expandButton, expanded });
        root.appendChild(renderCollectionItems(collectionItems));
      }
      root.appendChild(expandButton);
    });
    root.appendChild(expandButton);
  }

  return root;
}

function updateExpandButton({ expandButton, expanded }) {
  if (!expanded) {
    expandButton.textContent = "...";
    expandButton.setAttribute("aria-expanded", "false");
    expandButton.setAttribute("aria-label", "Expand collection items");
  } else {
    expandButton.textContent = "—";
    expandButton.setAttribute("aria-expanded", "true");
    expandButton.setAttribute("aria-label", "Collapse collection items");
  }
}

function renderCollectionItems(collectionItems) {
  const root = document.createDocumentFragment();
  collectionItems.forEach((item, index) => {
    const isLastItem = index === collectionItems.length - 1;
    root.appendChild(dataName({ metadata: item }));
    if (!isLastItem) {
      root.appendChild(document.createTextNode(" | "));
    }
  });

  return root;
}

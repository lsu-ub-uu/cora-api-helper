import getFirstChildWithName from "../../utils/getFirstChildWithName.js";
import dataName from "../dataName/dataName.js";

const MAX = 12;

export default function itemCollection({ metadataPool, collectionReference }) {
  const collectionItems = extractCollectionItems({
    metadataPool,
    collectionReference,
  });

  const root = document.createElement("span");
  root.className = "item-collection";

  let expanded = false;

  function render() {
    root.innerHTML = "";

    root.appendChild(
      renderCollectionItems(
        expanded ? collectionItems : collectionItems.slice(0, MAX)
      )
    );

    if (collectionItems.length > MAX) {
      const expandButton = renderExpandButton({ expanded });

      expandButton.addEventListener("click", () => {
        expanded = !expanded;
        render();
      });

      root.appendChild(expandButton);
    }
  }

  render();
  return root;
}

function extractCollectionItems({ metadataPool, collectionReference }) {
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
  return collectionItems;
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

function renderExpandButton({ expanded }) {
  const root = document.createElement("button");

  root.className = "collection-variable-expand";
  root.textContent = expanded ? "—" : "...";
  root.setAttribute("aria-expanded", expanded ? "true" : "false");
  root.setAttribute(
    "aria-label",
    expanded ? "Collapse collection items" : "Expand collection items"
  );

  return root;
}

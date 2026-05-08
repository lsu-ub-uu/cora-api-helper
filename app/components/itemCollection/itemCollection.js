import { el } from "../../utils/el.js";
import getFirstChildWithName from "../../utils/getFirstChildWithName.js";
import dataName from "../dataName/dataName.js";

const MAX = 12;

export default function itemCollection({
  metadata,
  metadataPool,
  collectionReference,
}) {
  const collectionItems = extractCollectionItems({
    metadataPool,
    collectionReference,
  });

  const finalValue = getFirstChildWithName(metadata, "finalValue")?.value;
  if (finalValue) {
    const finalValueMetadata = collectionItems.find(
      (item) => getFirstChildWithName(item, "nameInData").value === finalValue,
    );

    if (finalValueMetadata) {
      return el("span", {
        className: "final-value",
        children: dataName({ metadata: finalValueMetadata }),
      });
    } else {
      return el("span", { className: "final-value", textContent: finalValue });
    }
  }

  const root = el("span", { className: "collection-value" });

  let expanded = false;

  function render() {
    root.innerHTML = "";

    root.appendChild(
      renderCollectionItems(
        expanded ? collectionItems : collectionItems.slice(0, MAX),
      ),
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

export function extractCollectionItems({ metadataPool, collectionReference }) {
  const itemCollectionId = getFirstChildWithName(
    collectionReference,
    "linkedRecordId",
  )?.value;
  const itemCollectionMetadata = metadataPool[itemCollectionId];
  const collectionItemReferences = getFirstChildWithName(
    itemCollectionMetadata,
    "collectionItemReferences",
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
    expanded ? "Collapse collection items" : "Expand collection items",
  );

  return root;
}

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
      const expandButton = renderExpandButton({
        expanded,
        onClick: () => {
          expanded = !expanded;
          render();
        },
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
    return el("fragment");
  }

  const collectionItems = collectionItemReferences.map((itemRef) => {
    const itemRefId = getFirstChildWithName(itemRef, "linkedRecordId")?.value;

    return metadataPool[itemRefId];
  });
  return collectionItems;
}

function renderCollectionItems(collectionItems) {
  return el("fragment", {
    children: collectionItems.flatMap((item, index) => {
      const isLastItem = index === collectionItems.length - 1;
      const separator = !isLastItem ? " | " : null;

      return [dataName({ metadata: item }), separator];
    }),
  });
}

function renderExpandButton({ expanded, onClick }) {
  return el("button", {
    className: "collection-variable-expand",
    textContent: expanded ? "—" : "...",
    "aria-expanded": expanded ? "true" : "false",
    "aria-label": expanded
      ? "Collapse collection items"
      : "Expand collection items",
    onClick,
  });
}

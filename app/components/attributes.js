import getFirstChildWithName from "../utils/getFirstChildWithName.js";
import itemCollection from "./itemCollection.js";

export default function attributes({ metadataPool, metadata }) {
  const attributeReferences = getFirstChildWithName(
    metadata,
    "attributeReferences"
  );

  if (!attributeReferences) {
    return document.createDocumentFragment();
  }

  const ref = getFirstChildWithName(attributeReferences, "ref");
  const linkedRecordId = getFirstChildWithName(ref, "linkedRecordId")?.value;
  const attributeMetadata = metadataPool[linkedRecordId];
  const collectionReference = getFirstChildWithName(
    attributeMetadata,
    "refCollection"
  );
  const nameInData = getFirstChildWithName(
    attributeMetadata,
    "nameInData"
  )?.value;

  const finalValue = getFirstChildWithName(
    attributeMetadata,
    "finalValue"
  )?.value;

  const root = document.createElement("span");
  root.className = "attributes";

  root.appendChild(document.createTextNode(` ${nameInData}=`));

  if (finalValue) {
    const finalValueSpan = document.createElement("span");
    finalValueSpan.className = "final-value";
    finalValueSpan.innerHTML = `"${finalValue}"`;
    root.appendChild(finalValueSpan);
  } else {
    const collectionItemsSpan = document.createElement("span");
    collectionItemsSpan.className = "collection-value";
    collectionItemsSpan.appendChild(document.createTextNode('"'));
    collectionItemsSpan.appendChild(
      itemCollection({ metadataPool, collectionReference })
    );
    collectionItemsSpan.appendChild(document.createTextNode('"'));

    root.appendChild(collectionItemsSpan);
  }

  return root;
}

import getAllChildrenWithName from "../utils/getAllChildrenWithName.js";
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

  const refs = getAllChildrenWithName(attributeReferences, "ref");
  if (refs.length > 1) {
    console.log(refs);
  }

  const root = document.createElement("div");
  root.className = "json-property";
  root.appendChild(document.createTextNode('"attributes": {'));

  refs.forEach((ref, index) => {
    const attributeElement = createAttribute({
      metadataPool,
      ref,
      lastAttribute: index === refs.length - 1,
    });
    root.appendChild(attributeElement);
  });

  const closingBracket = document.createElement("div");
  closingBracket.textContent = "},";
  root.appendChild(closingBracket);

  return root;
}

function createAttribute({ metadataPool, ref, lastAttribute }) {
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

  const root = document.createElement("div");
  root.classList = "attributes json-property";

  root.appendChild(document.createTextNode(`"${nameInData}": `));

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

  if (!lastAttribute) {
    root.appendChild(document.createTextNode(","));
  }

  return root;
}

import getAllChildrenWithName from "../../utils/getAllChildrenWithName.js";
import getFirstChildWithName from "../../utils/getFirstChildWithName.js";
import dataName from "../dataName/dataName.js";
import itemCollection from "../itemCollection/itemCollection.js";

export default function attributes({ metadataPool, metadata }) {
  const attributeReferences = getFirstChildWithName(
    metadata,
    "attributeReferences"
  );

  if (!attributeReferences) {
    return document.createDocumentFragment();
  }

  const refs = getAllChildrenWithName(attributeReferences, "ref");

  const root = document.createElement("div");
  root.className = "indent";

  const attributesKey = document.createElement("span");
  attributesKey.innerHTML = '<span class="json-key">"attributes"</span>: {';
  root.appendChild(attributesKey);

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
  root.classList = "attributes indent";

  const attributeKey = document.createElement("span");
  attributeKey.appendChild(document.createTextNode('"'));
  attributeKey.appendChild(dataName({ metadata: attributeMetadata }));
  attributeKey.className = "json-key";
  attributeKey.appendChild(document.createTextNode('": '));
  root.appendChild(attributeKey);

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

import getAllChildrenWithName from "../utils/getAllChildrenWithName.js";
import getFirstChildWithName from "../utils/getFirstChildWithName.js";
import xpath from "../utils/xpath.js";
import dataName from "./dataName.js";
import itemCollection from "./itemCollection.js";

export default function attributes({ metadataPool, metadata }) {
  const attributeMetadataIds = xpath(
    metadata,
    "/*/attributeReferences/ref/linkedRecordId"
  );

  const root = document.createElement("div");
  root.className = "indent";

  const attributesKey = document.createElement("span");
  attributesKey.innerHTML = '<span class="json-key">"attributes"</span>: {';
  root.appendChild(attributesKey);

  attributeMetadataIds.forEach((attributeMetadataId, index) => {
    const attributeElement = createAttribute({
      metadataPool,
      attributeMetadataId,
      lastAttribute: index === attributeMetadataIds.length - 1,
    });
    root.appendChild(attributeElement);
  });

  const closingBracket = document.createElement("div");
  closingBracket.textContent = "},";
  root.appendChild(closingBracket);

  return root;
}

function createAttribute({ metadataPool, attributeMetadataId, lastAttribute }) {
  const attributeMetadata = metadataPool[attributeMetadataId];
  const collectionReference = xpath(attributeMetadata, "/*/refCollection");
  const finalValue = xpath(attributeMetadata, "/*/finalValue");

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

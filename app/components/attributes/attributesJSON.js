import { el } from "../../utils/el.js";
import getAllChildrenWithName from "../../utils/getAllChildrenWithName.js";
import getFirstChildWithName from "../../utils/getFirstChildWithName.js";
import dataName from "../dataName/dataName.js";
import itemCollection from "../itemCollection/itemCollection.js";

export default function attributes({ metadataPool, metadata }) {
  const attributeReferences = getFirstChildWithName(
    metadata,
    "attributeReferences",
  );

  if (!attributeReferences) {
    return document.createDocumentFragment();
  }

  const refs = getAllChildrenWithName(attributeReferences, "ref");

  return el("div", {
    className: "indent",
    children: [
      el("span", {
        children: [
          el("span", { className: "json-key", textContent: '"attributes"' }),
          ": {",
        ],
      }),
      ...refs.map((ref, index) =>
        createAttribute({
          metadataPool,
          ref,
          lastAttribute: index === refs.length - 1,
        }),
      ),
      el("div", { textContent: "}," }),
    ],
  });
}

function createAttribute({ metadataPool, ref, lastAttribute }) {
  const linkedRecordId = getFirstChildWithName(ref, "linkedRecordId")?.value;
  const attributeMetadata = metadataPool[linkedRecordId];
  const collectionReference = getFirstChildWithName(
    attributeMetadata,
    "refCollection",
  );

  const finalValue = getFirstChildWithName(
    attributeMetadata,
    "finalValue",
  )?.value;

  return el("div", {
    className: "attributes indent",
    children: [
      el("span", {
        className: "json-key",
        children: ['"', dataName({ metadata: attributeMetadata }), '": '],
      }),
      finalValue
        ? el("span", {
            className: "final-value",
            textContent: `"${finalValue}"`,
          })
        : el("span", {
            className: "collection-value",
            children: [
              '"',
              itemCollection({ metadataPool, collectionReference }),
              '"',
            ],
          }),
      !lastAttribute && ",",
    ],
  });
}

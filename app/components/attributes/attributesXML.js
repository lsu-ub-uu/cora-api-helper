import { el } from "../../utils/el.js";
import getAllChildrenWithName from "../../utils/getAllChildrenWithName.js";
import getFirstChildWithName from "../../utils/getFirstChildWithName.js";
import dataName from "../dataName/dataName.js";
import itemCollection from "../itemCollection/itemCollection.js";

export default function attributes({ metadataPool, metadata, isRepeating }) {
  const attributeReferences = getFirstChildWithName(
    metadata,
    "attributeReferences",
  );

  const refs = attributeReferences
    ? getAllChildrenWithName(attributeReferences, "ref")
    : [];

  return el("span", {
    children: [
      ...refs.map((ref) => createAttribute({ metadataPool, ref })),
      isRepeating &&
        el("span", {
          children: [
            " repeatId=",
            el("span", { className: "regex", textContent: '"/.+/"' }),
          ],
        }),
    ],
  });
}

function createAttribute({ metadataPool, ref }) {
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

  return el("span", {
    className: "attributes",
    children: [
      el("span", {
        children: [" ", dataName({ metadata: attributeMetadata }), "="],
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
    ],
  });
}

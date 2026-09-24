import { el } from "../../utils/el.js";
import { getFirstChildWithName } from "../../utils/coraDataUtils.js";
import element from "../element/element.js";
import itemCollection from "../itemCollection/itemCollection.js";

export default function collectionVariable({
  metadata,
  metadataPool,
  repeatMin,
  repeatMax,
  hasPermissions = false,
  lastChild = true,
}) {
  const collectionReference = getFirstChildWithName(metadata, "refCollection");
  return element({
    metadataPool,
    metadata,
    repeatMin,
    repeatMax,
    hasPermissions,
    children: collectionValue({
      children: itemCollection({ metadata, metadataPool, collectionReference }),
    }),
    lastChild,
  });
}

function collectionValue({ children }) {
  return el("div", { className: "collection-value", children });
}

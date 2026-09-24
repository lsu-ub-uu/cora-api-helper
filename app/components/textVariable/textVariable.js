import { el } from "../../utils/el.js";
import { getFirstChildWithName } from "../../utils/coraDataUtils.js";
import element from "../element/element.js";

export default function textVariable({
  metadataPool,
  metadata,
  repeatMin,
  repeatMax,
  hasPermissions = false,
  lastChild,
}) {
  const regexText = getFirstChildWithName(metadata, "regEx")?.value;

  return element({
    metadataPool,
    metadata,
    repeatMin,
    repeatMax,
    hasPermissions,
    children: el("div", { className: "regex", textContent: `/${regexText}/` }),
    lastChild,
  });
}

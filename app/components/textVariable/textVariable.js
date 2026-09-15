import { el } from "../../utils/el.js";
import getFirstChildWithName from "../../utils/getFirstChildWithName.js";
import element from "../element/element.js";

export default function textVariable({
  metadataPool,
  metadata,
  repeatMin,
  repeatMax,
  lastChild,
}) {
  const regexText = getFirstChildWithName(metadata, "regEx")?.value;

  return element({
    metadataPool,
    metadata,
    repeatMin,
    repeatMax,
    children: el("div", { className: "regex", textContent: `/${regexText}/` }),
    lastChild,
  });
}

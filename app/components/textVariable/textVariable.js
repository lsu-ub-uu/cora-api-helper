import { el } from "../../utils/el.js";
import { getFirstChildWithName } from "../../utils/coraDataUtils.js";
import element from "../element/element.js";

export default function textVariable({
  metadataPool,
  metadata,
  repeatMin,
  repeatMax,
  recordPartConstraint,
  lastChild,
}) {
  const regexText = getFirstChildWithName(metadata, "regEx")?.value;
  const finalValue = getFirstChildWithName(metadata, "finalValue")?.value;

  return element({
    metadataPool,
    metadata,
    repeatMin,
    repeatMax,
    recordPartConstraint,
    children: finalValue
      ? el("span", { className: "final-value", textContent: finalValue })
      : el("span", { className: "regex", textContent: `/${regexText}/` }),
    lastChild,
  });
}

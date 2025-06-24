import getFirstChildWithName from "../utils/getFirstChildWithName.js";
import element from "./element/element.js";

export default function textVariable({
  metadataPool,
  metadata,
  repeatMin,
  repeatMax,
  lastChild,
}) {
  const regexText = getFirstChildWithName(metadata, "regEx")?.value;

  const regex = document.createElement("div");
  regex.className = "regex";
  regex.textContent = `/${regexText}/`;

  return element({
    metadataPool,
    metadata,
    repeatMin,
    repeatMax,
    children: regex,
    lastChild,
  });
}

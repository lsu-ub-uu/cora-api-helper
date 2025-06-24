import getFirstChildWithName from "../../utils/getFirstChildWithName.js";
import element from "../element/element.js";

export default function numberVariable({
  metadataPool,
  metadata,
  repeatMin,
  repeatMax,
  lastChild,
}) {
  const regexText = getFirstChildWithName(metadata, "regEx")?.value;
  const min = getFirstChildWithName(metadata, "min")?.value;
  const max = getFirstChildWithName(metadata, "max")?.value;
  const numberOfDecimals =
    getFirstChildWithName(metadata, "numberOfDecimals")?.value ?? 0;

  const regex = document.createElement("div");
  regex.className = "number-variable";
  regex.textContent = `${Number(min).toFixed(numberOfDecimals)} - ${Number(
    max
  ).toFixed(numberOfDecimals)}`;

  return element({
    metadataPool,
    metadata,
    repeatMin,
    repeatMax,
    children: regex,
    lastChild,
  });
}

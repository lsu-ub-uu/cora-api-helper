import { el } from "../../utils/el.js";
import { getFirstChildWithName } from "../../utils/coraDataUtils.js";
import element from "../element/element.js";

export default function numberVariable({
  metadataPool,
  metadata,
  repeatMin,
  repeatMax,
  hasPermissions = false,
  lastChild,
}) {
  const min = getFirstChildWithName(metadata, "min")?.value;
  const max = getFirstChildWithName(metadata, "max")?.value;
  const numberOfDecimals =
    getFirstChildWithName(metadata, "numberOfDecimals")?.value ?? 0;

  return element({
    metadataPool,
    metadata,
    repeatMin,
    repeatMax,
    hasPermissions,
    children: el("div", {
      className: "number-variable",
      textContent: `${Number(min).toFixed(numberOfDecimals)} - ${Number(
        max,
      ).toFixed(numberOfDecimals)}`,
    }),
    lastChild,
  });
}

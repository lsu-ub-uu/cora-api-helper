import { el } from "../../utils/el.js";
import getFirstChildWithName from "../../utils/getFirstChildWithName.js";
import attributes from "../attributes/attributesXML.js";
import dataName from "../dataName/dataName.js";
import expandButton from "../expandButton/expandButton.js";
import multiplicity from "../multiplicity/multiplicity.js";

export default function elementXML({
  metadataPool,
  metadata,
  repeatMin,
  repeatMax,
  children,
}) {
  const nameInData = getFirstChildWithName(metadata, "nameInData")?.value;
  const isRepeating = repeatMax !== "1";

  const root = el("div", { className: "element" });

  root.append(
    expandButton({ onClick: () => root.classList.toggle("collapsed") }),
    "<",
    dataName({ metadata }),
    attributes({ metadataPool, metadata, isRepeating }),
    ">",
    multiplicity({ repeatMin, repeatMax }),
    el("div", { className: "indent", children }),
    el("span", {
      className: "closing-tag",
      textContent: `</${nameInData}>`,
    }),
  );

  return root;
}

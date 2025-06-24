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
  const isRepeating = repeatMax !== "0" && repeatMax !== "1";

  const root = document.createElement("div");
  root.className = "element";

  root.appendChild(
    expandButton({ onClick: () => root.classList.toggle("collapsed") })
  );
  root.appendChild(document.createTextNode("<"));
  root.appendChild(dataName({ metadata }));
  root.appendChild(attributes({ metadataPool, metadata, isRepeating }));

  root.appendChild(document.createTextNode(`>`));
  root.appendChild(multiplicity({ repeatMin, repeatMax }));

  const childrenDiv = document.createElement("div");
  childrenDiv.className = "indent";
  if (Array.isArray(children)) {
    children.forEach((child) => {
      childrenDiv.appendChild(child);
    });
  } else {
    childrenDiv.appendChild(children);
  }

  root.appendChild(childrenDiv);
  root.appendChild(closingTag({ nameInData }));

  return root;
}

function closingTag({ nameInData }) {
  const closingTag = document.createElement("span");
  closingTag.className = "closing-tag";
  closingTag.textContent = `</${nameInData}>`;
  return closingTag;
}

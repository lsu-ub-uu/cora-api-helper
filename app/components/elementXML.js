import getFirstChildWithName from "../utils/getFirstChildWithName.js";
import attributes from "./attributesXML.js";
import dataName from "./dataName.js";
import expandButton from "./expandButton.js";
import multiplicity from "./multiplicity.js";

export default function elementXML({
  metadataPool,
  metadata,
  repeatMin,
  repeatMax,
  children,
}) {
  const nameInData = getFirstChildWithName(metadata, "nameInData")?.value;

  const root = document.createElement("div");
  root.className = "element";

  root.appendChild(
    expandButton({ onClick: () => root.classList.toggle("collapsed") })
  );
  root.appendChild(document.createTextNode("<"));
  root.appendChild(dataName({ metadata }));
  root.appendChild(attributes({ metadataPool, metadata }));
  root.appendChild(document.createTextNode(`>`));
  root.appendChild(multiplicity({ repeatMin, repeatMax }));

  const childrenDiv = document.createElement("div");
  childrenDiv.className = "element-children";
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

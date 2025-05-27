import getFirstChildWithName from "../utils/getFirstChildWithName.js";
import attributes from "./attributes.js";
import getTextFromLink from "../utils/getTextFromLink.js";
import showPopover from "./popover.js";
import dataName from "./dataName.js";

export default function element({
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

function expandButton({ onClick }) {
  const expandButton = document.createElement("button");
  expandButton.className = "element-expand-button";
  expandButton.textContent = "-";
  expandButton.addEventListener("click", () => {
    onClick();
    expandButton.textContent = root.classList.contains("collapsed") ? "+" : "-";
  });
  return expandButton;
}

function multiplicity({ repeatMin, repeatMax }) {
  const multiplicitySpan = document.createElement("span");
  multiplicitySpan.className = "multiplicity";
  multiplicitySpan.textContent = `(${repeatMin} - ${repeatMax})`;
  return multiplicitySpan;
}

function closingTag({ nameInData }) {
  const closingTag = document.createElement("span");
  closingTag.className = "closing-tag";
  closingTag.textContent = `</${nameInData}>`;
  return closingTag;
}

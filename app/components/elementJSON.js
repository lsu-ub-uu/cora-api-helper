import getFirstChildWithName from "../utils/getFirstChildWithName.js";
import attributes from "./attributesJSON.js";
import dataName from "./dataName.js";
import expandButton from "./expandButton.js";
import multiplicity from "./multiplicity.js";

export default function jsonElement({
  metadataPool,
  metadata,
  repeatMin,
  repeatMax,
  children,
}) {
  const root = document.createElement("div");
  root.className = "json-element";

  const nameInData = getFirstChildWithName(metadata, "nameInData")?.value;
  root.appendChild(
    expandButton({ onClick: () => root.classList.toggle("collapsed") })
  );
  const openingBracket = document.createElement("div");
  openingBracket.textContent = "{";
  root.appendChild(openingBracket);

  const nameInDataProperty = document.createElement("div");

  nameInDataProperty.classList = "json-property name-in-data";

  const nameKey = document.createElement("span");
  nameKey.innerHTML = `<span class="json-key">"name"</span>: "`;
  nameInDataProperty.appendChild(nameKey);
  nameInDataProperty.appendChild(dataName({ metadata }));
  const closingQuote = document.createElement("span");
  closingQuote.textContent = `",`;
  nameInDataProperty.appendChild(closingQuote);

  nameInDataProperty.appendChild(multiplicity({ repeatMin, repeatMax }));

  root.appendChild(nameInDataProperty);

  root.appendChild(attributes({ metadataPool, metadata }));

  if (metadata.attributes.type === "recordLink") {
    root.appendChild(children);
  } else if (Array.isArray(children)) {
    const childrenProperty = document.createElement("div");
    childrenProperty.className = "json-property";
    childrenProperty.innerHTML = `<span class="json-key">"children"</span>: [`;
    const childrenContainer = document.createElement("div");
    childrenContainer.className = "json-property";
    root.appendChild(childrenProperty);
    (Array.isArray(children) ? children : [children]).forEach((child) => {
      childrenContainer.appendChild(child);
    });
    childrenProperty.appendChild(childrenContainer);
    const closingChildrenProperty = document.createElement("div");
    closingChildrenProperty.className = "json-property";
    closingChildrenProperty.textContent = "]";
    root.appendChild(closingChildrenProperty);
  } else {
    const valueProperty = document.createElement("div");
    valueProperty.className = "json-property";
    const valueKey = document.createElement("span");
    valueKey.innerHTML = '<span class="json-key">"value"</span>: "';
    valueProperty.appendChild(valueKey);
    valueProperty.appendChild(children);
    const closingQuote = document.createElement("span");
    closingQuote.textContent = '"';
    valueProperty.appendChild(closingQuote);
    root.appendChild(valueProperty);
  }

  const closingBracket = document.createElement("div");
  closingBracket.textContent = "},";
  root.appendChild(closingBracket);

  return root;
}

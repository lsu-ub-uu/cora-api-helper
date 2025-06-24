import getFirstChildWithName from "../../utils/getFirstChildWithName.js";
import attributesJSON from "../attributes/attributesJSON.js";
import dataName from "../dataName/dataName.js";
import expandButton from "../expandButton/expandButton.js";
import multiplicity from "../multiplicity/multiplicity.js";

export default function elementJSON({
  metadataPool,
  metadata,
  repeatMin,
  repeatMax,
  children,
  lastChild = true,
}) {
  const isRepeating = repeatMax !== "0" && repeatMax !== "1";

  const root = document.createElement("div");
  root.className = "json-element";

  root.appendChild(
    expandButton({ onClick: () => root.classList.toggle("collapsed") })
  );
  const openingBracket = document.createElement("div");
  openingBracket.textContent = "{";
  root.appendChild(openingBracket);

  const nameInDataProperty = document.createElement("div");

  nameInDataProperty.classList = "indent name-in-data";

  const nameKey = document.createElement("span");
  nameKey.innerHTML = `<span class="json-key">"name"</span>: "`;
  nameInDataProperty.appendChild(nameKey);
  nameInDataProperty.appendChild(dataName({ metadata }));
  const closingQuote = document.createElement("span");
  closingQuote.textContent = `",`;
  nameInDataProperty.appendChild(closingQuote);

  nameInDataProperty.appendChild(multiplicity({ repeatMin, repeatMax }));

  root.appendChild(nameInDataProperty);

  if (isRepeating) {
    const repeatProperty = document.createElement("div");
    repeatProperty.className = "indent";
    repeatProperty.innerHTML = `<span class="json-key">"repeatId"</span>: "<span class="regex">/.+/</span>",`;
    root.appendChild(repeatProperty);
  }

  root.appendChild(attributesJSON({ metadataPool, metadata }));

  if (metadata.attributes?.type === "recordLink") {
    root.appendChild(children);
  } else if (Array.isArray(children)) {
    const childrenProperty = document.createElement("div");
    childrenProperty.className = "indent";
    childrenProperty.innerHTML = `<span class="json-key">"children"</span>: [`;
    const childrenContainer = document.createElement("div");
    childrenContainer.className = "indent";
    root.appendChild(childrenProperty);
    (Array.isArray(children) ? children : [children]).forEach((child) => {
      childrenContainer.appendChild(child);
    });
    childrenProperty.appendChild(childrenContainer);
    const closingChildrenProperty = document.createElement("div");
    closingChildrenProperty.className = "indent";
    closingChildrenProperty.textContent = "]";
    root.appendChild(closingChildrenProperty);
  } else {
    const valueProperty = document.createElement("div");
    valueProperty.className = "indent";
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
  closingBracket.textContent = `}${lastChild ? "" : ","}`;
  root.appendChild(closingBracket);

  return root;
}

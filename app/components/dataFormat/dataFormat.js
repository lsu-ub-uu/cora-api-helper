import { getFormat } from "../../utils/searchParams.js";
import expandButton from "../expandButton/expandButton.js";
import group from "../group/group.js";
import legend from "../legend/legend.js";

export default function dataFormat({
  metadataPool,
  rootGroupId,
  dataWrapper = false,
}) {
  const root = document.createElement("div");
  root.className = "code-block data-format";

  const rootGroup = group({
    metadataPool,
    groupId: rootGroupId,
    repeatMin: "1",
    repeatMax: "1",
  });

  if (dataWrapper) {
    root.appendChild(renderDataWrapper({ children: rootGroup }));
  } else {
    root.appendChild(rootGroup);
  }

  root.appendChild(legend());

  return root;
}

function renderDataWrapper({ children }) {
  if (getFormat() === "json") {
    return renderDataWrapperJSON({ children });
  }
  return renderDataWrapperXML({ children });
}

function renderDataWrapperJSON({ children }) {
  const root = document.createElement("div");
  root.className = "json-element";

  root.appendChild(
    expandButton({ onClick: () => root.classList.toggle("collapsed") }),
  );

  const openingBracket = document.createElement("div");
  openingBracket.textContent = "{";
  root.appendChild(openingBracket);

  const recordWrapper = document.createElement("div");
  recordWrapper.className = "indent";
  recordWrapper.textContent = `"record": {`;
  root.appendChild(recordWrapper);

  const dataWrapper = document.createElement("div");
  dataWrapper.className = "indent";
  dataWrapper.textContent = `"data": {`;
  recordWrapper.appendChild(dataWrapper);

  const groupWrapper = document.createElement("div");
  groupWrapper.className = "indent";
  groupWrapper.appendChild(children);
  dataWrapper.appendChild(groupWrapper);

  const dataClosingBracket = document.createElement("div");
  dataClosingBracket.textContent = "}";
  dataWrapper.appendChild(dataClosingBracket);

  const recordClosingBracket = document.createElement("div");
  recordClosingBracket.textContent = "}";
  recordWrapper.appendChild(recordClosingBracket);

  const closingBracket = document.createElement("div");
  closingBracket.textContent = "}";
  root.appendChild(closingBracket);

  return root;
}

function renderDataWrapperXML({ children }) {
  const root = document.createElement("div");
  root.className = "element";

  const dataWrapper = document.createElement("div");
  dataWrapper.className = "indent";

  const recordStartTag = document.createElement("div");
  recordStartTag.textContent = "<record>";
  root.appendChild(recordStartTag);

  const data = document.createElement("div");
  data.className = "element";

  const dataStartTag = document.createElement("div");
  dataStartTag.textContent = "<data>";
  data.appendChild(dataStartTag);

  const groupWrapper = document.createElement("div");
  groupWrapper.className = "indent";
  groupWrapper.appendChild(children);
  data.appendChild(groupWrapper);

  const dataEndTag = document.createElement("div");
  dataEndTag.textContent = "</data>";
  dataEndTag.className = "indent";
  data.appendChild(dataEndTag);

  dataWrapper.appendChild(data);

  root.appendChild(dataWrapper);

  const recordEndTag = document.createElement("div");
  recordEndTag.textContent = "</record>";
  root.appendChild(recordEndTag);

  return root;
}

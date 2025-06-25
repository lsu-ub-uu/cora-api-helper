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

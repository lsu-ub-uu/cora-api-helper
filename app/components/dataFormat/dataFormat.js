import { el } from "../../utils/el.js";
import { getFormat } from "../../utils/searchParams.js";
import expandButton from "../expandButton/expandButton.js";
import group from "../group/group.js";
import legend from "../legend/legend.js";

export default function dataFormat({
  metadataPool,
  rootGroupId,
  dataWrapper = false,
  recordList = false,
}) {
  const rootGroup = group({
    metadataPool,
    groupId: rootGroupId,
    repeatMin: "1",
    repeatMax: "1",
  });

  const wrapper = dataWrapper
    ? renderDataWrapper({ children: rootGroup })
    : rootGroup;

  return el("div", {
    className: "code-block data-format",
    children: [
      recordList ? renderRecordList({ children: wrapper }) : wrapper,
      legend(),
    ],
  });
}

function renderDataWrapper({ children }) {
  if (getFormat() === "json") {
    return renderDataWrapperJSON({ children });
  }
  return renderDataWrapperXML({ children });
}

function renderDataWrapperJSON({ children }) {
  const root = el("div", { className: "json-element" });

  root.appendChild(
    expandButton({ onClick: () => root.classList.toggle("collapsed") }),
  );

  root.append(
    el("div", { textContent: "{" }),
    el("div", {
      className: "indent",
      textContent: `"record": {`,
      children: [
        el("div", {
          className: "indent",
          textContent: `"data": {`,
          children: [
            el("div", { className: "indent", children: [children] }),
            el("div", { textContent: "}" }),
          ],
        }),
        el("div", { textContent: "}" }),
      ],
    }),
    el("div", { textContent: "}" }),
  );

  return root;
}

function renderDataWrapperXML({ children }) {
  return el("div", {
    className: "element",
    children: [
      el("div", { textContent: "<record>" }),
      el("div", {
        className: "indent",
        children: [
          el("div", {
            className: "element",
            children: [
              el("div", { textContent: "<data>" }),
              el("div", { className: "indent", children: [children] }),
              el("div", { textContent: "</data>" }),
            ],
          }),
        ],
      }),
      el("div", { textContent: "</record>" }),
    ],
  });
}

function renderRecordList({ children }) {
  return el("div", {
    className: "element",
    children: [
      el("div", { textContent: "<dataList>" }),
      el("div", {
        className: "indent",
        children: [
          el("div", {
            children: [
              "<fromNo>",
              el("span", {
                className: "number-variable",
                textContent: "0-99999",
              }),
              "</fromNo>",
            ],
          }),
          el("div", {
            children: [
              "<toNo>",
              el("span", {
                className: "number-variable",
                textContent: "0-99999",
              }),
              "</toNo>",
            ],
          }),
          el("div", {
            children: [
              "<totalNo>",
              el("span", {
                className: "number-variable",
                textContent: "0-99999",
              }),
              "</totalNo>",
            ],
          }),
          el("div", {
            children: [
              "<containsDataOfType>",
              el("span", {
                className: "final-value",
                textContent: "mix",
              }),
              "</containsDataOfType>",
            ],
          }),
          el("div", {
            className: "element",
            children: [
              el("div", { textContent: "<data>" }),
              el("div", { className: "indent", children: [children] }),
              el("div", { textContent: "</data>" }),
            ],
          }),
        ],
      }),
      el("div", { textContent: "</dataList>" }),
    ],
  });
}

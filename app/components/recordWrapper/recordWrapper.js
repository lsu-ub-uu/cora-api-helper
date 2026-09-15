import { getFormat } from "../../utils/searchParams.js";
import { el } from "../../utils/el.js";
import expandButton from "../expandButton/expandButton.js";
import elementXML from "../element/elementXML.js";
import actionLink from "../actionLink/actionLink.js";

export default function recordWrapper({ children, recordType }) {
  if (getFormat() === "json") {
    return recordWrapperJSON({ children });
  }
  return recordWrapperXML({ children, recordType });
}

function recordWrapperJSON({ children }) {
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

function recordWrapperXML({ children, recordType }) {
  return elementXML({
    name: "record",
    repeatMin: "1",
    repeatMax: "1",
    children: [
      elementXML({
        name: "data",
        repeatMin: "1",
        repeatMax: "1",
        children: children,
      }),
      elementXML({
        name: "actionLinks",
        repeatMin: "1",
        repeatMax: "1",
        children: [
          actionLink({ method: "read", recordType }),
          actionLink({ method: "update", recordType }),
          actionLink({ method: "delete", recordType }),
          actionLink({ method: "index", recordType }),
        ],
      }),
    ],
  });
}

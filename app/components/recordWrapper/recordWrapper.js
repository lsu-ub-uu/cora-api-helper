import { getFormat } from "../../utils/searchParams.js";
import { el } from "../../utils/el.js";
import expandButton from "../expandButton/expandButton.js";
import elementXML from "../element/elementXML.js";

export default function recordWrapper({ children, mode, recordType }) {
  if (getFormat() === "json") {
    return recordWrapperJSON({ children });
  }
  return recordWrapperXML({ children, mode, recordType });
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

function recordWrapperXML({ children, mode, recordType }) {
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
      mode === "read" &&
        elementXML({
          name: "actionLinks",
          repeatMin: "1",
          repeatMax: "1",
          children: [
            elementXML({
              name: "read",
              repeatMin: "1",
              repeatMax: "1",
              children: [
                elementXML({
                  name: "requestMethod",
                  children: "GET",
                  repeatMin: "1",
                  repeatMax: "1",
                }),
                elementXML({
                  name: "rel",
                  children: "read",
                  repeatMin: "1",
                  repeatMax: "1",
                }),
                elementXML({
                  name: "url",
                  children: `http://example.com/rest/record/${recordType}/1`,
                  repeatMin: "1",
                  repeatMax: "1",
                }),
                elementXML({
                  name: "accept",
                  children: "application/vnd.cora.record+xml",
                  repeatMin: "1",
                  repeatMax: "1",
                }),
              ],
            }),
          ],
        }),
    ],
  });
}

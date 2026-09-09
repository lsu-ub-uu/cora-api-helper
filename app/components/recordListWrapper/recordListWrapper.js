import { el } from "../../utils/el.js";
import { getFormat } from "../../utils/searchParams.js";
import elementXML from "../element/elementXML.js";

export default function recordListWrapper({ children }) {
  const format = getFormat();
  if (format === "xml") {
    return recordListWrapperXML({ children });
  }
  return recordListWrapperJSON({ children });
}

function recordListWrapperXML({ children }) {
  return elementXML({
    name: "dataList",
    repeatMin: "1",
    repeatMax: "1",
    children: [
      elementXML({
        name: "fromNo",
        repeatMin: "1",
        repeatMax: "1",
        children: el("span", {
          className: "number-variable",
          textContent: "0 - 999999",
        }),
      }),
      elementXML({
        name: "toNo",
        repeatMin: "1",
        repeatMax: "1",
        children: el("span", {
          className: "number-variable",
          textContent: "0 - 999999",
        }),
      }),
      elementXML({
        name: "totalNo",
        repeatMin: "1",
        repeatMax: "1",
        children: el("span", {
          className: "number-variable",
          textContent: "0 - 999999",
        }),
      }),
      elementXML({
        name: "data",
        repeatMin: "1",
        repeatMax: "1",
        children: children,
      }),
    ],
  });
}

function recordListWrapperJSON({ children }) {
  return el("div", {
    className: "json-element",
    children: [
      el("div", { textContent: "{" }),
      el("div", {
        className: "indent",
        children: [
          el("div", { textContent: `"dataList": {` }),
          el("div", {
            className: "indent",
            children: [
              el("div", {
                children: [
                  el("span", { textContent: `"fromNo": ` }),
                  el("span", {
                    className: "number-variable",
                    textContent: `"0 - 999999"`,
                  }),
                  el("span", { textContent: "," }),
                ],
              }),
              el("div", {
                children: [
                  el("span", { textContent: `"toNo": ` }),
                  el("span", {
                    className: "number-variable",
                    textContent: `"0 - 999999"`,
                  }),
                  el("span", { textContent: "," }),
                ],
              }),
              el("div", {
                children: [
                  el("span", { textContent: `"totalNo": ` }),
                  el("span", {
                    className: "number-variable",
                    textContent: `"0 - 999999"`,
                  }),
                  el("span", { textContent: "," }),
                ],
              }),
              el("div", { textContent: `"data": [` }),
              el("div", { className: "indent", children: [children] }),
              el("div", { textContent: "]" }),
            ],
          }),
          el("div", { textContent: "}" }),
        ],
      }),
      el("div", { textContent: "}" }),
    ],
  });
}

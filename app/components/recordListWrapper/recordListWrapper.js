import { el } from "../../utils/el.js";
import { getFormat } from "../../utils/searchParams.js";

export default function recordListWrapper({ children }) {
  const format = getFormat();
  if (format === "xml") {
    return recordListWrapperXML({ children });
  }
  return recordListWrapperJSON({ children });
}

function recordListWrapperXML({ children }) {
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

import { getFormat } from "../../utils/searchParams.js";
import { el } from "../../utils/el.js";
import expandButton from "../expandButton/expandButton.js";
import multiplicity from "../multiplicity/multiplicity.js";

export default function dataWrapper({ children, repeating }) {
  if (getFormat() === "json") {
    return dataWrapperJSON({ children, repeating });
  }
  return dataWrapperXML({ children, repeating });
}

function dataWrapperJSON({ children }) {
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

function dataWrapperXML({ children }) {
  return el("div", {
    className: "element",
    children: [
      el("div", {
        children: [
          el("span", { textContent: "<record>" }),
          multiplicity({ repeatMin: 0, repeatMax: "X" }),
        ],
      }),
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

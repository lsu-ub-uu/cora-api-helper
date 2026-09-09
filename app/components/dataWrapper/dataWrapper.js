import { getFormat } from "../../utils/searchParams.js";
import { el } from "../../utils/el.js";
import expandButton from "../expandButton/expandButton.js";
import elementXML from "../element/elementXML.js";

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
    ],
  });
}

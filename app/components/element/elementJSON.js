import { el } from "../../utils/el.js";
import expandButton from "../expandButton/expandButton.js";
import multiplicity from "../multiplicity/multiplicity.js";

export default function elementJSON({
  name,
  attributes,
  repeatMin,
  repeatMax,
  children,
  lastChild = true,
  isRecordLink,
}) {
  const isRepeating = repeatMax !== "0" && repeatMax !== "1";

  const root = el("div", { className: "json-element" });

  const items = [
    expandButton({ onClick: () => root.classList.toggle("collapsed") }),
    el("div", { textContent: "{" }),
    el("div", {
      className: "indent name-in-data",
      children: [
        el("span", {
          children: [
            el("span", { className: "json-key", textContent: '"name"' }),
            ': "',
          ],
        }),
        name,
        el("span", { textContent: `",` }),
        multiplicity({ repeatMin, repeatMax }),
      ],
    }),
    isRepeating &&
      el("div", {
        className: "indent",
        children: [
          el("span", { className: "json-key", textContent: '"repeatId"' }),
          ': "',
          el("span", { className: "regex", textContent: "/.+/" }),
          '",',
        ],
      }),
    attributes,
    renderChildren({ isRecordLink, children }),
    el("div", { textContent: `}${lastChild ? "" : ","}` }),
  ]
    .flat()
    .filter(Boolean);

  root.append(...items);

  return root;
}

function renderChildren({ isRecordLink, children }) {
  if (isRecordLink) {
    return children;
  }

  if (Array.isArray(children)) {
    return [
      el("div", {
        className: "indent",
        children: [
          el("span", { className: "json-key", textContent: '"children"' }),
          ": [",
          el("div", {
            className: "indent",
            children,
          }),
        ],
      }),
      el("div", { className: "indent", textContent: "]" }),
    ];
  }

  return el("div", {
    className: "indent",
    children: [
      el("span", {
        children: [
          el("span", { className: "json-key", textContent: '"value"' }),
          ': "',
        ],
      }),
      children,
      el("span", { textContent: '"' }),
    ],
  });
}

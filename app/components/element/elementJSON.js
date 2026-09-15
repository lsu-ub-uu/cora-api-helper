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

export function jsonObject({ name, value, lastChild = true }) {
  const root = el("div", { className: "json-element" });

  root.append(
    expandButton({ onClick: () => root.classList.toggle("collapsed") }),
    jsonKey(name, ": {"),
    ...Object.entries(value).map(([key, childValue], index, entries) =>
      jsonProperty({
        name: key,
        value: childValue,
        lastChild: index === entries.length - 1,
      }),
    ),
    el("div", { textContent: `}${lastChild ? "" : ","}` }),
  );

  return root;
}

function jsonProperty({ name, value, lastChild }) {
  return el("div", {
    className: "indent",
    children: [jsonKey(name, ": "), ...jsonValue({ value, lastChild })],
  });
}

function jsonValue({ value, lastChild }) {
  if (Array.isArray(value)) {
    return [
      "[",
      ...value.map((item, index) =>
        jsonArrayItem({
          value: item,
          lastChild: index === value.length - 1,
        }),
      ),
      el("div", { textContent: `]${lastChild ? "" : ","}` }),
    ];
  }

  if (value !== null && typeof value === "object") {
    const entries = Object.entries(value);
    return [
      "{",
      ...entries.map(([key, childValue], index) =>
        jsonProperty({
          name: key,
          value: childValue,
          lastChild: index === entries.length - 1,
        }),
      ),
      el("div", { textContent: `}${lastChild ? "" : ","}` }),
    ];
  }

  return [`${JSON.stringify(value)}${lastChild ? "" : ","}`];
}

function jsonArrayItem({ value, lastChild }) {
  return el("div", {
    className: "indent",
    children: jsonValue({ value, lastChild }),
  });
}

function jsonKey(name, suffix) {
  return el("div", {
    children: [
      el("span", {
        className: "json-key",
        textContent: JSON.stringify(name),
      }),
      suffix,
    ],
  });
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

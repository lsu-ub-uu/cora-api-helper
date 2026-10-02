import { el } from "../../utils/el.js";
import t from "../../utils/t.js";

export default function legend() {
  return el("div", {
    className: "legend",
    children: [
      el("h3", { textContent: t("legend") }),
      el("dl", {
        children: definitionTerms(),
      }),
    ],
  });
}

function legendItem(term, titleKey, descriptionKey) {
  const popover = el("div", {
    className: "popover",
    "data-alignment": "left",
    popover: "auto",
    children: [
      el("h3", { textContent: t(titleKey) }),
      el("p", { textContent: t(descriptionKey) }),
    ],
  });
  return [
    term,
    el("dd", {
      children: [
        el("button", {
          popoverTargetElement: popover,
          popoverTargetAction: "toggle",
          textContent: t(titleKey),
        }),
        popover,
      ],
    }),
  ];
}

function definitionTerms() {
  return [
    ...legendItem(
      el("dt", { className: "multiplicity", textContent: "(0 - 1)" }),
      "repeat",
      "repeatTitle",
    ),
    ...legendItem(
      el("dt", { className: "final-value", textContent: "value" }),
      "finalValue",
      "finalValueTitle",
    ),
    ...legendItem(
      el("dt", { className: "regex", textContent: "/.+/" }),
      "regex",
      "regexTitle",
    ),
    ...legendItem(
      el("dt", { className: "number-variable", textContent: "0 - 100" }),
      "numberValue",
      "numberValueTitle",
    ),
    ...legendItem(
      el("dt", { className: "collection-value", textContent: "sv | en" }),
      "collectionValue",
      "collectionValueTitle",
    ),
    ...legendItem(
      el("dt", { className: "id", textContent: "{id}" }),
      "dynamicValue",
      "dynamicValueTitle",
    ),
    ...legendItem(
      el("dt", {
        children: el("span", {
          textContent: "✍️",
          className: "record-part-constraint-icon",
        }),
      }),
      "recordPartConstraint.write.title",
      "recordPartConstraint.write.description",
    ),
    ...legendItem(
      el("dt", {
        children: el("span", {
          textContent: "👁️",
          className: "record-part-constraint-icon",
        }),
      }),
      "recordPartConstraint.readWrite.title",
      "recordPartConstraint.readWrite.description",
    ),
  ];
}

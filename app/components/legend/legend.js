import { el } from "../../utils/el.js";

export default function legend() {
  return el("div", {
    className: "legend",
    children: [
      el("h3", { textContent: "Legend" }),
      el("dl", {
        children: definitionTerms(),
      }),
    ],
  });
}

function definitionTerms() {
  return [
    el("dt", { className: "multiplicity", textContent: "(0 - 1)" }),
    el("dd", {
      title:
        "Specifies the min and max times this element can be repeated. X means unlimited.",
      textContent: "Repeat (min - max)",
    }),
    el("dt", { className: "final-value", textContent: "value" }),
    el("dd", {
      title: "Value must be set to the final value",
      textContent: "Final value",
    }),
    el("dt", { className: "regex", textContent: "/.+/" }),
    el("dd", {
      title: "Value must match regular expression",
      textContent: "Text value (RegEx)",
    }),
    el("dt", { className: "number-variable", textContent: "0 - 100" }),
    el("dd", {
      title: "Value must be a number within range",
      textContent: "Number value (min - max)",
    }),
    el("dt", { className: "collection-value", textContent: "sv | en" }),
    el("dd", {
      title: "Value must be one of the listed values",
      textContent: "Collection value",
    }),
    el("dt", { className: "id", textContent: "{id}" }),
    el("dd", {
      title: "Set to the ID of linked record",
      textContent: "Record ID",
    }),
  ];
}

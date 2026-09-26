import { el } from "../../utils/el.js";
import t from "../../utils/t.js";
import permissionIndicator from "../permissionIndicator/permissionIndicator.js";

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

function definitionTerms() {
  return [
    el("dt", { className: "multiplicity", textContent: "(0 - 1)" }),
    el("dd", {
      title: t("repeatTitle"),
      textContent: t("repeat"),
    }),
    el("dt", { className: "final-value", textContent: "value" }),
    el("dd", {
      title: t("finalValueTitle"),
      textContent: t("finalValue"),
    }),
    el("dt", { className: "regex", textContent: "/.+/" }),
    el("dd", {
      title: t("regexTitle"),
      textContent: t("regex"),
    }),
    el("dt", { className: "number-variable", textContent: "0 - 100" }),
    el("dd", {
      title: t("numberValueTitle"),
      textContent: t("numberValue"),
    }),
    el("dt", { className: "collection-value", textContent: "sv | en" }),
    el("dd", {
      title: t("collectionValueTitle"),
      textContent: t("collectionValue"),
    }),
    el("dt", { className: "id", textContent: "{id}" }),
    el("dd", {
      title: t("recordIdTitle"),
      textContent: t("recordId"),
    }),
    el("dt", { children: permissionIndicator() }),
    el("dd", {
      title: t("collectionValueTitle"),
      textContent: t("permissionControlledTitle"),
    }),
  ];
}

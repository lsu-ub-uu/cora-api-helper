import { el } from "../../utils/el.js";
import t from "../../utils/t.js";

export default function legend() {
  return el("div", {
    className: "legend",
    children: [
      el("h3", { textContent: t("apiHelper_legendText") }),
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
      title: t("apiHelper_repeatTitleText"),
      textContent: t("apiHelper_repeatText"),
    }),
    el("dt", { className: "final-value", textContent: "value" }),
    el("dd", {
      title: t("apiHelper_finalValueTitleText"),
      textContent: t("apiHelper_finalValueText"),
    }),
    el("dt", { className: "regex", textContent: "/.+/" }),
    el("dd", {
      title: t("apiHelper_regexTitleText"),
      textContent: t("apiHelper_regexText"),
    }),
    el("dt", { className: "number-variable", textContent: "0 - 100" }),
    el("dd", {
      title: t("apiHelper_numberValueTitleText"),
      textContent: t("apiHelper_numberValueText"),
    }),
    el("dt", { className: "collection-value", textContent: "sv | en" }),
    el("dd", {
      title: t("apiHelper_collectionValueTitleText"),
      textContent: t("apiHelper_collectionValueText"),
    }),
    el("dt", { className: "id", textContent: "{id}" }),
    el("dd", {
      title: t("apiHelper_recordIdTitleText"),
      textContent: t("apiHelper_recordIdText"),
    }),
  ];
}

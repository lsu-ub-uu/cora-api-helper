import { el } from "../../utils/el.js";
import t from "../../utils/t.js";

export default function expandButton({ onClick, defaultExpanded = true }) {
  let expanded = defaultExpanded;

  const root = el("button", {
    type: "button",
    className: "element-expand-button",
    "aria-label": t(
      expanded
        ? "apiHelper_collapseElementText"
        : "apiHelper_expandElementText",
    ),
    textContent: expanded ? "-" : "+",
    onClick: () => {
      onClick();
      expanded = !expanded;
      root.textContent = expanded ? "-" : "+";
      root.setAttribute(
        "aria-label",
        expanded
          ? t("apiHelper_collapseElementText")
          : t("apiHelper_expandElementText"),
      );
    },
  });

  return root;
}

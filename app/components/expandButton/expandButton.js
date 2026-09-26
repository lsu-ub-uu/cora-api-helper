import { el } from "../../utils/el.js";
import t from "../../utils/t.js";

export default function expandButton({ onClick, defaultExpanded = true }) {
  let expanded = defaultExpanded;

  const root = el("button", {
    type: "button",
    className: "element-expand-button",
    "aria-label": t(expanded ? "collapseElement" : "expandElement"),
    textContent: expanded ? "-" : "+",
    onClick: () => {
      onClick();
      expanded = !expanded;
      root.textContent = expanded ? "-" : "+";
      root.setAttribute(
        "aria-label",
        expanded ? t("collapseElement") : t("expandElement"),
      );
    },
  });

  return root;
}

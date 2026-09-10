import { el } from "../../utils/el.js";
import t from "../../utils/t.js";

export default function expandButton({ onClick }) {
  let expanded = true;

  const root = el("button", {
    type: "button",
    className: "element-expand-button",
    "aria-label": t("apiHelper_collapseElementText"),
    textContent: "-",
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

import { el } from "../../utils/el.js";

export default function expandButton({ onClick }) {
  let expanded = true;

  const root = el("button", {
    type: "button",
    className: "element-expand-button",
    "aria-label": "Collapse element",
    textContent: "-",
    onClick: () => {
      onClick();
      expanded = !expanded;
      root.textContent = expanded ? "-" : "+";
      root.setAttribute(
        "aria-label",
        expanded ? "Collapse element" : "Expand element",
      );
    },
  });

  return root;
}

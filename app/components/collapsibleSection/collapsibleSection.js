import { el } from "../../utils/el.js";

export default function collapsibleSection({
  title,
  children,
  headingLevel = 3,
  className = "",
  defaultExpanded = true,
  titlePromise,
  onToggle,
}) {
  const titleEl = el(`h${headingLevel}`, {
    textContent: title,
  });

  if (titlePromise) {
    titlePromise.then((resolvedTitle) => {
      titleEl.textContent = resolvedTitle;
    });
  }

  return el("details", {
    className: `collapsible-section${className ? ` ${className}` : ""}`,
    open: defaultExpanded,
    onToggle: (e) => {
      if (onToggle) {
        onToggle(e.target.open);
      }
    },
    children: [
      el("summary", {
        children: titleEl,
      }),
      el("div", {
        className: "collapsible-section-content",
        children,
      }),
    ],
  });
}

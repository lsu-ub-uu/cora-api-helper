import { el } from "../../utils/el.js";
import t from "../../utils/t.js";

export default function recordPartConstraintIndicator({
  recordPartConstraint,
}) {
  const icons = {
    write: "✍️",
    readWrite: "👁️",
  };
  const popover = el("div", {
    className: "popover",
    popover: "auto",
    children: [
      el("h3", {
        textContent: t(`recordPartConstraint.${recordPartConstraint}.title`),
      }),
      el("p", {
        textContent: t(
          `recordPartConstraint.${recordPartConstraint}.description`,
        ),
      }),
    ],
  });

  return el("fragment", {
    children: [
      el("button", {
        popoverTargetElement: popover,
        popoverTargetAction: "toggle",
        "aria-label": t(`recordPartConstraint.${recordPartConstraint}.title`),
        children: el("span", {
          className: "record-part-constraint-icon",
          textContent: icons[recordPartConstraint],
        }),
      }),
      popover,
    ],
  });
}

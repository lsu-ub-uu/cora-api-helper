import { el } from "../../utils/el.js";
import t from "../../utils/t.js";

export default function permissionIndicator() {
  const popover = el("div", {
    className: "popover",
    popover: "auto",
    children: [
      el("h3", {
        textContent: t("permissionControlledTitle"),
      }),
      el("p", {
        textContent: t("permissionControlled"),
      }),
    ],
  });

  return el("fragment", {
    children: [
      el("button", {
        popoverTargetElement: popover,
        popoverTargetAction: "toggle",
        "aria-label": t("permissionControlledTitle"),
        children: "🔒",
      }),
      popover,
    ],
  });
}

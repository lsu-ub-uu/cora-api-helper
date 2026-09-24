import { el } from "../../utils/el.js";
import t from "../../utils/t.js";

export default function permissionIndicator() {
  const popover = el("div", {
    className: "popover",
    popover: "auto",
    textContent: t("apiHelper_permissionControlledText"),
  });

  return el("fragment", {
    children: [
      el("button", {
        popoverTargetElement: popover,
        popoverTargetAction: "toggle",
        "aria-label": t("apiHelper_permissionControlledTitleText"),
        textContent: "🔒",
      }),
      popover,
    ],
  });
}

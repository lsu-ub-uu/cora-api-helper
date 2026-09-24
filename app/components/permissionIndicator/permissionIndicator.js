import { el } from "../../utils/el.js";
import t from "../../utils/t.js";

export default function permissionIndicator() {
  const popover = el("div", {
    className: "popover",
    popover: "auto",
    children: [
      el("h3", {
        textContent: t("apiHelper_permissionControlledTitleText"),
      }),
      el("p", {
        textContent: t("apiHelper_permissionControlledText"),
      }),
    ],
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

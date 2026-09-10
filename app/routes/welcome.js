import { el } from "../utils/el.js";
import t from "../utils/t.js";

export default function welcomeMessage() {
  return el("div", {
    children: [
      el("h2", { textContent: t("apiHelper_welcomeText") }),
      el("p", {
        textContent: t("apiHelper_welcomeDescriptionText"),
      }),
      el("p", {
        textContent: t("apiHelper_welcomeNavigationText"),
      }),
      el("p", {
        textContent: t("apiHelper_welcomeSettingsText"),
      }),
    ],
  });
}

import { el } from "../utils/el.js";
import t from "../utils/t.js";

export default function welcomeMessage() {
  return el("div", {
    children: [
      el("h2", { textContent: t("welcome") }),
      el("p", {
        textContent: t("welcomeDescription"),
      }),
      el("p", {
        textContent: t("welcomeNavigation"),
      }),
      el("p", {
        textContent: t("welcomeSettings"),
      }),
    ],
  });
}

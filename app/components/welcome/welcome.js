import { el } from "../../utils/el.js";
import t from "../../utils/t.js";
import updateDocumentTitle from "../../utils/updateDocumentTitle.js";

export default function welcomeMessage() {
  updateDocumentTitle();
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

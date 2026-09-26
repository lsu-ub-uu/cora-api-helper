import { el } from "../../utils/el.js";
import t from "../../utils/t.js";

export default function errorBoundary({ error }) {
  return el("div", {
    className: "error-boundary-wrapper",
    children: [
      el("div", {
        className: "error-boundary",
        children: [
          el("div", { role: "alert", textContent: error.message }),
          el("details", {
            children: [
              el("summary", { textContent: t("details") }),
              el("pre", { textContent: error.stack ?? error.message }),
            ],
          }),
        ],
      }),
    ],
  });
}

export function applicationErrorBoundary(error) {
  return errorBoundary({
    error,
  });
}

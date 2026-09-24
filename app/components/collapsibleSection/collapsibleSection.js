import { el } from "../../utils/el.js";

export default function collapsibleSection({ title, children }) {
  return el("details", {
    className: "collapsible-section",
    open: true,
    children: [
      el("summary", {
        children: el("h3", {
          children: [
            el("span", {
              className: "collapsible-section-icon",
              "aria-hidden": "true",
            }),
            title,
          ],
        }),
      }),
      el("div", {
        className: "collapsible-section-content",
        children,
      }),
    ],
  });
}

import { el } from "../../utils/el.js";
import { getFormat } from "../../utils/searchParams.js";
import legend from "../legend/legend.js";

export default function dataFormat({ children }) {
  const format = getFormat();
  return el("div", {
    className: "code-block data-format",
    children: [
      el("div", {
        children: [
          format === "xml" &&
            el("div", {
              textContent: '<?xml version="1.0" encoding="UTF-8"?>',
              className: "xml-declaration",
            }),
          children,
        ],
      }),
      legend(),
    ],
  });
}

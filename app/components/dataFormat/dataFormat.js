import { el } from "../../utils/el.js";
import legend from "../legend/legend.js";

export default function dataFormat({ children }) {
  return el("div", {
    className: "code-block data-format",
    children: [children, legend()],
  });
}

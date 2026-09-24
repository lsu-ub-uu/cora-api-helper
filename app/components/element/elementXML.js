import { el } from "../../utils/el.js";
import expandButton from "../expandButton/expandButton.js";
import multiplicity from "../multiplicity/multiplicity.js";

export default function elementXML({
  name,
  attributes,
  repeatMin,
  repeatMax,
  children,
  inline = false,
  defaultExpanded = true,
}) {
  const root = el("div", {
    className: `element${defaultExpanded ? "" : " collapsed"}`,
    children: [
      !inline &&
        expandButton({
          onClick: () => root.classList.toggle("collapsed"),
          defaultExpanded,
        }),
      "<",
      name,
      attributes,
      el("span", { textContent: ">", className: "closing-bracket" }),
      !inline && multiplicity({ repeatMin, repeatMax }),
      inline ? children : el("div", { className: "indent", children }),
      el("span", {
        className: "closing-tag",
        textContent: `</${name.textContent ?? name}>`,
      }),
      inline && multiplicity({ repeatMin, repeatMax }),
    ],
  });

  return root;
}

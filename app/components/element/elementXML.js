import { el } from "../../utils/el.js";
import expandButton from "../expandButton/expandButton.js";
import multiplicity from "../multiplicity/multiplicity.js";
import permissionIndicator from "../permissionIndicator/permissionIndicator.js";

export default function elementXML({
  name,
  attributes,
  repeatMin,
  repeatMax,
  children,
  inline = false,
  defaultExpanded = true,
  hasPermissions = false,
}) {
  if (hasPermissions) {
    console.log("Element has permissions");
  }
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
      !inline && hasPermissions && permissionIndicator(),
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

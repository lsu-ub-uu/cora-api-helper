import { el } from "../../utils/el.js";

export default function multiplicity({ repeatMin, repeatMax }) {
  if (!repeatMin || !repeatMax) return null;

  return el("span", {
    className: "multiplicity",
    textContent: `(${repeatMin} - ${repeatMax})`,
  });
}

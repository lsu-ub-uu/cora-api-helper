import { el } from "../../utils/el.js";
import { getFormat } from "../../utils/searchParams.js";
import { jsonObject } from "../element/elementJSON.js";
import elementXML from "../element/elementXML.js";

export default function permissions() {
  if (getFormat() === "json") {
    return jsonObject({
      name: "permissions",
      value: {
        read: [el("span", { className: "id", textContent: "{fieldName}" })],
        write: [el("span", { className: "id", textContent: "{fieldName}" })],
      },
      lastChild: false,
    });
  }

  return elementXML({
    name: "permissions",
    repeatMin: "0",
    repeatMax: "1",
    children: [permissionType("read"), permissionType("write")],
  });
}

function permissionType(name) {
  return elementXML({
    name,
    repeatMin: "0",
    repeatMax: "1",
    children: elementXML({
      name: "permission",
      repeatMin: "1",
      repeatMax: "X",
      children: el("span", { className: "id", textContent: "{fieldName}" }),
      inline: true,
    }),
  });
}

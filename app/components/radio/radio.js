import { el } from "../../utils/el.js";

export default function radio({ name, value, label, checked, onChange }) {
  return el("label", {
    className: "radio-button",
    children: [
      el("input", {
        id: value,
        type: "radio",
        name,
        value,
        checked,
        onChange: (e) => {
          if (onChange) {
            onChange(e.target.value);
          }
        },
      }),
      document.createTextNode(label),
    ],
  });
}

export default function radio({ name, value, label, checked, onChange }) {
  const root = document.createElement("label");
  root.className = "radio-button";

  const radio = document.createElement("input");
  radio.id = value;
  radio.type = "radio";
  radio.name = name;
  radio.value = value;
  radio.checked = checked;
  radio.addEventListener("change", (e) => {
    if (onChange) {
      onChange(e.target.value);
    }
  });

  root.appendChild(radio);
  root.appendChild(document.createTextNode(label));
  return root;
}

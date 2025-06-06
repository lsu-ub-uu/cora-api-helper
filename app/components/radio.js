export default function radio({ name, value, label, checked, onChange }) {
  const root = document.createDocumentFragment();

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

  const labelElement = document.createElement("label");
  labelElement.textContent = label;
  labelElement.htmlFor = value;

  root.appendChild(radio);
  root.appendChild(labelElement);
  return root;
}

export default function legend() {
  const root = document.createElement("div");
  root.className = "legend";
  root.innerHTML = `
        <h3>Legend</h3>
        <dl>
          <dt class="multiplicity">(0 - 1)</dt>
          <dd title="States how many times this element can be repeated">Repeat (min - max)</dd>
          <dt class="final-value">value</dt>
          <dd title="Value must be set to the final value">Final value</dd>
          <dt class="regex">/.+/</dt>
          <dd title="Value must match regular expression">Text value (RegEx)</dd>
          <dt  class="number-variable">0 - 100</dt>
          <dd title="Value must be a number within range">Number value (min - max)</dd>
          <dt class="collection-value">sv | en</dt>
          <dd title="Value must be one of the listed values">Enum value</dd>
          <dt class="id">{id}</dt>
          <dd title="Set to the ID of linked record">Record ID</dd>
        </dl>
      `;
  return root;
}

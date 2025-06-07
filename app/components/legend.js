export default function legend() {
  const root = document.createElement("div");
  root.className = "legend";
  root.innerHTML = `
        <h3>Legend</h3>
        <dl>
          <dt class="multiplicity">(0 - 1)</dt>
          <dd>Repeat (min - max)</dd>
          <dt class="final-value">value</dt>
          <dd>Final value</dd>
          <dt class="regex">/.+/</dt>
          <dd>Text value (RegEx)</dd>
          <dt class="number-variable">0 - 100</dt>
          <dd>Number value (min - max)</dd>
          <dt class="collection-value">sv | en</dt>
          <dd>Select value</dd>
        </dl>
      `;
  return root;
}

export default function expandButton({ onClick }) {
  let expanded = true;
  const root = document.createElement("button");

  root.addEventListener("click", () => {
    onClick();
    expanded = !expanded;
    render();
  });

  function render() {
    root.className = "element-expand-button";
    root.textContent = expanded ? "-" : "+";
    root.setAttribute(
      "aria-label",
      expanded ? "Collapse element" : "Expand element"
    );
  }

  render();

  return root;
}

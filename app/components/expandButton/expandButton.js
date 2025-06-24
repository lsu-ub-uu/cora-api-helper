export default function expandButton({ onClick }) {
  const expandButton = document.createElement("button");
  expandButton.className = "element-expand-button";
  expandButton.textContent = "-";
  expandButton.setAttribute("aria-label", "Collapse element");
  expandButton.addEventListener("click", () => {
    onClick();
    expandButton.textContent = expandButton.textContent === "-" ? "+" : "-";
    expandButton.setAttribute(
      "aria-label",
      expandButton.textContent === "-" ? "Collapse element" : "Expand element"
    );
  });
  return expandButton;
}

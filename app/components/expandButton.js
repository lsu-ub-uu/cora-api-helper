export default function expandButton({ onClick }) {
  const expandButton = document.createElement("button");
  expandButton.className = "element-expand-button";
  expandButton.textContent = "-";
  expandButton.addEventListener("click", () => {
    onClick();
    expandButton.textContent = expandButton.textContent === "-" ? "+" : "-";
  });
  return expandButton;
}

export default function showPopover({ trigger, children }) {
  const popover = document.createElement("div");
  popover.className = "element-popover";

  children.forEach((child) => {
    popover.appendChild(child);
  });

  popover.setAttribute("role", "tooltip");

  document.addEventListener("click", (event) => {
    if (!popover.contains(event.target) && event.target !== trigger) {
      popover.remove();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      popover.remove();
    }
  });

  popover.addEventListener("click", (event) => {
    event.stopPropagation();
  });

  trigger.parentElement.appendChild(popover);
}

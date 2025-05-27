import getFirstChildWithName from "../utils/getFirstChildWithName.js";
import getTextFromLink from "../utils/getTextFromLink.js";
import showPopover from "./popover.js";

export default function dataName({ metadata }) {
  const nameInData = getFirstChildWithName(metadata, "nameInData")?.value;

  const root = document.createElement("span");

  async function onClick() {
    const [text, defText] = await Promise.all([
      getTextFromLink(getFirstChildWithName(metadata, "textId")),
      getTextFromLink(getFirstChildWithName(metadata, "defTextId")),
    ]);
    const heading = document.createElement("h3");
    heading.textContent = text;

    const textContent = document.createElement("p");
    textContent.textContent = defText;

    showPopover({
      trigger: root,
      children: [heading, textContent],
    });
  }

  root.className = "data-name";
  root.textContent = nameInData;
  root.role = "button";
  root.tabIndex = 0;
  root.setAttribute("aria-label", `Show text for ${nameInData}`);
  root.addEventListener("click", onClick);
  root.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onClick();
    }
  });
  return root;
}

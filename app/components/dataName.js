import getFirstChildWithName from "../utils/getFirstChildWithName.js";
import getTextFromLink from "../utils/getTextFromLink.js";

export default function dataName({ metadata }) {
  const nameInData = getFirstChildWithName(metadata, "nameInData")?.value;

  const root = document.createElement("span");

  root.className = "data-name";
  const button = document.createElement("button");
  button.textContent = nameInData;

  const popover = document.createElement("div");
  popover.className = "popover";
  popover.popover = "auto";

  button.popoverTargetElement = popover;
  button.popoverTargetAction = "toggle";

  popover.addEventListener("beforetoggle", async (e) => {
    if (e.newState === "open" && !e.target.dataset.loaded) {
      const [text, defText] = await Promise.all([
        getTextFromLink(getFirstChildWithName(metadata, "textId")),
        getTextFromLink(getFirstChildWithName(metadata, "defTextId")),
      ]);
      const heading = document.createElement("h3");
      heading.textContent = `${text}`;

      const textContent = document.createElement("p");
      textContent.textContent = defText;
      e.target.appendChild(heading);
      e.target.appendChild(textContent);
      e.target.dataset.loaded = "true";
    }

    const rect = button.getBoundingClientRect();
    e.target.style.top = `${rect.bottom + window.scrollY}px`;
    e.target.style.left = `${rect.left + window.scrollX}px`;
  });

  root.appendChild(button);
  root.appendChild(popover);
  return root;
}

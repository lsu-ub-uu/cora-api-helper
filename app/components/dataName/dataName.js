import { el } from "../../utils/el.js";
import getFirstChildWithName from "../../utils/getFirstChildWithName.js";
import getTextFromLink from "../../utils/getTextFromLink.js";

export default function dataName({ metadata }) {
  const nameInData = getFirstChildWithName(metadata, "nameInData")?.value;

  const popover = el("div", {
    className: "popover",
    popover: "auto",
    onBeforetoggle: async (toggleEvent) => {
      const { target, newState } = toggleEvent;
      if (newState === "open" && !target.dataset.loaded) {
        const [text, defText] = await Promise.all([
          getTextFromLink(getFirstChildWithName(metadata, "textId")),
          getTextFromLink(getFirstChildWithName(metadata, "defTextId")),
        ]);
        target.appendChild(el("h3", { textContent: `${text}` }));
        target.appendChild(el("p", { textContent: defText }));
        target.dataset.loaded = "true";
      }
    },
  });

  const button = el("button", {
    textContent: nameInData,
    popoverTargetElement: popover,
    popoverTargetAction: "toggle",
  });

  return el("span", { className: "data-name", children: [button, popover] });
}

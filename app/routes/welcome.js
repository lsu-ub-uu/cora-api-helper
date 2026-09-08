import { el } from "../utils/el.js";

export default function welcomeMessage() {
  return el("div", {
    children: [
      el("h2", { textContent: "Welcome to the API helper!" }),
      el("p", {
        textContent: "This tool helps you explore the Cora REST API.",
      }),
      el("p", {
        textContent:
          "Select a record type from the navigation to the left to begin. ⬅️",
      }),
      el("p", {
        textContent:
          "You can set your preferred data format, language and API URL in the settings at the top right. ↗️",
      }),
    ],
  });
}

import { getApiUrl, getFormat } from "../../utils/searchParams.js";
import { el } from "../../utils/el.js";
import expandButton from "../expandButton/expandButton.js";
import { jsonObject } from "../element/elementJSON.js";
import elementXML from "../element/elementXML.js";
import actionLink from "../actionLink/actionLink.js";
import permissions from "../permissions/permissions.js";

export default function recordWrapper({ children, recordType, repeating }) {
  if (getFormat() === "json") {
    return recordWrapperJSON({ children, recordType });
  }
  return recordWrapperXML({ children, recordType, repeating });
}

function recordWrapperJSON({ children, recordType }) {
  const root = el("div", { className: "json-element" });

  root.appendChild(
    expandButton({ onClick: () => root.classList.toggle("collapsed") }),
  );

  root.append(
    el("div", { textContent: "{" }),
    el("div", {
      className: "indent",
      children: jsonObject({
        name: "record",
        children: [
          jsonObject({
            name: "data",
            children,
            lastChild: false,
          }),
          permissions(),
          jsonObject({
            name: "actionLinks",
            children: [
              actionLink({ method: "read", recordType, lastChild: false }),
              actionLink({
                method: "readIncomingLinks",
                recordType,
                lastChild: false,
              }),
              actionLink({ method: "update", recordType, lastChild: false }),
              actionLink({ method: "delete", recordType, lastChild: false }),
              actionLink({ method: "index", recordType }),
            ],
          }),
          recordType === "binary" &&
            jsonObject({
              name: "otherProtocols",
              children: [
                jsonObject({
                  name: "iiif",
                  value: {
                    server: getIIIFServerUrl(),
                    identifier: "{recordId}",
                  },
                }),
              ],
            }),
        ],
      }),
    }),
    el("div", { textContent: "}" }),
  );

  return root;
}

function recordWrapperXML({ children, recordType, repeating }) {
  return elementXML({
    name: "record",
    repeatMin: repeating ? "0" : "1",
    repeatMax: repeating ? "X" : "1",
    children: [
      elementXML({
        name: "data",
        repeatMin: "1",
        repeatMax: "1",
        children: children,
      }),
      permissions(),
      elementXML({
        name: "actionLinks",
        repeatMin: "1",
        repeatMax: "1",
        children: [
          actionLink({ method: "read", recordType }),
          actionLink({ method: "readIncomingLinks", recordType }),
          actionLink({ method: "update", recordType }),
          actionLink({ method: "delete", recordType }),
          actionLink({ method: "index", recordType }),
        ],
      }),
      recordType === "binary" &&
        elementXML({
          name: "otherProtocols",
          repeatMin: "0",
          repeatMax: "1",
          children: [
            elementXML({
              name: "iiif",
              repeatMin: "1",
              repeatMax: "1",
              children: [
                elementXML({
                  name: "server",
                  repeatMin: "1",
                  repeatMax: "1",
                  children: el("span", {
                    textContent: getIIIFServerUrl(),
                    className: "id",
                  }),
                  inline: true,
                }),
                elementXML({
                  name: "identifier",
                  repeatMin: "1",
                  repeatMax: "1",
                  children: el("span", {
                    textContent: "{recordId}",
                    className: "id",
                  }),
                  inline: true,
                }),
              ],
            }),
          ],
        }),
    ],
  });
}

function getIIIFServerUrl() {
  return getApiUrl().replace("/rest", "/iiif/");
}

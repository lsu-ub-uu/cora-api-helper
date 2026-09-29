import { el } from "../../utils/el.js";
import { getFormat } from "../../utils/searchParams.js";
import actionLink from "../actionLink/actionLink.js";
import element from "../element/element.js";
import elementJSON from "../element/elementJSON.js";
import elementXML from "../element/elementXML.js";
import { jsonObject } from "../element/elementJSON.js";

export default function resourceLink({
  metadataPool,
  metadata,
  mode,
  repeatMin,
  repeatMax,
  recordPartConstraint,
  lastChild = true,
}) {
  const children =
    getFormat() === "json"
      ? resourceLinkJSONChildren({ mode })
      : resourceLinkXMLChildren({ mode });

  return element({
    metadataPool,
    metadata,
    repeatMin,
    repeatMax,
    recordPartConstraint,
    children,
    lastChild,
  });
}

function resourceLinkJSONChildren({ mode }) {
  return [
    elementJSON({
      name: "linkedRecordType",
      repeatMin: "1",
      repeatMax: "1",
      children: el("span", { className: "final-value", textContent: "binary" }),
      lastChild: false,
    }),
    elementJSON({
      name: "linkedRecordId",
      repeatMin: "1",
      repeatMax: "1",
      children: el("span", { className: "id", textContent: "{id}" }),
      lastChild: mode !== "read",
    }),
    mode === "read" &&
      jsonObject({
        name: "actionLinks",
        children: actionLink({
          method: "read",
          recordType: "binary",
          recordId: "{id}/master",
          accept: "{mimeType}",
        }),
      }),
    elementJSON({
      name: "mimeType",
      repeatMin: "1",
      repeatMax: "1",
      children: el("span", { className: "id", textContent: "{mimeType}" }),
    }),
  ].filter(Boolean);
}

function resourceLinkXMLChildren({ mode }) {
  return [
    elementXML({
      name: "linkedRecordType",
      repeatMin: "1",
      repeatMax: "1",
      children: el("span", { className: "final-value", textContent: "binary" }),
      inline: true,
    }),
    elementXML({
      name: "linkedRecordId",
      repeatMin: "1",
      repeatMax: "1",
      children: el("span", { className: "id", textContent: "{id}" }),
      inline: true,
    }),
    elementXML({
      name: "mimeType",
      repeatMin: "1",
      repeatMax: "1",
      children: el("span", { className: "id", textContent: "{mimeType}" }),
      inline: true,
    }),
    mode === "read" &&
      elementXML({
        name: "actionLinks",
        repeatMin: "0",
        repeatMax: "1",
        children: actionLink({
          method: "read",
          recordType: "binary",
          recordId: "{id}/master",
          accept: "{mimeType}",
        }),
      }),
  ].filter(Boolean);
}

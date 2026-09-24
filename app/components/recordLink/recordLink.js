import { el } from "../../utils/el.js";
import getFirstChildWithName from "../../utils/getFirstChildWithName.js";
import { getFormat } from "../../utils/searchParams.js";
import actionLink from "../actionLink/actionLink.js";
import element from "../element/element.js";
import elementXML from "../element/elementXML.js";
import { jsonObject } from "../element/elementJSON.js";

export default function recordLink({
  metadataPool,
  metadata,
  mode,
  repeatMin,
  repeatMax,
  lastChild = true,
}) {
  const format = getFormat();
  const linkedRecordType = getFirstChildWithName(metadata, "linkedRecordType");
  const linkedRecordTypeValue = getFirstChildWithName(
    linkedRecordType,
    "linkedRecordId",
  )?.value;
  const finalValue = getFirstChildWithName(metadata, "finalValue")?.value;
  const linkedRecordId = finalValue || "{id}";

  return element({
    metadataPool,
    metadata,
    repeatMin,
    repeatMax,
    children:
      format === "json"
        ? recordLinkJson({ linkedRecordTypeValue, linkedRecordId, mode })
        : recordLinkXml({ linkedRecordTypeValue, linkedRecordId, mode }),
    lastChild,
  });
}

function recordLinkJson({ linkedRecordTypeValue, linkedRecordId, mode }) {
  return el("div", {
    className: "record-link",
    children: [
      el("div", {
        className: "indent",
        children: [
          el("span", { className: "json-key", textContent: '"children"' }),
          ": [",
          el("div", {
            className: "indent",
            children: [
              el("div", { textContent: "{" }),
              el("div", {
                className: "indent",
                children: [
                  el("span", {
                    className: "json-key",
                    textContent: '"name"',
                  }),
                  ': "linkedRecordType",',
                ],
              }),
              el("div", {
                className: "indent",
                children: [
                  el("span", {
                    className: "json-key",
                    textContent: '"value"',
                  }),
                  ': "',
                  el("span", {
                    className: "final-value",
                    textContent: linkedRecordTypeValue,
                  }),
                  '"',
                ],
              }),
              el("div", { textContent: "}, " }),
            ],
          }),

          el("div", {
            className: "indent",
            children: [
              el("div", { textContent: "{" }),
              el("div", {
                className: "indent",
                children: [
                  el("span", {
                    className: "json-key",
                    textContent: '"name"',
                  }),
                  ': "linkedRecordId",',
                ],
              }),
              el("div", {
                className: "indent",
                children: [
                  el("span", {
                    className: "json-key",
                    textContent: '"value"',
                  }),
                  ': "',
                  linkedRecordId !== "{id}"
                    ? el("span", {
                        className: "final-value",
                        textContent: linkedRecordId,
                      })
                    : el("span", {
                        className: "id",
                        textContent: "{id}",
                      }),
                  '"',
                ],
              }),
              el("div", { textContent: "}" }),
            ],
          }),

          el("div", { textContent: `]${mode === "read" ? "," : ""}` }),
        ],
      }),
      mode === "read" &&
        el("div", {
          className: "indent",
          children: jsonObject({
            name: "actionLinks",
            defaultExpanded: false,
            children: actionLink({
              method: "read",
              recordType: linkedRecordTypeValue,
              recordId: linkedRecordId,
            }),
          }),
        }),
    ],
  });
}

function recordLinkXml({ linkedRecordTypeValue, linkedRecordId, mode }) {
  return el("div", {
    className: "record-link",
    children: [
      el("div", {
        children: [
          "<linkedRecordType>",
          el("span", {
            className: "final-value",
            textContent: linkedRecordTypeValue,
          }),
          "</linkedRecordType>",
        ],
      }),
      el("div", {
        children: [
          `<linkedRecordId>`,
          el("span", {
            className: "final-value",
            textContent: linkedRecordId,
          }),
          `</linkedRecordId>`,
        ],
      }),
      mode === "read" &&
        elementXML({
          name: "actionLinks",
          repeatMin: "0",
          repeatMax: "1",
          defaultExpanded: false,
          children: actionLink({
            method: "read",
            recordType: linkedRecordTypeValue,
            recordId: linkedRecordId,
          }),
        }),
    ],
  });
}

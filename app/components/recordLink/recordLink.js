import { el } from "../../utils/el.js";
import getFirstChildWithName from "../../utils/getFirstChildWithName.js";
import { getFormat } from "../../utils/searchParams.js";
import element from "../element/element.js";

export default function recordLink({
  metadataPool,
  metadata,
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

  return element({
    metadataPool,
    metadata,
    repeatMin,
    repeatMax,
    children:
      format === "json"
        ? recordLinkJson({ linkedRecordTypeValue, finalValue })
        : recordLinkXml({ linkedRecordTypeValue, finalValue }),
    lastChild,
  });
}

function recordLinkJson({ linkedRecordTypeValue, finalValue }) {
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
                  finalValue
                    ? el("span", {
                        className: "final-value",
                        textContent: finalValue,
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

          el("div", { textContent: "]" }),
        ],
      }),
    ],
  });
}

function recordLinkXml({ linkedRecordTypeValue, finalValue }) {
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
            textContent: finalValue ? finalValue : "{id}",
          }),
          `</linkedRecordId>`,
        ],
      }),
    ],
  });
}

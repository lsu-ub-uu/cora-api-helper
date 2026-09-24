import elementXML from "../element/elementXML.js";
import elementJSON, { jsonObject } from "../element/elementJSON.js";
import { getApiUrl, getFormat } from "../../utils/searchParams.js";
import { el } from "../../utils/el.js";

export default function actionLink({ method, recordType, lastChild = true }) {
  const apiUrl = getApiUrl();
  const format = getFormat();

  switch (method) {
    case "read":
      return actionLinkElement({
        name: "read",
        requestMethod: "GET",
        url: `${apiUrl}/rest/record/${recordType}/{recordId}`,
        accept: "application/vnd.cora.record+xml",
        repeatMin: "1",
        lastChild,
      });
    case "update":
      return actionLinkElement({
        name: "update",
        requestMethod: "POST",
        url: `${apiUrl}/rest/record/${recordType}/{recordId}`,
        accept: "application/vnd.cora.record+xml",
        contentType: "application/vnd.cora.recordgroup+xml",
        lastChild,
      });
    case "delete":
      return actionLinkElement({
        name: "delete",
        requestMethod: "DELETE",
        url: `${apiUrl}/rest/record/${recordType}/{recordId}`,
        lastChild,
      });
    case "index":
      return actionLinkElement({
        name: "index",
        requestMethod: "POST",
        accept: "application/vnd.cora.record+xml",
        contentType: "application/vnd.cora.recordgroup+xml",
        url: `${apiUrl}/rest/record/workOrder`,
        body: indexBody(recordType, format),
        lastChild,
      });
    default:
      throw new Error(`Unsupported method: ${method}`);
  }
}

function actionLinkElement({
  name,
  requestMethod,
  accept,
  contentType,
  repeatMin = "0",
  url,
  body,
  lastChild,
}) {
  if (getFormat() === "json") {
    return actionLinkJSON({
      name,
      requestMethod,
      accept,
      contentType,
      url,
      body,
      lastChild,
    });
  }

  return actionLinkXML({
    name,
    requestMethod,
    accept,
    contentType,
    repeatMin,
    url,
    body,
  });
}

function actionLinkJSON({
  name,
  requestMethod,
  accept,
  contentType,
  url,
  body,
  lastChild,
}) {
  const value = {
    requestMethod,
    rel: name,
    ...(body ? { body } : {}),
    ...(contentType
      ? { contentType: contentType.replace("+xml", "+json") }
      : {}),
    url: name === "index" ? `${url}/` : url,
    ...(accept ? { accept: accept.replace("+xml", "+json") } : {}),
  };

  return jsonObject({ name, value, lastChild });
}

function actionLinkXML({
  name,
  requestMethod,
  accept,
  contentType,
  repeatMin,
  url,
  body,
}) {
  return elementXML({
    name,
    repeatMin,
    repeatMax: "1",
    children: [
      elementXML({
        name: "requestMethod",
        repeatMin: "1",
        repeatMax: "1",
        children: id(requestMethod),
        inline: true,
      }),
      elementXML({
        name: "rel",
        repeatMin: "1",
        repeatMax: "1",
        children: id(name),
        inline: true,
      }),
      elementXML({
        name: "url",
        repeatMin: "1",
        repeatMax: "1",
        children: id(url),
        inline: true,
      }),
      ...(contentType
        ? [
            elementXML({
              name: "contentType",
              repeatMin: "1",
              repeatMax: "1",
              children: id(contentType),
              inline: true,
            }),
          ]
        : []),
      ...(accept
        ? [
            elementXML({
              name: "accept",
              repeatMin: "1",
              repeatMax: "1",
              children: id(accept),
              inline: true,
            }),
          ]
        : []),
      body,
    ],
  });
}

function indexBody(recordType, format) {
  if (format === "json") {
    return elementJSON({
      name: "workOrder",
      repeatMax: "1",
      children: [
        elementJSON({
          name: "recordType",
          repeatMax: "1",
          children: [
            elementJSON({
              name: "linkedRecordType",
              repeatMax: "1",
              children: id("recordType"),
              lastChild: false,
            }),
            elementJSON({
              name: "linkedRecordId",
              repeatMax: "1",
              children: id(recordType),
              lastChild: true,
            }),
          ],
          lastChild: false,
        }),
        elementJSON({
          name: "recordId",
          repeatMax: "1",
          children: id("{recordId}"),
          lastChild: false,
        }),
        elementJSON({
          name: "type",
          repeatMax: "1",
          children: id("index"),
        }),
      ],
      lastChild: false,
    });
  }
  return elementXML({
    name: "body",
    repeatMin: "1",
    repeatMax: "1",
    children: [
      elementXML({
        name: "workOrder",
        repeatMin: "1",
        repeatMax: "1",
        children: [
          elementXML({
            name: "recordType",
            repeatMin: "1",
            repeatMax: "1",
            children: [
              elementXML({
                name: "linkedRecordType",
                repeatMin: "1",
                repeatMax: "1",
                children: id("recordType"),
                inline: true,
              }),
              elementXML({
                name: "linkedRecordId",
                repeatMin: "1",
                repeatMax: "1",
                children: id(recordType),
                inline: true,
              }),
              elementXML({
                name: "recordId",
                repeatMin: "1",
                repeatMax: "1",
                children: id("{recordId}"),
                inline: true,
              }),
              elementXML({
                name: "type",
                repeatMin: "1",
                repeatMax: "1",
                children: id("index"),
                inline: true,
              }),
            ],
          }),
        ],
      }),
    ],
  });
}

function id(text) {
  return el("span", {
    textContent: text,
    className: "id",
  });
}

import elementXML from "../element/elementXML.js";
import { jsonObject } from "../element/elementJSON.js";
import { getApiUrl, getFormat } from "../../utils/searchParams.js";

export default function actionLink({ method, recordType }) {
  const apiUrl = getApiUrl();
  switch (method) {
    case "read":
      return actionLinkElement({
        name: "read",
        requestMethod: "GET",
        url: `${apiUrl}/rest/record/${recordType}/{recordId}`,
        accept: "application/vnd.cora.record+xml",
        repeatMin: "1",
      });
    case "update":
      return actionLinkElement({
        name: "update",
        requestMethod: "POST",
        url: `${apiUrl}/rest/record/${recordType}/{recordId}`,
        accept: "application/vnd.cora.record+xml",
        contentType: "application/vnd.cora.recordgroup+xml",
      });
    case "delete":
      return actionLinkElement({
        name: "delete",
        requestMethod: "DELETE",
        url: `${apiUrl}/rest/record/${recordType}/{recordId}`,
      });
    case "index":
      return actionLinkElement({
        name: "index",
        requestMethod: "POST",
        accept: "application/vnd.cora.record+xml",
        contentType: "application/vnd.cora.recordgroup+xml",
        url: `${apiUrl}/rest/record/workOrder`,
        body: indexBody(recordType),
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
}) {
  if (getFormat() === "json") {
    return actionLinkJSON({
      name,
      requestMethod,
      accept,
      contentType,
      url,
      body,
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
}) {
  const value = {
    requestMethod,
    rel: name,
    ...(body ? { body: body.json } : {}),
    ...(contentType
      ? { contentType: contentType.replace("+xml", "+json") }
      : {}),
    url: name === "index" ? `${url}/` : url,
    ...(accept ? { accept: accept.replace("+xml", "+json") } : {}),
  };

  return jsonObject({ name, value });
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
        children: [requestMethod],
      }),
      elementXML({
        name: "rel",
        repeatMin: "1",
        repeatMax: "1",
        children: [name],
      }),
      elementXML({
        name: "url",
        repeatMin: "1",
        repeatMax: "1",
        children: [url],
      }),
      ...(contentType
        ? [
            elementXML({
              name: "contentType",
              repeatMin: "1",
              repeatMax: "1",
              children: [contentType],
            }),
          ]
        : []),
      ...(accept
        ? [
            elementXML({
              name: "accept",
              repeatMin: "1",
              repeatMax: "1",
              children: [accept],
            }),
          ]
        : []),
      ...(body ? [body.xml] : []),
    ],
  });
}

function indexBody(recordType) {
  return {
    json: {
      children: [
        {
          children: [
            { name: "linkedRecordType", value: "recordType" },
            { name: "linkedRecordId", value: recordType },
          ],
          name: "recordType",
        },
        { name: "recordId", value: "{recordId}" },
        { name: "type", value: "index" },
      ],
      name: "workOrder",
    },
    xml: elementXML({
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
                  children: ["recordType"],
                }),
                elementXML({
                  name: "linkedRecordId",
                  repeatMin: "1",
                  repeatMax: "1",
                  children: [recordType],
                }),
                elementXML({
                  name: "recordId",
                  repeatMin: "1",
                  repeatMax: "1",
                  children: ["{recordId}"],
                }),
                elementXML({
                  name: "type",
                  repeatMin: "1",
                  repeatMax: "1",
                  children: ["index"],
                }),
              ],
            }),
          ],
        }),
      ],
    }),
  };
}

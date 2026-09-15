import elementXML from "../element/elementXML";

export default function actionLink({ method, recordType }) {
  switch (method) {
    case "read":
      return actionLinkElement({
        name: "read",
        requestMethod: "GET",
        recordType,
        accept: "application/vnd.cora.record+xml",
        repeatMin: "1",
      });
    case "update":
      return actionLinkElement({
        name: "update",
        requestMethod: "POST",
        recordType,
        accept: "application/vnd.cora.record+xml",
        contentType: "application/vnd.cora.recordgroup+xml",
      });
    case "delete":
      return actionLinkElement({
        name: "delete",
        requestMethod: "DELETE",
        recordType,
      });
    default:
      throw new Error(`Unsupported method: ${method}`);
  }
}

function actionLinkElement({
  name,
  requestMethod,
  recordType,
  accept,
  contentType,
  repeatMin = "0",
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
        children: [`http://example.com/rest/record/${recordType}/{recordId}`],
      }),
      ...(contentType && [
        elementXML({
          name: "contentType",
          repeatMin: "1",
          repeatMax: "1",
          children: [contentType],
        }),
      ]),
      ...(accept && [
        elementXML({
          name: "accept",
          repeatMin: "1",
          repeatMax: "1",
          children: [accept],
        }),
      ]),
    ],
  });
}

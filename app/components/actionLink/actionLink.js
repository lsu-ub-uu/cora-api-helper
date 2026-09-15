import elementXML from "../element/elementXML";

export default function actionLink({ method, recordType }) {
  return elementXML({
    name: method,
    repeatMin: method === "read" ? "1" : "0",
    repeatMax: "1",
    children: [
      elementXML({
        name: "requestMethod",
        repeatMin: "1",
        repeatMax: "1",
        children: [
          method === "read" ? "GET" : method === "delete" ? "DELETE" : "POST",
        ],
      }),
      elementXML({
        name: "rel",
        repeatMin: "1",
        repeatMax: "1",
        children: [method],
      }),
      elementXML({
        name: "url",
        repeatMin: "1",
        repeatMax: "1",
        children: [`http://example.com/rest/record/${recordType}/{recordId}`],
      }),
      ...(method === "update"
        ? [
            elementXML({
              name: "contentType",
              repeatMin: "1",
              repeatMax: "1",
              children: ["application/vnd.cora.recordgroup+xml"],
            }),
          ]
        : []),
      elementXML({
        name: "accept",
        repeatMin: "1",
        repeatMax: "1",
        children: ["application/vnd.cora.record+xml"],
      }),
    ],
  });
}

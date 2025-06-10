import xpath from "../utils/xpath.js";

export default async function listRecordType(recordType) {
  const apiUrl =
    new URLSearchParams(window.location.search).get("api-url") ??
    "https://cora.epc.ub.uu.se/diva/rest";
  const response = await fetch(`${apiUrl}/record/${recordType}`, {
    headers: { Accept: "application/vnd.cora.recordList+xml" },
    cache: "force-cache",
  });

  const text = await response.text();

  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(text, "application/xml");

  // Find all <record> nodes
  const recordNodes = xmlDoc.evaluate(
    "/dataList/data/record/data/*",
    xmlDoc,
    null,
    XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
    null
  );

  const result = {};

  for (let i = 0; i < recordNodes.snapshotLength; i++) {
    const recordNode = recordNodes.snapshotItem(i);

    const serializer = new XMLSerializer();
    const recordXmlString = serializer.serializeToString(recordNode);
    const recordXmlDoc = parser.parseFromString(
      recordXmlString,
      "application/xml"
    );

    const id = xpath(recordXmlDoc, "//recordInfo/id");

    result[id] = recordXmlDoc;
  }
  return result;
}

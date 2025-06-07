import getFirstChildWithName from "../utils/getFirstChildWithName.js";

export default async function listRecordType(recordType) {
  const apiUrl =
    new URLSearchParams(window.location.search).get("api-url") ??
    "https://cora.epc.ub.uu.se/diva/rest";
  const response = await fetch(`${apiUrl}/record/${recordType}`, {
    headers: { Accept: "application/vnd.cora.recordList+json" },
    cache: "force-cache",
  });

  const json = await response.json();
  return json.dataList.data.reduce((acc, item) => {
    const data = item.record.data;
    const recordInfo = getFirstChildWithName(data, "recordInfo");
    const recordId = getFirstChildWithName(recordInfo, "id").value;
    acc[recordId] = data;
    return acc;
  }, {});
}

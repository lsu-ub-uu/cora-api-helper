import getFirstChildWithName from "../utils/getFirstChildWithName.js";

export default function requestConfigDoc({ validationType }) {
  const search = new URLSearchParams(window.location.search);
  const format = search.get("format") || "xml";
  const method = search.get("method") || "create";

  const recordTypeLink = getFirstChildWithName(
    validationType,
    "validatesRecordType"
  );
  const recordTypeId = getFirstChildWithName(
    recordTypeLink,
    "linkedRecordId"
  ).value;

  const apiUrl =
    new URLSearchParams(window.location.search).get("api-url") ??
    "https://cora.epc.ub.uu.se/diva/rest";

  const requestUrl = `${apiUrl}/record/${recordTypeId}${
    method === "update" ? "/{id}" : ""
  }`;

  const root = document.createElement("details");
  root.className = "code-block";

  root.innerHTML = `
        <summary><strong>POST</strong> ${requestUrl}</summary>
        <br />
        <br />
        <div><strong>Accept:</strong> application/vnd.cora.record+${format}</div>
        <div><strong>Content-Type:</strong> application/vnd.cora.recordGroup+${format}</div>
        <div><strong>AuthToken:</strong> xxxx-xxxx-xxxx-xxxx</div>
  `;
  return root;
}

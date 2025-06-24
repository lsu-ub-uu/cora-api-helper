import getFirstChildWithName from "../utils/getFirstChildWithName.js";
import { getApiUrl, getFormat, getMethod } from "../utils/searchParams.js";

export default function requestConfigDoc({ validationType }) {
  const format = getFormat();
  const method = getMethod();

  const recordTypeLink = getFirstChildWithName(
    validationType,
    "validatesRecordType"
  );
  const recordTypeId = getFirstChildWithName(
    recordTypeLink,
    "linkedRecordId"
  ).value;

  const apiUrl = getApiUrl();

  const requestUrl = `${apiUrl}/record/${recordTypeId}${
    method === "update" ? "/{id}" : ""
  }`;

  const root = document.createElement("div");
  root.className = "code-block";

  root.innerHTML = `
        <strong>POST</strong> ${requestUrl}
        <br />
        <br />
        <div><strong>Accept:</strong> application/vnd.cora.record+${format}</div>
        <div><strong>Content-Type:</strong> application/vnd.cora.recordGroup+${format}</div>
        <div><strong>AuthToken:</strong> xxxx-xxxx-xxxx-xxxx</div>
  `;
  return root;
}

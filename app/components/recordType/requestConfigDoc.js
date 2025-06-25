import { getApiUrl, getFormat } from "../../utils/searchParams.js";

export default function requestConfigDoc({ recordTypeId, method }) {
  const format = getFormat();

  const apiUrl = getApiUrl();

  const requestUrl = `${apiUrl}/record/${recordTypeId}${
    method !== "create" ? "/{id}" : ""
  }`;

  const root = document.createDocumentFragment();
  const heading = document.createElement("h3");
  heading.textContent = "Request config";
  root.appendChild(heading);

  const codeBlock = document.createElement("div");
  codeBlock.className = "code-block";

  const httpMethod =
    method === "read" ? "GET" : method === "delete" ? "DELETE" : "POST";

  codeBlock.innerHTML = `
        <strong>${httpMethod}</strong> ${requestUrl}
        <br />
        <br />
       
         ${
           method !== "delete"
             ? `<div><strong>Accept:</strong> application/vnd.cora.record+${format}</div>`
             : ""
         }
        ${
          (method === "create") | (method === "update")
            ? `<div><strong>Content-Type:</strong> application/vnd.cora.recordGroup+${format}</div>`
            : ""
        }
        <div><strong>AuthToken:</strong> xxxx-xxxx-xxxx-xxxx</div>
  `;

  root.appendChild(codeBlock);
  return root;
}

import { el } from "../../utils/el.js";
import { getApiUrl, getFormat } from "../../utils/searchParams.js";

export default function requestConfigDoc({ recordTypeId, method }) {
  const format = getFormat();

  const apiUrl = getApiUrl();

  const requestUrl = `${apiUrl}/record/${recordTypeId}${
    method !== "create" ? "/{id}" : ""
  }`;

  const httpMethod =
    method === "read" ? "GET" : method === "delete" ? "DELETE" : "POST";
  const root = document.createDocumentFragment();
  root.appendChild(el("h3", { textContent: "Request config" }));
  root.appendChild(
    el("div", {
      className: "code-block",
      children: [
        el("strong", { textContent: httpMethod }),
        ` ${requestUrl}`,
        el("br"),
        el("br"),
        method !== "delete" &&
          el("div", {
            textContent: `Accept: application/vnd.cora.record+${format}`,
          }),
        (method === "create" || method === "update") &&
          el("div", {
            textContent: `Content-Type: application/vnd.cora.recordGroup+${format}`,
          }),
        el("div", {
          textContent: "AuthToken: xxxx-xxxx-xxxx-xxxx",
        }),
      ],
    }),
  );

  return root;
}

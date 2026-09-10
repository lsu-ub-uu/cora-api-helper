import { el } from "../../utils/el.js";
import { getApiUrl, getFormat } from "../../utils/searchParams.js";
import t from "../../utils/t.js";

export default function requestConfigDoc({ recordTypeId, method }) {
  const format = getFormat();

  const apiUrl = getApiUrl();

  const requestUrl = `${apiUrl}/record/${recordTypeId}${
    method !== "create" ? "/{id}" : ""
  }`;

  const httpMethod =
    method === "read"
      ? t("apiHelper_getText")
      : method === "delete"
        ? "DELETE"
        : t("apiHelper_postText");
  const root = document.createDocumentFragment();
  root.appendChild(el("h3", { textContent: t("apiHelper_requestConfigText") }));
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
          textContent: t("apiHelper_authTokenText"),
        }),
      ],
    }),
  );

  return root;
}

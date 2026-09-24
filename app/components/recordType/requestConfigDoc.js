import { el } from "../../utils/el.js";
import { getApiUrl, getFormat } from "../../utils/searchParams.js";
import t from "../../utils/t.js";
import collapsibleSection from "../collapsibleSection/collapsibleSection.js";

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
  return collapsibleSection({
    title: t("apiHelper_requestConfigText"),
    children: el("div", {
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
  });
}

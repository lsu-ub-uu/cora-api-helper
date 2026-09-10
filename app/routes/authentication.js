import { el } from "../utils/el.js";
import { getApiUrl } from "../utils/searchParams.js";
import t from "../utils/t.js";

export default function authentication() {
  const apiUrl = getApiUrl();

  return el("article", {
    children: [
      el("h1", { textContent: t("apiHelper_authenticationText") }),
      el("p", {
        textContent: t("apiHelper_authenticationIntroText"),
      }),
      el("p", {
        textContent: t("apiHelper_authenticationTokenInstructionText"),
      }),
      el("p", {
        textContent: t("apiHelper_authenticationTokenInfoText"),
      }),
      el("h2", { textContent: t("apiHelper_authenticationAppTokenText") }),
      el("p", {
        className: "code-block",
        children: [
          el("div", { textContent: `POST ${apiUrl}/login/rest/apptoken` }),
          el("div", {
            children: [
              el("br"),
              el("div", {
                textContent: t("apiHelper_httpHeaderContentTypeLoginText"),
              }),
              el("div", {
                textContent: t("apiHelper_httpHeaderAcceptAuthenticationText"),
              }),
            ],
          }),
        ],
      }),
      el("h3", { textContent: t("apiHelper_requestBodyText") }),
      el("p", {
        className: "code-block",
        children: [
          el("div", {
            textContent: "john.doe@example.com",
          }),
          el("div", {
            textContent: "your-app-token",
          }),
        ],
      }),
      el("h3", { textContent: t("apiHelper_responseText") }),
      authResponseBody(),
    ],
  });
}

function authResponseBody() {
  const tokenValue = "your-auth-token-valid-for-10-minutes";
  const json = JSON.stringify(
    {
      authentication: {
        data: {
          children: [
            {
              name: "token",
              value: tokenValue,
            },
            {
              name: "validUntil",
              value: "1778398137837",
            },
            {
              name: "renewUntil",
              value: "1778483937837",
            },
            {
              name: "userId",
              value: "coraUser:491144693381458",
            },
            {
              name: "loginId",
              value: "john.doe@example.",
            },
            {
              name: "firstName",
              value: "John",
            },
            {
              name: "lastName",
              value: "Doe",
            },
            {
              repeatId: "1",
              children: [
                {
                  name: "linkedRecordType",
                  value: "permissionUnit",
                },
                {
                  name: "linkedRecordId",
                  value: "uu",
                },
              ],
              name: "permissionUnit",
            },
          ],
          name: "authToken",
        },
        actionLinks: {
          renew: {
            requestMethod: "POST",
            rel: "renew",
            url: "https://preview.diva.cora.epc.ub.uu.se/login/rest/authToken/4f81baa5-b173-492a-bf32-bf3a093e61c5",
            accept: "application/vnd.cora.authentication+json",
          },
          delete: {
            requestMethod: "DELETE",
            rel: "delete",
            url: "https://preview.diva.cora.epc.ub.uu.se/login/rest/authToken/4f81baa5-b173-492a-bf32-bf3a093e61c5",
          },
        },
      },
    },
    null,
    2,
  );

  const splitIndex = json.indexOf(tokenValue);
  const before = json.slice(0, splitIndex);
  const after = json.slice(splitIndex + tokenValue.length);

  return el("p", {
    className: "code-block",
    children: [
      before,
      el("span", { className: "highlight", textContent: tokenValue }),
      after,
    ],
  });
}

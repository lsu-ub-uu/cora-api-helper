import { el } from "../utils/el.js";
import { getApiUrl } from "../utils/searchParams.js";

export default function authentication() {
  const apiUrl = getApiUrl();

  return el("article", {
    children: [
      el("h1", { textContent: "Authentication" }),
      el("p", {
        textContent:
          "The Cora API is publicly accessible, but requires authentication for administrative actions like creating or updating records, or reading restricted data.",
      }),
      el("p", {
        textContent:
          "To authenticate API requests, you need to obtain an auth token and pass it in the 'Authtoken' header of your requests.",
      }),
      el("p", {
        textContent:
          "An auth token can be obtained by logging in using an App Token connected to your user or by using your username and password. The auth token is valid for a short time (typically around 10 minutes) and can be used for all API requests during that time. The response of a successful login request contains an actionLink that can be used to renew the auth token before it expires.",
      }),
      el("h2", { textContent: "Log in with App Token" }),
      el("p", {
        className: "code-block",
        children: [
          el("div", { textContent: `POST ${apiUrl}/login/rest/apptoken` }),
          el("div", {
            children: [
              el("br"),
              el("div", {
                textContent:
                  "Content-Type: Content-Type: application/vnd.cora.login",
              }),
              el("div", {
                textContent:
                  "Accept:     application/vnd.cora.authentication+json",
              }),
            ],
          }),
        ],
      }),
      el("h3", { textContent: "Request body" }),
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
      el("h3", { textContent: "Response" }),
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

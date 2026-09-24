import { describe, expect, it, vi } from "vitest";
import { getApiUrl, getFormat } from "../../utils/searchParams";
import actionLink from "./actionLink";
import { normalize } from "../../utils/normalize";

vi.mock("../../utils/searchParams.js");

describe("actionLink", () => {
  it("returns read XML action link", () => {
    getFormat.mockReturnValue("xml");
    getApiUrl.mockReturnValue("https://someapiurl.com");

    const result = actionLink({ method: "read", recordType: "someRecordType" });

    const expectedResult = `
        -<read>(1 - 1)
          -<requestMethod>GET</requestMethod>(1 - 1)
          -<rel>read</rel>(1 - 1)
          -<url>https://someapiurl.com/rest/record/someRecordType/{recordId}</url>(1 - 1)
          -<accept>application/vnd.cora.record+xml</accept>(1 - 1)
        </read>
    `;

    expect(normalize(result.textContent)).toEqual(normalize(expectedResult));
  });

  it("returns update XML action link", () => {
    getFormat.mockReturnValue("xml");
    getApiUrl.mockReturnValue("https://someapiurl.com");

    const result = actionLink({
      method: "update",
      recordType: "someRecordType",
    });

    const expectedResult = `
        -<update>(0 - 1)
          -<requestMethod>POST</requestMethod>(1 - 1)
          -<rel>update</rel>(1 - 1)
          -<url>https://someapiurl.com/rest/record/someRecordType/{recordId}</url>(1 - 1)
          -<contentType>application/vnd.cora.recordgroup+xml</contentType>(1 - 1)
          -<accept>application/vnd.cora.record+xml</accept>(1 - 1)
        </update>
    `;

    expect(normalize(result.textContent)).toEqual(normalize(expectedResult));
  });

  it("returns delete XML action link", () => {
    getFormat.mockReturnValue("xml");
    getApiUrl.mockReturnValue("https://someapiurl.com");

    const result = actionLink({
      method: "delete",
      recordType: "someRecordType",
    });

    const expectedResult = `
        -<delete>(0 - 1)
          -<requestMethod>DELETE</requestMethod>(1 - 1)
          -<rel>delete</rel>(1 - 1)
          -<url>https://someapiurl.com/rest/record/someRecordType/{recordId}</url>(1 - 1)
        </delete>
    `;

    expect(normalize(result.textContent)).toEqual(normalize(expectedResult));
  });

  it("returns index XML action link", () => {
    getFormat.mockReturnValue("xml");
    getApiUrl.mockReturnValue("https://someapiurl.com");

    const result = actionLink({
      method: "index",
      recordType: "someRecordType",
    });

    const expectedResult = `
        -<index>(0 - 1)
          -<requestMethod>POST</requestMethod>(1 - 1)
          -<rel>index</rel>(1 - 1)
          -<url>https://someapiurl.com/rest/record/workOrder</url>(1 - 1)
          -<contentType>application/vnd.cora.recordgroup+xml</contentType>(1 - 1)
          -<accept>application/vnd.cora.record+xml</accept>(1 - 1)
            -<body>(1 - 1)
                -<workOrder>(1 - 1)
                    -<recordType>(1 - 1)
                        -<linkedRecordType>recordType</linkedRecordType>(1 - 1)
                        -<linkedRecordId>someRecordType</linkedRecordId>(1 - 1)
                        -<recordId>{recordId}</recordId>(1 - 1)
                        -<type>index</type>(1 - 1)
                    </recordType>
                </workOrder>
            </body>
        </index>
    `;

    expect(normalize(result.textContent)).toEqual(normalize(expectedResult));
  });

  it("returns read JSON action link", () => {
    getFormat.mockReturnValue("json");
    getApiUrl.mockReturnValue("https://someapiurl.com");

    const result = actionLink({ method: "read", recordType: "someRecordType" });

    expect(normalize(result.textContent)).toEqual(
      normalize(`
        -"read": {
          "requestMethod": "GET",
          "rel": "read",
          "url": "https://someapiurl.com/rest/record/someRecordType/{recordId}",
          "accept": "application/vnd.cora.record+json"
        }
      `),
    );
  });

  it("returns update JSON action link", () => {
    getFormat.mockReturnValue("json");
    getApiUrl.mockReturnValue("https://someapiurl.com");

    const result = actionLink({
      method: "update",
      recordType: "someRecordType",
    });

    expect(normalize(result.textContent)).toEqual(
      normalize(`
        -"update": {
          "requestMethod": "POST",
          "rel": "update",
          "contentType": "application/vnd.cora.recordgroup+json",
          "url": "https://someapiurl.com/rest/record/someRecordType/{recordId}",
          "accept": "application/vnd.cora.record+json"
        }
      `),
    );
  });

  it("returns delete JSON action link", () => {
    getFormat.mockReturnValue("json");
    getApiUrl.mockReturnValue("https://someapiurl.com");

    const result = actionLink({
      method: "delete",
      recordType: "someRecordType",
    });

    expect(normalize(result.textContent)).toEqual(
      normalize(`
        -"delete": {
          "requestMethod": "DELETE",
          "rel": "delete",
          "url": "https://someapiurl.com/rest/record/someRecordType/{recordId}"
        }
      `),
    );
  });

  it("returns index JSON action link", () => {
    getFormat.mockReturnValue("json");
    getApiUrl.mockReturnValue("https://someapiurl.com");

    const result = actionLink({
      method: "index",
      recordType: "someRecordType",
    });

    expect(normalize(result.textContent)).toEqual(
      normalize(`
        -"index": {
          "requestMethod": "POST",
          "rel": "index",
          "body": -{
            "name": "workOrder",
            "children": [
              -{
                "name": "recordType",
                "children": [
                  -{
                    "name": "linkedRecordType",
                    "value": "recordType"
                  },
                  -{
                    "name": "linkedRecordId",
                    "value": "someRecordType"
                  }
                ]
              },
              -{
                "name": "recordId",
                "value": "{recordId}"
              },
              -{
                "name": "type",
                "value": "index"
              }
            ]
          },
          "contentType": "application/vnd.cora.recordgroup+json",
          "url": "https://someapiurl.com/rest/record/workOrder/",
          "accept": "application/vnd.cora.record+json"
        }
      `),
    );
    expect(result.querySelectorAll("button")).toHaveLength(7);
  });

  it("throws for an unsupported method", () => {
    getApiUrl.mockReturnValue("https://someapiurl.com");

    expect(() => actionLink({ method: "unsupported" })).toThrow(
      "Unsupported method: unsupported",
    );
  });
});

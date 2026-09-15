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
            -<requestMethod>(1 - 1)
                GET
            </requestMethod>
            -<rel>(1 - 1)
                read
            </rel>
            -<url>(1 - 1)
                https://someapiurl.com/rest/record/someRecordType/{recordId}
            </url>
            -<accept>(1 - 1)
                application/vnd.cora.record+xml
            </accept>
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
            -<requestMethod>(1 - 1)
                POST
            </requestMethod>
            -<rel>(1 - 1)
                update
            </rel>
            -<url>(1 - 1)
                https://someapiurl.com/rest/record/someRecordType/{recordId}
            </url>
            -<contentType>(1 - 1)
                application/vnd.cora.recordgroup+xml
            </contentType>
            -<accept>(1 - 1)
                application/vnd.cora.record+xml
            </accept>
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
            -<requestMethod>(1 - 1)
                DELETE
            </requestMethod>
            -<rel>(1 - 1)
                delete
            </rel>
            -<url>(1 - 1)
                https://someapiurl.com/rest/record/someRecordType/{recordId}
            </url>
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
            -<requestMethod>(1 - 1)
                POST
            </requestMethod>
            -<rel>(1 - 1)
                index
            </rel>
            -<url>(1 - 1)
                https://someapiurl.com/rest/record/workOrder
            </url>
            -<contentType>(1 - 1)
                application/vnd.cora.recordgroup+xml
            </contentType>
            -<accept>(1 - 1)
                application/vnd.cora.record+xml
            </accept>
            -<body>(1 - 1)
                -<workOrder>(1 - 1)
                    -<recordType>(1 - 1)
                        -<linkedRecordType>(1 - 1)
                            recordType
                        </linkedRecordType>
                        -<linkedRecordId>(1 - 1)
                            someRecordType
                        </linkedRecordId>
                        -<recordId>(1 - 1)
                            {recordId}
                        </recordId>
                        -<type>(1 - 1)
                            index
                        </type>
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
          "body": {
            "children": [
              {
                "children": [
                  {
                    "name": "linkedRecordType",
                    "value": "recordType"
                  },
                  {
                    "name": "linkedRecordId",
                    "value": "someRecordType"
                  }
                ],
                "name": "recordType"
              },
              {
                "name": "recordId",
                "value": "{recordId}"
              },
              {
                "name": "type",
                "value": "index"
              }
            ],
            "name": "workOrder"
          },
          "contentType": "application/vnd.cora.recordgroup+json",
          "url": "https://someapiurl.com/rest/record/workOrder/",
          "accept": "application/vnd.cora.record+json"
        }
      `),
    );
  });

  it("throws for an unsupported method", () => {
    getApiUrl.mockReturnValue("https://someapiurl.com");

    expect(() => actionLink({ method: "unsupported" })).toThrow(
      "Unsupported method: unsupported",
    );
  });
});

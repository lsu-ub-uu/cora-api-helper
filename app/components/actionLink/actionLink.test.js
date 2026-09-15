import { describe, expect, it, vi } from "vitest";
import { getFormat } from "../../utils/searchParams";
import actionLink from "./actionLink";
import { normalize } from "../../utils/normalize";

vi.mock("../../utils/searchParams.js");

describe("actionLink", () => {
  it("returns read XML action link", () => {
    getFormat.mockReturnValue("xml");

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
                http://example.com/rest/record/someRecordType/{recordId}
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
                http://example.com/rest/record/someRecordType/{recordId}
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
                http://example.com/rest/record/someRecordType/{recordId}
            </url>
        </delete>
    `;

    expect(normalize(result.textContent)).toEqual(normalize(expectedResult));
  });
});

/*  
index 

 <index>
      <requestMethod>POST</requestMethod>
      <rel>index</rel>
      <url>https://preview.diva.cora.epc.ub.uu.se/rest/record/workOrder</url>
      <contentType>application/vnd.cora.recordgroup+xml</contentType>
      <accept>application/vnd.cora.record+xml</accept>
      <body>
        <workOrder>
          <recordType>
            <linkedRecordType>recordType</linkedRecordType>
            <linkedRecordId>diva-person</linkedRecordId>
            <recordId>13</recordId>
            <type>index</type>
          </recordType>
        </workOrder>
      </body>
    </index>

*/

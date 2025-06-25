import { describe, expect, it } from "vitest";
import requestConfigDoc from "./requestConfigDoc";
import { normalize } from "../../utils/normalise";

describe("requestConfigDoc", () => {
  it("renders docs for read", () => {
    document.body.appendChild(
      requestConfigDoc({ recordTypeId: "person", method: "read" })
    );

    expect(normalize(document.body.textContent)).toEqual(
      normalize(`
        Request config
        GET https://cora.epc.ub.uu.se/diva/rest/record/person/{id}
        Accept: application/vnd.cora.record+xml
        AuthToken: xxxx-xxxx-xxxx-xxxx
    `)
    );
  });

  it("renders docs for create", () => {
    document.body.appendChild(
      requestConfigDoc({ recordTypeId: "person", method: "create" })
    );
    expect(normalize(document.body.textContent)).toEqual(
      normalize(`
        Request config
        POST https://cora.epc.ub.uu.se/diva/rest/record/person
        Accept: application/vnd.cora.record+xml
        Content-Type: application/vnd.cora.recordGroup+xml
        AuthToken: xxxx-xxxx-xxxx-xxxx
    `)
    );
  });

  it("renders docs for update", () => {
    document.body.appendChild(
      requestConfigDoc({ recordTypeId: "person", method: "update" })
    );
    expect(normalize(document.body.textContent)).toEqual(
      normalize(`
        Request config
        POST https://cora.epc.ub.uu.se/diva/rest/record/person/{id}
        Accept: application/vnd.cora.record+xml
        Content-Type: application/vnd.cora.recordGroup+xml
        AuthToken: xxxx-xxxx-xxxx-xxxx
    `)
    );
  });

  it("renders docs for delete", () => {
    document.body.appendChild(
      requestConfigDoc({ recordTypeId: "person", method: "delete" })
    );
    expect(normalize(document.body.textContent)).toEqual(
      normalize(`
        Request config
        DELETE https://cora.epc.ub.uu.se/diva/rest/record/person/{id}
        AuthToken: xxxx-xxxx-xxxx-xxxx
    `)
    );
  });
});

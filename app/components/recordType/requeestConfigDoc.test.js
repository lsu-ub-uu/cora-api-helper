import { describe, expect, it } from "vitest";
import requestConfigDoc from "./requestConfigDoc";

describe("requestConfigDoc", () => {
  it("renders docs for read", () => {
    document.body.appendChild(
      requestConfigDoc({ recordTypeId: "person", method: "read" }),
    );

    const text = document.body.textContent;
    expect(text).toContain("Request config");
    expect(text).toContain("GET");
    expect(text).toContain("https://preview.diva.cora.epc.ub.uu.se/rest/record/person/{id}");
    expect(text).toContain("Accept: application/vnd.cora.record+xml");
    expect(text).toContain("AuthToken: xxxx-xxxx-xxxx-xxxx");
    expect(text).not.toContain("Content-Type");
  });

  it("renders docs for create", () => {
    document.body.appendChild(
      requestConfigDoc({ recordTypeId: "person", method: "create" }),
    );

    const text = document.body.textContent;
    expect(text).toContain("POST");
    expect(text).toContain("https://preview.diva.cora.epc.ub.uu.se/rest/record/person");
    expect(text).toContain("Accept: application/vnd.cora.record+xml");
    expect(text).toContain("Content-Type: application/vnd.cora.recordGroup+xml");
    expect(text).toContain("AuthToken: xxxx-xxxx-xxxx-xxxx");
    expect(text).not.toContain("{id}");
  });

  it("renders docs for update", () => {
    document.body.appendChild(
      requestConfigDoc({ recordTypeId: "person", method: "update" }),
    );

    const text = document.body.textContent;
    expect(text).toContain("POST");
    expect(text).toContain("https://preview.diva.cora.epc.ub.uu.se/rest/record/person/{id}");
    expect(text).toContain("Accept: application/vnd.cora.record+xml");
    expect(text).toContain("Content-Type: application/vnd.cora.recordGroup+xml");
    expect(text).toContain("AuthToken: xxxx-xxxx-xxxx-xxxx");
  });

  it("renders docs for delete", () => {
    document.body.appendChild(
      requestConfigDoc({ recordTypeId: "person", method: "delete" }),
    );

    const text = document.body.textContent;
    expect(text).toContain("DELETE");
    expect(text).toContain("https://preview.diva.cora.epc.ub.uu.se/rest/record/person/{id}");
    expect(text).toContain("AuthToken: xxxx-xxxx-xxxx-xxxx");
    expect(text).not.toContain("Accept");
    expect(text).not.toContain("Content-Type");
  });
});

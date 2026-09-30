import { describe, expect, it, vi } from "vitest";
import recordWrapper from "./recordWrapper.js";
import { normalize } from "../../utils/normalize.js";
import { getApiUrl, getFormat } from "../../utils/searchParams.js";

vi.mock("../../utils/searchParams.js");

describe("recordWrapper", () => {
  it("renders XML record wrapper with action links", () => {
    getFormat.mockReturnValue("xml");
    getApiUrl.mockReturnValue("https://someapiurl.com");
    const result = recordWrapper({
      children: "child",
      recordType: "someRecordType",
    });

    const text = normalize(result.textContent);
    expect(text).toContain(normalize("<record>(1 - 1)"));
    expect(text).toContain(normalize("<data>(1 - 1)child</data>"));
    expect(text).toContain(
      normalize(`
        -<permissions>(0 - 1)
          -<read>(0 - 1)
            <permission>{fieldName}</permission>(1 - X)
          </read>
          -<write>(0 - 1)
            <permission>{fieldName}</permission>(1 - X)
          </write>
        </permissions>
      `),
    );
    expect(text.indexOf("<data>")).toBeLessThan(text.indexOf("<permissions>"));
    expect(text.indexOf("<permissions>")).toBeLessThan(
      text.indexOf("<actionLinks>"),
    );
    expect(text).toContain("<actionLinks>");
    expect(text).toContain("<read>");
    expect(text).toContain("<read_incoming_links>");
    expect(text).toContain(
      "https://someapiurl.com/rest/record/someRecordType/{recordId}/incomingLinks",
    );
    expect(text).toContain("<update>");
    expect(text).toContain("<delete>");
    expect(text).toContain("<index>");
    expect(text).toContain(
      "https://someapiurl.com/rest/record/someRecordType/{recordId}",
    );
  });

  it("renders repeating XML record wrapper", () => {
    getFormat.mockReturnValue("xml");
    getApiUrl.mockReturnValue("https://someapiurl.com");
    const result = recordWrapper({
      children: "child",
      recordType: "someRecordType",
      repeating: true,
    });
    const text = normalize(result.textContent);
    expect(text).toContain(normalize("<record>(0 - X)"));
  });

  it("renders JSON record wrapper", () => {
    getFormat.mockReturnValue("json");
    getApiUrl.mockReturnValue("https://someapiurl.com");
    const result = recordWrapper({
      children: "child",
      recordType: "someRecordType",
    });

    const text = normalize(result.textContent);
    expect(text).toContain('"data":{child},');
    expect(text).toContain(
      '"permissions":{"read":[{fieldName}],"write":[{fieldName}]},',
    );
    expect(text).toContain('"actionLinks":{');
    expect(text.indexOf('"data"')).toBeLessThan(text.indexOf('"permissions"'));
    expect(text.indexOf('"permissions"')).toBeLessThan(
      text.indexOf('"actionLinks"'),
    );
    expect(text).toContain('"read":{');
    expect(text).toContain('"read_incoming_links":{');
    expect(text).toContain(
      '"url":"https://someapiurl.com/rest/record/someRecordType/{recordId}/incomingLinks"',
    );
    expect(text).toContain('"update":{');
    expect(text).toContain('"delete":{');
    expect(text).toContain('"index":{');
    expect(result.querySelectorAll("button")).toHaveLength(16);
  });

  it("renders otherProtocols for xml binary record", () => {
    getFormat.mockReturnValue("xml");
    getApiUrl.mockReturnValue("https://someapiurl.com/rest");
    const result = recordWrapper({
      children: "child",
      recordType: "binary",
    });

    const text = normalize(result.textContent);

    expect(text).toContain(
      normalize(`
      -<otherProtocols>(0-1)
        -<iiif>(1-1)
          <server>https://someapiurl.com/iiif/</server>(1-1)
          <identifier>{recordId}</identifier>(1-1)
        </iiif>
      </otherProtocols>
      `),
    );
  });

  it("renders otherProtocols for json binary record", () => {
    getFormat.mockReturnValue("json");
    getApiUrl.mockReturnValue("https://someapiurl.com/rest");
    const result = recordWrapper({
      children: "child",
      recordType: "binary",
    });

    const text = normalize(result.textContent);

    expect(text).toContain(
      normalize(`
      -"otherProtocols": {
        -"iiif": {
          "server": "https://someapiurl.com/iiif/",
          "identifier": "{recordId}"
        }
      }
      `),
    );
  });

  it("does not render otherProtocols for non-binary record xml", () => {
    getFormat.mockReturnValue("xml");
    getApiUrl.mockReturnValue("https://someapiurl.com/rest");
    const result = recordWrapper({
      children: "child",
      recordType: "someRecordType",
    });

    const text = normalize(result.textContent);

    expect(text).not.toContain("otherProtocols");
  });

  it("does not render otherProtocols for non-binary record json", () => {
    getFormat.mockReturnValue("json");
    getApiUrl.mockReturnValue("https://someapiurl.com/rest");
    const result = recordWrapper({
      children: "child",
      recordType: "someRecordType",
    });

    const text = normalize(result.textContent);

    expect(text).not.toContain("otherProtocols");
  });

  it("renders xml actionLinks for recordType recordType", () => {
    getFormat.mockReturnValue("xml");
    getApiUrl.mockReturnValue("https://someapiurl.com");
    const result = recordWrapper({
      children: "child",
      recordType: "recordType",
    });

    const text = normalize(result.textContent);

    expect(text).toContain("actionLinks");

    expect(text).toContain("<search>");
    expect(text).toContain("<create>");
    expect(text).toContain("<list>");
    expect(text).toContain("<batch_index>");
    expect(text).toContain("<validate>");
    expect(text).toContain(
      "https://someapiurl.com/rest/record/searchResult/{searchId}",
    );
    expect(text).toContain("https://someapiurl.com/rest/record/recordType");
    expect(text).toContain(
      "https://someapiurl.com/rest/record/index/recordType",
    );
  });

  it("renders json actionLinks for recordType recordType", () => {
    getFormat.mockReturnValue("json");
    getApiUrl.mockReturnValue("https://someapiurl.com");
    const result = recordWrapper({
      children: "child",
      recordType: "recordType",
    });

    const text = normalize(result.textContent);

    expect(text).toContain("actionLinks");

    expect(text).toContain("search");
    expect(text).toContain("create");
    expect(text).toContain("list");
    expect(text).toContain("batch_index");
    expect(text).toContain("validate");
    expect(text).toContain(
      "https://someapiurl.com/rest/record/searchResult/{searchId}",
    );
    expect(text).toContain("https://someapiurl.com/rest/record/recordType");
    expect(text).toContain(
      "https://someapiurl.com/rest/record/index/recordType",
    );
  });

  it("renders xml actionLinks for binary record", () => {
    getFormat.mockReturnValue("xml");
    getApiUrl.mockReturnValue("https://someapiurl.com");
    const result = recordWrapper({
      children: "child",
      recordType: "binary",
    });

    const text = normalize(result.textContent);

    expect(text).toContain("actionLinks");
    expect(text).toContain("upload");
  });

  it("renders json actionLinks for binary record", () => {
    getFormat.mockReturnValue("json");
    getApiUrl.mockReturnValue("https://someapiurl.com");
    const result = recordWrapper({
      children: "child",
      recordType: "binary",
    });

    const text = normalize(result.textContent);

    expect(text).toContain("actionLinks");
    expect(text).toContain("upload");
  });

  it("renders xml actionLinks for search record", () => {
    getFormat.mockReturnValue("xml");
    getApiUrl.mockReturnValue("https://someapiurl.com");
    const result = recordWrapper({
      children: "child",
      recordType: "search",
    });

    const text = normalize(result.textContent);

    expect(text).toContain("actionLinks");
    expect(text).toContain("search");
  });

  it("renders json actionLinks for search record", () => {
    getFormat.mockReturnValue("json");
    getApiUrl.mockReturnValue("https://someapiurl.com");
    const result = recordWrapper({
      children: "child",
      recordType: "search",
    });

    const text = normalize(result.textContent);

    expect(text).toContain("actionLinks");
    expect(text).toContain("search");
  });
});

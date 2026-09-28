import { describe, expect, it, vi } from "vitest";
import { getApiUrl, getFormat } from "../../utils/searchParams.js";
import resourceLink from "./resourceLink.js";
import { normalize } from "../../utils/normalize.js";

vi.mock("../../utils/searchParams.js");

const metadata = {
  attributes: { type: "resourceLink" },
  children: [{ name: "nameInData", value: "master" }],
};

describe("resourceLink", () => {
  it("renders XML resource fields and an expanded read action link", () => {
    getFormat.mockReturnValue("xml");
    getApiUrl.mockReturnValue("https://someapiurl.com");

    const result = resourceLink({
      metadataPool: {},
      metadata,
      mode: "read",
      repeatMin: "1",
      repeatMax: "1",
    });

    const text = normalize(result.textContent);
    expect(text).toContain("<linkedRecordType>binary</linkedRecordType>");
    expect(text).toContain("<linkedRecordId>{id}</linkedRecordId>");
    expect(text).toContain("<mimeType>{mimeType}</mimeType>");
    expect(text).toContain(
      "https://someapiurl.com/rest/record/binary/{id}/master",
    );
    expect(text).toContain("<accept>{mimeType}</accept>");
    expect(text).not.toContain("resourceId");
    expect(text).not.toContain("fileSize");
    expect(text).not.toContain("checksum");
    expect(text).not.toContain("originalFileName");
    expect(result.querySelector(".element:not(.collapsed)")).not.toBeNull();
  });

  it("renders JSON resource fields with expanded action links", () => {
    getFormat.mockReturnValue("json");
    getApiUrl.mockReturnValue("https://someapiurl.com");

    const result = resourceLink({
      metadataPool: {},
      metadata,
      mode: "read",
      repeatMin: "1",
      repeatMax: "1",
    });

    const text = normalize(result.textContent);
    expect(text).toContain(normalize('"name": "master"'));
    expect(text).toContain(normalize('"name": "linkedRecordType"'));
    expect(text).toContain(normalize('"name": "linkedRecordId"'));
    expect(text).toContain(normalize('"name": "mimeType"'));
    expect(text).toContain(
      normalize(
        '"url": "https://someapiurl.com/rest/record/binary/{id}/master"',
      ),
    );
    expect(text).toContain(normalize('"accept": "{mimeType}"'));
    expect(text).not.toContain(normalize('"resourceId"'));
    expect(text).not.toContain(normalize('"fileSize"'));
    expect(text).not.toContain(normalize('"checksum"'));
    expect(text).not.toContain(normalize('"originalFileName"'));
    const actionLinksIndex = text.indexOf(normalize('"actionLinks": {'));
    const nestedChildrenStart = text.lastIndexOf(
      normalize('"children": ['),
      actionLinksIndex,
    );
    const nestedChildrenEnd = text.indexOf("]", nestedChildrenStart);
    expect(actionLinksIndex).toBeGreaterThan(nestedChildrenStart);
    expect(actionLinksIndex).toBeLessThan(nestedChildrenEnd);
    expect(result.querySelectorAll(".json-element.collapsed")).toHaveLength(0);
  });

  it("does not render action links outside read mode", () => {
    getFormat.mockReturnValue("xml");

    const result = resourceLink({
      metadataPool: {},
      metadata,
      mode: "create",
      repeatMin: "1",
      repeatMax: "1",
    });

    expect(result.textContent).not.toContain("actionLinks");
  });
});

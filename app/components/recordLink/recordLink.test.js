import { describe, expect, it, vi } from "vitest";
import { getApiUrl, getFormat } from "../../utils/searchParams.js";
import recordLink from "./recordLink.js";
import { normalize } from "../../utils/normalize.js";
import { screen } from "@testing-library/dom";

vi.mock("../../utils/searchParams.js");

describe("recordLink", () => {
  it("renders a record link in XML format", () => {
    vi.mocked(getFormat).mockReturnValue("xml");
    vi.mocked(getApiUrl).mockReturnValue("https://someapiurl.com");

    const metadataPool = {};

    const metadata = {
      name: "animalLink",
      children: [
        { name: "nameInData", value: "favouriteAnimal" },
        {
          name: "linkedRecordType",
          children: [{ name: "linkedRecordId", value: "animal" }],
        },
      ],
    };

    document.body.appendChild(
      recordLink({
        metadataPool,
        metadata,
        mode: "read",
        repeatMin: "0",
        repeatMax: "1",
      }),
    );

    expect(normalize(document.body.textContent)).toEqual(
      normalize(`
        -<favouriteAnimal>(0 - 1)
          <linkedRecordType>animal</linkedRecordType>
          <linkedRecordId>{id}</linkedRecordId>
          +<actionLinks>(0 - 1)
            -<read>(0 - 1)
              <requestMethod>GET</requestMethod>(1 - 1)
              <rel>read</rel>(1 - 1)
              <url>https://someapiurl.com/rest/record/animal/{id}</url>(1 - 1)
              <accept>application/vnd.cora.record+xml</accept>(1 - 1)
            </read>
          </actionLinks>
        </favouriteAnimal>
    `),
    );

    expect(screen.getByText("animal")).toHaveClass("final-value");
    expect(screen.getByText("{id}")).toHaveClass("id");
  });

  it("renders a record link in XML format with a finalValue", () => {
    vi.mocked(getFormat).mockReturnValue("xml");
    vi.mocked(getApiUrl).mockReturnValue("https://someapiurl.com");

    const metadataPool = {};

    const metadata = {
      name: "animalLink",
      children: [
        { name: "nameInData", value: "animal" },
        { name: "finalValue", value: "dog" },
        {
          name: "linkedRecordType",
          children: [{ name: "linkedRecordId", value: "animal" }],
        },
      ],
    };

    document.body.appendChild(
      recordLink({
        metadataPool,
        metadata,
        mode: "read",
        repeatMin: "0",
        repeatMax: "1",
      }),
    );

    expect(normalize(document.body.textContent)).toEqual(
      normalize(`
        -<animal>(0 - 1)
          <linkedRecordType>animal</linkedRecordType>
          <linkedRecordId>dog</linkedRecordId>
          +<actionLinks>(0 - 1)
            -<read>(0 - 1)
              <requestMethod>GET</requestMethod>(1 - 1)
              <rel>read</rel>(1 - 1)
              <url>https://someapiurl.com/rest/record/animal/dog</url>(1 - 1)
              <accept>application/vnd.cora.record+xml</accept>(1 - 1)
            </read>
          </actionLinks>
        </animal>
        `),
    );
  });

  it("renders a record link in JSON format", () => {
    vi.mocked(getFormat).mockReturnValue("json");
    vi.mocked(getApiUrl).mockReturnValue("https://someapiurl.com");

    const metadataPool = {};

    const metadata = {
      name: "animalLink",
      attributes: { type: "recordLink" },
      children: [
        { name: "nameInData", value: "favouriteAnimal" },
        {
          name: "linkedRecordType",
          children: [{ name: "linkedRecordId", value: "animal" }],
        },
      ],
    };

    document.body.appendChild(
      recordLink({
        metadataPool,
        metadata,
        mode: "read",
        repeatMin: "0",
        repeatMax: "1",
      }),
    );

    expect(normalize(document.body.textContent)).toEqual(
      normalize(`
        -{
          "name": "favouriteAnimal",(0 - 1)
          "children": [
            {"name": "linkedRecordType","value": "animal"},
            {"name": "linkedRecordId","value": "{id}"}
          ],
          +"actionLinks": {
            -"read": {
              "requestMethod": "GET",
              "rel": "read",
              "url": "https://someapiurl.com/rest/record/animal/{id}",
              "accept": "application/vnd.cora.record+json"
            }
          }
        }`),
    );
    expect(screen.getByText("animal")).toHaveClass("final-value");
    expect(screen.getByText("{id}")).toHaveClass("id");
    expect(document.querySelectorAll("button")).toHaveLength(4);
    expect(document.querySelectorAll(".json-element.collapsed")).toHaveLength(
      1,
    );
  });

  it("renders a final value in JSON format", () => {
    vi.mocked(getFormat).mockReturnValue("json");
    vi.mocked(getApiUrl).mockReturnValue("https://someapiurl.com");

    const metadata = {
      name: "animalLink",
      attributes: { type: "recordLink" },
      children: [
        { name: "nameInData", value: "favouriteAnimal" },
        { name: "finalValue", value: "dog" },
        {
          name: "linkedRecordType",
          children: [{ name: "linkedRecordId", value: "animal" }],
        },
      ],
    };

    document.body.appendChild(
      recordLink({
        metadataPool: {},
        metadata,
        mode: "read",
        repeatMin: "0",
        repeatMax: "1",
      }),
    );

    expect(normalize(document.body.textContent)).toEqual(
      normalize(`
        -{
          "name": "favouriteAnimal",(0 - 1)
          "children": [
            {"name": "linkedRecordType","value": "animal"},
            {"name": "linkedRecordId", "value": "dog"}
          ],
          +"actionLinks": {
            -"read": {
              "requestMethod": "GET",
              "rel": "read",
              "url": "https://someapiurl.com/rest/record/animal/dog",
              "accept": "application/vnd.cora.record+json"
            }
          }
        }`),
    );

    expect(screen.getByText("dog")).toHaveClass("final-value");
  });

  it("renders anyTypeRecordLink", () => {
    vi.mocked(getFormat).mockReturnValue("xml");
    vi.mocked(getApiUrl).mockReturnValue("https://someapiurl.com");

    const metadata = {
      name: "anyTypeLink",
      attributes: { type: "anyTypeRecordLink" },
      children: [{ name: "nameInData", value: "link" }],
    };

    const result = recordLink({
      metadataPool: {},
      metadata,
      mode: "read",
      repeatMin: "0",
      repeatMax: "1",
    });

    expect(result.textContent).toContain(
      "<linkedRecordType>{recordType}</linkedRecordType>",
    );
    const linkedRecordType = [...result.querySelectorAll("span")].find(
      (span) => span.textContent === "{recordType}",
    );
    expect(linkedRecordType).toHaveClass("id");
    expect(linkedRecordType).not.toHaveClass("final-value");
    expect(result.textContent).toContain(
      "<url>https://someapiurl.com/rest/record/{recordType}/{id}</url>",
    );
  });

  it("does not render action links outside read mode", () => {
    vi.mocked(getFormat).mockReturnValue("json");

    const metadata = {
      name: "animalLink",
      attributes: { type: "recordLink" },
      children: [
        { name: "nameInData", value: "animal" },
        {
          name: "linkedRecordType",
          children: [{ name: "linkedRecordId", value: "animal" }],
        },
      ],
    };

    const result = recordLink({
      metadataPool: {},
      metadata,
      mode: "create",
      repeatMin: "0",
      repeatMax: "1",
    });

    expect(result.textContent).not.toContain('"actionLinks"');
  });
});

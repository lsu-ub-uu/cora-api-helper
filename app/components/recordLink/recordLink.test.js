import { describe, expect, it, vi } from "vitest";
import { getFormat } from "../../utils/searchParams.js";
import recordLink from "./recordLink.js";
import { normalize } from "../../utils/normalise.js";

vi.mock("../../utils/searchParams.js");

describe("recordLink", () => {
  it("renders a record link in XML format", () => {
    vi.mocked(getFormat).mockReturnValue("xml");

    const metadataPool = {};

    const metadata = {
      name: "animalLink",
      children: [
        { name: "nameInData", value: "animal" },
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
        repeatMin: "0",
        repeatMax: "1",
      })
    );

    expect(normalize(document.body.textContent)).toEqual(
      normalize(`
        -<animal>(0 - 1)
            <linkedRecordType>animal</linkedRecordType>
            <linkedRecordId>{id}</linkedRecordId>
        </animal>
    `)
    );
  });

  it("renders a record link in XML format with a finalValue", () => {
    vi.mocked(getFormat).mockReturnValue("xml");

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
        repeatMin: "0",
        repeatMax: "1",
      })
    );

    expect(normalize(document.body.textContent)).toEqual(
      normalize(`
        -<animal>(0 - 1)
            <linkedRecordType>animal</linkedRecordType>
            <linkedRecordId>dog</linkedRecordId>
        </animal>
        `)
    );
  });

  it("renders a record link in JSON format", () => {
    vi.mocked(getFormat).mockReturnValue("json");

    const metadataPool = {};

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

    document.body.appendChild(
      recordLink({
        metadataPool,
        metadata,
        repeatMin: "0",
        repeatMax: "1",
      })
    );

    expect(normalize(document.body.textContent)).toEqual(
      normalize(`
        -{"name": "animal",(0 - 1)
            "children": [
                {
                    "name": "linkedRecordType",
                    "value": "animal"
                },
                {
                    "name": "linkedRecordId",
                    "value": "{id}"
                }
            ]
        }
        `)
    );
  });
});

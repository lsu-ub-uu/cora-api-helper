import { describe, expect, it, vi } from "vitest";
import { normalize } from "../../utils/normalize.js";
import recordListWrapper from "./recordListWrapper.js";
import { getFormat } from "../../utils/searchParams.js";

vi.mock("../../utils/searchParams.js");

describe("recordListWrapper", () => {
  it("renders XML version", () => {
    getFormat.mockReturnValue("xml");

    const result = recordListWrapper({ children: "someChild" });

    const expectedContent = `
        -<dataList> (1 - 1)
            -<fromNo> (1 - 1)
                0 - 999999
            </fromNo>
            -<toNo> (1 - 1)
                0 - 999999
            </toNo>
            -<totalNo> (1 - 1)
                0 - 999999
            </totalNo>
            -<data> (1 - 1)
                someChild
            </data>
        </dataList>
    `;

    expect(normalize(result.textContent)).toEqual(normalize(expectedContent));
  });

  it("renders JSON version", () => {
    getFormat.mockReturnValue("json");

    const result = recordListWrapper({ children: "someChild" });

    const expectedContent = `
    {
        "dataList": {
            "fromNo": "0 - 999999",
            "toNo": "0 - 999999",
            "totalNo": "0 - 999999",
            "data": [someChild]
        }
    }
    `;

    expect(normalize(result.textContent)).toEqual(normalize(expectedContent));
  });
});

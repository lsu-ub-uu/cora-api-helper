import { describe, expect, it, vi } from "vitest";
import recordWrapper from "./recordWrapper.js";
import { normalize } from "../../utils/normalize.js";
import { getFormat } from "../../utils/searchParams.js";

vi.mock("../../utils/searchParams.js");

describe("recordWrapper", () => {
  it("renders XML record wrapper", () => {
    getFormat.mockReturnValue("xml");
    const result = recordWrapper({ children: "child" });

    expect(normalize(result.textContent)).toEqual(
      normalize(
        `
        -<record>(1 - 1)
            -<data>(1 - 1)
                child
            </data>
        </record>
      `,
      ),
    );
  });

  it("renders XML record wrapper with action links when read mode", () => {
    getFormat.mockReturnValue("xml");
    const result = recordWrapper({
      children: "child",
      mode: "read",
      recordType: "recordType",
    });

    expect(normalize(result.textContent)).toEqual(
      normalize(
        `
        -<record>(1 - 1)
            -<data>(1 - 1)
                child
            </data>
            -<actionLinks>(1 - 1)
                -<read>(1 - 1)
                -<requestMethod>(1 - 1)
                  GET
                </requestMethod>
                -<rel>(1 - 1)
                  read
                </rel>
                -<url>(1 - 1)
                  http://example.com/rest/record/recordType/1
                </url>
                -<accept>(1 - 1)
                  application/vnd.cora.record+xml
                </accept>
                </read>
            </actionLinks>
        </record>
      `,
      ),
    );
  });

  it("renders JSON record wrapper", () => {
    getFormat.mockReturnValue("json");
    const result = recordWrapper({ children: "child" });

    expect(normalize(result.textContent)).toEqual(
      normalize(
        `
        -{
            "record": {
                "data": {
                    child
                }
            }
        }
      `,
      ),
    );
  });
});

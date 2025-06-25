import { describe, expect, it, vi } from "vitest";
import recordTypeRead from "./read";
import dataFormat from "../dataFormat/dataFormat";
import { screen } from "@testing-library/dom";

vi.mock("../dataFormat/dataFormat.js", () => ({
  default: vi.fn(() => {
    const root = document.createElement("div");
    root.textContent = "Data format content";
    return root;
  }),
}));

describe("read", () => {
  it("renders read request config", () => {
    const recordTypePool = {
      person: {
        children: [
          {
            name: "metadataId",
            children: [
              {
                name: "linkedRecordId",
                value: "personGroup",
              },
            ],
          },
        ],
      },
    };

    const metadataPool = {};

    document.body.appendChild(
      recordTypeRead({ recordTypePool, metadataPool, recordTypeId: "person" })
    );

    expect(screen.getByText("Request config")).toBeInTheDocument();
    expect(screen.getByText("Data format content")).toBeInTheDocument();
    expect(dataFormat).toHaveBeenCalledWith({
      metadataPool,
      rootGroupId: "personGroup",
      dataWrapper: true,
    });
  });
});

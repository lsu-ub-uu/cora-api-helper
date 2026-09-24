import { describe, expect, it, vi } from "vitest";
import recordTypeList from "./recordTypeList.js";
import dataFormat from "../dataFormat/dataFormat.js";
import group from "../group/group.js";
import recordListWrapper from "../recordListWrapper/recordListWrapper.js";
import recordWrapper from "../recordWrapper/recordWrapper.js";

vi.mock("../dataFormat/dataFormat.js", () => ({
  default: vi.fn(() => document.createElement("div")),
}));

vi.mock("../group/group.js", () => ({
  default: vi.fn(() => document.createElement("div")),
}));

vi.mock("../recordListWrapper/recordListWrapper.js", () => ({
  default: vi.fn(() => document.createElement("div")),
}));

vi.mock("../recordWrapper/recordWrapper.js", () => ({
  default: vi.fn(() => document.createElement("div")),
}));

describe("recordTypeList", () => {
  it("documents a GET list request and renders a record-list response", () => {
    const metadataPool = {};
    const root = recordTypeList({
      recordTypeId: "person",
      recordTypePool: {
        person: {
          children: [
            {
              name: "metadataId",
              children: [{ name: "linkedRecordId", value: "personGroup" }],
            },
          ],
        },
      },
      metadataPool,
    });

    expect(root.textContent).toContain(
      "GET http://localhost:3000/rest/record/person",
    );
    expect(root.textContent).toContain(
      "Accept: application/vnd.cora.recordList+xml",
    );
    expect(group).toHaveBeenCalledWith({
      metadataPool,
      groupId: "personGroup",
      mode: "read",
    });
    expect(recordWrapper).toHaveBeenCalledWith(
      expect.objectContaining({ recordType: "person", repeating: true }),
    );
    expect(recordListWrapper).toHaveBeenCalledWith({
      children: expect.anything(),
    });
    expect(dataFormat).toHaveBeenCalledWith({ children: expect.anything() });
  });
});

import { describe, expect, it, vi } from "vitest";
import search from "./search";
import dataFormat from "../dataFormat/dataFormat";
import group from "../group/group";

vi.mock("../dataFormat/dataFormat.js", () => ({
  default: vi.fn(() => document.createElement("div")),
}));

vi.mock("../group/group.js", () => ({
  default: vi.fn(() => document.createElement("div")),
}));

describe("search", () => {
  it("renders search data using the linked metadata group", () => {
    const metadataPool = {};
    const searchDefinition = {
      children: [
        {
          name: "metadataId",
          children: [{ name: "linkedRecordId", value: "searchGroup" }],
        },
      ],
    };

    search({ search: searchDefinition, metadataPool });

    expect(group).toHaveBeenCalledWith({
      metadataPool,
      groupId: "searchGroup",
    });
    expect(dataFormat).toHaveBeenCalledWith({
      children: expect.anything(),
    });
  });
});

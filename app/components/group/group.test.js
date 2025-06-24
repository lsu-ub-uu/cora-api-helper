import { describe, it } from "vitest";
import group from "./group";

describe("group", () => {
  it("renders element with children", () => {
    const metadataPool = {
      someGroup: {
        children: [
          { name: "nameInData", value: "group1" },
          { name: "children", value: "child1" },
        ],
      },
    };

    document.body.appendChild(
      group({
        metadataPool,
        groupId: "someGroup",
        repeatMin: "0",
        repeatMax: "1",
        depth: 0,
        lastChild: true,
      })
    );
  });
});

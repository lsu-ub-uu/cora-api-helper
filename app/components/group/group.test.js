import { describe, expect, it } from "vitest";
import group from "./group";

describe("group", () => {
  it("renders group with children", () => {
    const metadataPool = {
      someGroupId: {
        name: "metadata",
        children: [
          { name: "nameInData", value: "someGroup" },
          {
            name: "childReferences",
            children: [
              {
                name: "childReference",
                children: [
                  { name: "repeatMin", value: "0" },
                  { name: "repeatMax", value: "1" },
                  {
                    name: "ref",
                    children: [
                      { name: "linkedRecordType", value: "metadata" },
                      { name: "linkedRecordId", value: "someTextVarId" },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
      someTextVarId: {
        name: "metadata",
        attributes: { type: "textVariable" },
        children: [
          { name: "nameInData", value: "someTextVar" },
          { name: "regEx", value: "someRegEx" },
        ],
      },
    };

    document.body.appendChild(
      group({
        metadataPool,
        groupId: "someGroupId",
        repeatMin: "0",
        repeatMax: "1",
        depth: 0,
        lastChild: true,
      }),
    );

    expect(document.body.innerHTML).toContain("someGroup");
    expect(document.body.innerHTML).toContain("someTextVar");
    expect(document.body.innerHTML).toContain("someRegEx");
  });

  it("renders warning when depth is larger than 10", () => {
    const metadataPool = {
      someGroupId: {
        name: "metadata",
        children: [
          { name: "nameInData", value: "someGroup" },
          {
            name: "childReferences",
            children: [
              {
                name: "childReference",
                children: [
                  { name: "repeatMin", value: "0" },
                  { name: "repeatMax", value: "1" },
                  {
                    name: "ref",
                    children: [
                      { name: "linkedRecordType", value: "metadata" },
                      { name: "linkedRecordId", value: "someTextVarId" },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
      someTextVarId: {
        name: "metadata",
        attributes: { type: "textVariable" },
        children: [
          { name: "nameInData", value: "someTextVar" },
          { name: "regEx", value: "someRegEx" },
        ],
      },
    };

    document.body.appendChild(
      group({
        metadataPool,
        groupId: "someGroupId",
        repeatMin: "0",
        repeatMax: "1",
        depth: 11,
        lastChild: true,
      }),
    );

    expect(document.body.innerHTML).toContain(
      "&lt;&lt;MAX DEPTH EXCEEDED&gt;&gt;",
    );
    expect(document.body.innerHTML).not.toContain("someGroup");
    expect(document.body.innerHTML).not.toContain("someTextVar");
    expect(document.body.innerHTML).not.toContain("someRegEx");
  });

  it("renders nothing when group has no children", () => {
    const metadataPool = {
      someGroupId: {
        name: "metadata",
        children: [{ name: "nameInData", value: "someGroup" }],
      },
    };

    document.body.appendChild(
      group({
        metadataPool,
        groupId: "someGroupId",
        repeatMin: "0",
        repeatMax: "1",
        depth: 0,
        lastChild: true,
      }),
    );

    expect(document.body.innerHTML).not.toContain("someGroup");
  });
});

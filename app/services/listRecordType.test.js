import { vi, describe, it, expect } from "vitest";
import listRecordType from "./listRecordType";

describe("listRecordType", () => {
  it("fetches a list of record types and groups by id", async () => {
    const mockResponse = {
      dataList: {
        data: [
          {
            record: {
              data: {
                children: [
                  {
                    name: "recordInfo",
                    children: [{ name: "id", value: "1" }],
                  },
                ],
              },
            },
          },
          {
            record: {
              data: {
                children: [
                  {
                    name: "recordInfo",
                    children: [{ name: "id", value: "2" }],
                  },
                ],
              },
            },
          },
        ],
      },
    };

    global.fetch = vi.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockResponse),
      })
    );

    const result = await listRecordType("testRecordType");
    expect(result).toEqual({
      1: {
        children: [
          {
            name: "recordInfo",
            children: [{ name: "id", value: "1" }],
          },
        ],
      },
      2: {
        children: [
          {
            name: "recordInfo",
            children: [{ name: "id", value: "2" }],
          },
        ],
      },
    });
  });
});

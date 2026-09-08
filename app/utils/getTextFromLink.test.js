import { describe, it, expect, vi } from "vitest";
import getTextFromLink from "./getTextFromLink";

describe("getTextFromLink", () => {
  it("returns empty string when no read action link url", async () => {
    const mockTextLink = {
      actionLinks: {},
    };

    const text = await getTextFromLink(mockTextLink);
    expect(text).toBe("");
  });

  it("fetches text from a link and return the English text part", async () => {
    const mockTextLink = {
      actionLinks: {
        read: {
          url: "https://example.com/api/text",
          accept: "application/json",
        },
      },
    };

    vi.stubGlobal(
      "fetch",
      vi.fn(() =>
        Promise.resolve({
          json: () =>
            Promise.resolve({
              record: {
                data: {
                  children: [
                    {
                      name: "textPart",
                      attributes: { lang: "en" },
                      children: [{ name: "text", value: "Hello, World!" }],
                    },
                    {
                      name: "textPart",
                      attributes: { lang: "sv" },
                      children: [{ name: "text", value: "Hej världen!" }],
                    },
                  ],
                },
              },
            }),
        }),
      ),
    );

    const text = await getTextFromLink(mockTextLink);
    expect(text).toBe("Hello, World!");
  });

  it("does not fetch text again if in cache", async () => {
    vi.resetModules();
    const { default: getTextFromLink } = await import("./getTextFromLink.js");
    const mockTextLink = {
      actionLinks: {
        read: {
          url: "https://example.com/api/text",
          accept: "application/json",
        },
      },
    };

    const fetchMock = vi.fn(() =>
      Promise.resolve({
        json: () =>
          Promise.resolve({
            record: {
              data: {
                children: [
                  {
                    name: "textPart",
                    attributes: { lang: "en" },
                    children: [{ name: "text", value: "Hello, World!" }],
                  },
                ],
              },
            },
          }),
      }),
    );

    vi.stubGlobal("fetch", fetchMock);

    const text1 = await getTextFromLink(mockTextLink);
    const text2 = await getTextFromLink(mockTextLink);

    expect(text1).toBe("Hello, World!");
    expect(text2).toBe("Hello, World!");
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });
});

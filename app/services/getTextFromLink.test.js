import { describe, it, expect, vi, beforeEach } from "vitest";
import { getLanguage } from "../utils/searchParams.js";

vi.mock("../utils/searchParams.js");
let getTextFromLink;

describe("getTextFromLink", () => {
  beforeEach(async () => {
    // Reset module based cache before each test
    vi.resetModules();
    getTextFromLink = (await import("./getTextFromLink.js")).default;
  });

  it("returns empty string when no read action link url", async () => {
    const mockTextLink = {
      actionLinks: {},
    };

    const text = await getTextFromLink(mockTextLink);
    expect(text).toBe("");
  });

  it("fetches text from a link and return the English text part", async () => {
    getLanguage.mockReturnValue("en");
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

  it("fetches text from a link and return the Swedish text part", async () => {
    getLanguage.mockReturnValue("sv");

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
    expect(text).toBe("Hej världen!");
  });

  it("returns empty string when server returns non ok status code", async () => {
    getLanguage.mockReturnValue("en");

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
      vi.fn(() => Promise.resolve({ ok: false, status: 500 })),
    );

    const text = await getTextFromLink(mockTextLink);
    expect(text).toBe("");
  });

  it("returns empty string when text for language missing", async () => {
    getLanguage.mockReturnValue("fr");

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
    expect(text).toBe("");
  });

  it("returns empty string when failed to fetch", async () => {
    getLanguage.mockReturnValue("en");

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
      vi.fn(() => Promise.reject(new Error("Failed to fetch"))),
    );

    const text = await getTextFromLink(mockTextLink);
    expect(text).toBe("");
  });

  it("does not fetch text again if in cache", async () => {
    getLanguage.mockReturnValue("en");
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

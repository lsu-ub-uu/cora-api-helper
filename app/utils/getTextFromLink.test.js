import { describe, it, expect, vi } from "vitest";

describe("getTextFromLink", () => {
  it("fetches text from a link and return the English text part", async () => {
    const mockTextLink = {
      actionLinks: {
        read: {
          url: "https://example.com/api/text",
          accept: "application/json",
        },
      },
    };

    global.fetch = vi.fn(() =>
      Promise.resolve({
        json: () =>
          Promise.resolve({
            record: {
              data: {
                children: [
                  {
                    name: "textPart",
                    attributes: { lang: "en" },
                    value: "Hello, World!",
                  },
                  {
                    name: "textPart",
                    attributes: { lang: "sv" },
                    value: "Hej världen!",
                  },
                ],
              },
            },
          }),
      })
    );

    const getTextFromLink = (textLink) => {
      return fetch(textLink.actionLinks.read.url, {
        headers: { accept: textLink.actionLinks.read.accept },
      })
        .then((response) => response.json())
        .then(
          (json) =>
            json.record.data.children.find(
              (child) =>
                child.name === "textPart" && child.attributes.lang === "en"
            ).value
        );
    };

    const text = await getTextFromLink(mockTextLink);
    expect(text).toBe("Hello, World!");
  });
});

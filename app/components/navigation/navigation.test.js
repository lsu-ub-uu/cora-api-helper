import { describe, expect, it, vi } from "vitest";
import navigation from "./navigation";
import { screen } from "@testing-library/dom";
import userEvent from "@testing-library/user-event";

const recordTypePool = {
  person: {
    children: [
      {
        name: "recordInfo",
        children: [
          { name: "id", value: "person" },
          {
            name: "dataDivider",
            children: [{ name: "linkedRecordId", value: "diva" }],
          },
        ],
      },
      { name: "groupOfRecordType", value: "group1" },
    ],
  },
  organisation: {
    children: [
      {
        name: "recordInfo",
        children: [
          { name: "id", value: "organisation" },
          {
            name: "dataDivider",
            children: [{ name: "linkedRecordId", value: "diva" }],
          },
        ],
      },
      { name: "groupOfRecordType", value: "group1" },
    ],
  },
  output: {
    children: [
      {
        name: "recordInfo",
        children: [
          { name: "id", value: "output" },
          {
            name: "dataDivider",
            children: [{ name: "linkedRecordId", value: "system" }],
          },
        ],
      },
      { name: "groupOfRecordType", value: "group2" },
    ],
  },
};

const metadataPool = {
  groupOfRecordTypeCollection: {
    children: [
      {
        name: "collectionItemReferences",
        children: [
          {
            children: [{ name: "linkedRecordId", value: "group1Item" }],
          },
          {
            children: [{ name: "linkedRecordId", value: "group2Item" }],
          },
        ],
      },
    ],
  },
  group1Item: {
    children: [{ name: "nameInData", value: "group1" }],
  },
  group2Item: {
    children: [{ name: "nameInData", value: "group2" }],
  },
};

const systemPool = {
  diva: { children: [] },
  system: { children: [] },
  cora: { children: [] },
};

describe("navigation", () => {
  it("renders the cora data divider last", () => {
    const coraRecordType = {
      children: [
        {
          name: "recordInfo",
          children: [
            { name: "id", value: "coraRecord" },
            {
              name: "dataDivider",
              children: [{ name: "linkedRecordId", value: "cora" }],
            },
          ],
        },
        { name: "groupOfRecordType", value: "group1" },
      ],
    };

    document.body.appendChild(
      navigation({
        path: "/",
        recordTypePool: { coraRecord: coraRecordType, ...recordTypePool },
        metadataPool,
        systemPool,
      }),
    );

    const headings = screen
      .getAllByRole("heading", { level: 2 })
      .map((heading) => heading.textContent)
      .filter((text) => text !== "Authentication");

    expect(headings).toEqual(["DIVA", "SYSTEM", "CORA"]);
  });

  it("renders fetched system texts for data divider headings", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn((url) =>
        Promise.resolve({
          json: () =>
            Promise.resolve({
              record: {
                data: {
                  children: [
                    {
                      name: "textPart",
                      attributes: { lang: "en" },
                      children: [
                        {
                          name: "text",
                          value: url.includes("diva")
                            ? "Diva records"
                            : "System records",
                        },
                      ],
                    },
                  ],
                },
              },
            }),
        }),
      ),
    );

    document.body.appendChild(
      navigation({
        path: "/",
        recordTypePool,
        metadataPool,
        systemPool: {
          diva: {
            children: [
              {
                name: "textId",
                actionLinks: {
                  read: { url: "/system-text-diva", accept: "application/json" },
                },
              },
            ],
          },
          system: {
            children: [
              {
                name: "textId",
                actionLinks: {
                  read: {
                    url: "/system-text-system",
                    accept: "application/json",
                  },
                },
              },
            ],
          },
        },
      }),
    );

    expect(
      await screen.findByRole("heading", { name: "Diva records" }),
    ).toBeInTheDocument();
    expect(
      await screen.findByRole("heading", { name: "System records" }),
    ).toBeInTheDocument();
    expect(fetch).toHaveBeenCalledTimes(2);
  });

  it("renders authentication link", () => {
    document.body.appendChild(
      navigation({
        path: "/",
        recordTypePool,
        metadataPool,
        systemPool,
      }),
    );

    expect(
      screen.getByRole("link", { name: /authentication/i }),
    ).toHaveAttribute("href", "/authentication");
  });

  it("marks authentication link as current page", () => {
    document.body.appendChild(
      navigation({
        path: "/authentication",
        recordTypePool,
        metadataPool,
        systemPool,
      }),
    );

    expect(
      screen.getByRole("link", { name: /authentication/i }),
    ).toHaveAttribute("aria-current", "page");
  });

  it("navigates to authentication on click", async () => {
    vi.stubGlobal("location", {
      href: "https://example.com/",
      pathname: "/",
      search: "",
    });

    const pushStateMock = vi.fn();
    vi.stubGlobal("history", {
      pushState: pushStateMock,
    });

    const navigateMock = vi.fn();
    document.body.appendChild(
      navigation({
        path: "/",
        navigate: navigateMock,
        recordTypePool,
        metadataPool,
        systemPool,
      }),
    );

    await userEvent.click(
      screen.getByRole("link", { name: /authentication/i }),
    );
    expect(navigateMock).toHaveBeenCalled();
    expect(pushStateMock).toHaveBeenCalledWith({}, "", "/authentication");
  });

  it("renders navigation items for each record type, grouped by record type group", () => {
    document.body.appendChild(
      navigation({
        path: "/recordType/person/1",
        recordTypePool,
        metadataPool,
        systemPool,
      }),
    );

    expect(screen.getByRole("navigation")).toBeInTheDocument();
    const divaNav = screen.getByRole("heading", { name: "DIVA" }).closest(
      ".main-nav-item",
    );
    const systemNav = screen
      .getByRole("heading", { name: "SYSTEM" })
      .closest(".main-nav-item");

    expect(divaNav).toContainElement(
      screen.getByRole("link", { name: /person/i }),
    );
    expect(divaNav).toContainElement(
      screen.getByRole("link", { name: /organisation/i }),
    );
    expect(systemNav).toContainElement(
      screen.getByRole("link", { name: /output/i }),
    );

    expect(screen.getByText("group1")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /person/i })).toHaveAttribute(
      "href",
      "/recordType/person",
    );
    expect(screen.getByRole("link", { name: /organisation/i })).toHaveAttribute(
      "href",
      "/recordType/organisation",
    );

    expect(screen.getByText("group2")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /output/i })).toHaveAttribute(
      "href",
      "/recordType/output",
    );
  });

  it("collapses each data divider from its h2 heading", async () => {
    document.body.appendChild(
      navigation({
        path: "/recordType/person/1",
        recordTypePool,
        metadataPool,
        systemPool,
      }),
    );

    const divaHeading = screen.getByRole("heading", {
      level: 2,
      name: "DIVA",
    });
    const divaSection = divaHeading.closest("details");
    const systemSection = screen
      .getByRole("heading", {
        level: 2,
        name: "SYSTEM",
      })
      .closest("details");

    expect(divaSection).toHaveAttribute("open");
    expect(systemSection).toHaveAttribute("open");

    await userEvent.click(divaHeading.closest("summary"));

    expect(divaSection).not.toHaveAttribute("open");
    expect(systemSection).toHaveAttribute("open");
    expect(
      systemSection.querySelector('a[href="/recordType/output"]'),
    ).toBeVisible();
  });

  it("renders navigation items with base path", () => {
    vi.stubGlobal("location", {
      pathname: "/api-helper/",
    });

    document.body.appendChild(
      navigation({
        path: "/recordType/person/1",
        recordTypePool,
        metadataPool,
        systemPool,
      }),
    );

    expect(screen.getByRole("navigation")).toBeInTheDocument();

    expect(screen.getByText("group1")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /person/i })).toHaveAttribute(
      "href",
      "/api-helper/recordType/person",
    );
    expect(screen.getByRole("link", { name: /organisation/i })).toHaveAttribute(
      "href",
      "/api-helper/recordType/organisation",
    );

    expect(screen.getByText("group2")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /output/i })).toHaveAttribute(
      "href",
      "/api-helper/recordType/output",
    );
  });

  it("marks current page", () => {
    document.body.appendChild(
      navigation({
        path: "/recordType/output/1",
        recordTypePool,
        metadataPool,
        systemPool,
      }),
    );

    expect(screen.getByRole("link", { name: /output/i })).toHaveAttribute(
      "aria-current",
      "page",
    );
  });

  it("navigates to the correct page on click", async () => {
    vi.stubGlobal("location", {
      href: "https://example.com/recordType/output/1",
      pathname: "/recordType/output/1",
      search: "?param=value",
    });

    const pushStateMock = vi.fn();
    vi.stubGlobal("history", {
      pushState: pushStateMock,
    });

    const navigateMock = vi.fn();
    document.body.appendChild(
      navigation({
        path: "/recordType/output/1",
        navigate: navigateMock,
        recordTypePool,
        metadataPool,
        systemPool,
      }),
    );

    await userEvent.click(screen.getByRole("link", { name: /person/i }));
    expect(navigateMock).toHaveBeenCalled();
    expect(pushStateMock).toHaveBeenCalledWith(
      {},
      "",
      "/recordType/person?param=value",
    );
  });
});

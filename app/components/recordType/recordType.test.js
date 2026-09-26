import { describe, expect, it, vi } from "vitest";
import recordType from "./recordType";
import createOrUpdateRecordType from "./createOrUpdate";
import { screen, waitFor } from "@testing-library/dom";

vi.mock("../../utils/searchParams.js", () => ({
  getMethod: vi.fn(() => "create"),
  getLanguage: vi.fn(() => "en"),
}));

vi.mock("../../services/getTextFromLink.js", () => ({
  default: vi.fn(() => Promise.resolve("translated")),
}));

vi.mock("../radio/radio.js", () => ({
  default: vi.fn(({ name, value, label, checked, onChange }) => {
    const wrapper = document.createElement("label");
    const input = document.createElement("input");
    input.type = "radio";
    input.name = name;
    input.value = value;
    input.checked = checked;
    input.addEventListener("change", () => onChange(value));
    wrapper.appendChild(input);
    wrapper.appendChild(document.createTextNode(label));
    return wrapper;
  }),
}));

vi.mock("./createOrUpdate.js", () => ({
  default: vi.fn(() => {
    const div = document.createElement("div");
    div.textContent = "mock-createOrUpdate";
    return div;
  }),
}));

vi.mock("./read.js", () => ({
  default: vi.fn(() => {
    const div = document.createElement("div");
    div.textContent = "mock-read";
    return div;
  }),
}));

vi.mock("./recordTypeList.js", () => ({
  default: vi.fn(() => {
    const div = document.createElement("div");
    div.textContent = "mock-list";
    return div;
  }),
}));

vi.mock("./requestConfigDoc.js", () => ({
  default: vi.fn(() => {
    const div = document.createElement("div");
    div.textContent = "mock-requestConfigDoc";
    return div;
  }),
}));

const recordTypeData = {
  children: [
    { name: "recordInfo", children: [{ name: "id", value: "person" }] },
    { name: "textId", value: "personTextId" },
  ],
};

describe("recordType", () => {
  it("renders a not found message when recordType not in pool", () => {
    const result = recordType({
      recordTypeId: "nonexistent",
      recordTypePool: { person: recordTypeData },
      validationTypePool: {},
      metadataPool: {},
    });

    expect(result).toHaveClass("error-boundary-wrapper");
    expect(result.querySelector('[role="alert"]')).toHaveTextContent(
      'Record type "nonexistent" not found',
    );
    expect(result.querySelector("pre").textContent).toContain(
      'Error: Record type "nonexistent" not found',
    );
  });

  it("renders with record-type class", () => {
    const result = recordType({
      recordTypeId: "person",
      recordTypePool: { person: recordTypeData },
      validationTypePool: {},
      metadataPool: {},
    });

    expect(result.className).toBe("record-type");
  });

  it("renders page title with recordTypeId initially", () => {
    const result = recordType({
      recordTypeId: "person",
      recordTypePool: { person: recordTypeData },
      validationTypePool: {},
      metadataPool: {},
    });

    expect(result.querySelector("h2").textContent).toBe("person");
  });

  it("updates title after text is resolved", async () => {
    document.body.appendChild(
      recordType({
        recordTypeId: "person",
        recordTypePool: { person: recordTypeData },
        validationTypePool: {},
        metadataPool: {},
      }),
    );

    await waitFor(() => {
      expect(screen.getByText("translated (person)")).toBeInTheDocument();
    });
  });

  it("renders method radio buttons", () => {
    const result = recordType({
      recordTypeId: "person",
      recordTypePool: { person: recordTypeData },
      validationTypePool: {},
      metadataPool: {},
    });

    expect(result.querySelector("fieldset")).toBeTruthy();
    expect(result.textContent).toContain("Select operation");
  });

  it("renders createOrUpdate for create method", () => {
    const recordTypePool = { person: recordTypeData };
    const result = recordType({
      recordTypeId: "person",
      recordTypePool,
      validationTypePool: {},
      metadataPool: {},
    });

    expect(result.textContent).toContain("mock-createOrUpdate");
    expect(createOrUpdateRecordType).toHaveBeenCalledWith(
      expect.objectContaining({ recordTypePool }),
    );
  });

  it("renders read view for read method", async () => {
    const { getMethod } = await import("../../utils/searchParams.js");
    vi.mocked(getMethod).mockReturnValue("read");

    const result = recordType({
      recordTypeId: "person",
      recordTypePool: { person: recordTypeData },
      validationTypePool: {},
      metadataPool: {},
    });

    expect(result.textContent).toContain("mock-read");
  });

  it("renders list view for list method", async () => {
    const { getMethod } = await import("../../utils/searchParams.js");
    vi.mocked(getMethod).mockReturnValue("list");

    const result = recordType({
      recordTypeId: "person",
      recordTypePool: { person: recordTypeData },
      validationTypePool: {},
      metadataPool: {},
    });

    expect(result.textContent).toContain("mock-list");
    expect(result.textContent).toContain("List");
  });

  it("renders requestConfigDoc for delete method", async () => {
    const { getMethod } = await import("../../utils/searchParams.js");
    vi.mocked(getMethod).mockReturnValue("delete");

    const result = recordType({
      recordTypeId: "person",
      recordTypePool: { person: recordTypeData },
      validationTypePool: {},
      metadataPool: {},
    });

    expect(result.textContent).toContain("mock-requestConfigDoc");
  });
});

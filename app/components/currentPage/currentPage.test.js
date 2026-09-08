import { describe, expect, it, vi } from "vitest";
import { el } from "../../utils/el";
import currentPage from "./currentPage";
import { getCurrentRoute, getRecordTypeId } from "../../utils/routing";

vi.mock("../../routes/recordType.js", () => ({
  default: vi.fn(() => {
    return el("div", { textContent: "Record type route" });
  }),
}));

vi.mock("../../routes/authentication.js", () => ({
  default: vi.fn(() => {
    return el("div", { textContent: "Authentication route" });
  }),
}));

vi.mock("../../routes/welcome.js", () => ({
  default: vi.fn(() => {
    return el("div", { textContent: "Welcome route" });
  }),
}));

vi.mock("../../utils/routing.js");

describe("currentPage", () => {
  it('renders recorType when current route is "recordType" and recordTypeId is present', () => {
    vi.mocked(getRecordTypeId).mockReturnValue("someRecordTypeId");
    vi.mocked(getCurrentRoute).mockReturnValue("recordType");

    const result = currentPage({
      recordTypePool: {},
      validationTypePool: {},
      metadataPool: {},
      searchPool: {},
    });

    expect(result.textContent).toBe("Record type route");
  });

  it("renders welcome message when current route is recordType and no recordId is present", () => {
    vi.mocked(getRecordTypeId).mockReturnValue(null);
    vi.mocked(getCurrentRoute).mockReturnValue("recordType");

    const result = currentPage({
      recordTypePool: {},
      validationTypePool: {},
      metadataPool: {},
      searchPool: {},
    });

    expect(result.textContent).toBe("Welcome route");
  });

  it('renders authentication when current route is "authentication"', () => {
    vi.mocked(getCurrentRoute).mockReturnValue("authentication");

    const result = currentPage({
      recordTypePool: {},
      validationTypePool: {},
      metadataPool: {},
      searchPool: {},
    });

    expect(result.textContent).toBe("Authentication route");
  });

  it("renders welcome message when current route is neither recordType nor authentication", () => {
    vi.mocked(getCurrentRoute).mockReturnValue("someOtherRoute");

    const result = currentPage({
      recordTypePool: {},
      validationTypePool: {},
      metadataPool: {},
      searchPool: {},
    });

    expect(result.textContent).toBe("Welcome route");
  });
});

import { beforeEach, describe, expect, it, vi } from "vitest";
import createOrUpdateRecordType from "./createOrUpdate";
import { screen, waitFor } from "@testing-library/dom";
import dataFormat from "../dataFormat/dataFormat";
import group from "../group/group";
import userEvent from "@testing-library/user-event";

vi.mock("../../services/getTextFromLink.js", () => ({
  default: vi.fn((textId) => Promise.resolve(textId?.value ?? "text")),
}));

vi.mock("../dataFormat/dataFormat.js", () => ({
  default: vi.fn(() => {
    const root = document.createElement("div");
    root.textContent = "Mock data format";
    return root;
  }),
}));

vi.mock("../group/group.js", () => ({
  default: vi.fn(() => document.createElement("div")),
}));

const personValidationType = {
  children: [
    {
      name: "recordInfo",
      children: [{ name: "id", value: "personValidationType" }],
    },
    {
      name: "validatesRecordType",
      children: [
        {
          name: "linkedRecordId",
          value: "person",
        },
      ],
    },
    {
      name: "newMetadataId",
      children: [{ name: "linkedRecordId", value: "personNewGroup" }],
    },
    {
      name: "metadataId",
      children: [{ name: "linkedRecordId", value: "personUpdateGroup" }],
    },
  ],
};

const anotherValidationType = {
  children: [
    {
      name: "recordInfo",
      children: [{ name: "id", value: "anotherValidationType" }],
    },
    {
      name: "validatesRecordType",
      children: [
        {
          name: "linkedRecordId",
          value: "person",
        },
      ],
    },
    {
      name: "newMetadataId",
      children: [{ name: "linkedRecordId", value: "anotherNewGroup" }],
    },
  ],
};

const recordTypePool = {
  person: {
    children: [
      {
        name: "metadataId",
        children: [{ name: "linkedRecordId", value: "personGroup" }],
      },
    ],
  },
};

describe("createOrUpdate", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders documentation for create with one validationType", () => {
    const validationTypePool = {
      personValidationType,
    };

    const metadataPool = {};

    document.body.appendChild(
      createOrUpdateRecordType({
        validationTypePool,
        recordTypePool,
        metadataPool,
        recordTypeId: "person",
        method: "create",
      }),
    );

    expect(screen.getByText("Request config")).toBeInTheDocument();
    expect(screen.queryByRole("combobox")).not.toBeInTheDocument();
    expect(screen.getByText("Request body format")).toBeInTheDocument();
    expect(screen.getByText("Response body format")).toBeInTheDocument();
    expect(screen.getAllByText("Mock data format")).toHaveLength(2);
    expect(group).toHaveBeenNthCalledWith(1, {
      metadataPool,
      groupId: "personNewGroup",
      mode: "create",
    });
    expect(group).toHaveBeenNthCalledWith(2, {
      metadataPool,
      groupId: "personGroup",
      mode: "read",
    });
  });

  it("renders documentation for update with one validationType", () => {
    const validationTypePool = {
      personValidationType,
    };
    const metadataPool = {};
    document.body.appendChild(
      createOrUpdateRecordType({
        validationTypePool,
        recordTypePool,
        metadataPool,
        recordTypeId: "person",
        method: "update",
      }),
    );

    expect(screen.getByText("Response body format")).toBeInTheDocument();
    expect(group).toHaveBeenNthCalledWith(1, {
      metadataPool,
      groupId: "personUpdateGroup",
      mode: "update",
    });
    expect(group).toHaveBeenNthCalledWith(2, {
      metadataPool,
      groupId: "personGroup",
      mode: "read",
    });
  });

  it("renders a validation type select when multiple validation types exist", async () => {
    const validationTypePool = {
      personValidationType,
      anotherValidationType,
    };

    document.body.appendChild(
      createOrUpdateRecordType({
        validationTypePool,
        recordTypePool,
        metadataPool: {},
        recordTypeId: "person",
        method: "create",
      }),
    );

    await waitFor(() =>
      expect(screen.getByRole("combobox")).toBeInTheDocument(),
    );
    expect(dataFormat).toHaveBeenCalledWith({ children: expect.anything() });

    await userEvent.click(screen.getByRole("combobox"));
    await waitFor(() => expect(screen.getAllByRole("option")).toHaveLength(2));
    await userEvent.click(screen.getByText(/anotherValidationType/));

    expect(dataFormat).toHaveBeenCalledWith({ children: expect.anything() });
  });
});

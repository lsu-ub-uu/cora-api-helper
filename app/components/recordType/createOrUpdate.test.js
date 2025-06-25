import { describe, expect, it, vi } from "vitest";
import createOrUpdateRecordType from "./createOrUpdate";
import { screen } from "@testing-library/dom";
import dataFormat from "../dataFormat/dataFormat";
import userEvent from "@testing-library/user-event";

vi.mock("../dataFormat/dataFormat.js", () => ({
  default: vi.fn(() => {
    const root = document.createElement("div");
    root.textContent = "Mock data format";
    return root;
  }),
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

describe("createOrUpdate", () => {
  it("renders documentation for create with one validationType", () => {
    const validationTypePool = {
      personValidationType,
    };

    const metadataPool = {};

    document.body.appendChild(
      createOrUpdateRecordType({
        validationTypePool,
        metadataPool,
        recordTypeId: "person",
        method: "create",
      })
    );

    expect(screen.getByText("Request config")).toBeInTheDocument();
    expect(screen.queryByRole("combobox")).not.toBeInTheDocument();
    expect(screen.getByText("Mock data format")).toBeInTheDocument();
    expect(dataFormat).toHaveBeenCalledWith({
      metadataPool,
      rootGroupId: "personNewGroup",
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
        metadataPool,
        recordTypeId: "person",
        method: "update",
      })
    );

    expect(dataFormat).toHaveBeenCalledWith({
      metadataPool,
      rootGroupId: "personUpdateGroup",
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
        metadataPool: {},
        recordTypeId: "person",
        method: "create",
      })
    );

    expect(screen.getByRole("combobox")).toBeInTheDocument();
    expect(dataFormat).toHaveBeenCalledWith(
      expect.objectContaining({
        rootGroupId: "personNewGroup",
      })
    );

    await userEvent.selectOptions(
      screen.getByRole("combobox"),
      "anotherValidationType"
    );

    expect(dataFormat).toHaveBeenCalledWith(
      expect.objectContaining({
        rootGroupId: "anotherNewGroup",
      })
    );
  });
});

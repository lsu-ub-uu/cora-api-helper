import { describe, expect, it, vi } from "vitest";
import validationTypeSelect from "./validationTypeSelect";
import { screen, waitFor } from "@testing-library/dom";
import userEvent from "@testing-library/user-event";

vi.mock("../../utils/getTextFromLink.js", () => ({
  default: () => Promise.resolve("translated text"),
}));

describe("validationTypeSelect", () => {
  it("renders select element with validation types", () => {
    const validationTypes = [
      {
        children: [
          { name: "recordInfo", children: [{ name: "id", value: "type1" }] },
        ],
      },
      {
        children: [
          { name: "recordInfo", children: [{ name: "id", value: "type2" }] },
        ],
      },
      {
        children: [
          { name: "recordInfo", children: [{ name: "id", value: "type3" }] },
        ],
      },
    ];

    document.body.appendChild(
      validationTypeSelect({
        validationTypes,
        selectedValidationTypeId: "type1",
        onChange: vi.fn(),
      })
    );

    expect(screen.getByRole("combobox")).toBeInTheDocument();
    const options = screen.getAllByRole("option");
    expect(options).toHaveLength(3);
    expect(options[0]).toHaveValue("type1");
    expect(options[0]).toHaveTextContent("type1");
    expect(options[1]).toHaveValue("type2");
    expect(options[1]).toHaveTextContent("type2");
    expect(options[2]).toHaveValue("type3");
    expect(options[2]).toHaveTextContent("type3");
  });

  it("triggers onChange when selection changes", async () => {
    const onChangeMock = vi.fn();
    const validationTypes = [
      {
        children: [
          { name: "recordInfo", children: [{ name: "id", value: "type1" }] },
        ],
      },
      {
        children: [
          { name: "recordInfo", children: [{ name: "id", value: "type2" }] },
        ],
      },
    ];
    document.body.appendChild(
      validationTypeSelect({
        validationTypes,
        selectedValidationTypeId: "type1",
        onChange: onChangeMock,
      })
    );
    const select = screen.getByRole("combobox");
    await userEvent.selectOptions(select, "type2");
    expect(onChangeMock).toHaveBeenCalledWith("type2");
  });

  it("populates texts", async () => {
    const validationTypes = [
      {
        children: [
          { name: "recordInfo", children: [{ name: "id", value: "type1" }] },
        ],
      },
    ];

    document.body.appendChild(
      validationTypeSelect({
        validationTypes,
        selectedValidationTypeId: "type1",
        onChange: vi.fn(),
      })
    );

    await waitFor(() => {
      expect(
        screen.getByRole("option", { name: "translated text (type1)" })
      ).toBeInTheDocument();
    });
  });
});

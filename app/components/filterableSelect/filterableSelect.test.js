import { screen } from "@testing-library/dom";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import filterableSelect from "./filterableSelect";

describe("filterableSelect", () => {
  const options = [
    { value: "apple", label: "Apple" },
    { value: "banana", label: "Banana" },
    { value: "cherry", label: "Cherry" },
  ];

  it("renders an input with combobox role", () => {
    document.body.appendChild(
      filterableSelect({ options: [], onChange: vi.fn() }),
    );
    expect(screen.getByRole("combobox")).toBeInTheDocument();
  });

  it("renders a hidden listbox", () => {
    document.body.appendChild(
      filterableSelect({ options: [], onChange: vi.fn() }),
    );
    expect(screen.getByRole("listbox", { hidden: true })).toBeInTheDocument();
    expect(screen.getByRole("listbox", { hidden: true })).not.toBeVisible();
  });

  it("shows all options when input is focused", async () => {
    const component = filterableSelect({ onChange: vi.fn() });
    component.setOptions(options);
    document.body.appendChild(component);

    await userEvent.click(screen.getByRole("combobox"));

    expect(screen.getAllByRole("option")).toHaveLength(3);
    expect(screen.getByRole("listbox")).toBeVisible();
  });

  it("filters options by input text", async () => {
    const component = filterableSelect({ onChange: vi.fn() });
    component.setOptions(options);
    document.body.appendChild(component);

    const input = screen.getByRole("combobox");
    await userEvent.click(input);
    await userEvent.clear(input);
    await userEvent.type(input, "ban");

    expect(screen.getAllByRole("option")).toHaveLength(1);
    expect(screen.getByRole("option")).toHaveTextContent("Banana");
  });

  it("is case-insensitive when filtering", async () => {
    const component = filterableSelect({ onChange: vi.fn() });
    component.setOptions(options);
    document.body.appendChild(component);

    const input = screen.getByRole("combobox");
    await userEvent.click(input);
    await userEvent.clear(input);
    await userEvent.type(input, "CHER");

    expect(screen.getAllByRole("option")).toHaveLength(1);
    expect(screen.getByRole("option")).toHaveTextContent("Cherry");
  });

  it("calls onChange when an option is clicked", async () => {
    const onChangeMock = vi.fn();
    const component = filterableSelect({ onChange: onChangeMock });
    component.setOptions(options);
    document.body.appendChild(component);

    await userEvent.click(screen.getByRole("combobox"));
    await userEvent.click(screen.getByText("Banana"));

    expect(onChangeMock).toHaveBeenCalledWith("banana");
  });

  it("sets input text to selected option label on click", async () => {
    const component = filterableSelect({ onChange: vi.fn() });
    component.setOptions(options);
    document.body.appendChild(component);

    await userEvent.click(screen.getByRole("combobox"));
    await userEvent.click(screen.getByText("Cherry"));

    expect(screen.getByRole("combobox")).toHaveValue("Cherry");
  });

  it("pre-selects option matching selectedValue", () => {
    const component = filterableSelect({
      selectedValue: "banana",
      onChange: vi.fn(),
    });
    component.setOptions(options);
    document.body.appendChild(component);

    expect(screen.getByRole("combobox")).toHaveValue("Banana");
  });

  it("navigates options with arrow keys and selects with Enter", async () => {
    const onChangeMock = vi.fn();
    const component = filterableSelect({ onChange: onChangeMock });
    component.setOptions(options);
    document.body.appendChild(component);

    const input = screen.getByRole("combobox");
    await userEvent.click(input);
    await userEvent.keyboard("{ArrowDown}{ArrowDown}{Enter}");

    expect(onChangeMock).toHaveBeenCalledWith("banana");
    expect(input).toHaveValue("Banana");
  });

  it("selects topmost option on Enter without arrow navigation", async () => {
    const onChangeMock = vi.fn();
    const component = filterableSelect({ onChange: onChangeMock });
    component.setOptions(options);
    document.body.appendChild(component);

    const input = screen.getByRole("combobox");
    await userEvent.click(input);
    await userEvent.keyboard("{Enter}");

    expect(onChangeMock).toHaveBeenCalledWith("apple");
    expect(input).toHaveValue("Apple");
  });

  it("selects topmost filtered option on Enter", async () => {
    const onChangeMock = vi.fn();
    const component = filterableSelect({ onChange: onChangeMock });
    component.setOptions(options);
    document.body.appendChild(component);

    const input = screen.getByRole("combobox");
    await userEvent.click(input);
    await userEvent.clear(input);
    await userEvent.type(input, "che");
    await userEvent.keyboard("{Enter}");

    expect(onChangeMock).toHaveBeenCalledWith("cherry");
    expect(input).toHaveValue("Cherry");
  });

  it("closes listbox on Escape", async () => {
    const component = filterableSelect({ onChange: vi.fn() });
    component.setOptions(options);
    document.body.appendChild(component);

    await userEvent.click(screen.getByRole("combobox"));
    expect(screen.getByRole("listbox")).toBeVisible();

    await userEvent.keyboard("{Escape}");
    expect(screen.getByRole("listbox", { hidden: true })).not.toBeVisible();
  });

  it("restores previous selection on blur with invalid text", async () => {
    const component = filterableSelect({
      selectedValue: "apple",
      onChange: vi.fn(),
    });
    component.setOptions(options);
    document.body.appendChild(component);

    const input = screen.getByRole("combobox");
    await userEvent.clear(input);
    await userEvent.type(input, "xyz");
    await userEvent.tab();

    expect(input).toHaveValue("Apple");
  });

  it("accepts value on blur when text matches an option", async () => {
    const onChangeMock = vi.fn();
    const component = filterableSelect({ onChange: onChangeMock });
    component.setOptions(options);
    document.body.appendChild(component);

    const input = screen.getByRole("combobox");
    await userEvent.type(input, "cherry");
    await userEvent.tab();

    expect(onChangeMock).toHaveBeenCalledWith("cherry");
    expect(input).toHaveValue("Cherry");
  });
});

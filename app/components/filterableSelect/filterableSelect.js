export default function filterableSelect({ options, selectedValue, onChange }) {
  const root = document.createElement("div");
  root.className = "filterable-select";

  const input = document.createElement("input");
  input.type = "text";
  input.setAttribute("role", "combobox");
  input.setAttribute("aria-expanded", "false");
  input.setAttribute("aria-autocomplete", "list");
  input.setAttribute("autocomplete", "off");

  const listbox = document.createElement("ul");
  listbox.setAttribute("role", "listbox");
  listbox.className = "filterable-select-listbox";

  const listboxId = `listbox-${crypto.randomUUID()}`;
  listbox.id = listboxId;
  input.setAttribute("aria-controls", listboxId);

  let allOptions = [];
  let activeIndex = -1;

  function setSelected(value) {
    const match = allOptions.find((o) => o.value === value);
    if (match) {
      input.value = match.label;
      input.dataset.selectedValue = match.value;
    }
  }

  function renderOptions(filter) {
    listbox.replaceChildren();
    activeIndex = -1;

    const filtered = filter
      ? allOptions.filter((o) =>
          o.label.toLowerCase().includes(filter.toLowerCase()),
        )
      : allOptions;

    filtered.forEach((o) => {
      const li = document.createElement("li");
      li.setAttribute("role", "option");
      li.textContent = o.label;
      li.dataset.value = o.value;
      li.addEventListener("mousedown", (e) => {
        e.preventDefault();
        selectOption(o);
        closeListbox();
      });
      listbox.appendChild(li);
    });

    return filtered;
  }

  function selectOption(option) {
    input.value = option.label;
    input.dataset.selectedValue = option.value;
    onChange(option.value);
  }

  function openListbox() {
    input.setAttribute("aria-expanded", "true");
    listbox.hidden = false;
  }

  function closeListbox() {
    input.setAttribute("aria-expanded", "false");
    listbox.hidden = true;
    activeIndex = -1;
    clearActiveDescendant();
  }

  function setActiveDescendant(index) {
    const items = listbox.querySelectorAll('[role="option"]');
    items.forEach((item) => item.classList.remove("active"));
    if (index >= 0 && index < items.length) {
      items[index].classList.add("active");
      items[index].scrollIntoView({ block: "nearest" });
      input.setAttribute("aria-activedescendant", items[index].id || "");
    }
  }

  function clearActiveDescendant() {
    input.removeAttribute("aria-activedescendant");
    listbox
      .querySelectorAll('[role="option"]')
      .forEach((item) => item.classList.remove("active"));
  }

  input.addEventListener("focus", () => {
    input.select();
    renderOptions("");
    openListbox();
  });

  input.addEventListener("input", () => {
    renderOptions(input.value);
    openListbox();
  });

  input.addEventListener("blur", () => {
    closeListbox();
    const match = allOptions.find(
      (o) => o.label.toLowerCase() === input.value.toLowerCase(),
    );
    if (match) {
      selectOption(match);
    } else if (input.dataset.selectedValue) {
      const prev = allOptions.find(
        (o) => o.value === input.dataset.selectedValue,
      );
      if (prev) input.value = prev.label;
    }
  });

  input.addEventListener("keydown", (e) => {
    const items = listbox.querySelectorAll('[role="option"]');
    if (e.key === "ArrowDown") {
      e.preventDefault();
      if (listbox.hidden) {
        renderOptions(input.value);
        openListbox();
      }
      activeIndex = Math.min(activeIndex + 1, items.length - 1);
      setActiveDescendant(activeIndex);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      activeIndex = Math.max(activeIndex - 1, 0);
      setActiveDescendant(activeIndex);
    } else if (e.key === "Enter") {
      e.preventDefault();
      const targetIndex = activeIndex >= 0 ? activeIndex : 0;
      if (targetIndex < items.length) {
        const value = items[targetIndex].dataset.value;
        const option = allOptions.find((o) => o.value === value);
        if (option) selectOption(option);
      }
      closeListbox();
    } else if (e.key === "Escape") {
      closeListbox();
    }
  });

  listbox.hidden = true;
  root.appendChild(input);
  root.appendChild(listbox);

  root.setOptions = (opts) => {
    allOptions = opts;
    if (selectedValue) {
      setSelected(selectedValue);
    }
  };

  return root;
}

import { el } from "../../utils/el.js";

let nextListboxId = 0;

export default function filterableSelect({
  options = [],
  selectedValue,
  onChange,
}) {
  let activeIndex = -1;

  const listboxId = `listbox-${nextListboxId++}`;

  const listbox = filterListbox({ id: listboxId });

  const input = filterInput({
    getActiveIndex: () => activeIndex,
    setActiveIndex: (index) => (activeIndex = index),
    listboxId,
    renderOptions,
    listbox,
    openListbox,
    closeListbox,
    options,
    setActiveDescendant,
    clearActiveDescendant,
    selectOption,
  });

  if (selectedValue) {
    const matchingOption = options.find((o) => o.value === selectedValue);
    if (matchingOption) {
      input.value = matchingOption.label;
      input.dataset.selectedValue = matchingOption.value;
    }
  }

  function renderOptions(filter) {
    activeIndex = -1;

    const filteredOptions = filter
      ? options.filter((o) =>
          o.label.toLowerCase().includes(filter.toLowerCase()),
        )
      : options;

    listbox.replaceChildren(
      ...filteredOptions.map((o) => {
        const li = el("li", {
          role: "option",
          textContent: o.label,
          onMousedown: (e) => {
            e.preventDefault();
            selectOption(o);
            closeListbox();
          },
        });
        li.dataset.value = o.value;
        return li;
      }),
    );
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
      items[index].id = `option-${index}`;
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

  return el("div", {
    className: "filterable-select",
    children: [input, listbox],
  });
}

function filterListbox({ id }) {
  return el("ul", {
    id: id,
    role: "listbox",
    className: "filterable-select-listbox",
    hidden: true,
  });
}

function filterInput({
  listboxId,
  renderOptions,
  listbox,
  openListbox,
  closeListbox,
  options,
  getActiveIndex,
  setActiveIndex,
  setActiveDescendant,
  selectOption,
}) {
  return el("input", {
    type: "text",
    role: "combobox",
    "aria-expanded": "false",
    "aria-autocomplete": "list",
    "aria-controls": listboxId,
    autocomplete: "off",
    onFocus: (e) => {
      e.target.select();
      renderOptions("");
      openListbox();
    },
    onInput: (e) => {
      renderOptions(e.target.value);
      openListbox();
    },
    onBlur: (e) => {
      closeListbox();
      if (e.target.dataset.selectedValue) {
        const selectedOption = options.find(
          (o) => o.value === e.target.dataset.selectedValue,
        );
        if (selectedOption) {
          e.target.value = selectedOption.label;
        }
      }
    },
    onKeydown: (e) => {
      const items = listbox.querySelectorAll('[role="option"]');

      switch (e.key) {
        case "ArrowDown": {
          e.preventDefault();
          if (listbox.hidden) {
            renderOptions(e.target.value);
            openListbox();
          }
          const nextIndex = Math.min(getActiveIndex() + 1, items.length - 1);
          setActiveIndex(nextIndex);
          setActiveDescendant(nextIndex);
          break;
        }
        case "ArrowUp": {
          e.preventDefault();
          if (listbox.hidden) {
            renderOptions(e.target.value);
            openListbox();
          }
          const nextIndex = Math.max(getActiveIndex() - 1, 0);
          setActiveIndex(nextIndex);
          setActiveDescendant(nextIndex);
          break;
        }
        case "Enter": {
          e.preventDefault();
          const currentIndex = getActiveIndex();
          const targetIndex = currentIndex >= 0 ? currentIndex : 0;
          if (targetIndex < items.length) {
            const value = items[targetIndex].dataset.value;
            const option = options.find((o) => o.value === value);
            if (option) selectOption(option);
          }
          closeListbox();
          break;
        }
        case "Escape": {
          closeListbox();
          break;
        }
      }
    },
  });
}

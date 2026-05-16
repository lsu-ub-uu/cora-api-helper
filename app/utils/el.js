/**
 * Utility function to create an HTML element declaratively.
 *
 * @param {string} tag - The tag name of the element to create (e.g. 'div', 'span', 'select'). 'fragment' can be used to create a DocumentFragment.
 * @param {Object} props - Properties to set on the element. Can include:
 *   - Any standard HTML attributes (e.g. id, className, data-*)
 *   - Event listeners (e.g. onClick, onChange)
 *   - children: A single child or an array of children to append to the element
 * @returns {HTMLElement} The created HTML element with the specified properties and children.
 */
export function el(tag, props = {}) {
  const element = document.createElement(tag);
  const { children, ...rest } = props;

  for (const [key, value] of Object.entries(rest)) {
    if (key.startsWith("on") && typeof value === "function") {
      const event = key[2].toLowerCase() + key.slice(3);
      element.addEventListener(event, value);
    } else if (key.includes("-")) {
      element.setAttribute(key, value);
    } else {
      element[key] = value;
    }
  }

  if (children !== undefined && children !== null && children !== false) {
    const childArray = Array.isArray(children) ? children : [children];
    for (const child of childArray) {
      if (child !== false && child !== null && child !== undefined) {
        element.append(child);
      }
    }
  }

  return element;
}

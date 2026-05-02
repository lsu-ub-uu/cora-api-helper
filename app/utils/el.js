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

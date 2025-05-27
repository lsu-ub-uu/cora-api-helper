import getFirstChildWithName from "../utils/getFirstChildWithName.js";

export default function navigation({ recordTypePool, path, navigate }) {
  const nav = document.createElement("nav");

  nav.className = "main-nav";
  const ul = document.createElement("ul");

  Object.keys(recordTypePool).forEach((recordTypeId) => {
    const li = document.createElement("li");
    const a = document.createElement("a");
    const href = `/record/${recordTypeId}`;

    a.href = href;
    a.textContent = recordTypeId;

    if (path.startsWith(href)) {
      a.setAttribute("aria-current", "page");
    }

    a.addEventListener("click", (e) => {
      e.preventDefault();
      const href = e.target.getAttribute("href");
      history.pushState({}, "", href);
      navigate();
    });

    li.appendChild(a);
    ul.appendChild(li);
  });

  nav.appendChild(ul);
  return nav;
}

import getFirstChildWithName from "../utils/getFirstChildWithName.js";
import getTextFromLink from "../utils/getTextFromLink.js";

export default function navigation({ recordTypePool, path, navigate }) {
  const nav = document.createElement("nav");
  nav.className = "main-nav";

  const heading = document.createElement("h2");
  heading.textContent = "Record types";
  nav.appendChild(heading);

  const ul = document.createElement("ul");

  const groups = Object.keys(recordTypePool).reduce((acc, recordTypeId) => {
    const recordType = recordTypePool[recordTypeId];
    const group =
      getFirstChildWithName(recordType, "groupOfRecordType")?.value || "Other";
    if (!acc[group]) acc[group] = [];
    acc[group].push(recordTypeId);
    return acc;
  }, {});

  Object.entries(groups).forEach(([groupName, recordTypeIds]) => {
    const groupLi = document.createElement("li");
    const heading = document.createElement("h3");
    const formattedGroupName = groupName
      .replace(/([a-z])([A-Z])/g, "$1 $2")
      .replace(/^./, (str) => str.toUpperCase());
    heading.textContent = formattedGroupName;
    groupLi.appendChild(heading);

    const groupUl = document.createElement("ul");
    recordTypeIds.forEach((recordTypeId) => {
      const li = document.createElement("li");
      const a = document.createElement("a");
      const href = `/record/${recordTypeId}`;

      a.href = href;
      a.textContent = recordTypeId;

      const textId = getFirstChildWithName(
        recordTypePool[recordTypeId],
        "textId"
      );
      getTextFromLink(textId).then((text) => {
        a.textContent = text;
      });

      if (path.startsWith(href)) {
        a.setAttribute("aria-current", "page");
      }

      a.addEventListener("click", (e) => {
        e.preventDefault();
        const href = e.target.getAttribute("href");
        const url = href + window.location.search;
        history.pushState({}, "", url);
        navigate();
      });

      li.appendChild(a);
      groupUl.appendChild(li);
    });

    groupLi.appendChild(groupUl);
    ul.appendChild(groupLi);
  });

  nav.appendChild(ul);
  return nav;
}

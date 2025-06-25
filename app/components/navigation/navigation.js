import getFirstChildWithName from "../../utils/getFirstChildWithName.js";
import getTextFromLink from "../../utils/getTextFromLink.js";

export default function navigation({ recordTypePool, path, navigate }) {
  const nav = document.createElement("nav");

  nav.className = "main-nav";
  nav.appendChild(heading());
  nav.appendChild(groupList({ recordTypePool, path, navigate }));

  return nav;
}

function heading() {
  const heading = document.createElement("h2");
  heading.textContent = "Select Record Type";
  return heading;
}

function groupList({ recordTypePool, path, navigate }) {
  const ul = document.createElement("ul");

  const groups = groupRecordTypes(recordTypePool);

  Object.entries(groups).forEach(([groupName, recordTypeIds]) => {
    ul.appendChild(
      groupListItem({
        groupName,
        recordTypeIds,
        recordTypePool,
        path,
        navigate,
      })
    );
  });

  return ul;
}

function groupRecordTypes(recordTypePool) {
  return Object.keys(recordTypePool).reduce((acc, recordTypeId) => {
    const recordType = recordTypePool[recordTypeId];
    const group =
      getFirstChildWithName(recordType, "groupOfRecordType")?.value || "Other";
    if (!acc[group]) acc[group] = [];
    acc[group].push(recordTypeId);
    return acc;
  }, {});
}

function groupListItem({
  groupName,
  recordTypeIds,
  recordTypePool,
  path,
  navigate,
}) {
  const groupLi = document.createElement("li");

  groupLi.appendChild(groupHeading(groupName));

  const recordTypeList = document.createElement("ul");
  recordTypeIds.forEach((recordTypeId) => {
    recordTypeList.appendChild(
      recordTypeLi({ recordTypeId, recordTypePool, path, navigate })
    );
  });
  groupLi.appendChild(recordTypeList);

  return groupLi;
}

function groupHeading(groupName) {
  const heading = document.createElement("h3");
  const formattedGroupName = groupName
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/^./, (str) => str.toUpperCase());
  heading.textContent = formattedGroupName;
  return heading;
}

function recordTypeLi({ recordTypeId, recordTypePool, path, navigate }) {
  const li = document.createElement("li");
  const a = document.createElement("a");
  const href = `/record/${recordTypeId}`;

  a.href = href;
  a.textContent = recordTypeId;

  const textId = getFirstChildWithName(recordTypePool[recordTypeId], "textId");
  getTextFromLink(textId)
    .then((text) => {
      a.textContent = text;
    })
    .catch(() => {});

  if (path.startsWith(href + "/") || path === href) {
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
  return li;
}

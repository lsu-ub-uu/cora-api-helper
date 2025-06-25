import getFirstChildWithName from "../../utils/getFirstChildWithName.js";
import getTextFromLink from "../../utils/getTextFromLink.js";

export default function navigation({
  recordTypePool,
  metadataPool,
  path,
  navigate,
}) {
  const nav = document.createElement("nav");

  const groupOfRecordTypeCollection =
    metadataPool["groupOfRecordTypeCollection"];
  const collectionItemReferences = getFirstChildWithName(
    groupOfRecordTypeCollection,
    "collectionItemReferences"
  );

  const groups = collectionItemReferences.children.map((itemRef) => {
    const itemRefId = getFirstChildWithName(itemRef, "linkedRecordId")?.value;
    return metadataPool[itemRefId];
  });

  nav.className = "main-nav";
  nav.appendChild(heading());
  nav.appendChild(groupList({ recordTypePool, path, navigate, groups }));

  return nav;
}

function heading() {
  const heading = document.createElement("h2");
  heading.textContent = "Record Types";
  return heading;
}

function groupList({ recordTypePool, path, navigate, groups }) {
  const ul = document.createElement("ul");

  groups.forEach((group) => {
    ul.appendChild(
      groupListItem({
        group,
        recordTypePool,
        path,
        navigate,
      })
    );
  });

  return ul;
}

function groupListItem({ group, recordTypePool, path, navigate }) {
  const recordTypeIds = Object.keys(recordTypePool).filter((recordTypeId) => {
    const recordType = recordTypePool[recordTypeId];
    const groupOfRecordType = getFirstChildWithName(
      recordType,
      "groupOfRecordType"
    )?.value;

    const groupName = getFirstChildWithName(group, "nameInData")?.value;

    return groupOfRecordType === groupName;
  });

  if (recordTypeIds.length === 0) return document.createDocumentFragment();

  const groupLi = document.createElement("li");
  groupLi.appendChild(groupHeading(group));

  const recordTypeList = document.createElement("ul");
  recordTypeIds.forEach((recordTypeId) => {
    recordTypeList.appendChild(
      recordTypeLi({ recordTypeId, recordTypePool, path, navigate })
    );
  });
  groupLi.appendChild(recordTypeList);

  return groupLi;
}

function groupHeading(group) {
  const heading = document.createElement("h3");

  const nameInData = getFirstChildWithName(group, "nameInData")?.value;
  heading.textContent = nameInData;

  const textId = getFirstChildWithName(group, "textId");
  getTextFromLink(textId).then((text) => {
    heading.textContent = text;
  });

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

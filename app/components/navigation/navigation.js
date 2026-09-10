import { el } from "../../utils/el.js";
import getFirstChildWithName from "../../utils/getFirstChildWithName.js";
import getTextFromLink from "../../utils/getTextFromLink.js";
import { getBasePath } from "../../utils/routing.js";
import t from "../../utils/t.js";

export default function navigation({
  recordTypePool,
  metadataPool,
  path,
  navigate,
}) {
  const groupOfRecordTypeCollection =
    metadataPool["groupOfRecordTypeCollection"];
  const collectionItemReferences = getFirstChildWithName(
    groupOfRecordTypeCollection,
    "collectionItemReferences",
  );

  const groups = collectionItemReferences.children.map((itemRef) => {
    const itemRefId = getFirstChildWithName(itemRef, "linkedRecordId")?.value;
    return metadataPool[itemRefId];
  });

  return el("nav", {
    className: "main-nav",
    children: [
      authenticationLink({ path, navigate }),
      recordTypesNav({ recordTypePool, path, navigate, groups }),
    ],
  });
}

function authenticationLink({ path, navigate }) {
  const basePath = getBasePath();
  const href = `${basePath}/authentication`;

  return el("h2", {
    className: "main-nav-item",
    children: el("a", {
      href,
      textContent: t("apiHelper_authenticationText"),
      "aria-current":
        path.startsWith(href + "/") || path === href ? "page" : null,
      onClick: (e) => {
        e.preventDefault();
        const url = href + window.location.search;
        history.pushState({}, "", url);
        navigate();
      },
    }),
  });
}

function recordTypesNav({ recordTypePool, path, navigate, groups }) {
  return el("div", {
    className: "main-nav-item",
    children: [
      el("h2", { textContent: t("apiHelper_recordTypesText") }),
      groupList({ recordTypePool, path, navigate, groups }),
    ],
  });
}

function groupList({ recordTypePool, path, navigate, groups }) {
  return el("ul", {
    children: groups.map((group) =>
      groupListItem({
        group,
        recordTypePool,
        path,
        navigate,
      }),
    ),
  });
}

function groupListItem({ group, recordTypePool, path, navigate }) {
  const recordTypeIds = Object.keys(recordTypePool).filter((recordTypeId) => {
    const recordType = recordTypePool[recordTypeId];
    const groupOfRecordType = getFirstChildWithName(
      recordType,
      "groupOfRecordType",
    )?.value;

    const groupName = getFirstChildWithName(group, "nameInData")?.value;

    return groupOfRecordType === groupName;
  });

  if (recordTypeIds.length === 0) return el("fragment");

  return el("li", {
    children: [
      groupHeading(group),
      el("ul", {
        children: recordTypeIds.map((recordTypeId) =>
          recordTypeLi({ recordTypeId, recordTypePool, path, navigate }),
        ),
      }),
    ],
  });
}
function groupHeading(group) {
  const nameInData = getFirstChildWithName(group, "nameInData")?.value;
  const heading = el("h3", { textContent: nameInData });

  const textId = getFirstChildWithName(group, "textId");
  getTextFromLink(textId).then((text) => {
    heading.textContent = text;
  });

  return heading;
}

function recordTypeLi({ recordTypeId, recordTypePool, path, navigate }) {
  const basePath = getBasePath();
  const href = `${basePath}/recordType/${recordTypeId}`;
  const isCurrentPage = path.startsWith(href + "/") || path === href;
  const textId = getFirstChildWithName(recordTypePool[recordTypeId], "textId");

  const a = el("a", {
    href,
    textContent: recordTypeId,
    ...(isCurrentPage ? { "aria-current": "page" } : {}),
    onClick: (e) => {
      e.preventDefault();
      const url = href + window.location.search;
      history.pushState({}, "", url);
      navigate();
    },
  });

  getTextFromLink(textId)
    .then((text) => {
      a.textContent = text;
    })
    .catch(() => {});

  return el("li", {
    children: a,
  });
}

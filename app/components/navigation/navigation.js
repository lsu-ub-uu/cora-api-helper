import { el } from "../../utils/el.js";
import { getFirstChildWithName } from "../../utils/coraDataUtils.js";
import getTextFromLink from "../../services/getTextFromLink.js";
import { getBasePath } from "../../utils/routing.js";
import t from "../../utils/t.js";
import collapsibleSection from "../collapsibleSection/collapsibleSection.js";

const sectionExpanded = {};

export default function navigation({
  recordTypePool,
  metadataPool,
  systemPool,
  path,
  navigate,
}) {
  return el("nav", {
    className: "main-nav",
    children: [
      authenticationLink({ path, navigate }),
      ...recordTypesByDataDivider(recordTypePool).map(
        ([dataDivider, dividedRecordTypePool]) =>
          recordTypesNav({
            recordTypePool: dividedRecordTypePool,
            dataDivider,
            path,
            navigate,
            metadataPool,
            systemPool,
          }),
      ),
    ],
  });
}

function recordTypesByDataDivider(recordTypePool) {
  const recordTypesByDivider = new Map();

  Object.entries(recordTypePool).forEach(([recordTypeId, recordType]) => {
    const dataDivider = getDataDivider(recordType);
    const dividedRecordTypePool = recordTypesByDivider.get(dataDivider) ?? {};
    dividedRecordTypePool[recordTypeId] = recordType;
    recordTypesByDivider.set(dataDivider, dividedRecordTypePool);
  });

  return [...recordTypesByDivider.entries()].sort(
    ([firstDivider], [secondDivider]) => {
      if (firstDivider === secondDivider) return 0;
      if (firstDivider === "cora") return 1;
      if (secondDivider === "cora") return -1;
      return 0;
    },
  );
}

function getDataDivider(recordType) {
  return getFirstChildWithName(
    getFirstChildWithName(
      getFirstChildWithName(recordType, "recordInfo"),
      "dataDivider",
    ),
    "linkedRecordId",
  ).value;
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

function recordTypesNav({
  recordTypePool,
  dataDivider,
  path,
  navigate,
  metadataPool,
  systemPool,
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

  sectionExpanded[dataDivider] =
    sectionExpanded[dataDivider] ?? dataDivider !== "cora";

  return collapsibleSection({
    title: `${dataDivider.toUpperCase()}`,
    headingLevel: 2,
    className: "main-nav-item",
    children: groupList({ recordTypePool, path, navigate, groups }),
    defaultExpanded: sectionExpanded[dataDivider],
    onToggle: (expanded) => {
      sectionExpanded[dataDivider] = expanded;
    },
    titlePromise: getTextFromLink(
      getFirstChildWithName(systemPool[dataDivider], "textId"),
    ),
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
  const recordType = recordTypePool[recordTypeId];
  const textId = getFirstChildWithName(recordType, "textId");

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

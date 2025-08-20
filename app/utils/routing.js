export function getRecordTypeId() {
  const pathParts = window.location.pathname.split("/");
  const recordTypeIndex = pathParts.indexOf("recordType");
  const recordTypeId = pathParts[recordTypeIndex + 1];

  return recordTypeId;
}

export function getBasePath() {
  const pathParts = window.location.pathname.split("/").filter(Boolean);
  const recordTypeIndex = pathParts.indexOf("recordType");

  if (recordTypeIndex === 0) {
    return "";
  }

  if (recordTypeIndex > 0) {
    return `/${pathParts[recordTypeIndex - 1]}`;
  }

  if (pathParts.length > 0) {
    return `/${pathParts[0]}`;
  }

  return "";
}

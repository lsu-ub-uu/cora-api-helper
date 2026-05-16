const ROUTES = ["recordType", "authentication"];

export function getRecordTypeId() {
  const pathParts = window.location.pathname.split("/");
  const recordTypeIndex = pathParts.indexOf("recordType");
  const recordTypeId = pathParts[recordTypeIndex + 1];

  return recordTypeId;
}

export function getBasePath() {
  const pathParts = window.location.pathname.split("/").filter(Boolean);
  const routeIndex = findRouteIndex(pathParts);

  if (routeIndex === 0) {
    return "";
  }

  if (routeIndex > 0) {
    return `/${pathParts[routeIndex - 1]}`;
  }

  if (pathParts.length > 0) {
    return `/${pathParts[0]}`;
  }

  return "";
}

export function getCurrentRoute() {
  const pathParts = window.location.pathname.split("/").filter(Boolean);
  return ROUTES.find((route) => pathParts.includes(route));
}

function findRouteIndex(pathParts) {
  for (const route of ROUTES) {
    const index = pathParts.indexOf(route);
    if (index !== -1) return index;
  }
  return -1;
}

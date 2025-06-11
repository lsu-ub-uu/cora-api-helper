export function getValidationType() {
  return getSearchParamValue("validationType", "default");
}

export function getMethod() {
  return getSearchParamValue("method", "create");
}

export function getApiUrl() {
  return getSearchParamValue("api-url", "https://cora.epc.ub.uu.se/diva/rest");
}

export function getFormat() {
  return getSearchParamValue("format", "xml");
}

function getSearchParamValue(paramName, defaultValue) {
  const searchParams = new URLSearchParams(window.location.search);
  return searchParams.get(paramName) || defaultValue;
}

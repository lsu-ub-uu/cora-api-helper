export function getValidationType() {
  return getSearchParamValue("validationTypeId");
}

export function getSearchId() {
  return getSearchParamValue("searchId");
}

export function getMethod() {
  return getSearchParamValue("method", "create");
}

export function getApiUrl() {
  return getSearchParamValue("api-url", `${window.location.origin}/rest`);
}

export function getFormat() {
  return getSearchParamValue("format", "xml");
}

export function getLanguage() {
  return getSearchParamValue("lang", "en");
}

function getSearchParamValue(paramName, defaultValue) {
  const searchParams = new URLSearchParams(window.location.search);
  return searchParams.get(paramName) || defaultValue;
}

export function updateSearchParam(paramName, value) {
  const url = new URL(window.location);
  url.searchParams.set(paramName, value);
  window.history.replaceState({}, "", url);
}

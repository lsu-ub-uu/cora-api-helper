export const API_URLS = [
  "https://cora.epc.ub.uu.se/diva/rest",
  "https://cora.epc.ub.uu.se/alvin/rest",
  "https://cora.epc.ub.uu.se/systemone/rest",
  "https://pre.diva-portal.org/rest",
];

export function getValidationType() {
  return getSearchParamValue("validationTypeId");
}

export function getMethod() {
  return getSearchParamValue("method", "create");
}

export function getApiUrl() {
  const hostname = window.location.hostname;
  const matchingUrl = API_URLS.find((url) => url.includes(hostname));
  return getSearchParamValue(
    "api-url",
    matchingUrl ?? "https://cora.epc.ub.uu.se/diva/rest"
  );
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

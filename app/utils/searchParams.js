export const API_URLS = [
  "https://preview.diva.cora.epc.ub.uu.se/rest",
  "https://preview.alvin.cora.epc.ub.uu.se/rest",
  "https://preview.systemone.cora.epc.ub.uu.se/rest",
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
    matchingUrl ?? "https://preview.diva.cora.epc.ub.uu.se/rest",
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

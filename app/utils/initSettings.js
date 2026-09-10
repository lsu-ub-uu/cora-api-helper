import t from "./t.js";

export default function initSettings() {
  // Set header labels using translations
  document.getElementById("app-name").textContent = t("apiHelper_appNameText");
  document.getElementById("format-label").textContent = t(
    "apiHelper_formatText",
  );
  document.getElementById("lang-label").textContent = t(
    "apiHelper_languageText",
  );
  document.getElementById("xml-option").textContent = t("apiHelper_xmlText");
  document.getElementById("json-option").textContent = t("apiHelper_jsonText");
  document.getElementById("en-option").textContent = t("apiHelper_englishText");
  document.getElementById("sv-option").textContent = t("apiHelper_swedishText");

  const params = new URLSearchParams(window.location.search);
  if (window.location.hostname === "localhost" && !params.get("api-url")) {
    setDefaultApiUrlForLocalhost(params);
  }
  const format = params.get("format") ?? "xml";
  document.getElementById("format").value = format;

  const lang = params.get("lang") ?? "en";
  document.getElementById("lang").value = lang;

  document.getElementById("load-form").addEventListener("change", (event) => {
    event.currentTarget.submit();
  });
}

function setDefaultApiUrlForLocalhost(params) {
  params.set("api-url", `https://preview.diva.cora.epc.ub.uu.se/rest`);
  window.history.replaceState(
    {},
    "",
    `${window.location.pathname}?${params.toString()}`,
  );
}

export default function initSettings() {
  // Set header labels using translations
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

export const getTranslations = () => ({
  welcome: {
    en: "Welcome to the API helper!",
    sv: "Välkommen till API helpern",
  },
  info: {
    en: "This tool helps you explore the Cora REST API.\n\nSelect a record type from the navigation to the left to begin. ⬅️\n\nYou can set your preferred data format and language in the settings at the top right. ↗️",
    sv: "Det här verktyget hjälper dig att utforska Cora REST API.\n\nVälj en posttyp i navigeringen till vänster för att börja. ⬅️\n\nDu kan ange ditt föredragna dataformat och språk i inställningarna uppe till höger. ↗️",
  },
  format: { en: "Format", sv: "Format" },
  language: { en: "Language", sv: "Språk" },
  authentication: { en: "Authentication", sv: "Autentisering" },
  welcomeDescription: {
    en: "This tool helps you explore the Cora REST API.",
    sv: "Det här verktyget hjälper dig att utforska Cora REST API.",
  },
  welcomeNavigation: {
    en: "Select a record type from the navigation to the left to begin. ⬅️",
    sv: "Välj en posttyp i navigeringen till vänster för att börja. ⬅️",
  },
  welcomeSettings: {
    en: "You can set your preferred data format, language and API URL in the settings at the top right. ↗️",
    sv: "Du kan ange ditt föredragna dataformat, språk och API-URL i inställningarna uppe till höger. ↗️",
  },
  authenticationIntro: {
    en: "The Cora API is publicly accessible, but requires authentication for administrative actions like creating or updating records, or reading restricted data.",
    sv: "Cora API är offentligt tillgängligt, men kräver autentisering för administrativa åtgärder som att skapa eller uppdatera poster eller läsa begränsad data.",
  },
  authenticationTokenInstruction: {
    en: "To authenticate API requests, you need to obtain an auth token and pass it in the 'Authtoken' header of your requests.",
    sv: "För att autentisera API-anrop måste du skaffa en autentiseringstoken och skicka den i headern 'Authtoken' i dina anrop.",
  },
  authenticationTokenInfo: {
    en: "An auth token can be obtained by logging in using an App Token connected to your user or by using your username and password. The auth token is valid for a short time (typically around 10 minutes) and can be used for all API requests during that time. The response of a successful login request contains an actionLink that can be used to renew the auth token before it expires.",
    sv: "En autentiseringstoken kan erhållas genom att logga in med en app-token kopplad till din användare eller genom att använda ditt användarnamn och lösenord. Autentiseringstoken är giltig en kort tid (vanligtvis cirka 10 minuter) och kan användas för alla API-anrop under den tiden. Svaret från en lyckad inloggningsförfrågan innehåller en actionLink som kan användas för att förnya autentiseringstoken innan det upphör att gälla.",
  },
  authenticationAppToken: {
    en: "Log in with App Token",
    sv: "Logga in med app-token",
  },
  requestBody: { en: "Request body", sv: "Request-body" },
  response: { en: "Response", sv: "Svar" },
  recordTypes: { en: "Record Types", sv: "Posttyper" },
  legend: { en: "Legend", sv: "Teckenförklaring" },
  repeat: {
    en: "Repeat (min - max)",
    sv: "Upprepning (min - max)",
  },
  repeatTitle: {
    en: "Specifies the min and max times this element can be repeated. X means unlimited.",
    sv: "Anger hur många gånger detta element kan upprepas. X betyder obegränsat.",
  },
  finalValue: { en: "Final value", sv: "Slutvärde" },
  finalValueTitle: {
    en: "Value must be set to the final value",
    sv: "Värdet måste vara satt till slutvärdet",
  },
  regex: { en: " value (RegEx)", sv: "värde (RegEx)" },
  regexTitle: {
    en: "Value must match regular expression",
    sv: "Värdet måste matcha reguljära uttrycket",
  },
  numberValue: {
    en: "Number value (min - max)",
    sv: "Numeriskt värde (min - max)",
  },
  numberValueTitle: {
    en: "Value must be a number within range",
    sv: "Värdet måste vara ett nummer inom intervallet",
  },
  collectionValue: {
    en: "Collection value",
    sv: "Samlingsvärde",
  },
  collectionValueTitle: {
    en: "Value must be one of the listed values",
    sv: "Värdet måste vara ett av de angivna värdena",
  },
  recordId: { en: "Record ID", sv: "Post-ID" },
  recordIdTitle: {
    en: "Set to the ID of linked record",
    sv: "Sätt till ID för länkad post",
  },
  permissionControlled: {
    en: "The field is permission controlled. Only certain users may read and/or write this field",
    sv: "Fältet är rättighetsstyrt. Endast vissa användare får läsa och/eller skriva i fältet",
  },
  permissionControlledTitle: {
    en: "Permission controlled",
    sv: "Rättighetsstyrt",
  },
  selectRequestMethod: {
    en: "Select operation",
    sv: "Välj operation",
  },
  requestConfig: {
    en: "Request config",
    sv: "Begäranskonfiguration",
  },
  requestBodyFormat: {
    en: "Request body format",
    sv: "Format för request-body",
  },
  responseBodyFormat: {
    en: "Response body format",
    sv: "Format för svarsbody",
  },
  searchDataFormat: {
    en: "Search data format",
    sv: "Format för sökdata",
  },
  selectSearch: { en: "Select search: ", sv: "Välj sökning: " },
  get: { en: "GET", sv: "GET" },
  searchDataPlaceholder: {
    en: "<search data (see below)>",
    sv: "<sökdata (se nedan)>",
  },
  authToken: {
    en: "AuthToken: xxxx-xxxx-xxxx-xxxx",
    sv: "AuthToken: xxxx-xxxx-xxxx-xxxx",
  },
  selectValidationType: {
    en: "Select validation type: ",
    sv: "Välj valideringstyp: ",
  },
  httpHeaderContentTypeLogin: {
    en: "Content-Type: Content-Type: application/vnd.cora.login",
    sv: "Content-Type: Content-Type: application/vnd.cora.login",
  },
  httpHeaderAcceptAuthentication: {
    en: "Accept: application/vnd.cora.authentication+json",
    sv: "Accept: application/vnd.cora.authentication+json",
  },
  httpHeaderAcceptRecord: {
    en: "Accept: application/vnd.cora.record+",
    sv: "Accept: application/vnd.cora.record+",
  },
  httpHeaderContentTypeRecordGroup: {
    en: "Content-Type: application/vnd.cora.recordGroup+",
    sv: "Content-Type: application/vnd.cora.recordGroup+",
  },
  httpHeaderAcceptRecordList: {
    en: "Accept: application/vnd.cora.recordList+",
    sv: "Accept: application/vnd.cora.recordList+",
  },
  xml: { en: "XML", sv: "XML" },
  json: { en: "JSON", sv: "JSON" },
  english: { en: "English", sv: "Engelska" },
  swedish: { en: "Swedish", sv: "Svenska" },
  read: { en: "Read", sv: "Läs" },
  list: { en: "List", sv: "Lista" },
  create: { en: "Create", sv: "Skapa" },
  update: { en: "Update", sv: "Uppdatera" },
  delete: { en: "Delete", sv: "Ta bort" },
  search: { en: "Search", sv: "Sök" },
  post: { en: "POST", sv: "POST" },
  expandElement: {
    en: "Expand element",
    sv: "Expandera element",
  },
  collapseElement: { en: "Collapse element", sv: "Dölj element" },
  loadingMetadata: {
    en: "Loading metadata, please wait...",
    sv: "Laddar metadata, vänta...",
  },
  maxDepthExceeded: {
    en: "<<MAX DEPTH EXCEEDED>>",
    sv: "<<MAX DJUP ÖVERSKRIDEN>>",
  },
  navigation: { en: "Navigation", sv: "Navigering" },
});

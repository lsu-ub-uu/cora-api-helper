export const getTranslations = () => ({
  apiHelper_welcomeText: {
    en: "Welcome to the API helper!",
    sv: "Välkommen till API helpern",
  },
  apiHelper_infoText: {
    en: "This tool helps you explore the Cora REST API.\n\nSelect a record type from the navigation to the left to begin. ⬅️\n\nYou can set your preferred data format and language in the settings at the top right. ↗️",
    sv: "Det här verktyget hjälper dig att utforska Cora REST API.\n\nVälj en posttyp i navigeringen till vänster för att börja. ⬅️\n\nDu kan ange ditt föredragna dataformat och språk i inställningarna uppe till höger. ↗️",
  },
  apiHelper_formatText: { en: "Format", sv: "Format" },
  apiHelper_languageText: { en: "Language", sv: "Språk" },
  apiHelper_authenticationText: { en: "Authentication", sv: "Autentisering" },
  apiHelper_systemNameText: { en: "Cora", sv: "Cora" },
  apiHelper_appNameText: { en: "API Helper", sv: "API Helper" },
  apiHelper_welcomeDescriptionText: {
    en: "This tool helps you explore the Cora REST API.",
    sv: "Det här verktyget hjälper dig att utforska Cora REST API.",
  },
  apiHelper_welcomeNavigationText: {
    en: "Select a record type from the navigation to the left to begin. ⬅️",
    sv: "Välj en posttyp i navigeringen till vänster för att börja. ⬅️",
  },
  apiHelper_welcomeSettingsText: {
    en: "You can set your preferred data format, language and API URL in the settings at the top right. ↗️",
    sv: "Du kan ange ditt föredragna dataformat, språk och API-URL i inställningarna uppe till höger. ↗️",
  },
  apiHelper_authenticationIntroText: {
    en: "The Cora API is publicly accessible, but requires authentication for administrative actions like creating or updating records, or reading restricted data.",
    sv: "Cora API är offentligt tillgängligt, men kräver autentisering för administrativa åtgärder som att skapa eller uppdatera poster eller läsa begränsad data.",
  },
  apiHelper_authenticationTokenInstructionText: {
    en: "To authenticate API requests, you need to obtain an auth token and pass it in the 'Authtoken' header of your requests.",
    sv: "För att autentisera API-anrop måste du skaffa en autentiseringstoken och skicka den i headern 'Authtoken' i dina anrop.",
  },
  apiHelper_authenticationTokenInfoText: {
    en: "An auth token can be obtained by logging in using an App Token connected to your user or by using your username and password. The auth token is valid for a short time (typically around 10 minutes) and can be used for all API requests during that time. The response of a successful login request contains an actionLink that can be used to renew the auth token before it expires.",
    sv: "En autentiseringstoken kan erhållas genom att logga in med en app-token kopplad till din användare eller genom att använda ditt användarnamn och lösenord. Autentiseringstoken är giltig en kort tid (vanligtvis cirka 10 minuter) och kan användas för alla API-anrop under den tiden. Svaret från en lyckad inloggningsförfrågan innehåller en actionLink som kan användas för att förnya autentiseringstoken innan det upphör att gälla.",
  },
  apiHelper_authenticationAppTokenText: {
    en: "Log in with App Token",
    sv: "Logga in med app-token",
  },
  apiHelper_requestBodyText: { en: "Request body", sv: "Request-body" },
  apiHelper_responseText: { en: "Response", sv: "Svar" },
  apiHelper_recordTypesText: { en: "Record Types", sv: "Posttyper" },
  apiHelper_legendText: { en: "Legend", sv: "Teckenförklaring" },
  apiHelper_repeatText: {
    en: "Repeat (min - max)",
    sv: "Upprepning (min - max)",
  },
  apiHelper_repeatTitleText: {
    en: "Specifies the min and max times this element can be repeated. X means unlimited.",
    sv: "Anger hur många gånger detta element kan upprepas. X betyder obegränsat.",
  },
  apiHelper_finalValueText: { en: "Final value", sv: "Slutvärde" },
  apiHelper_finalValueTitleText: {
    en: "Value must be set to the final value",
    sv: "Värdet måste vara satt till slutvärdet",
  },
  apiHelper_regexText: { en: "Text value (RegEx)", sv: "Textvärde (RegEx)" },
  apiHelper_regexTitleText: {
    en: "Value must match regular expression",
    sv: "Värdet måste matcha reguljära uttrycket",
  },
  apiHelper_numberValueText: {
    en: "Number value (min - max)",
    sv: "Numeriskt värde (min - max)",
  },
  apiHelper_numberValueTitleText: {
    en: "Value must be a number within range",
    sv: "Värdet måste vara ett nummer inom intervallet",
  },
  apiHelper_collectionValueText: {
    en: "Collection value",
    sv: "Samlingsvärde",
  },
  apiHelper_collectionValueTitleText: {
    en: "Value must be one of the listed values",
    sv: "Värdet måste vara ett av de angivna värdena",
  },
  apiHelper_recordIdText: { en: "Record ID", sv: "Post-ID" },
  apiHelper_recordIdTitleText: {
    en: "Set to the ID of linked record",
    sv: "Sätt till ID för länkad post",
  },
  apiHelper_selectRequestMethodText: {
    en: "Select request method",
    sv: "Välj begäransmetod",
  },
  apiHelper_requestConfigText: {
    en: "Request config",
    sv: "Begäranskonfiguration",
  },
  apiHelper_requestBodyFormatText: {
    en: "Request body format",
    sv: "Format för request-body",
  },
  apiHelper_responseBodyFormatText: {
    en: "Response body format",
    sv: "Format för svarsbody",
  },
  apiHelper_searchDataFormatText: {
    en: "Search data format",
    sv: "Format för sökdata",
  },
  apiHelper_selectSearchText: { en: "Select search: ", sv: "Välj sökning: " },
  apiHelper_getText: { en: "GET", sv: "GET" },
  apiHelper_searchDataPlaceholderText: {
    en: "<search data (see below)>",
    sv: "<sökdata (se nedan)>",
  },
  apiHelper_authTokenText: {
    en: "AuthToken: xxxx-xxxx-xxxx-xxxx",
    sv: "AuthToken: xxxx-xxxx-xxxx-xxxx",
  },
  apiHelper_selectValidationTypeText: {
    en: "Select validation type: ",
    sv: "Välj valideringstyp: ",
  },
  apiHelper_httpHeaderContentTypeLoginText: {
    en: "Content-Type: Content-Type: application/vnd.cora.login",
    sv: "Content-Type: Content-Type: application/vnd.cora.login",
  },
  apiHelper_httpHeaderAcceptAuthenticationText: {
    en: "Accept: application/vnd.cora.authentication+json",
    sv: "Accept: application/vnd.cora.authentication+json",
  },
  apiHelper_httpHeaderAcceptRecordText: {
    en: "Accept: application/vnd.cora.record+",
    sv: "Accept: application/vnd.cora.record+",
  },
  apiHelper_httpHeaderContentTypeRecordGroupText: {
    en: "Content-Type: application/vnd.cora.recordGroup+",
    sv: "Content-Type: application/vnd.cora.recordGroup+",
  },
  apiHelper_httpHeaderAcceptRecordListText: {
    en: "Accept: application/vnd.cora.recordList+",
    sv: "Accept: application/vnd.cora.recordList+",
  },
  apiHelper_xmlText: { en: "XML", sv: "XML" },
  apiHelper_jsonText: { en: "JSON", sv: "JSON" },
  apiHelper_englishText: { en: "English", sv: "Engelska" },
  apiHelper_swedishText: { en: "Swedish", sv: "Svenska" },
  apiHelper_readText: { en: "Read", sv: "Läs" },
  apiHelper_createText: { en: "Create", sv: "Skapa" },
  apiHelper_updateText: { en: "Update", sv: "Uppdatera" },
  apiHelper_deleteText: { en: "Delete", sv: "Ta bort" },
  apiHelper_searchText: { en: "Search", sv: "Sök" },
  apiHelper_postText: { en: "POST", sv: "POST" },
  apiHelper_expandElementText: {
    en: "Expand element",
    sv: "Expandera element",
  },
  apiHelper_collapseElementText: { en: "Collapse element", sv: "Dölj element" },
  apiHelper_loadingMetadataText: {
    en: "Loading metadata, please wait...",
    sv: "Laddar metadata, vänta...",
  },
  apiHelper_maxDepthExceededText: {
    en: "<<MAX DEPTH EXCEEDED>>",
    sv: "<<MAX DJUP ÖVERSKRIDEN>>",
  },
});

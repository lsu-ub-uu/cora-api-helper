import elementXML from "./elementXML.js";
import elementJSON from "./elementJSON.js";

export default function element({
  metadataPool,
  metadata,
  repeatMin,
  repeatMax,
  children,
  lastChild = true,
}) {
  const format =
    new URLSearchParams(window.location.search).get("format") || "xml";

  if (format === "json") {
    return elementJSON({
      metadataPool,
      metadata,
      repeatMin,
      repeatMax,
      children,
      lastChild,
    });
  }
  return elementXML({
    metadataPool,
    metadata,
    repeatMin,
    repeatMax,
    children,
  });
}

import elementXML from "./elementXML.js";
import elementJSON from "./elementJSON.js";
import { getFormat } from "../../utils/searchParams.js";

export default function element({
  metadataPool,
  metadata,
  repeatMin,
  repeatMax,
  children,
  lastChild = true,
}) {
  const format = getFormat();

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

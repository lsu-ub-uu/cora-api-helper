import { getFormat } from "../../utils/searchParams.js";
import attributesJSON from "../attributes/attributesJSON.js";
import attributesXML from "../attributes/attributesXML.js";
import dataName from "../dataName/dataName.js";
import elementJSON from "./elementJSON.js";
import elementXML from "./elementXML.js";

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
      name: dataName({ metadata }),
      attributes: attributesJSON({ metadataPool, metadata }),
      repeatMin,
      repeatMax,
      children,
      lastChild,
      isRecordLink: metadata.attributes?.type === "recordLink",
    });
  }
  return elementXML({
    name: dataName({ metadata }),
    attributes: attributesXML({ metadataPool, metadata }),
    repeatMin,
    repeatMax,
    children,
  });
}

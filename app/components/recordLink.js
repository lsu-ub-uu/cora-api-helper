import getFirstChildWithName from "../utils/getFirstChildWithName.js";
import element from "./element.js";

export default function recordLink({
  metadataPool,
  metadata,
  repeatMin,
  repeatMax,
}) {
  const linkedRecordType = getFirstChildWithName(metadata, "linkedRecordType");
  const linkedRecordTypeValue = getFirstChildWithName(
    linkedRecordType,
    "linkedRecordType"
  )?.value;

  const finalValue = getFirstChildWithName(metadata, "finalValue")?.value;

  const linkedRecordId = getFirstChildWithName(
    linkedRecordType,
    "linkedRecordId"
  )?.value;

  const recordLink = document.createElement("div");
  recordLink.innerHTML = `
    <div>
        &lt;linkedRecordType&gt;<span class='final-value'>${linkedRecordTypeValue}</span>&lt;/linkedRecordType&gt;
    </div>    
    <div> 
        &lt;linkedRecordId&gt;<span class='final-value'>${
          finalValue ?? ""
        }</span>&lt;/linkedRecordId&gt;
    </div>`;
  recordLink.className = "record-link";

  return element({
    metadataPool,
    metadata,
    repeatMin,
    repeatMax,
    children: recordLink,
  });
}

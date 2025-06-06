import getFirstChildWithName from "../utils/getFirstChildWithName.js";
import element from "./element.js";

export default function recordLink({
  metadataPool,
  metadata,
  repeatMin,
  repeatMax,
}) {
  const format =
    new URLSearchParams(window.location.search).get("format") || "xml";

  const linkedRecordType = getFirstChildWithName(metadata, "linkedRecordType");
  const linkedRecordTypeValue = getFirstChildWithName(
    linkedRecordType,
    "linkedRecordType"
  )?.value;

  const finalValue = getFirstChildWithName(metadata, "finalValue")?.value;

  const recordLink = document.createElement("div");

  if (format === "json") {
    recordLink.innerHTML = `
      <div class="json-property">
      "children": [
        <div class="json-property">
        <div>{</div>
          <div class="json-property">
          "nameInData": "linkedRecordType",
          </div>
          <div class="json-property">
          "value": "<span class="final-value">${linkedRecordTypeValue}</span>"
          </div>
       <div>},</div>
        <div>{</div>
          <div class="json-property">
          "nameInData": "linkedRecordId",
          </div>
          <div class="json-property">
          "value": "<span class="final-value">${finalValue ?? ""}</span>"
          </div>
        <div>}</div>
        </div>
      ]
      </div>`;
  } else {
    recordLink.innerHTML = `
    <div>
        &lt;linkedRecordType&gt;<span class='final-value'>${linkedRecordTypeValue}</span>&lt;/linkedRecordType&gt;
    </div>    
    <div> 
        &lt;linkedRecordId&gt;<span class='final-value'>${
          finalValue ?? ""
        }</span>&lt;/linkedRecordId&gt;
    </div>`;
  }

  recordLink.className = "record-link";

  return element({
    metadataPool,
    metadata,
    repeatMin,
    repeatMax,
    children: recordLink,
  });
}

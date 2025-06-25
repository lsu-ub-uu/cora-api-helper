import getFirstChildWithName from "../../utils/getFirstChildWithName.js";
import { getFormat } from "../../utils/searchParams.js";
import element from "../element/element.js";

export default function recordLink({
  metadataPool,
  metadata,
  repeatMin,
  repeatMax,
  lastChild = true,
}) {
  const format = getFormat();
  console.log("recordLink", metadata);
  const linkedRecordType = getFirstChildWithName(metadata, "linkedRecordType");
  const linkedRecordTypeValue = getFirstChildWithName(
    linkedRecordType,
    "linkedRecordId"
  )?.value;
  const finalValue = getFirstChildWithName(metadata, "finalValue")?.value;

  const recordLink = document.createElement("div");

  if (format === "json") {
    recordLink.innerHTML = `
      <div class="indent">
      <span class="json-key">"children"</span>: [
        <div class="indent">
        <div>{</div>
          <div class="indent">
          <span class="json-key">"name"</span>: "linkedRecordType",
          </div>
          <div class="indent">
          <span class="json-key">"value"</span>: "<span class="final-value">${linkedRecordTypeValue}</span>"
          </div>
       <div>},</div>
        <div>{</div>
          <div class="indent">
          <span class="json-key">"name"</span>: "linkedRecordId",
          </div>
          <div class="indent">
          <span class="json-key">"value"</span>: "${
            finalValue
              ? "<span class='final-value'>" + finalValue + "</span>"
              : "<span class='id'>{id}</span>"
          }"
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
        &lt;linkedRecordId&gt;${
          finalValue
            ? "<span class='final-value'>" + finalValue + "</span>"
            : "<span class='id'>{id}</span>"
        }&lt;/linkedRecordId&gt;
    </div>`;
  }

  recordLink.className = "record-link";

  return element({
    metadataPool,
    metadata,
    repeatMin,
    repeatMax,
    children: recordLink,
    lastChild,
  });
}

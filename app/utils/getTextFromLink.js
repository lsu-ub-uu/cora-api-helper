import getFirstChildWithName from "./getFirstChildWithName.js";

export default async function getTextFromLink(textLink) {
  const textData = await fetch(textLink.actionLinks.read.url, {
    headers: { accept: textLink.actionLinks.read.accept },
  });
  const json = await textData.json();
  const english = json.record.data.children.find(
    (child) => child.name === "textPart" && child.attributes.lang === "en"
  );
  return getFirstChildWithName(english, "text")?.value;
}

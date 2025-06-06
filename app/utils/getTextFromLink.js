import getFirstChildWithName from "./getFirstChildWithName.js";

const textCache = new Map();

export default async function getTextFromLink(textLink) {
  const cacheKey = textLink.actionLinks.read.url;
  if (textCache.has(cacheKey)) {
    return textCache.get(cacheKey);
  }

  const textData = await fetch(textLink.actionLinks.read.url, {
    headers: { accept: textLink.actionLinks.read.accept },
  });
  const json = await textData.json();
  const english = json.record.data.children.find(
    (child) => child.name === "textPart" && child.attributes.lang === "en"
  );
  const value = getFirstChildWithName(english, "text")?.value;
  textCache.set(cacheKey, value);
  return value;
}

import getFirstChildWithName from "./getFirstChildWithName.js";
import { getLanguage } from "./searchParams.js";

const textCache = new Map();

export default async function getTextFromLink(textLink) {
  const language = getLanguage();
  const cacheKey = textLink.actionLinks.read.url;
  if (textCache.has(cacheKey)) {
    return textCache.get(cacheKey);
  }

  const textData = await fetch(textLink.actionLinks.read.url, {
    headers: { accept: textLink.actionLinks.read.accept },
  });

  const json = await textData.json();
  const textPart = json.record.data.children.find(
    (child) => child.name === "textPart" && child.attributes.lang === language
  );
  const value = getFirstChildWithName(textPart, "text")?.value;
  textCache.set(cacheKey, value);
  return value;
}

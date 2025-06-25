import getFirstChildWithName from "./getFirstChildWithName.js";
import { getLanguage } from "./searchParams.js";

const textCache = new Map();

export default async function getTextFromLink(textLink) {
  const language = getLanguage();
  const readUrl = textLink?.actionLinks?.read?.url;

  if (!readUrl) {
    return "";
  }

  if (textCache.has(readUrl)) {
    return textCache.get(readUrl);
  }

  const textData = await fetch(readUrl, {
    headers: { accept: textLink.actionLinks.read.accept },
  });

  const json = await textData.json();
  const textPart = json.record.data.children.find(
    (child) => child.name === "textPart" && child.attributes.lang === language
  );
  const value = getFirstChildWithName(textPart, "text")?.value;
  textCache.set(readUrl, value);
  return value;
}

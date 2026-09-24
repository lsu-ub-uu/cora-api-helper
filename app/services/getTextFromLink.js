import { getFirstChildWithName } from "../utils/coraDataUtils.js";
import { getLanguage } from "../utils/searchParams.js";

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

  try {
    const response = await fetch(readUrl, {
      headers: { accept: textLink.actionLinks.read.accept },
      cache: "force-cache",
    });

    if (response.ok === false) {
      return "";
    }

    const json = await response.json();
    const textPart = json.record.data.children.find(
      (child) =>
        child.name === "textPart" && child.attributes.lang === language,
    );
    const value = getFirstChildWithName(textPart, "text")?.value ?? "";
    textCache.set(readUrl, value);
    return value;
  } catch {
    return "";
  }
}

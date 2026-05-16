export function normalize(text) {
  return text
    .split(/\s+/)
    .filter((word) => word.length > 0)
    .join(" ");
}

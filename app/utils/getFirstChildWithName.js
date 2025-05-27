export default function getFirstChildWithName(record, name) {
  if (!record.children) {
    return undefined;
  }
  return record.children.find((child) => child.name === name);
}

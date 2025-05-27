export default function getAllChildrenWithName(record, name) {
  return record.children.filter((child) => child.name === name);
}

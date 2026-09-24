export function getFirstChildWithName(record, name) {
  if (!record.children) {
    return undefined;
  }
  return record.children.find((child) => child.name === name);
}

export function getAllChildrenWithName(record, name) {
  if (!record.children) {
    return [];
  }
  return record.children.filter((child) => child.name === name);
}

export function getFirstChildWithNameAndAttributes(record, name, attributes) {
  if (!record.children) {
    return undefined;
  }
  return record.children.find(
    (child) =>
      child.name === name &&
      Object.entries(attributes).every(
        ([key, value]) => child.attributes && child.attributes[key] === value,
      ),
  );
}

export function getAllChildrenWithNameAndAttributes(record, name, attributes) {
  if (!record.children) {
    return [];
  }
  return record.children.filter(
    (child) =>
      child.name === name &&
      Object.entries(attributes).every(
        ([key, value]) => child.attributes && child.attributes[key] === value,
      ),
  );
}

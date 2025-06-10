export default function xpath(xmlDoc, xpath) {
  const result = xmlDoc.evaluate(
    xpath,
    xmlDoc,
    null,
    XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
    null
  );
  const count = result.snapshotLength;
  if (count === 0) {
    return null;
  } else if (count === 1) {
    return result.snapshotItem(0).textContent.trim();
  } else {
    const nodes = [];
    for (let i = 0; i < count; i++) {
      nodes.push(result.snapshotItem(i).textContent.trim());
    }
    return nodes;
  }
}

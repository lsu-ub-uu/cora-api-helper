export default function updateDocumentTitle(newTitle) {
  if (newTitle) {
    document.title = `${newTitle} | ${document.title.split(" | ").pop()}`;
  } else {
    document.title = document.title.split(" | ").pop();
  }
}

export default function multiplicity({ repeatMin, repeatMax }) {
  if (!repeatMin || !repeatMax) return null;
  const multiplicitySpan = document.createElement("span");
  multiplicitySpan.className = "multiplicity";
  multiplicitySpan.textContent = `(${repeatMin} - ${repeatMax})`;
  return multiplicitySpan;
}

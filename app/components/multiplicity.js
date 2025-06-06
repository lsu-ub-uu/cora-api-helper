export default function multiplicity({ repeatMin, repeatMax }) {
  const multiplicitySpan = document.createElement("span");
  multiplicitySpan.className = "multiplicity";
  multiplicitySpan.textContent = `(${repeatMin} - ${repeatMax})`;
  return multiplicitySpan;
}

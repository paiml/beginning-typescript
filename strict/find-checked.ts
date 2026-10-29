// Finds the first name that starts with some letters, or null if none does.
function findName(names: string[], start: string): string | null {
  return names.find((name) => name.startsWith(start)) ?? null;
}
const found = findName(["Ada", "Linus"], "Gr");
if (found === null) {
  console.log("no name found");
} else {
  console.log(found.toUpperCase());
}

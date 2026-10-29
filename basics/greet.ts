// Builds the greeting text for a name.
function greeting(name: string): string {
  return `Hello, ${name}!`;
}

const names: string[] = ["Ada", "Linus"];
console.log(greeting());
console.log(greeting(names));

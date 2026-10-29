// Prints a greeting for each name.
import { greeting } from "./greeting.js";

const names: string[] = ["Ada", "Linus"];
for (const name of names) {
  console.log(greeting(name));
}

# A typed unit converter

Converts a value from one unit to another: kilometres and miles,
Celsius and Fahrenheit, kilograms and pounds.

- src/units.ts    the units it knows, as a type
- src/convert.ts  convert(value, from, to), one rule per pair
- src/main.ts     prints three conversions

Done when:

1. npx tsc -p converter builds it with strict on, no errors.
2. node converter/dist/main.js prints the three conversions.
3. A unit that doesn't exist is a compile error.
4. A pair with no rule throws an error when it runs.

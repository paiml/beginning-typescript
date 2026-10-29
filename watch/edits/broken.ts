export function greet(name: string): string {
  return `Hello, ${name}!`;
}

export const greeting: string = greet(42);

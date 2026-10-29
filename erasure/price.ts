// Adds tax to a price.
type Price = { label: string; amount: number };

function withTax(price: Price, rate: number): number {
  return price.amount * (1 + rate);
}

const coffee: Price = { label: "coffee", amount: 4 };
console.log(coffee.label, withTax(coffee, 0.25));

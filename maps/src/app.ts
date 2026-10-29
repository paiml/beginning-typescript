// Checks an order before it is shipped, and stops on an empty one.
type Order = { id: number; quantity: number };

function check(order: Order): Order {
  if (order.quantity <= 0) {
    throw new Error(`order ${order.id} has no items`);
  }
  return order;
}

check({ id: 7, quantity: 0 });

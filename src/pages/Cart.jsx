import { Link } from "react-router-dom";
import useCartStore from "../store/cartStore";

function Cart() {
  const items = useCartStore((state) => state.items);
  const remove = useCartStore((state) => state.remove);
  const clear = useCartStore((state) => state.clear);

  function increaseQuantity(id) {
    const item = items.find((item) => item.id === id);

    if (item) {
      useCartStore.getState().addItem(item);
    }
  }

  function decreaseQuantity(id) {
    const item = items.find((item) => item.id === id);

    if (!item) {
      return;
    }

    if (item.quantity === 1) {
      remove(id);
      return;
    }

    useCartStore.setState((state) => ({
      items: state.items.map((cartItem) =>
        cartItem.id === id
          ? {
              ...cartItem,
              quantity: cartItem.quantity - 1,
            }
          : cartItem
      ),
    }));
  }

  const total = items.reduce(
    (sum, item) =>
      sum + item.price * item.quantity,
    0
  );

  if (items.length === 0) {
    return (
      <div>
        <h1>Your Cart</h1>

        <p>Your cart is empty.</p>

        <Link to="/menu">
          Browse Ethiopian Food
        </Link>
      </div>
    );
  }

  return (
    <div>
      <h1>🛒 Your Cart</h1>

      {items.map((item) => (
        <div key={item.id}>
          <img
            src={item.image}
            alt={item.name}
            width="150"
          />

          <h2>{item.name}</h2>

          <p>
            Price: {item.price} ETB
          </p>

          <p>
            Quantity: {item.quantity}
          </p>

          <button
            onClick={() =>
              decreaseQuantity(item.id)
            }
          >
            -
          </button>

          <button
            onClick={() =>
              increaseQuantity(item.id)
            }
          >
            +
          </button>

          <button
            onClick={() => remove(item.id)}
          >
            Remove
          </button>

          <p>
            Subtotal:{" "}
            {item.price * item.quantity} ETB
          </p>

          <hr />
        </div>
      ))}

      <h2>
        Total: {total} ETB
      </h2>

      <button onClick={clear}>
        Clear Cart
      </button>

      <br />
      <br />

      <Link to="/menu">
        Continue Shopping
      </Link>

      <br />
      <br />

      <Link to="/checkout">
        Go to Checkout
      </Link>
    </div>
  );
}

export default Cart;
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Cart() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const savedCart = localStorage.getItem("addisEatsCart");

    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  function updateCart(updatedCart) {
    setCart(updatedCart);

    localStorage.setItem(
      "addisEatsCart",
      JSON.stringify(updatedCart)
    );
  }

  function increaseQuantity(id) {
    const updatedCart = cart.map((item) =>
      item.id === id
        ? {
            ...item,
            quantity: item.quantity + 1,
          }
        : item
    );

    updateCart(updatedCart);
  }

  function decreaseQuantity(id) {
    const updatedCart = cart
      .map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: item.quantity - 1,
            }
          : item
      )
      .filter((item) => item.quantity > 0);

    updateCart(updatedCart);
  }

  function removeItem(id) {
    const updatedCart = cart.filter(
      (item) => item.id !== id
    );

    updateCart(updatedCart);
  }

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  if (cart.length === 0) {
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

      {cart.map((item) => (
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
            onClick={() => decreaseQuantity(item.id)}
          >
            -
          </button>

          <button
            onClick={() => increaseQuantity(item.id)}
          >
            +
          </button>

          <button
            onClick={() => removeItem(item.id)}
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
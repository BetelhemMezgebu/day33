
import { useState, useContext } from "react";
import { CartContext } from "../context/CartContext";

function Checkout() {
  const { items, total, dispatch } = useContext(CartContext);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [orderPlaced, setOrderPlaced] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!name || !phone || !address) {
      alert("Please fill in all delivery information.");
      return;
    }

    setOrderPlaced(true);

    dispatch({
      type: "CLEAR",
    });
  };

  const handleClearCart = () => {
    dispatch({
      type: "CLEAR",
    });
  };

  if (orderPlaced) {
    return (
      <section className="delivery-section">
        <div className="delivery-form">
          <h2>✅ Order Placed!</h2>

          <p>
            Thank you, {name}! Your order will be delivered to:
          </p>

          <p>📍 {address}</p>
          <p>📱 {phone}</p>

          <button
            type="button"
            className="order-button"
            onClick={() => {
              setOrderPlaced(false);
              setName("");
              setPhone("");
              setAddress("");
            }}
          >
            Place Another Order
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="delivery-section">
      <div className="delivery-form">
        <h2>🛒 Your Cart</h2>

        {items.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <>
            {items.map((item) => (
              <div key={item.cartId} className="cart-item">
                <span>
                  {item.name} - {item.price} ETB
                </span>

                <button
                  type="button"
                  onClick={() =>
                    dispatch({
                      type: "REMOVE",
                      payload: item.cartId,
                    })
                  }
                >
                  Remove
                </button>
              </div>
            ))}

            <h3>Total: {total} ETB</h3>

            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Your name"
                value={name}
                onChange={(event) =>
                  setName(event.target.value)
                }
              />

              <input
                type="tel"
                placeholder="Phone number"
                value={phone}
                onChange={(event) =>
                  setPhone(event.target.value)
                }
              />

              <input
                type="text"
                placeholder="Delivery address"
                value={address}
                onChange={(event) =>
                  setAddress(event.target.value)
                }
              />

              <button
                type="submit"
                className="order-button"
              >
                🚚 Place Order
              </button>
            </form>

            <button
              type="button"
              className="clear-cart-button"
              onClick={handleClearCart}
            >
              🗑️ Clear Cart
            </button>
          </>
        )}
      </div>
    </section>
  );
}

export default Checkout;


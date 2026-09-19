import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Checkout() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    if (!name || !phone || !address) {
      alert("Please fill in all fields.");
      return;
    }

    alert("Order placed successfully! 🎉");

    navigate("/menu");
  }

  return (
    <div>
      <h1>Checkout</h1>

      <p>Complete your order.</p>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Full Name</label>
          <br />

          <input
            id="name"
            type="text"
            value={name}
            onChange={(event) =>
              setName(event.target.value)
            }
            placeholder="Enter your name"
          />
        </div>

        <br />

        <div>
          <label htmlFor="phone">Phone Number</label>
          <br />

          <input
            id="phone"
            type="tel"
            value={phone}
            onChange={(event) =>
              setPhone(event.target.value)
            }
            placeholder="09xxxxxxxx"
          />
        </div>

        <br />

        <div>
          <label htmlFor="address">Delivery Address</label>
          <br />

          <textarea
            id="address"
            value={address}
            onChange={(event) =>
              setAddress(event.target.value)
            }
            placeholder="Enter your delivery address"
          />
        </div>

        <br />

        <button type="submit">
          Place Order
        </button>
      </form>
    </div>
  );
}

export default Checkout;
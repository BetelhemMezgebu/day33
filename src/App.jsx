import { useState } from "react";
import Dish from "./Dish";
import "./App.css";

const menu = [
  {
    id: 1,
    name: "Doro Wot",
    price: 250,
    category: "Main",
    spicy: true,
  },
  {
    id: 2,
    name: "Tibs",
    price: 300,
    category: "Main",
    spicy: true,
  },
  {
    id: 3,
    name: "Shiro",
    price: 180,
    category: "Main",
    spicy: false,
  },
  {
    id: 4,
    name: "Sambusa",
    price: 100,
    category: "Snack",
    spicy: false,
  },
  {
    id: 5,
    name: "Firfir",
    price: 200,
    category: "Breakfast",
    spicy: true,
  },
];

const categories = ["All", "Main", "Snack", "Breakfast", "Dessert"];

function App() {
  const [category, setCategory] = useState("All");

  const [total, setTotal] = useState(0);

  const [delivery, setDelivery] = useState({
    name: "",
    phone: "",
    area: "",
  });

  const filteredMenu =
    category === "All"
      ? menu
      : menu.filter((dish) => dish.category === category);

  const handleAdd = (price) => {
    setTotal((currentTotal) => currentTotal + price);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setDelivery((currentDelivery) => ({
      ...currentDelivery,
      [name]: value,
    }));
  };

  const phoneRegex = /^(09\d{8}|\+2519\d{8})$/;

  const isPhoneValid = phoneRegex.test(delivery.phone);

  const isFormValid =
    delivery.name.trim() !== "" &&
    isPhoneValid &&
    delivery.area.trim() !== "";

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!isFormValid) {
      return;
    }

    alert(
      `Order placed successfully!\n\n` +
        `Name: ${delivery.name}\n` +
        `Phone: ${delivery.phone}\n` +
        `Area: ${delivery.area}\n` +
        `Total: ${total} ETB`
    );
  };

  return (
    <div className="app">
      <header className="hero">
        <div className="hero-content">
          <h1>🍽️ Addis Eats</h1>
          <p>Delicious Ethiopian food, made for you.</p>
        </div>
      </header>

      <main>
        <section className="category-section">
          <h2>Choose a Category</h2>

          <div className="filter">
            {categories.map((item) => (
              <button
                key={item}
                type="button"
                className={category === item ? "active" : ""}
                onClick={() => setCategory(item)}
              >
                {item}
              </button>
            ))}
          </div>
        </section>

        <section className="total-section">
          <p>Your Order Total</p>
          <h2>{total} ETB</h2>
        </section>

        <section className="menu">
          {filteredMenu.map((dish) => (
            <Dish
              key={dish.id}
              name={dish.name}
              price={dish.price}
              category={dish.category}
              spicy={dish.spicy}
              onAdd={handleAdd}
            />
          ))}
        </section>

        {filteredMenu.length === 0 && (
          <p className="empty-state">
            No dishes found in this category.
          </p>
        )}

        <section className="delivery-section">
          <form className="delivery-form" onSubmit={handleSubmit}>
            <h2>📦 Delivery Details</h2>

            <p className="form-description">
              Enter your information to receive your order.
            </p>

            <label htmlFor="name">Full Name</label>

            <input
              id="name"
              type="text"
              name="name"
              placeholder="Enter your name"
              value={delivery.name}
              onChange={handleChange}
            />

            <label htmlFor="phone">
              TeleBirr Phone Number
            </label>

            <input
              id="phone"
              type="tel"
              name="phone"
              placeholder="09xxxxxxxx or +2519xxxxxxxx"
              value={delivery.phone}
              onChange={handleChange}
            />

            {delivery.phone !== "" && (
              <p
                className={
                  isPhoneValid
                    ? "phone-valid"
                    : "phone-invalid"
                }
              >
                {isPhoneValid
                  ? "✓ Valid TeleBirr number"
                  : "✗ Invalid TeleBirr number"}
              </p>
            )}

            <label htmlFor="area">Delivery Area</label>

            <input
              id="area"
              type="text"
              name="area"
              placeholder="Enter your area"
              value={delivery.area}
              onChange={handleChange}
            />

            <button
              type="submit"
              className="order-button"
              disabled={!isFormValid}
            >
              {isFormValid
                ? "Place Order"
                : "Complete Form to Order"}
            </button>
          </form>
        </section>
      </main>
    </div>
  );
}

export default App;
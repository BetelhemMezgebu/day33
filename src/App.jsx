import { useEffect, useRef, useState } from "react";
import Dish from "./Dish";
import "./App.css";

const categories = ["All", "Main", "Snack", "Breakfast", "Dessert"];

function App() {
  // Menu state
  const [menu, setMenu] = useState([]);

  // Category state
  const [category, setCategory] = useState("All");

  // Loading and error states
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Search input reference
  const searchInputRef = useRef(null);

  // Order total
  const [total, setTotal] = useState(0);

  // Delivery form state
  const [delivery, setDelivery] = useState({
    name: "",
    phone: "",
    area: "",
  });

  // Fetch menu whenever category changes
  useEffect(() => {
    const controller = new AbortController();

    async function fetchMenu() {
      try {
        setLoading(true);
        setError("");

        const response = await fetch("/menu.json", {
          signal: controller.signal,
        });

        // Check if request was successful
        if (!response.ok) {
          throw new Error("Failed to load menu.");
        }

        // Convert response to JavaScript data
        const data = await response.json();

        // Filter menu based on category
        const filteredMenu =
          category === "All"
            ? data
            : data.filter((dish) => dish.category === category);

        setMenu(filteredMenu);
      } catch (err) {
        // Ignore errors caused by cancelling the request
        if (err.name !== "AbortError") {
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    }

    fetchMenu();

    // Cleanup: cancel previous request
    return () => {
      controller.abort();
    };
  }, [category]);

  // Focus search input after loading finishes
  useEffect(() => {
    if (!loading && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [loading]);

  // Add dish price to total
  const handleAdd = (price) => {
    setTotal((currentTotal) => currentTotal + price);
  };

  // Handle delivery form changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setDelivery((currentDelivery) => ({
      ...currentDelivery,
      [name]: value,
    }));
  };

  // Phone number validation
  const phoneRegex = /^(09\d{8}|\+2519\d{8})$/;

  const isPhoneValid = phoneRegex.test(delivery.phone);

  const isFormValid =
    delivery.name.trim() !== "" &&
    isPhoneValid &&
    delivery.area.trim() !== "";

  // Submit order
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

  // Loading state
  if (loading) {
    return (
      <div className="app">
        <h2>Loading menu...</h2>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="app">
        <h2>Error: {error}</h2>
      </div>
    );
  }

  return (
    <div className="app">
      {/* Header */}
      <header className="hero">
        <div className="hero-content">
          <h1>🍽️ Addis Eats</h1>
          <p>Delicious Ethiopian food, made for you.</p>
        </div>
      </header>

      <main>
        {/* Search */}
        <section className="search-section">
          <input
            ref={searchInputRef}
            type="text"
            placeholder="Search dishes..."
          />
        </section>

        {/* Category section */}
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

        {/* Order total */}
        <section className="total-section">
          <p>Your Order Total</p>
          <h2>{total} ETB</h2>
        </section>

        {/* Menu */}
        <section className="menu">
          {menu.map((dish) => (
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

        {/* Empty state */}
        {menu.length === 0 && (
          <p className="empty-state">
            No dishes found in this category.
          </p>
        )}

        {/* Delivery form */}
        <section className="delivery-section">
          <form className="delivery-form" onSubmit={handleSubmit}>
            <h2>📦 Delivery Details</h2>

            <p className="form-description">
              Enter your information to receive your order.
            </p>

            {/* Name */}
            <label htmlFor="name">Full Name</label>

            <input
              id="name"
              type="text"
              name="name"
              placeholder="Enter your name"
              value={delivery.name}
              onChange={handleChange}
            />

            {/* Phone */}
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

            {/* Phone validation message */}
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

            {/* Delivery area */}
            <label htmlFor="area">Delivery Area</label>

            <input
              id="area"
              type="text"
              name="area"
              placeholder="Enter your area"
              value={delivery.area}
              onChange={handleChange}
            />

            {/* Submit */}
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
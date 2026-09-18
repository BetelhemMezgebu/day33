
import { useEffect, useMemo, useRef, useState } from "react";

import Dish from "./Dish";
import Header from "./components/Header";
import Checkout from "./components/Checkout";
import CartProvider from "./context/CartContext";
import useFetch from "./hooks/useFetch";

import "./App.css";

const categories = [
  "All",
  "Main",
  "Snack",
  "Breakfast",
  "Dessert",
];

function AppContent() {
  const [category, setCategory] = useState("All");
  const [search, setSearch] = useState("");

  const searchInputRef = useRef(null);

  // Fetch menu again whenever category changes
  const {
    data: menu,
    loading,
    error,
  } = useFetch("/menu.json", [category]);

  // Focus search input after loading
  useEffect(() => {
    if (!loading && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [loading]);

  // Filter and sort menu
  const filteredMenu = useMemo(() => {
    return menu
      .filter((dish) => {
        const matchesCategory =
          category === "All" ||
          dish.category === category;

        const matchesSearch =
          dish.name
            .toLowerCase()
            .includes(search.toLowerCase());

        return matchesCategory && matchesSearch;
      })
      .sort((a, b) =>
        a.name.localeCompare(b.name)
      );
  }, [menu, category, search]);

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
      <Header />

      <main>
        {/* Search */}
        <section className="search-section">
          <input
            ref={searchInputRef}
            type="text"
            placeholder="Search dishes..."
            value={search}
            onChange={(event) =>
              setSearch(event.target.value)
            }
          />
        </section>

        {/* Categories */}
        <section className="category-section">
          <h2>Choose a Category</h2>

          <div className="filter">
            {categories.map((item) => (
              <button
                key={item}
                type="button"
                className={
                  category === item ? "active" : ""
                }
                onClick={() => setCategory(item)}
              >
                {item}
              </button>
            ))}
          </div>
        </section>

        {/* Menu */}
        <section className="menu">
          {filteredMenu.map((dish) => (
            <Dish
              key={dish.id}
              id={dish.id}
              name={dish.name}
              price={dish.price}
              category={dish.category}
              spicy={dish.spicy}
            />
          ))}
        </section>

        {/* No results */}
        {filteredMenu.length === 0 && (
          <p className="empty-state">
            No dishes found.
          </p>
        )}

        {/* Cart */}
        <Checkout />
      </main>
    </div>
  );
}

function App() {
  return (
    <CartProvider>
      <AppContent />
    </CartProvider>
  );
}

export default App;

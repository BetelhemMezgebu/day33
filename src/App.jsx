
import { useState } from "react";
import Dish from "./Dish";
import Card from "./Card";
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

function App() {
  const [category, setCategory] = useState("All");

  const filteredMenu =
    category === "All"
      ? menu
      : menu.filter((dish) => dish.category === category);

  return (
    <div className="app">
      <header>
        <h1>🍽️ Addis Eats</h1>
        <p>Delicious Ethiopian food</p>
      </header>

      <main>
        <div className="filter">
          <label htmlFor="category">Filter by category: </label>

          <select
            id="category"
            value={category}
            onChange={(event) => setCategory(event.target.value)}
          >
            <option value="All">All</option>
            <option value="Main">Main</option>
            <option value="Snack">Snack</option>
            <option value="Breakfast">Breakfast</option>
            <option value="Dessert">Dessert</option>
          </select>
        </div>

        {filteredMenu.length === 0 ? (
          <p className="empty-state">
            No dishes found in this category.
          </p>
        ) : (
          <section className="menu">
            {filteredMenu.map((dish) => (
              <Card key={dish.id}>
                <Dish
                  name={dish.name}
                  price={dish.price}
                  spicy={dish.spicy}
                />
              </Card>
            ))}
          </section>
        )}
      </main>
    </div>
  );
}

export default App;


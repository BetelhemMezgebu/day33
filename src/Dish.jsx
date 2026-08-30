import { useState } from "react";

function Dish({ name, price, category, spicy, onAdd }) {
  const [count, setCount] = useState(0);

  const handleAdd = () => {
    setCount((currentCount) => currentCount + 1);
    onAdd(price);
  };

  return (
    <article className="dish">
      <div className="dish-content">
        <div className="dish-category">
          {category}
        </div>

        <h3>{name}</h3>

        <p className="dish-price">
          {price} ETB
        </p>

        {spicy && (
          <p className="spicy">
            🌶️ Spicy
          </p>
        )}

        <p className="count">
          Added: {count}
        </p>
      </div>

      <button
        type="button"
        className="add-button"
        onClick={handleAdd}
      >
        + Add
      </button>
    </article>
  );
}

export default Dish;
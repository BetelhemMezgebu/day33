import { useState } from "react";

function Dish({ name, price }) {
  const [count, setCount] = useState(0);

  return (
    <div className="dish-card">
      <h3>{name}</h3>
      <p>{price} ETB</p>

      <button onClick={() => setCount(count + 1)}>
        Add
      </button>

      <p>Added: {count}</p>
    </div>
  );
}

export default Dish;2
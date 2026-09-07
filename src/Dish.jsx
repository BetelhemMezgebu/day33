import { useContext } from "react";
import { CartContext } from "./context/CartContext";

function Dish({ name, price, category, spicy, id }) {
  const { dispatch } = useContext(CartContext);

  const handleAdd = () => {
    dispatch({
      type: "ADD",
      payload: {
        id,
        name,
        price,
        category,
        spicy,
      },
    });
  };

  return (
    <article className="dish">
      <h3>{name}</h3>

      <p>{category}</p>

      <p>{price} ETB</p>

      {spicy && <span>🌶️ Spicy</span>}

      <button type="button" onClick={handleAdd}>
        Add to Order
      </button>
    </article>
  );
}

export default Dish;
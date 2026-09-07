function Dish({ name, price, category, spicy, onAdd }) {
  return (
    <article className="dish">
      <h3>{name}</h3>

      <p>{category}</p>

      <p>{price} ETB</p>

      {spicy && <span>🌶️ Spicy</span>}

      <button onClick={() => onAdd(price)}>
        Add to Order
      </button>
    </article>
  );
}

export default Dish;
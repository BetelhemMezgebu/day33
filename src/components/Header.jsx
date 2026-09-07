import { useContext } from "react";
import { CartContext } from "../context/CartContext";

function Header() {
  const { items, total } = useContext(CartContext);

  return (
    <header className="hero">
      <div className="hero-content">
        <h1>🍽️ Addis Eats</h1>

        <p>Delicious Ethiopian food, made for you.</p>

        <div className="cart-badge">
          🛒 Cart: {items.length} item(s) — {total} ETB
        </div>
      </div>
    </header>
  );
}

export default Header;
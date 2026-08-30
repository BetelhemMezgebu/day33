
import PropTypes from "prop-types";

function Dish({ name, price, spicy, currency = "ETB" }) {
  return (
    <article className="dish-card">
      <h3>{name}</h3>

      {spicy && <span className="spicy-badge">🌶️ Spicy</span>}

      <p>
        {price} {currency}
      </p>
    </article>
  );
}

Dish.propTypes = {
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  spicy: PropTypes.bool,
  currency: PropTypes.string,
};

export default Dish;


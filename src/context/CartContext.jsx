import {
  createContext,
  useMemo,
  useReducer,
} from "react";

import cartReducer from "../reducers/cartReducer";

export const CartContext = createContext();

function CartProvider({ children }) {
  const [items, dispatch] = useReducer(cartReducer, []);

  const total = items.reduce(
    (sum, item) => sum + item.price,
    0
  );

  const value = useMemo(() => {
    return {
      items,
      dispatch,
      total,
    };
  }, [items, total]);

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

export default CartProvider;
import { Routes, Route } from "react-router-dom";

import Layout from "./layouts/Layout";
import Menu from "./pages/Menu";
import DishDetails from "./pages/DishDetails";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import SignIn from "./pages/SignIn";

function Home() {
  return (
    <div>
      <h1>Welcome to Addis Eats</h1>

      <p>Discover delicious meals in Addis Ababa.</p>
    </div>
  );
}

function NotFound() {
  return (
    <div>
      <h1>404 - Page Not Found</h1>

      <p>The page you are looking for does not exist.</p>
    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>

        {/* Home */}
        <Route index element={<Home />} />

        {/* Menu */}
        <Route path="menu" element={<Menu />} />

        {/* Dish Details */}
        <Route
          path="menu/:id"
          element={<DishDetails />}
        />

        {/* Cart */}
        <Route path="cart" element={<Cart />} />

        {/* Sign In */}
        <Route path="signin" element={<SignIn />} />

        {/* Checkout */}
        <Route
          path="checkout"
          element={<Checkout />}
        />

        {/* 404 */}
        <Route path="*" element={<NotFound />} />

      </Route>
    </Routes>
  );
}

export default App;
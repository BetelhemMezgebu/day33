import { Link, useSearchParams } from "react-router-dom";

import doroWot from "../assets/foods/doro-wot.jpg";
import shiroWot from "../assets/foods/shiro-wot.jpg";
import tibs from "../assets/foods/tibs.jpg";
import kitfo from "../assets/foods/kitfo.jpg";
import firfir from "../assets/foods/firfir.jpg";
import misirWot from "../assets/foods/misir-wot.jpg";
import gomen from "../assets/foods/gomen.jpg";
import chechebsa from "../assets/foods/chechebsa.jpg";
import beyaynetu from "../assets/foods/beyaynetu.jpg";
import kikAlicha from "../assets/foods/kik-alicha.jpg";

const dishes = [
  {
    id: "doro-wot",
    name: "Doro Wot",
    category: "Main",
    price: 500,
    image: doroWot,
    description:
      "Traditional Ethiopian spicy chicken stew prepared with berbere, onions, garlic, and spices.",
  },
  {
    id: "shiro-wot",
    name: "Shiro Wot",
    category: "Vegetarian",
    price: 250,
    image: shiroWot,
    description:
      "Traditional Ethiopian stew made from ground chickpeas and flavorful spices.",
  },
  {
    id: "tibs",
    name: "Tibs",
    category: "Main",
    price: 650,
    image: tibs,
    description:
      "Tender pieces of meat cooked with onions, peppers, tomatoes, and Ethiopian spices.",
  },
  {
    id: "kitfo",
    name: "Kitfo",
    category: "Traditional",
    price: 700,
    image: kitfo,
    description:
      "Traditional Ethiopian minced beef dish seasoned with mitmita and spiced butter.",
  },
  {
    id: "firfir",
    name: "Firfir",
    category: "Breakfast",
    price: 300,
    image: firfir,
    description:
      "Shredded injera mixed with berbere sauce and traditional Ethiopian spices.",
  },
  {
    id: "misir-wot",
    name: "Misir Wot",
    category: "Vegetarian",
    price: 300,
    image: misirWot,
    description:
      "Spicy red lentil stew prepared with berbere and Ethiopian spices.",
  },
  {
    id: "gomen",
    name: "Gomen",
    category: "Vegetarian",
    price: 250,
    image: gomen,
    description:
      "Collard greens cooked with garlic, ginger, and Ethiopian spices.",
  },
  {
    id: "chechebsa",
    name: "Chechebsa",
    category: "Breakfast",
    price: 350,
    image: chechebsa,
    description:
      "Pieces of flatbread mixed with spiced butter and honey.",
  },
  {
    id: "beyaynetu",
    name: "Beyaynetu",
    category: "Traditional",
    price: 550,
    image: beyaynetu,
    description:
      "A combination of Ethiopian vegetarian dishes served together with injera.",
  },
  {
    id: "kik-alicha",
    name: "Kik Alicha",
    category: "Vegetarian",
    price: 300,
    image: kikAlicha,
    description:
      "Mild yellow split-pea stew flavored with turmeric, garlic, and ginger.",
  },
];

function Menu() {
  const [searchParams, setSearchParams] = useSearchParams();

  const category = searchParams.get("category") || "all";

  const filteredDishes =
    category === "all"
      ? dishes
      : dishes.filter((dish) => dish.category === category);

  function handleCategoryChange(event) {
    const selectedCategory = event.target.value;

    if (selectedCategory === "all") {
      setSearchParams({});
    } else {
      setSearchParams({
        category: selectedCategory,
      });
    }
  }

  return (
  <div>
    <h1>Traditional Ethiopian Food</h1>

    <p>Choose your favorite Ethiopian meal.</p>

      <label htmlFor="category">
        Filter by category:
      </label>{" "}

      <select
        id="category"
        value={category}
        onChange={handleCategoryChange}
      >
        <option value="all">All</option>
        <option value="Breakfast">Breakfast</option>
        <option value="Main">Main</option>
        <option value="Vegetarian">Vegetarian</option>
        <option value="Traditional">Traditional</option>
      </select>

      <hr />

      <div>
        {filteredDishes.map((dish) => (
          <div key={dish.id}>
            <img
              src={dish.image}
              alt={dish.name}
              width="250"
            />

            <h2>{dish.name}</h2>

            <p>
              <strong>Category:</strong> {dish.category}
            </p>

            <p>
              <strong>Price:</strong> {dish.price} ETB
            </p>

            <p>{dish.description}</p>

            <Link to={`/menu/${dish.id}`}>
              View Dish
            </Link>

            <hr />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Menu;
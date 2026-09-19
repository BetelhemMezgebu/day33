import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";

const dishes = [
  {
    id: "doro-wot",
    name: "Doro Wot",
    category: "Main",
    price: 500,
    image: "/src/assets/foods/doro-wot.jpg",
    description:
      "Traditional Ethiopian spicy chicken stew prepared with berbere, onions, garlic, and spices.",
  },
  {
    id: "shiro-wot",
    name: "Shiro Wot",
    category: "Vegetarian",
    price: 250,
    image: "/src/assets/foods/shiro-wot.jpg",
    description:
      "Traditional Ethiopian stew made from ground chickpeas and flavorful spices.",
  },
  {
    id: "tibs",
    name: "Tibs",
    category: "Main",
    price: 650,
    image: "/src/assets/foods/tibs.jpg",
    description:
      "Tender pieces of meat cooked with onions, peppers, tomatoes, and Ethiopian spices.",
  },
  {
    id: "kitfo",
    name: "Kitfo",
    category: "Traditional",
    price: 700,
    image: "/src/assets/foods/kitfo.jpg",
    description:
      "Traditional Ethiopian minced beef dish seasoned with mitmita and spiced butter.",
  },
  {
    id: "firfir",
    name: "Firfir",
    category: "Breakfast",
    price: 300,
    image: "/src/assets/foods/firfir.jpg",
    description:
      "Shredded injera mixed with berbere sauce and traditional Ethiopian spices.",
  },
  {
    id: "misir-wot",
    name: "Misir Wot",
    category: "Vegetarian",
    price: 300,
    image: "/src/assets/foods/misir-wot.jpg",
    description:
      "Spicy red lentil stew prepared with berbere and Ethiopian spices.",
  },
  {
    id: "gomen",
    name: "Gomen",
    category: "Vegetarian",
    price: 250,
    image: "/src/assets/foods/gomen.jpg",
    description:
      "Collard greens cooked with garlic, ginger, and Ethiopian spices.",
  },
  {
    id: "chechebsa",
    name: "Chechebsa",
    category: "Breakfast",
    price: 350,
    image: "/src/assets/foods/chechebsa.jpg",
    description:
      "Pieces of flatbread mixed with spiced butter and honey.",
  },
  {
    id: "beyaynetu",
    name: "Beyaynetu",
    category: "Traditional",
    price: 550,
    image: "/src/assets/foods/beyaynetu.jpg",
    description:
      "A combination of Ethiopian vegetarian dishes served together with injera.",
  },
  {
    id: "kik-alicha",
    name: "Kik Alicha",
    category: "Vegetarian",
    price: 300,
    image: "/src/assets/foods/kik-alicha.jpg",
    description:
      "Mild yellow split-pea stew flavored with turmeric, garlic, and ginger.",
  },
];

function DishDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [dish, setDish] = useState(null);

  useEffect(() => {
    const foundDish = dishes.find((item) => item.id === id);

    setDish(foundDish || null);
  }, [id]);

  function addToCart() {
    const savedCart = localStorage.getItem("addisEatsCart");

    const cart = savedCart ? JSON.parse(savedCart) : [];

    const existingItem = cart.find((item) => item.id === dish.id);

    let updatedCart;

    if (existingItem) {
      updatedCart = cart.map((item) =>
        item.id === dish.id
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item
      );
    } else {
      updatedCart = [
        ...cart,
        {
          id: dish.id,
          name: dish.name,
          price: dish.price,
          image: dish.image,
          quantity: 1,
        },
      ];
    }

    localStorage.setItem(
      "addisEatsCart",
      JSON.stringify(updatedCart)
    );

    navigate("/cart");
  }

  if (!dish) {
    return (
      <div>
        <h1>Dish Not Found</h1>

        <Link to="/menu">Back to Menu</Link>
      </div>
    );
  }

  return (
    <div>
      <Link to="/menu">← Back to Menu</Link>

      <h1>{dish.name}</h1>

      <img
        src={dish.image}
        alt={dish.name}
        width="300"
      />

      <p>
        <strong>Category:</strong> {dish.category}
      </p>

      <p>
        <strong>Price:</strong> {dish.price} ETB
      </p>

      <p>{dish.description}</p>

      <button onClick={addToCart}>
        Add to Cart
      </button>
    </div>
  );
}

export default DishDetails;
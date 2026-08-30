import './App.css'

function Header() {
  return (
    <header>
      <h1>🍴 Addis Eats</h1>
      <p>Delicious Ethiopian Food</p>
    </header>
  )
}

function Dish({ name, price }) {
  return (
    <div className="dish">
      <h2>{name}</h2>
      <p>{price} ETB</p>
    </div>
  )
}

function App() {
  const dishes = [
    { id: 1, name: 'Doro Wot', price: 250 },
    { id: 2, name: 'Kitfo', price: 300 },
    { id: 3, name: 'Tibs', price: 280 },
    { id: 4, name: 'Shiro Wot', price: 150 },
    { id: 5, name: 'Beyaynetu', price: 200 },
  ]

  return (
    <>
      <Header />

      <main>
        <h2>Our Menu</h2>

        <div className="menu">
          {dishes.map((dish) => (
            <Dish
              key={dish.id}
              name={dish.name}
              price={dish.price}
            />
          ))}
        </div>
      </main>
    </>
  )
}

export default App

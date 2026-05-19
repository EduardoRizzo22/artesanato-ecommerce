import { useContext } from "react";
import { CartContext } from "../context/CartContext";

export default function Cart() {
  const { cart, setCart } = useContext(CartContext);

  const remove = (index) => {
    setCart(cart.filter((_, i) => i !== index));
  };

  const total = cart.reduce(
    (acc, item) => acc + item.price,
    0
  );

  return (
    <div>
      <h1>Carrinho</h1>

      {cart.map((item, index) => (
        <div key={index}>
          {item.name}

          <button onClick={() => remove(index)}>
            Remover
          </button>
        </div>
      ))}

      <h2>Total: R$ {total}</h2>
    </div>
  );
}
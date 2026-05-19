import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const { cart, setCart } = useContext(CartContext);
  const navigate = useNavigate();

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
        <div key={index} className="cart-item">
          {item.name}

          <button onClick={() => remove(index)}>
            Remover
          </button>
        </div>
      ))}

      <h2>Total: R$ {total.toFixed(2)}</h2>

      {cart.length > 0 && (
        <div style={{ textAlign: "center", marginTop: "2rem" }}>
          <button style={{ width: "auto" }} onClick={() => navigate("/checkout")}>
            Ir para o Checkout
          </button>
        </div>
      )}
    </div>
  );
}
import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import api from "../api/api";

export default function Checkout() {
  const { cart } = useContext(CartContext);

  const finish = async () => {
    const total = cart.reduce(
      (acc, item) => acc + item.price,
      0
    );

    const res = await api.post("/orders", {
      products: cart,
      total
    });

    alert(`Pedido criado: ${res.data.orderId}`);
  };

  return (
    <div>
      <h1>Checkout</h1>

      <button onClick={finish}>
        Finalizar Pedido
      </button>
    </div>
  );
}
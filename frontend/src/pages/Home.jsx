import { useEffect, useState, useContext } from "react";
import api from "../api/api";
import ProductCard from "../components/ProductCard";
import { CartContext } from "../context/CartContext";

export default function Home() {
  const [products, setProducts] = useState([]);

  const { cart, setCart } = useContext(CartContext);

  useEffect(() => {
    api.get("/products").then((res) => {
      setProducts(res.data);
    });
  }, []);

  const add = (product) => {
    setCart([...cart, product]);
    alert("Produto adicionado");
  };

  return (
    <div>
      <h1>Produtos</h1>

      {products.map((p) => (
        <ProductCard
          key={p._id}
          product={p}
          add={add}
        />
      ))}
    </div>
  );
}
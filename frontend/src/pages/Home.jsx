import React from "react";
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
      <div className="hero-section">
        <h1>Artesanato & Cia</h1>
        <p>Produtos feitos com muito carinho para você.</p>
      </div>

      <div className="produtos-grid">
        {products.map((p) => (
          <ProductCard key={p._id} product={p} add={add} />
        ))}
      </div>
    </div>
  );
}
import React from "react";
import { Link } from "react-router-dom";

export default function ProductCard({ product, add }) {
  return (
    <div className="produto-card">
      <Link to={`/product/${product._id}`} style={{ textDecoration: "none", color: "inherit" }}>
        <img src={product.image} width="200" style={{ cursor: "pointer" }} />
        <h3 style={{ cursor: "pointer" }}>{product.name}</h3>
      </Link>
      <p>R$ {product.price ? product.price.toFixed(2) : "0.00"}</p>
      <div style={{ display: "flex", fontSize: "1.2rem", color: "#fbbf24", marginBottom: "1rem" }}>
        {'★'.repeat(Math.round(product.rating || 5))}{'☆'.repeat(5 - Math.round(product.rating || 5))}
      </div>
      <button onClick={() => add(product)}>
        Adicionar
      </button>
    </div>
  );
}
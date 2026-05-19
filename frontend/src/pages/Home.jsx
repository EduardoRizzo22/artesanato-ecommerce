import React from "react";
import { useEffect, useState, useContext } from "react";
import api from "../api/api";
import ProductCard from "../components/ProductCard";
import { CartContext } from "../context/CartContext";

export default function Home() {
  // Estado para armazenar todos os produtos vindos da API
  const [products, setProducts] = useState([]);
  
  // Estado para armazenar o termo de busca digitado pelo usuário
  const [search, setSearch] = useState("");

  // Contexto global do carrinho de compras
  const { cart, setCart } = useContext(CartContext);

  // Busca inicial dos produtos quando a tela carrega
  useEffect(() => {
  async function load() {
    try {
      const res = await api.get("/products");
      setProducts(res.data || []);
    } catch (err) {
      console.log(err);
      setProducts([]);
    }
  }

  load();
}, []);

  // Função para adicionar item ao carrinho
  const add = (product) => {
    setCart([...cart, product]);
    alert("Produto adicionado");
  };

  // Filtra os produtos com base no termo de busca (ignorando maiúsculas/minúsculas)
  const filteredProducts = products.filter((p) =>
  (p?.name || "")
    .toLowerCase()
    .includes(search.toLowerCase()) ||

  (p?.category || "")
    .toLowerCase()
    .includes(search.toLowerCase())
);

  return (
    <div>
      {/* Seção Hero: Destaque visual da loja */}
      <div className="hero-section">
        <h1>Artesanato & Cia</h1>
        <p>Produtos feitos com muito carinho para você.</p>
        
        {/* Barra de Busca Integrada */}
        <div style={{ marginTop: "2rem", maxWidth: "500px", margin: "2rem auto 0 auto" }}>
          <input 
            type="text" 
            placeholder="🔍 Buscar produtos ou categorias..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ 
              width: "100%", 
              padding: "1rem", 
              borderRadius: "30px", 
              border: "none", 
              boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
              fontSize: "1.1rem",
              outline: "none"
            }}
          />
        </div>
      </div>

      {/* Grid de Produtos */}
      <div className="produtos-grid" style={{ padding: "2rem" }}>
        {filteredProducts.length > 0 ? (
          filteredProducts.map((p) => (
            <ProductCard key={p._id} product={p} add={add} />
          ))
        ) : (
          <p style={{ textAlign: "center", gridColumn: "1 / -1", color: "var(--text-muted)", fontSize: "1.2rem" }}>
            Nenhum produto encontrado para "{search}".
          </p>
        )}
      </div>
    </div>
  );
}
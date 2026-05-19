import React, { useEffect, useState, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../api/api";
import { CartContext } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  
  const { cart, setCart } = useContext(CartContext);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = () => {
    api.get(`/products/${id}`).then((res) => {
      setProduct(res.data);
    }).catch(console.error);
  };

  const add = () => {
    setCart([...cart, product]);
    alert("Produto adicionado ao carrinho!");
  };

  const submitReview = async (e) => {
    e.preventDefault();
    if (!user) {
      alert("Você precisa estar logado para avaliar.");
      return;
    }
    
    try {
      await api.post(`/products/${id}/reviews`, { rating, comment });
      setComment("");
      setRating(5);
      alert("Avaliação enviada com sucesso!");
      fetchProduct(); // Reload reviews
    } catch (err) {
      alert("Erro ao enviar avaliação");
    }
  };

  if (!product) return <div style={{ textAlign: "center", padding: "4rem" }}>Carregando produto...</div>;

  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "2rem" }}>
      <div style={{ display: "flex", gap: "3rem", flexWrap: "wrap", backgroundColor: "var(--surface)", padding: "2rem", borderRadius: "12px", boxShadow: "0 4px 6px rgba(0,0,0,0.04)" }}>
        <div style={{ flex: "1 1 400px", display: "flex", justifyContent: "center", alignItems: "center" }}>
          <img src={product.image} alt={product.name} style={{ maxWidth: "100%", maxHeight: "500px", borderRadius: "8px", objectFit: "contain" }} />
        </div>
        
        <div style={{ flex: "1 1 400px", display: "flex", flexDirection: "column", gap: "1rem" }}>
          <h1 style={{ textAlign: "left", margin: 0, fontSize: "2.5rem" }}>{product.name}</h1>
          <span style={{ display: "inline-block", backgroundColor: "var(--primary)", color: "white", padding: "0.4rem 1rem", borderRadius: "20px", fontWeight: "bold", width: "fit-content" }}>
            {product.category}
          </span>
          <p style={{ fontSize: "1.2rem", color: "var(--text-muted)", lineHeight: "1.6" }}>{product.description}</p>
          <div style={{ fontSize: "1.5rem", color: "#fbbf24" }}>
            {'★'.repeat(Math.round(product.rating || 5))}{'☆'.repeat(5 - Math.round(product.rating || 5))}
            <span style={{ fontSize: "1rem", color: "var(--text-muted)", marginLeft: "0.5rem" }}>({product.reviews?.length || 0} avaliações)</span>
          </div>
          <h2 style={{ textAlign: "left", margin: "1rem 0", fontSize: "2.5rem", color: "var(--primary)" }}>R$ {product.price ? product.price.toFixed(2) : "0.00"}</h2>
          
          <button onClick={add} style={{ padding: "1rem", fontSize: "1.2rem" }}>Adicionar ao Carrinho</button>
          <Link to="/" style={{ textAlign: "center", display: "block", marginTop: "1rem", textDecoration: "none", color: "var(--primary)", fontWeight: "bold" }}>← Voltar para loja</Link>
        </div>
      </div>

      <div style={{ marginTop: "3rem" }}>
        <h2>Avaliações dos Clientes</h2>
        
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "1.5rem", marginTop: "2rem" }}>
          {(!product.reviews || product.reviews.length === 0) ? (
            <p style={{ color: "var(--text-muted)", gridColumn: "1 / -1", textAlign: "center" }}>Nenhuma avaliação ainda. Seja o primeiro a avaliar!</p>
          ) : (
            product.reviews.map((rev, idx) => (
              <div key={idx} style={{ backgroundColor: "var(--surface)", padding: "1.5rem", borderRadius: "8px", boxShadow: "0 2px 4px rgba(0,0,0,0.04)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem" }}>
                  <strong>{rev.userName}</strong>
                  <span style={{ color: "#fbbf24" }}>{'★'.repeat(rev.rating)}{'☆'.repeat(5 - rev.rating)}</span>
                </div>
                <p style={{ color: "var(--text-muted)", fontSize: "0.95rem" }}>{rev.comment}</p>
                <small style={{ color: "#9ca3af", display: "block", marginTop: "1rem" }}>{new Date(rev.date).toLocaleDateString()}</small>
              </div>
            ))
          )}
        </div>

        <div style={{ marginTop: "3rem", backgroundColor: "var(--surface)", padding: "2rem", borderRadius: "12px" }}>
          <h3>Deixe sua avaliação</h3>
          {!user ? (
            <p style={{ color: "var(--text-muted)" }}>Você precisa fazer <Link to="/login" style={{ color: "var(--primary)" }}>Login</Link> para avaliar o produto.</p>
          ) : (
            <form onSubmit={submitReview} style={{ boxShadow: "none", padding: 0, margin: 0, maxWidth: "100%" }}>
              <div style={{ display: "flex", gap: "1rem", alignItems: "center", marginBottom: "1rem" }}>
                <label style={{ fontWeight: "bold" }}>Nota:</label>
                <select value={rating} onChange={e => setRating(e.target.value)} style={{ padding: "0.5rem", borderRadius: "8px", border: "1px solid #e5e7eb" }}>
                  <option value="5">5 Estrelas</option>
                  <option value="4">4 Estrelas</option>
                  <option value="3">3 Estrelas</option>
                  <option value="2">2 Estrelas</option>
                  <option value="1">1 Estrela</option>
                </select>
              </div>
              <textarea 
                placeholder="Escreva seu comentário sobre o produto..." 
                value={comment} 
                onChange={e => setComment(e.target.value)}
                required
                style={{ width: "100%", padding: "1rem", borderRadius: "8px", border: "1px solid #e5e7eb", minHeight: "100px", marginBottom: "1rem", fontFamily: "inherit" }}
              />
              <button type="submit" style={{ width: "auto" }}>Enviar Avaliação</button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

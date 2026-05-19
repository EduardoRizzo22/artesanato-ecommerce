import React, { useEffect, useState, useContext } from "react";
import api from "../api/api";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Admin() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [form, setForm] = useState({ name: "", description: "", price: "", image: "", category: "" });
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [file, setFile] = useState(null);

  useEffect(() => {
    if (!user || user.role !== "admin") {
      navigate("/");
      return;
    }

    api.get("/orders").then((res) => {
      setOrders(res.data);
    }).catch((err) => {
      console.error(err);
    });

    fetchProducts();
  }, [user, navigate]);

  const fetchProducts = () => {
    api.get("/products").then((res) => {
      setProducts(res.data);
    }).catch(console.error);
  };

  const submitProduct = async (e) => {
    e.preventDefault();
    try {
      let imageUrl = form.image;

      if (file) {
        const formData = new FormData();
        formData.append("image", file);
        const uploadRes = await api.post("/upload", formData, {
          headers: { "Content-Type": "multipart/form-data" }
        });
        imageUrl = uploadRes.data.imageUrl;
      }

      const productData = { ...form, image: imageUrl };

      if (editingId) {
        await api.put(`/products/${editingId}`, productData);
        alert("Produto atualizado com sucesso!");
      } else {
        await api.post("/products", productData);
        alert("Produto criado com sucesso!");
      }
      
      setForm({ name: "", description: "", price: "", image: "", category: "" });
      setFile(null);
      setEditingId(null);
      
      // Reset the file input visually
      document.getElementById("imageUploadInput").value = "";
      
      fetchProducts();
    } catch (err) {
      alert("Erro ao salvar produto");
      console.error(err);
    }
  };

  const handleEdit = (product) => {
    setEditingId(product._id);
    setForm({
      name: product.name || "",
      description: product.description || "",
      price: product.price || "",
      image: product.image || "",
      category: product.category || ""
    });
    setFile(null);
    document.getElementById("imageUploadInput").value = "";
  };

  const handleDelete = async (id) => {
    if (window.confirm("Deseja realmente excluir este produto?")) {
      try {
        await api.delete(`/products/${id}`);
        alert("Produto excluído!");
        fetchProducts();
      } catch (err) {
        alert("Erro ao excluir produto");
      }
    }
  };

  if (!user || user.role !== "admin") return null;

  return (
    <div className="admin-container">
      <h1>Painel Admin</h1>

      <div className="admin-grid">
        <section className="admin-section">
          <h2>Criar Produto</h2>
          <form onSubmit={submitProduct} className="admin-form">
            <input placeholder="Nome" value={form.name} onChange={e => setForm({...form, name: e.target.value})} required />
            <input placeholder="Descrição" value={form.description} onChange={e => setForm({...form, description: e.target.value})} required />
            <input type="number" placeholder="Preço" value={form.price} onChange={e => setForm({...form, price: e.target.value})} required />
            
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              <label style={{ fontSize: "0.9rem", fontWeight: "bold" }}>Imagem do Produto:</label>
              <input id="imageUploadInput" type="file" accept="image/*" onChange={e => setFile(e.target.files[0])} />
              {form.image && !file && <p style={{ fontSize: '0.8rem', color: "var(--text-muted)", margin: 0 }}>Imagem atual salva no banco.</p>}
            </div>

            <input placeholder="Categoria" value={form.category} onChange={e => setForm({...form, category: e.target.value})} required />
            <button type="submit">{editingId ? "Atualizar Produto" : "Salvar Produto"}</button>
            {editingId && (
              <button type="button" onClick={() => { 
                setEditingId(null); 
                setForm({ name: "", description: "", price: "", image: "", category: "" }); 
                setFile(null);
                document.getElementById("imageUploadInput").value = "";
              }} style={{ marginTop: "0.5rem", backgroundColor: "#6b7280" }}>
                Cancelar Edição
              </button>
            )}
          </form>
        </section>

        <section className="admin-section">
          <h2>Vendas Realizadas</h2>
          <div className="orders-list">
            {orders.length === 0 ? <p>Nenhuma venda encontrada.</p> : null}
            {orders.map(order => (
              <div key={order._id} className="order-card" style={{ marginBottom: "1.5rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid #e5e7eb", paddingBottom: "0.5rem", marginBottom: "0.5rem" }}>
                  <strong>Pedido: #{order.orderId?.substring(0, 8) || order._id.substring(0, 8)}</strong>
                  <span style={{ color: "#10b981", fontWeight: "bold" }}>{order.status || "Aprovado"}</span>
                </div>
                <p><strong>Data:</strong> {order.createdAt ? new Date(order.createdAt).toLocaleString() : "N/A"}</p>
                <p><strong>Total:</strong> R$ {order.total ? order.total.toFixed(2) : "0.00"}</p>
                <p><strong>Pagamento:</strong> {order.paymentMethod ? order.paymentMethod.toUpperCase() : "N/A"}</p>
                
                {order.address && (
                  <div style={{ marginTop: "1rem", padding: "0.8rem", backgroundColor: "#f9fafb", borderRadius: "8px", border: "1px solid #e5e7eb" }}>
                    <p style={{ margin: 0, fontWeight: "bold", fontSize: "0.9rem", color: "var(--text-muted)" }}>Endereço de Entrega:</p>
                    <p style={{ margin: "0.2rem 0 0 0", fontSize: "0.9rem" }}>{order.address.street}, {order.address.neighborhood}</p>
                    <p style={{ margin: 0, fontSize: "0.9rem" }}>{order.address.city} - {order.address.state} | CEP: {order.address.zipcode}</p>
                  </div>
                )}
                
                <div style={{ marginTop: "1rem" }}>
                  <p style={{ margin: "0 0 0.5rem 0", fontWeight: "bold", fontSize: "0.9rem", color: "var(--text-muted)" }}>Itens comprados:</p>
                  <ul style={{ margin: 0, paddingLeft: "1.2rem", fontSize: "0.9rem" }}>
                    {order.products.map((p, idx) => (
                      <li key={idx}>{p.name} (R$ {p.price?.toFixed(2)})</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      <div className="admin-grid" style={{ marginTop: "2rem", gridTemplateColumns: "1fr" }}>
        <section className="admin-section">
          <h2>Gerenciar Produtos</h2>
          <div className="orders-list">
            {products.length === 0 ? <p>Nenhum produto cadastrado.</p> : null}
            {products.map(product => (
              <div key={product._id} className="order-card" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <p><strong>{product.name}</strong></p>
                  <p>R$ {product.price ? product.price.toFixed(2) : "0.00"}</p>
                </div>
                <div style={{ display: "flex", gap: "0.5rem" }}>
                  <button onClick={() => handleEdit(product)} style={{ width: "auto", padding: "0.5rem 1rem", backgroundColor: "var(--primary)" }}>Editar</button>
                  <button onClick={() => handleDelete(product._id)} style={{ width: "auto", padding: "0.5rem 1rem", backgroundColor: "#ef4444" }}>Excluir</button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
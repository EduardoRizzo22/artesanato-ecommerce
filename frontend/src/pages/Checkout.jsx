import React, { useState, useContext, useEffect } from "react";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import api from "../api/api";

export default function Checkout() {
  const { cart, setCart } = useContext(CartContext);
  const navigate = useNavigate();

  const [paymentMethod, setPaymentMethod] = useState("cartao");
  const [address, setAddress] = useState({
    street: "", neighborhood: "", zipcode: "", city: "", state: ""
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [success, setSuccess] = useState(false);

  // Redireciona o usuário para a página inicial se o carrinho estiver vazio e a compra não foi concluída
  useEffect(() => {
    if (cart.length === 0 && !success) {
      navigate("/");
    }
  }, [cart, navigate, success]);

  // Calcula o valor total do carrinho
  const total = cart.reduce((acc, item) => acc + item.price, 0);

  // Integração com a API do ViaCEP para buscar endereço automaticamente
  const handleZipcodeBlur = async (e) => {
    const cep = e.target.value.replace(/\D/g, ""); // Remove caracteres não numéricos
    if (cep.length === 8) {
      try {
        const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        const data = await response.json();
        if (!data.erro) {
          setAddress(prev => ({
            ...prev,
            street: data.logradouro || "",
            neighborhood: data.bairro || "",
            city: data.localidade || "",
            state: data.uf || ""
          }));
        }
      } catch (err) {
        console.error("Erro ao buscar CEP", err);
      }
    }
  };

  // Função disparada ao enviar o formulário de pagamento
  const finish = async (e) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate payment processing time
    setTimeout(async () => {
      try {
        const res = await api.post("/orders", {
          products: cart,
          total,
          paymentMethod,
          address
        });
        
        setIsProcessing(false);
        setSuccess(true);
        setCart([]);

        // Redirect after success message
        setTimeout(() => {
          navigate("/");
        }, 3000);
      } catch (err) {
        setIsProcessing(false);
        alert("Erro ao processar pedido. Tente novamente.");
      }
    }, 2000);
  };

  if (success) {
    return (
      <div style={{ textAlign: "center", marginTop: "4rem", padding: "2rem" }}>
        <div style={{ fontSize: "5rem", color: "#10b981", marginBottom: "1rem" }}>✓</div>
        <h1 style={{ color: "#10b981" }}>Pagamento Aprovado!</h1>
        <p style={{ fontSize: "1.2rem", color: "var(--text-muted)" }}>Seu pedido foi recebido com sucesso e já está sendo preparado.</p>
        <p style={{ marginTop: "2rem" }}>Você será redirecionado para a página inicial...</p>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: "1000px", margin: "0 auto", padding: "2rem" }}>
      <h1 style={{ marginBottom: "2rem" }}>Finalizar Compra</h1>

      <div style={{ display: "flex", gap: "2rem", flexWrap: "wrap", alignItems: "flex-start" }}>
        {/* Formulário de Pagamento/Endereço */}
        <div style={{ flex: "1 1 500px", backgroundColor: "var(--surface)", padding: "2rem", borderRadius: "12px", boxShadow: "0 4px 6px rgba(0,0,0,0.04)" }}>
          <form onSubmit={finish}>
            <h2 style={{ marginBottom: "1rem", fontSize: "1.5rem" }}>1. Endereço de Entrega</h2>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
              <input style={{ padding: "0.8rem", borderRadius: "8px", border: "1px solid #e5e7eb" }} placeholder="CEP (Digite para buscar)" value={address.zipcode} onChange={e => setAddress({...address, zipcode: e.target.value})} onBlur={handleZipcodeBlur} required maxLength={9} />
              <input style={{ padding: "0.8rem", borderRadius: "8px", border: "1px solid #e5e7eb" }} placeholder="Endereço (Rua, Av)" value={address.street} onChange={e => setAddress({...address, street: e.target.value})} required />
              <input style={{ padding: "0.8rem", borderRadius: "8px", border: "1px solid #e5e7eb" }} placeholder="Número / Complemento" required />
              <input style={{ padding: "0.8rem", borderRadius: "8px", border: "1px solid #e5e7eb" }} placeholder="Bairro" value={address.neighborhood} onChange={e => setAddress({...address, neighborhood: e.target.value})} required />
              <input style={{ padding: "0.8rem", borderRadius: "8px", border: "1px solid #e5e7eb" }} placeholder="Cidade" value={address.city} onChange={e => setAddress({...address, city: e.target.value})} required />
              <input style={{ padding: "0.8rem", borderRadius: "8px", border: "1px solid #e5e7eb" }} placeholder="Estado (UF)" value={address.state} onChange={e => setAddress({...address, state: e.target.value})} required maxLength={2} />
            </div>

            <h2 style={{ marginTop: "2rem", marginBottom: "1rem", fontSize: "1.5rem" }}>2. Forma de Pagamento</h2>
            <div style={{ display: "flex", gap: "1rem", marginBottom: "1rem" }}>
              <label style={{ flex: 1, padding: "1rem", border: paymentMethod === "cartao" ? "2px solid var(--primary)" : "1px solid #e5e7eb", borderRadius: "8px", cursor: "pointer", textAlign: "center" }}>
                <input type="radio" name="payment" value="cartao" checked={paymentMethod === "cartao"} onChange={() => setPaymentMethod("cartao")} style={{ display: "none" }} />
                💳 Cartão de Crédito
              </label>
              <label style={{ flex: 1, padding: "1rem", border: paymentMethod === "pix" ? "2px solid var(--primary)" : "1px solid #e5e7eb", borderRadius: "8px", cursor: "pointer", textAlign: "center" }}>
                <input type="radio" name="payment" value="pix" checked={paymentMethod === "pix"} onChange={() => setPaymentMethod("pix")} style={{ display: "none" }} />
                💠 PIX
              </label>
              <label style={{ flex: 1, padding: "1rem", border: paymentMethod === "boleto" ? "2px solid var(--primary)" : "1px solid #e5e7eb", borderRadius: "8px", cursor: "pointer", textAlign: "center" }}>
                <input type="radio" name="payment" value="boleto" checked={paymentMethod === "boleto"} onChange={() => setPaymentMethod("boleto")} style={{ display: "none" }} />
                📄 Boleto
              </label>
            </div>

            {paymentMethod === "cartao" && (
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", backgroundColor: "#f9fafb", padding: "1.5rem", borderRadius: "8px" }}>
                <input style={{ gridColumn: "1 / -1", padding: "0.8rem", borderRadius: "8px", border: "1px solid #e5e7eb" }} placeholder="Número do Cartão" required />
                <input style={{ gridColumn: "1 / -1", padding: "0.8rem", borderRadius: "8px", border: "1px solid #e5e7eb" }} placeholder="Nome impresso no Cartão" required />
                <input style={{ padding: "0.8rem", borderRadius: "8px", border: "1px solid #e5e7eb" }} placeholder="Validade (MM/AA)" required />
                <input style={{ padding: "0.8rem", borderRadius: "8px", border: "1px solid #e5e7eb" }} placeholder="CVV" required />
              </div>
            )}

            {paymentMethod === "pix" && (
              <div style={{ backgroundColor: "#f9fafb", padding: "1.5rem", borderRadius: "8px", textAlign: "center" }}>
                <p>Abra o app do seu banco e escaneie o código QR que será gerado na próxima tela.</p>
              </div>
            )}

            <button 
              type="submit" 
              disabled={isProcessing}
              style={{ 
                width: "100%", 
                marginTop: "2rem", 
                padding: "1rem", 
                fontSize: "1.2rem",
                backgroundColor: isProcessing ? "#9ca3af" : "var(--primary)",
                cursor: isProcessing ? "not-allowed" : "pointer"
              }}
            >
              {isProcessing ? "Processando Pagamento..." : `Pagar R$ ${total.toFixed(2)}`}
            </button>
          </form>
        </div>

        {/* Resumo do Pedido */}
        <div style={{ flex: "1 1 300px", backgroundColor: "var(--surface)", padding: "2rem", borderRadius: "12px", boxShadow: "0 4px 6px rgba(0,0,0,0.04)" }}>
          <h2 style={{ marginBottom: "1.5rem", fontSize: "1.5rem", borderBottom: "1px solid #e5e7eb", paddingBottom: "1rem" }}>Resumo da Compra</h2>
          
          <div style={{ maxHeight: "300px", overflowY: "auto", marginBottom: "1rem" }}>
            {cart.map((item, index) => (
              <div key={index} style={{ display: "flex", justifyContent: "space-between", marginBottom: "1rem" }}>
                <span style={{ color: "var(--text-muted)" }}>1x {item.name}</span>
                <span style={{ fontWeight: "bold" }}>R$ {item.price?.toFixed(2)}</span>
              </div>
            ))}
          </div>

          <div style={{ borderTop: "1px solid #e5e7eb", paddingTop: "1rem", marginTop: "1rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem" }}>
              <span style={{ color: "var(--text-muted)" }}>Subtotal</span>
              <span>R$ {total.toFixed(2)}</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem" }}>
              <span style={{ color: "var(--text-muted)" }}>Frete</span>
              <span style={{ color: "#10b981" }}>Grátis</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: "1rem", fontSize: "1.5rem", fontWeight: "bold" }}>
              <span>Total</span>
              <span style={{ color: "var(--primary)" }}>R$ {total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
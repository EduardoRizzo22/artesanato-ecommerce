import React from "react";
import { useState } from "react";
import api from "../api/api";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [form, setForm] = useState({});
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();

    try {
      await api.post("/auth/register", form);
      alert("Cadastro realizado");
      navigate("/login");
    } catch (err) {
      alert("Erro ao cadastrar");
    }
  };

  return (
    <form onSubmit={submit}>
      <input placeholder="Nome" onChange={(e) => setForm({ ...form, name: e.target.value })} />
      <input placeholder="Email" onChange={(e) => setForm({ ...form, email: e.target.value })} />
      <input placeholder="CPF" onChange={(e) => setForm({ ...form, cpf: e.target.value })} />
      <input placeholder="Endereço" onChange={(e) => setForm({ ...form, address: e.target.value })} />
      <input type="password" placeholder="Senha" onChange={(e) => setForm({ ...form, password: e.target.value })} />
      
      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1rem" }}>
        <input 
          type="checkbox" 
          id="adminCheck" 
          onChange={(e) => setForm({ ...form, role: e.target.checked ? "admin" : "user" })} 
          style={{ width: "auto" }}
        />
        <label htmlFor="adminCheck" style={{ fontSize: "0.9rem", color: "var(--text-muted)" }}>
          Criar conta como Administrador (Apenas para testes)
        </label>
      </div>

      <button>Cadastrar</button>
    </form>
  );
}
import { useState } from "react";
import api from "../api/api";

export default function Register() {
  const [form, setForm] = useState({});

  const submit = async (e) => {
    e.preventDefault();

    await api.post("/auth/register", form);

    alert("Cadastro realizado");
  };

  return (
    <form onSubmit={submit}>
      <input placeholder="Nome" onChange={(e) => setForm({ ...form, name: e.target.value })} />
      <input placeholder="Email" onChange={(e) => setForm({ ...form, email: e.target.value })} />
      <input placeholder="CPF" onChange={(e) => setForm({ ...form, cpf: e.target.value })} />
      <input placeholder="Endereço" onChange={(e) => setForm({ ...form, address: e.target.value })} />
      <input type="password" placeholder="Senha" onChange={(e) => setForm({ ...form, password: e.target.value })} />

      <button>Cadastrar</button>
    </form>
  );
}
import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";
import { AuthContext } from "../context/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("/auth/login", {
        email,
        password
      });

      // Se a requisição foi um sucesso (status 200)
      login(res.data.token);
      alert("Login efetuado com sucesso!");
      navigate("/"); 

    } catch (error) {
      // Se a requisição falhou (status 400, 404, 500)
      const mensagemErro = error.response?.data?.message || "Erro ao conectar com o servidor.";
      alert(mensagemErro);
      console.error(error);
    }
  };

  return (
    <form onSubmit={submit}>
      <input
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Senha"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button type="submit">Entrar</button>
    </form>
  );
}
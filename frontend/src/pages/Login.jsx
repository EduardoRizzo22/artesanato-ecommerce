import { useState, useContext } from "react";
import api from "../api/api";
import { AuthContext } from "../context/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login } = useContext(AuthContext);

  const submit = async (e) => {
    e.preventDefault();

    const res = await api.post("/auth/login", {
      email,
      password
    });

    login(res.data.token);
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

      <button>Entrar</button>
    </form>
  );
}
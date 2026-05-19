import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/cart">Carrinho</Link>
      {user ? (
        <>
          {user.role === "admin" && <Link to="/admin">Admin</Link>}
          <button className="nav-btn" onClick={handleLogout}>Sair</button>
        </>
      ) : (
        <>
          <Link to="/login">Login</Link>
          <Link to="/register">Cadastre-se</Link>
        </>
      )}
    </nav>
  );
}
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/cart">Carrinho</Link>
      <Link to="/login">Login</Link>
    </nav>
  );
}
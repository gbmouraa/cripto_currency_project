import "./header-style.css";
import logo from "../../assets/logo.svg";
import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <header className="container">
      <Link to="/">
        <img src={logo} alt="Logo cripto App" />
      </Link>
    </header>
  );
};

import NasNavbar from "../assets/navbar-nasdaily.png";
import "./Navbar.css";

export const Navbar = () => {
  return (
    <nav className="navbar">
      <img src={NasNavbar} alt="logo" className="navbarpic" />
    </nav>
  );
};

import NasNavbar from "../../assets/navbar-nasdaily.png";

export const Navbar = () => {
  return (
    <nav className="bg-secondary fixed h-20 w-full">
      <img src={NasNavbar} alt="logo" className="h-20 object-contain" />
    </nav>
  );
};

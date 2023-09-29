import NasNavbar from "../assets/navbar-nasdaily.png";

function Navbar() {
  return (
    <div className="bg-secondary fixed h-20 w-full z-50">
      <img src={NasNavbar} alt="logo" className="h-20 object-contain" />
    </div>
  );
}

export default Navbar;
